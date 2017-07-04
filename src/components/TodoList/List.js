import { ul } from '@cycle/dom'
import TodoItem from '../TodoItem/index'

export function List (sources) {
  const tasks = sources
    .onion
    .toCollection(TodoItem)
    .uniqueBy(s => s.key)
    .isolateEach(key => key)
    .build(sources)

  const vdom$ = tasks
    .pickCombine('DOM')
    .map(vnodes => ul('.todo-list', vnodes));

  const reducer$ = tasks
    .pickMerge('onion');

  return {
    DOM: vdom$,
    onion: reducer$,
  };
}