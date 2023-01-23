import dayjs from 'dayjs'
import { prisma } from '../../lib/prisma'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateToken } from '../../provider/GenerateToken'

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if (!refreshToken) {
      throw new Error('Refresh token invalid!')
    }

    const refreshTokenExpired = await dayjs().isAfter(dayjs.unix(refreshToken.expires_in))

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          user_id: refreshToken.user_id
        }
      })

      const generateRefreshToken = new GenerateRefreshToken()
      const newRefreshToken = generateRefreshToken.execute(refreshToken.user_id)
    }

    const generateToken = new GenerateToken()
    const token = await generateToken.execute(refreshToken.user_id)

    return { token }
  }
}

export { RefreshTokenUserUseCase }
