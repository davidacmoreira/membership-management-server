// eslint-disable-next-line
import { Request, Response } from 'express'

import knex from '@database/connection'

class MemberController {
  async index (request: Request, response: Response) {
    const { name, description } = request.query

    const members = await knex('members')
      .select([
        'members.id',
        'members.name',
        'members.address',
        'members.phone',
        'members.email',
        'members.description',
        'members.state'
      ])
      .modify((queryBuilder) => {
        if (name) {
          queryBuilder.where('name', 'like', '%' + String(name) + '%')
        }

        if (description) {
          queryBuilder.where('description', 'like', '%' + String(description) + '%')
        }

        return queryBuilder
      })

    if (members.length) {
      return response.json(members)
    } else {
      return response.status(204).json()
    }
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const member = await knex('members')
      .where('members.id', id)
      .select([
        'members.id',
        'members.name',
        'members.address',
        'members.phone',
        'members.email',
        'members.description',
        'members.state'
      ]).first()

    if (member) {
      return response.json(member)
    } else {
      return response.status(404).json()
    }
  }

  async create (request: Request, response: Response) {
    const {
      name, address, phone, email, description, state
    } = request.body

    const member = { name, address, phone, email, description, state, user_id: 2 }

    const [id] = await knex('members').insert(member).returning('id')

    return response.json({ id })
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { name, address, phone, email, description, state } = request.body

    const member = { name, address, phone, email, description, state, user_id: 2 }

    await knex('members')
      .update(member)
      .where('id', id)

    return response.json({ id })
  }
}

export default MemberController
