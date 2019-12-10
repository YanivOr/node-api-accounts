import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Accounts, { schema } from './model'

const router = new Router()
const { username, password, phone, email, roles, enabledActions, disabledActions } = schema.tree

/**
 * @api {post} /accounts Create accounts
 * @apiName CreateAccounts
 * @apiGroup Accounts
 * @apiParam username Accounts's username.
 * @apiParam password Accounts's password.
 * @apiParam phone Accounts's phone.
 * @apiParam email Accounts's email.
 * @apiParam roles Accounts's roles.
 * @apiParam enabledActions Accounts's enabledActions.
 * @apiParam disabledActions Accounts's disabledActions.
 * @apiSuccess {Object} accounts Accounts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Accounts not found.
 */
router.post('/',
  body({ username, password, phone, email, roles, enabledActions, disabledActions }),
  create)

/**
 * @api {get} /accounts Retrieve accounts
 * @apiName RetrieveAccounts
 * @apiGroup Accounts
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of accounts.
 * @apiSuccess {Object[]} rows List of accounts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /accounts/:id Retrieve accounts
 * @apiName RetrieveAccounts
 * @apiGroup Accounts
 * @apiSuccess {Object} accounts Accounts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Accounts not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /accounts/:id Update accounts
 * @apiName UpdateAccounts
 * @apiGroup Accounts
 * @apiParam username Accounts's username.
 * @apiParam password Accounts's password.
 * @apiParam phone Accounts's phone.
 * @apiParam email Accounts's email.
 * @apiParam roles Accounts's roles.
 * @apiParam enabledActions Accounts's enabledActions.
 * @apiParam disabledActions Accounts's disabledActions.
 * @apiSuccess {Object} accounts Accounts's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Accounts not found.
 */
router.put('/:id',
  body({ username, password, phone, email, roles, enabledActions, disabledActions }),
  update)

/**
 * @api {delete} /accounts/:id Delete accounts
 * @apiName DeleteAccounts
 * @apiGroup Accounts
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Accounts not found.
 */
router.delete('/:id',
  destroy)

export default router
