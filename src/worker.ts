import { createWorkerStore } from './workerStore'

const ctx: Worker = self as unknown as Worker

createWorkerStore(ctx)
