import { combineReducers, createStore, applyMiddleware, Store, AnyAction } from '@reduxjs/toolkit'
import { collectorMiddleware } from './collector/collectorMiddleware'
import { collectorReducer } from './collector/collectorReducer'
import { createWorkerTransportMiddleware } from './transport/workerTransportMiddleware'

export function createWorkerStore(workerCtx: Worker): Store<unknown, AnyAction> {
  const workerStore = createStore(
    combineReducers({
      actions: collectorReducer
    }),
    {
      actions: []
    },
    applyMiddleware(createWorkerTransportMiddleware(workerCtx), collectorMiddleware)
  )

  workerCtx.addEventListener('message', ({ data }) => {
    console.log('[Worker] received', data)
    if (data.type !== 'event') {
      workerStore.dispatch(data)
    }
  })

  return workerStore
}
