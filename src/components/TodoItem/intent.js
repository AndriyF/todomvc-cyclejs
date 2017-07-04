import xs from 'xstream'
import { ENTER_KEY_CODE, ESC_KEY_CODE } from '../../util/keyCodes'

export default function intent (DOM) {
  const $edit = DOM.select('.edit')
  const $label = DOM.select('label')
  const $toggle = DOM.select('.toggle')
  const $destroy = DOM.select('.destroy')

  const editEvent$ = $edit
    .events('keyup')

  const editEnterEvent$ = editEvent$
    .filter(ev => ev.keyCode === ENTER_KEY_CODE)

  const editEscEvent$ = editEvent$
    .filter(ev => ev.keyCode === ESC_KEY_CODE)

  const editBlurEvent$ = $edit
    .events('blur', true)

  return {
    startEdit$: $label
      .events('dblclick')
      .mapTo(null),

    doneEdit$: xs.merge(editEnterEvent$, editBlurEvent$)
      .map(ev => ev.target.value),

    cancelEdit$: editEscEvent$
      .mapTo(null),

    toggle$: $toggle
      .events('change')
      .map(ev => ev.target.checked),

    destroy$: $destroy
      .events('click')
      .mapTo(null)
  }
}