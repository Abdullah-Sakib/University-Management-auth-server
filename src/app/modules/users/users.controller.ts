import { Request, Response } from 'express'
import usersService from './users.service'

const createuser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: 'Failed to create user.' })
  }
}

export default {
  createuser,
}
