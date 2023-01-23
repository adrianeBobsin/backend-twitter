import { prisma } from '../../lib/prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateToken } from '../../provider/GenerateToken'

interface IRequest {
  nick: string
  password: string
}

class AuthenticateUserUseCase {
  async execute({ nick, password }: IRequest) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        nick
      }
    })

    if (!userAlreadyExists) {
      throw new Error('Nick or password incorret!')
    }

    const passwordMatch = await compare(password, userAlreadyExists.password)

    if (!passwordMatch) {
      throw new Error('Nick or password incorret!')
    }

    const generateToken = new GenerateToken()
    const token = await generateToken.execute(userAlreadyExists.id)

    await prisma.refreshToken.deleteMany({
      where: {
        user_id: userAlreadyExists.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)

    return { token, refreshToken }
  }
}

export { AuthenticateUserUseCase }
