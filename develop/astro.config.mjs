import { createRequire } from "module"
import path from "path"
import { fileURLToPath } from "url"

import image from "@astrojs/image"
import yaml from "@rollup/plugin-yaml"
import { defineConfig } from "astro/config"
import compress from "astro-compress"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const CONSTANTS = {
  aliasPrefix: {
    root: "~",
    src: "@",
    types: "#",
  },
}

/**
 * @docs https://astro.build/config
 */
export default defineConfig({
  site: "https://wd-flat.com/",
  integrations: [
    image(),
    compress({
      // minify指定
      path: ["./dist"],
      css: true,
      js: true,
      html: false,
      img: false,
      svg: true,
    }),
  ],
  vite: {
    build: {
      // MEMO: viteのminifyを常時falseにすることでcompressでの上書きを許容する
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: "[ext]/[name][extname]",
          entryFileNames: "js/paginize.min.js",
        },
      },
    },
    plugins: [yaml()],
    resolve: {
      alias: {
        [CONSTANTS.aliasPrefix.root]: path.resolve(__dirname, "./"),
        [CONSTANTS.aliasPrefix.src]: path.resolve(__dirname, "./src"),
        [CONSTANTS.aliasPrefix.types]: path.resolve(__dirname, "./src/types"),
      },
    },
    define: {
      require: createRequire(import.meta.url),
    },
  },
})
