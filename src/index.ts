import type { PluginWithOptions } from 'markdown-it'
import type { Token } from 'markdown-it/index.js'

export interface MarkdownItTodoListOptions {
  /**
   * Checkbox selectable
   */
  enabled?: boolean
  /**
   * Use `label` label nesting
   */
  useLabel?: boolean
}

const MarkdownItTodoLists: PluginWithOptions<MarkdownItTodoListOptions> = (md, options = {}) => {
  const {
    enabled = false,
    useLabel = false,
  } = options

  md.core.ruler.after('inline', 'todo-list', (state) => {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (isTodo(tokens, i)) {
        setTokenAttrs(tokens[i - 2], 'class', `todo-list-item${enabled ? ' enabled' : ''}`)

        const isUlOpen = tokens[i - 3].level === 0 && tokens[i - 3].type === 'bullet_list_open' && tokens[i - 3].tag === 'ul'
        if (isUlOpen)
          setTokenAttrs(tokens[i - 3], 'class', 'todo-list-container')

        tokens[i].type = 'todo_list_inline'
      }
    }
  })

  md.renderer.rules.todo_list_inline = function (tokens, idx) {
    const content = tokens[idx].content.slice(4)
    const disabled = !enabled ? 'disabled' : ''

    const inputWrapper = (content: string): string => `<label>${content}</label>`

    let htmlContent

    if (tokens[idx].content.startsWith('[x] ') || tokens[idx].content.startsWith('[X] ')) {
      htmlContent = `<input class="todo-list-item-checkbox" type="checkbox" checked ${disabled} />${content}`
    }
    else if (tokens[idx].content.startsWith('[ ] ')) {
      htmlContent = `<input class="todo-list-item-checkbox" type="checkbox" ${disabled} />${content}`
    }
    else {
      htmlContent = content
    }

    return useLabel ? inputWrapper(htmlContent) : htmlContent
  }
}

function isTodo(tokens: Token[], index: number): boolean {
  return tokens[index].type === 'inline'
    && tokens[index - 1].type === 'paragraph_open'
    && tokens[index - 2].type === 'list_item_open'
    && (tokens[index].content.startsWith('[ ] ') || tokens[index].content.startsWith('[x] ') || tokens[index].content.startsWith('[X] '))
}

function setTokenAttrs(token: Token, name: string, value: string): void {
  const index = token.attrIndex(name)

  if (index < 0) {
    token.attrPush([name, value])
  }
  else {
    if (token.attrs)
      token.attrs[index] = [name, value]
  }
}

export default MarkdownItTodoLists
