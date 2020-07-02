// eslint-disable-next-line
import { Request, Response } from 'express'

import knex from '@database/connection'

interface Fee {
  id: number
  date: Date
  value: number
  // eslint-disable-next-line
  user_id: number
}

class FeeController {
  async index (request: Request, response: Response) {
    const { date } = request.query

    const fees: Fee[] = await knex('fees')
      .select('*')
      .modify((queryBuilder) => {
        if (date) {
          queryBuilder.where('date', '=', date.toLocaleString())
        }

        return queryBuilder
      })

    if (fees.length) {
      const resultFees = fees.map(fee => {
        return {
          id: fee.id,
          date: fee.date.toLocaleDateString(),
          value: fee.value,
          user_id: fee.user_id
        }
      })

      return response.status(200).json(resultFees)
    } else {
      return response.status(204).json({ })
    }
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const fee: Fee = await knex('fees')
      .where('id', id)
      .select('*')
      .first()

    if (fee) {
      const resultFee = {
        id: fee.id,
        date: fee.date.toLocaleDateString(),
        value: fee.value,
        user_id: fee.user_id
      }

      return response.status(200).json(resultFee)
    } else {
      return response.status(404).json()
    }
  }

  async create (request: Request, response: Response) {
    const {
      date, value
    } = request.body

    const fee: Fee = await knex('fees')
      .where('date', '=', date.toLocaleString())
      .select('*')
      .first()

    if (fee) {
      return response.status(400).json({ message: 'fee already exists' })
    } else {
      const [id] = await knex('fees')
        .insert({
          date,
          value,
          user_id: 1
        })
        .returning('id')

      return response.status(201).json({ id })
    }
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { date, value } = request.body

    const fee: Fee = await knex('fees')
      .where('id', id)
      .select('*')
      .first()

    if (fee) {
      const data: Fee = {
        id: Number(id),
        date: date || fee.date,
        value: Number(value) || fee.value,
        user_id: 2
      }

      await knex('fees')
        .update(data)
        .where('id', data.id)

      return response.json({ id })
    } else {
      return response.status(404).json({ message: 'fee not found' })
    }
  }
}

export default FeeController
