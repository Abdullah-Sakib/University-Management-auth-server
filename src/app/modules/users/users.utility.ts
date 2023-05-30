import { User } from './users.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generageUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  return currentId
}