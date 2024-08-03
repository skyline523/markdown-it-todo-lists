# markdown-it-todo-lists

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A markdown-it plugin to create todo lists.

- [ ] item 1
- [x] item 2
- [X] item 3

```markdown
- [ ] item 1
- [x] item 2
- [X] item 3
```

## Usage

```bash
npm i markdown-it-todo-lists
```

```js
import MarkdownIt from 'markdown-it'
import MarkdownItTodoLists from 'markdown-it-todo-lists'

const md = MarkdownIt()

md.use(MarkdownItTodoLists, /* Options */)

const html = md.render(/* ... */)
```

For the options available, please refer to [the jsdoc](./src/index.ts).

## Functionality

```markdown
- [ ] item 1
- [x] item 2
```

Use `enabled = true` in options:

```js
md.use(MarkdownItTodoLists, {
  enabled: true
})
```

to HTML:

```html
<ul class="todo-list-container">
  <li class="todo-list-item">
    <input class="todo-list-item-checkbox" type="checkbox" />item 1
  </li>
  <li class="todo-list-item">
    <input class="todo-list-item-checkbox" type="checkbox" checked />item 2
  </li>
</ul>
```

Use `useLabel = true` in options:

```js
md.use(MarkdownItTodoLists, {
  useLabel: true
})
```

to HTML:

```html
<ul class="todo-list-container">
  <li class="todo-list-item">
    <label>
      <input class="todo-list-item-checkbox" type="checkbox" disabled />item 1
    </label>
  </li>
  <li class="todo-list-item">
    <label>
      <input class="todo-list-item-checkbox" type="checkbox" checked disabled />item 2
    </label>
  </li>
</ul>
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Leet](https://github.com/skyline523)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/markdown-it-todo-lists?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/markdown-it-todo-lists
[npm-downloads-src]: https://img.shields.io/npm/dm/markdown-it-todo-lists?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/markdown-it-todo-lists
[bundle-src]: https://img.shields.io/bundlephobia/minzip/markdown-it-todo-lists?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=markdown-it-todo-lists
[license-src]: https://img.shields.io/github/license/skyline523/markdown-it-todo-lists.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/skyline523/markdown-it-todo-lists/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/markdown-it-todo-lists
