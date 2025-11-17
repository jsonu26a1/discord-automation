export const web_ext_path = "./dev-web-ext/build/"

export const esbuild_options = {
  base: {
    entryPoints: ['src/index.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outfile: 'build/out.js',
  }
}

esbuild_options.dev = {
  ...esbuild_options.base,
  entryPoints: ['src/index-dev.js'],
  outfile: web_ext_path +'out.js',
}
