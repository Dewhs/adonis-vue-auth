import db from '@adonisjs/lucid/services/db'
import { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class UsersController {
  index() {
    return db.query().from('users')
  }

  async create({ request }: HttpContext) {
    const body = request.body()
    body.created_at = DateTime.now()
    body.updated_at = DateTime.now()

    const user: User = body as User
    user.password = await hash.make(user.password)

    try {
      await db.table('users').insert(user)
      console.log('Created')
    } catch (e) {
      console.log(e)
    }
  }

  async login({ request }: HttpContext) {
    try {
      const body = request.body()
      const email = body.email as string
      const password = body.password as string

      const user = await User.verifyCredentials(email, password)

      if (user) {
        const token = await User.accessTokens.create(user)
        console.log('Logged in')
        return {
          type: 'bearer',
          token: token.value!.release(),
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async logout({ auth }: HttpContext) {
    try {
      const user = await auth.authenticate()

      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      console.log('Logged out')
    } catch (e) {
      console.log(e)
    }
  }
}
