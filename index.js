import { compileString } from 'sass'
import fs from 'node:fs'

const result = compileString("@use '/b.scss'", {
  importers: [
    {
      canonicalize: (canonicalize) => {
        console.log('canonicalize', canonicalize)
        if (canonicalize.startsWith('/')) {
          const result = new URL(canonicalize.slice(1), import.meta.url)
          return result
        }
      },
      load: (load) => {
        return { contents: fs.readFileSync(load, 'utf8'), syntax: 'scss' }
      },
    }
  ],
  url: new URL('./a.scss', import.meta.url).href,
})
console.log(result.css)
