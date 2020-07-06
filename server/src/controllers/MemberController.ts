// eslint-disable-next-line
import { Request, Response } from 'express'

import knex from '@database/connection'

interface Member {
  id: number
  name: string
  address: string
  phone: number
  email: string
  description: string
  state: string
  // eslint-disable-next-line
  user_id: number
}

class MemberController {
  async index (request: Request, response: Response) {
    const { name, description } = request.query

    const members: Member[] = await knex('members')
      .select('*')
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

    const member: Member = await knex('members')
      .where('id', id)
      .select('*').first()

    if (member) {
      return response.json(member)
    } else {
      return response.status(404).json()
    }
  }

  async create (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)

    const {
      name, address, phone, email, description, state
    } = request.body

    const member = { name, address, phone, email, description, state, user_id: userId }

    const [id] = await knex('members').insert(member).returning('id')

    return response.status(201).json({ id })
  }

  async update (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)
    const { id } = request.params
    const { name, address, phone, email, description, state } = request.body

    const member: Member = await knex('members')
      .where('id', id)
      .select('*')
      .first()

    if (member) {
      const data: Member = {
        id: Number(id),
        name: name || member.name,
        address: address || member.address,
        phone: Number(phone) || member.phone,
        email: email || member.email,
        description: description || member.description,
        state: state || member.state,
        user_id: userId
      }

      await knex('members')
        .update(data)
        .where('id', data.id)

      return response.json({ id })
    } else {
      return response.status(404).json()
    }
  }
}

export default MemberController
