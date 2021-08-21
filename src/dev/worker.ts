const ctx: Worker = self as unknown as Worker

ctx.addEventListener('message', (e) => {
  console.log('[Worker] received', e.data)
  ctx.postMessage({ fiz: 'baz' })
})
