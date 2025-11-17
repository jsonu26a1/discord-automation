import * as esbuild from 'esbuild'
import * as config from './build-config.js'

import process from 'node:process'
import * as fs from 'node:fs';

const info_file = config.web_ext_path + "server-info.json"

let ctx = await esbuild.context(config.esbuild_options.dev)

await ctx.watch()

let serve_info = await ctx.serve({
  host: "127.0.0.1",
  port: 0,
  cors: { origin: "moz-extension://*" },
})
console.log("listening on port", serve_info.port)

function fs_cb(err) {
  if(err)
    console.error(err)
}
fs.writeFile(info_file, JSON.stringify(serve_info), {}, fs_cb)
process.on("SIGINT", code => {
  fs.rm(info_file, {}, fs_cb)
})
