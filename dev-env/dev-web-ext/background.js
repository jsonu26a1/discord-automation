
let registered_tabs = new Set()

// TODO add a setting to enable this; retry logic, etc.
watch_for_changes()

browser.pageAction.onClicked.addListener(async tab => {
  browser.tabs.create({
    index: tab.index + 1,
    url: "/settings/settings.html",
    active: true
  })
})

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("message received:", msg, "from: ", sender)
  if(msg == "ping")
    sendResponse("pong")
  if(msg.action == "register") {
    registered_tabs.add(sender.tab.id)
    inject_build_output(sender.tab.id)
  }
})

async function watch_for_changes() {
  let server_info = await (await fetch("/build/server-info.json")).json()
  // TODO listen and handle disconnect, errors, etc
  new EventSource(`http://localhost:${server_info.port}/esbuild`).addEventListener("change", e => {
    console.log("change detected")
    for(let tab_id of registered_tabs) {
      inject_build_output(tab_id).catch(err => {
        registered_tabs.delete(tab_id)
      })
    }
  })
}

async function inject_build_output(tab_id) {
  console.log("injecting build output into tab:", tab_id)
  return browser.scripting.executeScript({
    target: { tabId: tab_id },
    files: ["/build/out.js" + `?now=${Date.now()}`]
  })
}
