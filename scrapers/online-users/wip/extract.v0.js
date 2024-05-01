// 2024-04-05
(() => {
  let members_div = document.querySelector('div[aria-label="Members"][role="list"]');
  let member_export = [];
  let member_item = members_div.querySelector('div[role="listitem"]');
  let member_username = member_item.querySelector('div[role="img"]').getAttribute("aria-label").split(",")[0];
  let member_avatar = member_item.querySelector('svg[class^="mask"] foreignObject div img');
  let avatar_src = member_avatar.getAttribute('src');
  let member_id = avatar_src.split("/")[4];

  let context_menu_div = document.querySelector('div#user-context[aria-label="User Settings Actions"]');
  let copy_id_div = context_menu_div.querySelector('div[role="group"] div[id^="user-context-devmode-copy-id-"]');
  document.querySelector('div#user-context[aria-label="User Settings Actions"] div[role="group"] div[id^="user-context-devmode-copy-id-"]').getAttribute("id");
  element.dispatchEvent(new PointerEvent("contextmenu", {
    pointerId: 1,
    bubbles: true,
    cancelable: true,
    pointerType: "mouse",
    isPrimary: true
  }))
})();

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
  let total_t = performance.now() - begin_t;
  console.log(`in ${total_t/1000} seconds, found ${member_export.length} members, ${member_pending.length} pending`);
  return {a: () => console.log(member_export)};
})();

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
  let first_member = members_div.querySelector('div[role="listitem"]');
  first_member.dispatchEvent(new PointerEvent("contextmenu", {
    pointerId: 1,
    bubbles: true,
    cancelable: true,
    pointerType: "mouse",
    isPrimary: true
  }));
  console.log("pre")
  setTimeout(() => {
    let member_id = document.querySelector('div#user-context[aria-label="User Settings Actions"] div[role="group"] div[id^="user-context-devmode-copy-id-"]').getAttribute("id");
    console.log("post", member_id);
  }, 0)
})();