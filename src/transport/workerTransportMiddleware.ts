import { Middleware } from '@reduxjs/toolkit'

export function createWorkerTransportMiddleware(workerCtx: Worker): Middleware {
  return () => (next) => (action) => {
    next(action)
    if (action.meta?.op === 'event') {
      console.log('[Worker] posting', action)
      workerCtx.postMessage(action)
    }
  }
}
