// eslint-disable-next-line
import { Request, Response } from 'express'

import knex from '@database/connection'

interface Member {
  id: number;
  name: string;
  address: string;
  phone: number;
  email: string;
  description: string;
  stateId: number;
  userId: number;
}

interface MemberResult {
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

    const members: MemberResult[] = await knex<Member>('members')
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

    const member: MemberResult = await knex<Member>('members')
      .join('states', 'members.state_id', '=', 'states.id')
      .where('members.id', id)
      .select([
        'members.id',
        'members.name',
        'members.address',
        'members.phone',
        'members.email',
        'members.description',
        'states.state'
      ]).first()

    if (member) {
      return response.json(member)
    } else {
      return response.status(404).json()
    }
  }
}

export default MemberController
