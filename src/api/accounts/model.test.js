import { Accounts } from '.'

let accounts

beforeEach(async () => {
  accounts = await Accounts.create({ username: 'test', password: 'test', phone: 'test', email: 'test', roles: [], enabledActions: [], disabledActions: [] })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = accounts.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(accounts.id)
    expect(view.username).toBe(accounts.username)
    expect(view.password).toBe(accounts.password)
    expect(view.phone).toBe(accounts.phone)
    expect(view.email).toBe(accounts.email)
    expect(view.roles).toBe(accounts.roles)
    expect(view.enabledActions).toBe(accounts.enabledActions)
    expect(view.disabledActions).toBe(accounts.disabledActions)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = accounts.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(accounts.id)
    expect(view.username).toBe(accounts.username)
    expect(view.password).toBe(accounts.password)
    expect(view.phone).toBe(accounts.phone)
    expect(view.email).toBe(accounts.email)
    expect(view.roles).toBe(accounts.roles)
    expect(view.enabledActions).toBe(accounts.enabledActions)
    expect(view.disabledActions).toBe(accounts.disabledActions)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
