(() => {
  let gc_ident = "gc"
  let gc = window[gc_ident] = {};
  gc.consts = {};
  // stop scraping after `limit` records
  gc.consts.limit = 0;
  // delay in milliseconds before scrolling
  gc.consts.scroll_delay = 100;
  gc.continue = true;
  gc.pause = () => {
    gc.continue = false;
  };
  gc.abort = async function() {
    gc.continue = false;
    await wait_condition_timeout(() => gc.stop, 1000);
    gc.stop();
  };
  let begin_t = performance.now();
  gc.records = {};
  gc.records.count = 0;
  let debug_log = [];
  gc.records.log = debug_log;
  let member_set = {};
  gc.records.set = member_set;
  let record_dups = [];
  gc.records.dups = record_dups;
  let members_div = document.querySelector('div[aria-label="Members"][role="list"]');
  extract_all_users();
  async function extract_all_users() {
    let cursor = members_div.querySelector('div[role="listitem"]');
    l1: while(true) {
      if(!gc.continue) {
        try {
          await pause();
        } catch(e) {
          break;
        }
      }
      if(gc.consts.limit && gc.records.count >= gc.consts.limit)
        break;
      await record_member(cursor);
      let next = find_next_member(cursor);
      if(next == null) {
        console.log("scolling to cursor", cursor);
        await delay(gc.consts.scroll_delay);
        while(true) {
          cursor.scrollIntoView();
          try {
            next = await wait_condition_timeout(() => find_next_member(cursor), 1000);
            break;
          } catch(e) {
            console.log('scrollIntoView timed out', cursor);
          }
          try {
            await pause();
          } catch(e) {
            break l1;
          }
        }
        console.log("scroll complete", next);
      }
      cursor = next;
    }
    let total_t = performance.now() - begin_t;
    console.log(`in ${total_t/1000} seconds, found ${gc.records.count} members, ${gc.records.dups.length} duplicates`);
    console.log(member_set);
  }
  function find_next_member(cursor) {
    if(cursor.parentElement != members_div)
      return members_div.querySelector('div[role="listitem"]');
    let next = cursor.nextElementSibling;
    while(true) {
      if(next) {
        if(next.localName == "h3") {
          next = next.nextElementSibling;
          continue;
        }
        if(next.localName == "div" && next.hasAttribute('data-list-item-id')) {
          return next;
        }
      }
      return null;
    }
  }
  async function record_member(item) {
    let member = {};
    debug_log.push(member);
    member.nickname = item.querySelector('div[class^="name"] span[class^="username"]').textContent;
    // let img_div;
    // try {
    //   img_div = await wait_condition_timeout(() => item.querySelector('div[role="img"]'), 1000);
    // } catch(e) {
    //   console.log('unable to find div[role="img"] after timeout');
    //   return;
    // }
    let img_div = item.querySelector('div[role="img"]');
    member.username = img_div.getAttribute("aria-label").split(",")[0];
    let avatar_src = item.querySelector('svg[class^="mask"] foreignObject div img').getAttribute("src").split("/");
    if(avatar_src.length >= 5) {
      member.id = avatar_src[4];
    } else {
      console.log(`default avatar ${member.username}; opening context menu`);
      item.dispatchEvent(new PointerEvent("contextmenu", {
        pointerId: 1,
        bubbles: true,
        cancelable: true,
        pointerType: "mouse",
        isPrimary: true,
      }));
      let contextmenu_div = await wait_condition_timeout(() => document.querySelector('div#user-context[aria-label="User Settings Actions"]'), 1000);
      member.id = contextmenu_div.querySelector('div[role="group"] div[id^="user-context-devmode-copy-id-"]').getAttribute("id").split("-")[5];
      document.body.click();
      await wait_condition_timeout(() => document.querySelector('div#user-context[aria-label="User Settings Actions"]') == null, 1000);
    }
    if(!(member.id in member_set)) {
      member_set[member.id] = member;
      gc.records.count += 1;
    } else {
      record_dups.push(member);
    }
  }
  function wait_condition_timeout(condition, timeout) {
    return new Promise((ok, err) => {
      let start = performance.now();
      _wait_condition_timeout(condition, ok, err, start, timeout, start);
    });
  }
  function _wait_condition_timeout(condition, ok, err, start, timeout, t) {
    let elapsed = t - start;
    let result = condition();
    if(result) {
      ok(result);
    } else {
      if(elapsed >= timeout)
        return err(elapsed);
      window.requestAnimationFrame((t) => 
        _wait_condition_timeout(condition, ok, err, start, timeout, t));
    }
  }
  function delay(t) {
    return new Promise((ok, err) => setTimeout(ok, t));
  }
  function pause() {
    console.log(`[${gc.records.count}] execution paused; call \`${gc_ident}.resume()\` or \`${gc_ident}.stop()\``);
    return new Promise((ok, err) => {
      gc.resume = () => {
        gc_pause_reset();
        ok();
      };
      gc.stop = () => {
        gc_pause_reset();
        err();
      };
    })
  }
  function gc_pause_reset() {
    gc.continue = true;
    gc.resume = null;
    gc.stop = null;
  }
})();