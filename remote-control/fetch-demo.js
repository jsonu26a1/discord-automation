/*
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' 'nonce-MTQ1LDk5LDE0Nyw1MywxMzIsMjA5LDE0NSwyNQ==' blob: https://cdn.discordapp.com/animations/ https://www.gstatic.com/recaptcha/ https://www.google.com/recaptcha/ https://recaptcha.net/recaptcha/ https://*.hcaptcha.com https://hcaptcha.com https://js.stripe.com https://js.braintreegateway.com https://assets.braintreegateway.com https://www.paypalobjects.com https://checkout.paypal.com https://c.paypal.com https://kit.cash.app; style-src 'self' 'unsafe-inline' https://cdn.discordapp.com https://*.hcaptcha.com https://hcaptcha.com https://kit.cash.app; img-src 'self' blob: data: https://*.discordapp.net https://*.discordapp.com https://*.discord.com https://i.scdn.co https://i.ytimg.com https://i.imgur.com https://media.tenor.co https://media.tenor.com https://c.tenor.com https://*.youtube.com https://*.giphy.com https://static-cdn.jtvnw.net https://pbs.twimg.com https://assets.braintreegateway.com https://checkout.paypal.com https://c.paypal.com https://b.stats.paypal.com https://slc.stats.paypal.com https://hnd.stats.paypal.com https://api.cash.app; font-src 'self' https://fonts.gstatic.com https://cash-f.squarecdn.com; connect-src 'self' https://status.discordapp.com https://status.discord.com https://support.discordapp.com https://support.discord.com https://discordapp.com https://discord.com https://discord-attachments-uploads-prd.storage.googleapis.com https://cdn.discordapp.com https://media.discordapp.net https://images-ext-1.discordapp.net https://images-ext-2.discordapp.net https://router.discordapp.net wss://*.discord.gg https://best.discord.media https://latency.discord.media wss://*.discord.media wss://dealer.spotify.com https://api.spotify.com https://music.amazon.com/embed/oembed https://sentry.io https://api.twitch.tv https://api.stripe.com https://api.braintreegateway.com https://client-analytics.braintreegateway.com https://*.braintree-api.com https://www.googleapis.com https://*.algolianet.com https://*.hcaptcha.com https://hcaptcha.com https://*.algolia.net ws://127.0.0.1:* http://127.0.0.1:*; media-src 'self' blob: disclip: https://*.discordapp.net https://*.discord.com https://*.discordapp.com https://*.youtube.com https://streamable.com https://vid.me https://twitter.com https://oddshot.akamaized.net https://*.giphy.com https://i.imgur.com https://media.tenor.co https://media.tenor.com https://c.tenor.com; frame-src https://discordapp.com/domain-migration discord: https://www.google.com/recaptcha/ https://recaptcha.net/recaptcha/ https://*.hcaptcha.com https://hcaptcha.com https://js.stripe.com https://hooks.stripe.com https://checkout.paypal.com https://c.paypal.com https://assets.braintreegateway.com https://checkoutshopper-live.adyen.com https://kit.cash.app https://player.twitch.tv https://clips.twitch.tv/embed https://player.vimeo.com https://www.youtube.com/embed/ https://www.tiktok.com/embed/ https://music.amazon.com/embed/ https://music.amazon.co.uk/embed/ https://music.amazon.de/embed/ https://music.amazon.co.jp/embed/ https://music.amazon.es/embed/ https://music.amazon.fr/embed/ https://music.amazon.it/embed/ https://music.amazon.com.au/embed/ https://music.amazon.in/embed/ https://music.amazon.ca/embed/ https://music.amazon.com.mx/embed/ https://music.amazon.com.br/embed/ https://www.youtube.com/s/player/ https://twitter.com/i/videos/ https://www.funimation.com/player/ https://www.redditmedia.com/mediaembed/ https://open.spotify.com/embed/ https://w.soundcloud.com/player/ https://audius.co/embed/ https://*.watchanimeattheoffice.com https://sessionshare.sp-int.playstation.com/embed/ https://localhost:* https://*.discordsays.com https://discordappcom.cloudflareaccess.com/; child-src 'self' blob: https://assets.braintreegateway.com https://checkout.paypal.com https://c.paypal.com; prefetch-src 'self' https://cdn.discordapp.com/assets/;
cross-origin-opener-policy: same-origin-allow-popups
x-frame-options: DENY
x-xss-protection: 1; mode=block
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v4?s=ChpvNSTQovp0dQwYng326e7sqZ8vmw1DPtch8vX%2BlkaDKquhcBW31Gezp3rIVRMdUgz69RIl%2Bg5%2BcfJr%2FTmpw8UMcC%2B2JumqUZeCUk7hhJ8tcW5IMKyM7Y0TORyv"}],"group":"cf-nel","max_age":604800}
alt-svc: h3=":443"; ma=86400
*/

(() => {
  let m = document.createElement("meta");
  m.setAttribute("http-equiv", "Content-Security-Policy");
  m.setAttribute("content", "default-src *;");
  document.head.appendChild(m);
})();

(() => {
  let c = document.querySelector('div[class^="peopleList"][data-list-id="people"]');
  let m = document.createElement("iframe");
  m.setAttribute("src", "http://localhost:8000/file.html");
  c.appendChild(m);
})();

(() => {
  let m = document.createElement("script");
  m.textContent = "console.log('token',localStorage.getItem('token'));"
  document.head.appendChild(m);
})();


(async function() {
  let response;
  try {
    response = await fetch("http://localhost:8000/file.html")
  } catch(e) {
    console.log("error", e)
  }
  console.log("response", response);
})();
