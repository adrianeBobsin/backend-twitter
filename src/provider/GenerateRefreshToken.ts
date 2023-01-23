import dayjs from 'dayjs'
import { prisma } from '../lib/prisma'

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 's').unix()

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        user_id: userId,
        expires_in: expiresIn
      }
    })

    return generateRefreshToken
  }
}

export { GenerateRefreshToken }
