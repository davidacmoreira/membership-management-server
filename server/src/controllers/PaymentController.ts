// eslint-disable-next-line
import { Request, Response } from 'express'

import knex from '@database/connection'

interface Payment {
  id: number
  date: Date
  // eslint-disable-next-line
  member_id: number
  // eslint-disable-next-line
  fee_id: number
  // eslint-disable-next-line
  user_id: number
}

class PaymentController {
  async index (request: Request, response: Response) {
    const { date, member_id } = request.query

    const payments: Payment[] = await knex('payments')
      .select('*')
      .modify((queryBuilder) => {
        if (date) {
          queryBuilder.where('date', '=', date.toLocaleString())
        }

        if (member_id) {
          queryBuilder.where('member_id', '=', member_id)
        }

        return queryBuilder
      })

    if (payments.length) {
      const resultPayments = payments.map(payment => {
        return {
          id: payment.id,
          date: payment.date.toLocaleDateString(),
          member_id: payment.member_id,
          fee_id: payment.fee_id,
          user_id: payment.user_id
        }
      })

      return response.status(200).json(resultPayments)
    } else {
      return response.status(204).json({ })
    }
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const payment: Payment = await knex('payments')
      .where('id', id)
      .select('*')
      .first()

    if (payment) {
      const resultPayment = {
        id: payment.id,
        date: payment.date.toLocaleDateString(),
        member_id: payment.member_id,
        fee_id: payment.fee_id,
        user_id: payment.user_id
      }

      return response.status(200).json(resultPayment)
    } else {
      return response.status(404).json()
    }
  }

  async create (request: Request, response: Response) {
    const {
      date, member_id, fee_id
    } = request.body

    const payment: Payment = await knex('payments')
      .where('member_id', '=', member_id)
      .where('fee_id', '=', fee_id)
      .select('*')
      .first()

    if (payment) {
      return response.status(400).json({ message: 'payment already exists' })
    } else {
      const [id] = await knex('payments')
        .insert({
          date,
          member_id,
          fee_id,
          user_id: 1
        })
        .returning('id')

      return response.status(201).json({ id })
    }
  }

  async update (request: Request, response: Response) {
    const { id } = request.params
    const { date, fee_id } = request.body

    const payment: Payment = await knex('payments')
      .where('id', id)
      .select('*')
      .first()

    if (payment) {
      const data: Payment = {
        id: Number(id),
        date: date || payment.date,
        member_id: payment.member_id,
        fee_id: Number(fee_id) || payment.fee_id,
        user_id: 2
      }

      await knex('payments')
        .update(data)
        .where('id', data.id)

      return response.json({ id })
    } else {
      return response.status(404).json({ message: 'payment not found' })
    }
  }
}

export default PaymentController
