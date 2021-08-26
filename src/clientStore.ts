import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from '@reduxjs/toolkit'
import { collectorReducer } from './collector/collectorReducer'
import { createClientTransportMiddleware } from './transport/clientTransportMiddleware'

export function createClientStore(worker: Worker): Store<unknown, AnyAction> {
  const clientStore = createStore(
    combineReducers({
      actions: collectorReducer
    }),
    {
      actions: []
    },
    applyMiddleware(createClientTransportMiddleware(worker))
  )

  return clientStore
}
