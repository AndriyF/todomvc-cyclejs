import dropRepeats from 'xstream/extra/dropRepeats'
import { ENTER_KEY_CODE, ESC_KEY_CODE } from '../../util/keyCodes'

export default function intent ({ DOM, history }) {
  const $input = DOM.select('.new-todo')
  const $toggle = DOM.select('.toggle-all')
  const $complete = DOM.select('.clear-completed')

  const inputKeyDownEvent$ = $input
    .events('keydown')

  return {
    changeRoute$: history
      .map(location => location.pathname)
      .compose(dropRepeats()),

    updateInputValue$: $input
      .events('input')
      .map(ev => ev.target.value),

    cancelInput$: inputKeyDownEvent$
      .filter(ev => ev.keyCode === ESC_KEY_CODE),

    insertTodo$: inputKeyDownEvent$
      .filter(ev => ev.keyCode === ENTER_KEY_CODE && ev.target.value.length)
      .map(ev => String(ev.target.value).trim()),

    toggleAll$: $toggle
      .events('click')
      .map(ev => ev.target.checked),

    deleteCompleted$: $complete
      .events('click')
      .mapTo(null)
  }
}