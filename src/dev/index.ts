const worker = new Worker(new URL('./worker', import.meta.url), {
  name: 'app-worker'
})

worker.postMessage({
  question: 'Who is it?'
})

worker.addEventListener('message', ({ data }) => {
  console.log('[main]', data)
})
