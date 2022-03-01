import { resolve } from 'pathe'
import { execaSync } from 'execa'
import { expect, it } from 'vitest'

it('should fail', async() => {
  const root = resolve(__dirname, '../fixtures')

  let caught = false

  try {
    execaSync('npx', ['vitest'], {
      cwd: root,
      env: {
        ...process.env,
        CI: 'true',
        NO_COLOR: 'true',
      },
    })
  }
  catch (error) {
    expect(error).toBeTruthy()
    const msg = String(error)
      .split(/\n/g)
      .reverse()
      .find(i => i.includes('Error: '))
      ?.trim()
    expect(msg).toBe('Error: error')
    caught = true
  }

  expect(caught).toBe(false)
}, 80000)
