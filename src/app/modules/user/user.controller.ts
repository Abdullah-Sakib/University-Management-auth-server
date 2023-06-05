import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createuser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createuser,
}
