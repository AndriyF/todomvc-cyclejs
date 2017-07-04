import { button, div, input, label, li } from '@cycle/dom'

function renderView ({ title, completed }) {
  return div('.view', [
    input('.toggle', {
      props: { type: 'checkbox', checked: completed },
    }),
    label(title),
    button('.destroy')
  ])
}

function renderEdit ({ title, editing }) {
  return input('.edit', {
    props: { type: 'text' },
    hook: {
      update: (oldVNode, { elm }) => {
        elm.value = title

        if (editing) {
          elm.focus()
          elm.selectionStart = elm.value.length
        }
      }
    }
  })
}
export default function view (state$) {
  return state$.map(({ title, completed, editing }) =>
    li('.todoRoot', { class: { completed, editing } }, [
      renderView({ title, completed }),
      renderEdit({ title, editing })
    ])
  );
}