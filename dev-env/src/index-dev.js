import './index.js'

browser.runtime.onMessage.addListener(msg => {
  console.log("[discord-automation] message received:", msg)
})

browser.runtime.sendMessage("ping").then(msg => {
  console.log("[discord-automation] reply message received:", msg)
})
