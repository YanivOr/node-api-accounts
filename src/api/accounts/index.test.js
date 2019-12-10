import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Accounts } from '.'

const app = () => express(apiRoot, routes)

let accounts

beforeEach(async () => {
  accounts = await Accounts.create({})
})

test('POST /accounts 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ username: 'test', password: 'test', phone: 'test', email: 'test', roles: [], enabledActions: [], disabledActions: [] })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.username).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.email).toEqual('test')
})

test('GET /accounts 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /accounts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${accounts.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(accounts.id)
})

test('GET /accounts/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /accounts/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${accounts.id}`)
    .send({ username: 'test', password: 'test', phone: 'test', email: 'test', roles: [], enabledActions: [], disabledActions: [] })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(accounts.id)
  expect(body.username).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.roles).toEqual([])
  expect(body.enabledActions).toEqual([])
  expect(body.disabledActions).toEqual([])
})

test('PUT /accounts/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ username: 'test', password: 'test', phone: 'test', email: 'test', roles: [], enabledActions: [], disabledActions: [] })
  expect(status).toBe(404)
})

test('DELETE /accounts/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${accounts.id}`)
  expect(status).toBe(204)
})

test('DELETE /accounts/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
