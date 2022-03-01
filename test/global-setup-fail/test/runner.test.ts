import { resolve } from 'pathe'
import { execaSync } from 'execa'
import { expect, it } from 'vitest'

it('should fail', async() => {
  const root = resolve(__dirname, '../fixtures')

  expect(() => {
    execaSync('npx', ['vitest'], {
      cwd: root,
      env: {
        ...process.env,
        CI: 'true',
        NO_COLOR: 'true',
      },
    })
  }).toThrowError('Error: error')
}, 80000)
