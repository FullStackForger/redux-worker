import { createClientStore } from './clientStore'

const worker = new Worker(new URL('./worker', import.meta.url), {
  name: 'app-worker'
})

const store = createClientStore(worker)

setTimeout(() => store.dispatch({ type: 'first-action' }))
setTimeout(() => store.dispatch({ type: 'second-action', payload: { foo: 'bar' } }))
setTimeout(() => store.dispatch({ type: 'first-action', payload: { fiz: 'baz' } }))
