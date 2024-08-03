import process from 'node:process'
import { describe, expect, it } from 'vitest'
import MarkdownIt from 'markdown-it'
import MarkdownItTodoLists from '../src'

describe('fixtures', () => {
  const files = import.meta.glob('./input/*.md', { as: 'raw', eager: true })
  const filter = process.env.FILTER
  Object.entries(files)
    .forEach(([path, content]) => {
      const run = !filter || path.includes(filter)
        ? it
        : it.skip

      run(`render ${path}`, async () => {
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          xhtmlOut: true,
        })

        md.use(MarkdownItTodoLists, {
          useLabel: true,
        })

        const rendered = md.render(content)

        expect(rendered)
          .toMatchFileSnapshot(path.replace('input', 'output').replace('.md', '.html'))
      })
    })
})
