import xs from 'xstream'

export default function model (actions) {
  const startEditReducer$ = actions
    .startEdit$
    .mapTo(function startEditReducer (prevState) {
      return {
        ...prevState,
        editing: true
      }
    })

  const cancelEditReducer$ = actions
    .cancelEdit$
    .mapTo(function cancelEditReducer (prevState) {
      return {
        ...prevState,
        editing: false
      }
    })

  const doneEditReducer$ = actions
    .doneEdit$
    .map(title => function doneEditReducer (prevState) {
      return {
        ...prevState,
        title,
        editing: false
      }
    })

  const toggleReducer$ = actions
    .toggle$
    .map(isToggled => function toggleReducer (prevState) {
      return {
        ...prevState,
        completed: isToggled
      }
    })

  const destroyReducer$ = actions
    .destroy$
    .mapTo(function destroyReducer (prevState) {
      return void 0
    })

  return xs.merge(
    startEditReducer$,
    doneEditReducer$,
    cancelEditReducer$,
    toggleReducer$,
    destroyReducer$
  )
}

