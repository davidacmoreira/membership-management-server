// eslint-disable-next-line
import { Request, Response } from 'express'
import knex from '@database/connection'

class MemberController {
  async index (request: Request, response: Response) {
    const members = await knex('members')
      .join('states', 'members.state_id', '=', 'states.id')
      .select([
        'members.id',
        'members.name',
        'members.address',
        'members.phone',
        'members.email',
        'members.description',
        'states.state'
      ])

    if (members.length) {
      return response.json(members)
    } else {
      return response.status(204).json()
    }
  }
}

export default MemberController
