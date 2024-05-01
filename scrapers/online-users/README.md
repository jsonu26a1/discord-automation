# Scrape Online Users

Scrapes all online users in the current server. This is still a WIP, but `extract.v3.js` is
functional. I plan to add a few more features, like optionally including everything in the
`userPopup` pane (About Me, Mutuals, Member Since, Roles, Note). Also a scraper for text
channels, specifically the system messages channel, to log all past join messages.

At the moment, records contain only username, nickname, and user-id, using the user-id as a
unique key. The interface needs some work to, I plan on having it scroll to top when starting,
and to detect when it has scrolled to the bottom. Keep an eye on the console, it may pause
itself it there's too much lag or if API requests hit the rate limit.
