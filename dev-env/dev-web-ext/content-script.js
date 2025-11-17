console.log("[content-script] started")

browser.runtime.sendMessage({action: "register"})

browser.runtime.onMessage.addListener(msg => {
  console.log("[content-script] message received:", msg)
})

browser.runtime.sendMessage("ping").then(msg => {
  console.log("[content-script] reply message received:", msg)
})
