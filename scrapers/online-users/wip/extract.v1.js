(() => {
  let begin_t = performance.now();
  let member_export = [];
  let member_pending = [];
  let members_div = document.querySelector('div[aria-label="Members"][role="list"]');
  for(const item of members_div.querySelectorAll('div[role="listitem"]')) {
    let member = {};
    member_export.push(member);
    member.username = item.querySelector('div[role="img"]').getAttribute("aria-label").split(",")[0];
    let avatar_src = item.querySelector('svg[class^="mask"] foreignObject div img').getAttribute("src").split("/");
    if(avatar_src.length >= 5) {
      member.id = avatar_src[4];
    } else {
      member.id = null;
      let pend = {};
      member_pending.push(pend);
      pend.member = member;
      pend.member_item = item;
    }
  }
  let i = 0;
  function process_next_pend() {
    if(i >= member_pending.length) {
      console.log(member_export);
      let total_t = performance.now() - begin_t;
      console.log(`finished in ${total_t/1000} seconds`);
      return;
    }
    let pend = member_pending[i];
    i += 1;
    pend.member_item.dispatchEvent(new PointerEvent("contextmenu", {
      pointerId: 1,
      bubbles: true,
      cancelable: true,
      pointerType: "mouse",
      isPrimary: true
    }));
    wait_for_condition(() => 
      document.querySelector('div#user-context[aria-label="User Settings Actions"]'),
      (contextmenu) => {
        let copy_id = contextmenu.querySelector('div[role="group"] div[id^="user-context-devmode-copy-id-"]').getAttribute("id").split("-");
        pend.member.id = copy_id[5];
        document.body.click();
        wait_for_condition(
          () => document.querySelector('div#user-context[aria-label="User Settings Actions"]') == null,
          process_next_pend
        );
      });
  }
  process_next_pend();
  function wait_for_condition(condition, proceed) {
    let result = condition();
    if(result) {
      proceed(result);
    } else {
      requestAnimationFrame(() => wait_for_condition(condition, proceed));
    }
  }
})();

(() => {
  let members_div = document.querySelector('div[aria-label="Members"][role="list"]');
})();

(() => {
  let begin_t = performance.now();
  let member_export = [];
  let member_pending = [];
  let members_div = document.querySelector('div[aria-label="Members"][role="list"]');
  function record_member(item) {
    let member = {};
    member_export.push(member);
    let _0 = item.querySelector('div[role="img"]');
    if(_0 == null) {
      console.log("error at item:", item);
    }
    member.username = _0.getAttribute("aria-label").split(",")[0];
    let avatar_src = item.querySelector('svg[class^="mask"] foreignObject div img').getAttribute("src").split("/");
    if(avatar_src.length >= 5) {
      member.id = avatar_src[4];
    } else {
      member.id = null;
      let pend = {};
      member_pending.push(pend);
      pend.member = member;
      pend.member_item = item;
    }
  }
  let cursor = members_div.querySelector('div[role="listitem"]');
  process_cursor();
  function process_cursor() {
    while(true) {
      if(cursor.localName != "div") {
        cursor = cursor.nextElementSibling;
      }
      record_member(cursor);
      let next = cursor.nextElementSibling;
      if(next == null) {
        console.log("scolling to cursor", cursor);
        cursor.scrollIntoView();
        setTimeout(() => {
          next = cursor.nextElementSibling;
          if(next == null)
            end_of_members();
          else {
            cursor = next;
            process_cursor();
          }
        }, 50);
        // wait_condition_timeout(() => cursor.nextElementSibling, (next) => {
        //   cursor = next;
        //   process_cursor();
        // }, end_of_members, 2000);
        break;
      } else {
        cursor = next;
      }
    }
  }
  function end_of_members() {
    let total_t = performance.now() - begin_t;
    console.log(`in ${total_t/1000} seconds, found ${member_export.length} members, ${member_pending.length} pending`);
  }
  // wait_condition_timeout(() => null, () => console.log("proc"), () => console.log("fail(success)"), 2000)
  function wait_condition_timeout(condition, proceed, failure, timeout) {
    let start = performance.now();
    // console.log("wct start", start);
    window.requestAnimationFrame((t) => _wait_condition_timeout(
      condition, proceed, failure, start, timeout, t));
  }
  function _wait_condition_timeout(cond, proc, fail, start, timeout, t) {
    let elapsed = t - start;
    // console.log("wct elapsed", elapsed);
    let result = cond();
    if(elapsed >= timeout) {
      fail(result);
    } else if(result) {
      proc(result);
    } else {
      window.requestAnimationFrame((t) => _wait_condition_timeout(cond, proc, fail, start, timeout, t));
    }
  }
})();