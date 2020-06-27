// eslint-disable-next-line
import { Request, Response } from 'express'
// eslint-disable-next-line
import Knex, { QueryBuilder, QueryInterface } from 'knex'

import knex from '@database/connection'

interface Result {
  id: number;
  name: string;
  address: string;
  phone: number;
  email: string;
  description: string;
  state: string;
}

class MemberController {
  async index (request: Request, response: Response) {
    const { name, description } = request.query

    const selectColumns = [
      'members.id',
      'members.name',
      'members.address',
      'members.phone',
      'members.email',
      'members.description',
      'states.state'
    ]

    let members: Result[]

    if (name && description) {
      members = await knex('members')
        .join('states', 'members.state_id', '=', 'states.id')
        .where('name', 'like', '%' + String(name) + '%')
        .where('description', 'like', '%' + String(description) + '%')
        .select(selectColumns)
    } else {
      if (name) {
        members = await knex('members')
          .join('states', 'members.state_id', '=', 'states.id')
          .where('name', 'like', '%' + String(name) + '%')
          .select(selectColumns)
      } else if (description) {
        members = await knex('members')
          .join('states', 'members.state_id', '=', 'states.id')
          .where('description', 'like', '%' + String(description) + '%')
          .select(selectColumns)
      } else {
        members = await knex('members')
          .join('states', 'members.state_id', '=', 'states.id')
          .select(selectColumns)
      }
    }

    if (members.length) {
      return response.json(members)
    } else {
      return response.status(204).json()
    }
  }
}

export default MemberController
