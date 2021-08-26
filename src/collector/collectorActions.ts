import { createAction, nanoid } from '@reduxjs/toolkit'

export const collect = createAction('collector/collect', (type: string) => {
  return {
    payload: type,
    meta: {
      op: 'event',
      id: nanoid()
    }
  }
})
