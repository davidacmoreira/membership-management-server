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
    const { name, description, state, fee } = request.query

    let query = 'SELECT DISTINCT members."id", members."name", members."address", members."phone", members."email", members."description", members."state", members."user_id" FROM members'

    let where = false

    if (fee) {
      const subQuery = `NOT exists (select payments."id" from payments where payments."fee_id" = (select fees."id" from fees where fees."date" = '${fee.toLocaleString()}') and payments."member_id" = members."id")`
      const link = (where) ? ' AND ' : ' WHERE '

      query = query + link + subQuery
      where = true
    }

    if (state) {
      const subQuery = `members.state = '${state}'`
      const link = (where) ? ' AND ' : ' WHERE '

      query = query + link + subQuery
      where = true
    }

    if (description) {
      const subQuery = `members.description like '%${description}%'`
      const link = (where) ? ' AND ' : ' WHERE '

      query = query + link + subQuery
      where = true
    }

    if (name) {
      const subQuery = `members.name like '%${name}%'`
      const link = (where) ? ' AND ' : ' WHERE '

      query = query + link + subQuery
      where = true
    }

    const rawQuery = await knex.raw(query)

    let members: Member[]
    let sizeMembers: Number

    try {
      members = rawQuery.rows
      sizeMembers = members.length
    } catch (e) {
      members = rawQuery
      sizeMembers = members.length
    }

    if (sizeMembers) {
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
