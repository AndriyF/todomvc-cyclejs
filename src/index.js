import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import storageDriver from '@cycle/storage'
import { captureClicks, makeHistoryDriver } from '@cycle/history'
import onionify from 'cycle-onionify'
import storageify from 'cycle-storageify'

import TodoList from './components/TodoList/index'

const main = onionify(storageify(TodoList, { key: 'todoItems' }))

const drivers = {
  DOM: makeDOMDriver('.todoapp'),
  history: captureClicks(makeHistoryDriver()),
  storage: storageDriver
}

run(main, drivers)
