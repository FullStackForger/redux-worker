import { Middleware } from '@reduxjs/toolkit'
import { collect } from './collectorActions'

export const collectorMiddleware: Middleware = ({ dispatch }) => {
  return (next) => (action) => {
    next(action)
    if (action.meta?.op !== 'event') {
      dispatch(collect(action.type))
    }
  }
}
