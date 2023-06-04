import { NextFunction, Request, Response } from 'express'
import usersService from './users.service'

const createuser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createuser,
}
