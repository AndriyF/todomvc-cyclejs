import xs from 'xstream'
import isolate from '@cycle/isolate'
import model from './model'
import view from './view'
import intent from './intent'
import { List } from './List'

export const listLens = {
  get: (state) => {
    return state.list.filter(state.filterFn);
  },

  set: (state, nextFilteredList) => {
    const prevFilteredList = state.list.filter(state.filterFn)
    const newList = state.list
      .map(todo => nextFilteredList.find(t => t.key === todo.key) || todo)
      .filter(todo =>
        prevFilteredList.some(t => t.key === todo.key) &&
        nextFilteredList.some(t => t.key === todo.key)
      )

    return {
      ...state,
      list: newList,
    }
  }
}

export default function TodoList ({ DOM, history, storage, onion }) {
  const state$ = onion.state$
  const actions = intent({ DOM, history })
  const parentReducer$ = model(actions)

  const listSinks$ = isolate(List, { onion: listLens })({ DOM, history, storage, onion })
  const listVDom$ = listSinks$.DOM
  const listReducer$ = listSinks$.onion

  const vdom$ = view(state$, listVDom$)
  const reducer$ = xs.merge(parentReducer$, listReducer$)

  return {
    DOM: vdom$,
    onion: reducer$
  }
}