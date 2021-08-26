import { Middleware } from '@reduxjs/toolkit'

export function createClientTransportMiddleware(worker: Worker): Middleware {
  return ({ dispatch }) => {
    worker.addEventListener('message', ({ data }) => {
      if (data.type === 'event') {
        dispatch(data)
      }
    })

    return (next) => (action) => {
      next(action)

      if (action.meta?.op !== 'event') {
        worker.postMessage(action)
      }
    }
  }
}
