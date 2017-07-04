import xs from 'xstream'

const getFilterFn = route => {
  switch (route) {
    case '/active':
      return todo => todo.completed === false
    case '/completed':
      return todo => todo.completed === true
    default:
      return () => true
  }
}

let uuid = Date.now()

export default function model (actions) {
  const initialReducer$ = xs.of(function initialReducer (prevState) {
    if (prevState) {
      return prevState
    }

    return {
      inputValue: '',
      list: [],
      filter: '',
      filterFn: () => true
    }
  })

  const changeRouteReducer$ = actions
    .changeRoute$
    .startWith('/')
    .map(path => {
      return function changeRouteReducer (prevState) {
        return {
          ...prevState,
          filter: path.replace('/', '').trim(),
          filterFn: getFilterFn(path)
        }
      }
    })

  const updateInputValueReducer$ = actions
    .updateInputValue$
    .map(inputValue => function updateInputValue (prevState) {
      return {
        ...prevState,
        inputValue
      }
    })

  const clearInputReducer$ = xs.merge(actions.cancelInput$, actions.insertTodo$)
    .mapTo(function clearInputReducer (prevState) {
      return {
        ...prevState,
        inputValue: ''
      }
    })

  const insertTodoReducer$ = actions
    .insertTodo$
    .map(title => function insertTodoReducer (prevState) {
      const newTodo = {
        key: uuid++,
        title,
        completed: false,
        editing: false
      }

      return {
        ...prevState,
        list: prevState.list.concat(newTodo)
      }
    })

  const toggleAllReducer$ = actions
    .toggleAll$
    .map(isToggled => function toggleAllReducer (prevState) {
      return {
        ...prevState,
        list: prevState.list.map(todo => ({ ...todo, completed: isToggled }))
      }
    })

  const deleteCompletedReducer$ = actions
    .deleteCompleted$
    .mapTo(function deleteCompletedReducer (prevState) {
      return {
        ...prevState,
        list: prevState.list.filter(todo => todo.completed === false)
      }
    })

  return xs.merge(
    initialReducer$,
    updateInputValueReducer$,
    changeRouteReducer$,
    clearInputReducer$,
    insertTodoReducer$,
    toggleAllReducer$,
    deleteCompletedReducer$
  )
}