import { AnyAction, Reducer } from '@reduxjs/toolkit'
import { collect } from './collectorActions'

export const collectorReducer: Reducer<string[], AnyAction> = (state = [], action) => {
  if (action.type === collect.type) {
    return [...state, action.payload]
  }
  return state
}
