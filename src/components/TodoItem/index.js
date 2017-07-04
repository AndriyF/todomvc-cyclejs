import model from './model'
import view from './view'
import intent from './intent'

export default function TodoItem({ DOM, onion }) {
  const actions = intent(DOM)
  const reducer$ = model(actions)
  const vdom$ = view(onion.state$)

  return {
    DOM: vdom$,
    onion: reducer$
  }
}