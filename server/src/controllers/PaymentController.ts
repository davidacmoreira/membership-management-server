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
    const date = request.query.date
    const memberId = Number(request.query.member_id)

    const payments: Payment[] = await knex('payments')
      .select('*')
      .modify((queryBuilder) => {
        if (date) {
          queryBuilder.where('date', '=', date.toLocaleString())
        }

        if (memberId) {
          queryBuilder.where('member_id', '=', Number(memberId))
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
    const id = Number(request.params.id)

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
    const userId = Number(request.headers.user_id)
    const date = request.body.date
    const memberId = Number(request.body.member_id)
    const feeId = Number(request.body.fee_id)

    const payment: Payment = await knex('payments')
      .where('member_id', '=', memberId)
      .where('fee_id', '=', feeId)
      .select('*')
      .first()

    if (payment) {
      return response.status(400).json({ message: 'payment already exists' })
    } else {
      const [id] = await knex('payments')
        .insert({
          date,
          member_id: memberId,
          fee_id: feeId,
          user_id: userId
        })
        .returning('id')

      return response.status(201).json({ id })
    }
  }

  async update (request: Request, response: Response) {
    const userId = Number(request.headers.user_id)
    const id = Number(request.params.id)
    const date = request.body.date
    const feeId = Number(request.body.fee_id)

    const payment: Payment = await knex('payments')
      .where('id', id)
      .select('*')
      .first()

    if (payment) {
      const data: Payment = {
        id: id,
        date: date || payment.date,
        member_id: payment.member_id,
        fee_id: feeId || payment.fee_id,
        user_id: userId
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
