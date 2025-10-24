import fs from 'node:fs'
import path from 'node:path'
import { expect, test } from 'vitest'
import { runVitest } from '../../test-utils'

test('import a generated file', async () => {
  // ensure removed first
  const root = path.resolve('fixtures/fs-cached-check')
  await fs.promises.rm(path.join(root, 'dist'), { recursive: true, force: true })

  const { stderr, exitCode } = await runVitest({ root }, undefined, undefined, {
    plugins: [
      {
        name: 'force-watcher',
        configResolved(config) {
          config.server.watch = {
            usePolling: true,
            interval: 100,
          }
        },
      },
    ],
  })
  expect(stderr).toBe('')
  expect(exitCode).toBe(0)
})
