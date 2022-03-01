import { resolve } from 'pathe'
import { execa } from 'execa'
import { expect, it } from 'vitest'

it('should fail', async() => {
  const root = resolve(__dirname, '../fixtures')
  let error: any

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 60000)
  })

  const p = execa('npx', ['vitest'], {
    cwd: root,
    env: {
      ...process.env,
      CI: 'true',
      NO_COLOR: 'true',
    },
  })

  p.stdout?.pipe(process.stdout)

  await p.catch((e) => {
    error = e
  })

  expect(error).toBeTruthy()
  const msg = String(error)
    .split(/\n/g)
    .reverse()
    .find(i => i.includes('Error: '))
    ?.trim()
  expect(msg).toBe('Error: error')
}, 80000)
