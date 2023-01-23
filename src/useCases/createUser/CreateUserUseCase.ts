import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'

interface IUserRequest {
  nick: string
  password: string
}

class CreateUserUseCase {
  async execute({ nick, password }: IUserRequest) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        nick
      }
    })

    if (userAlreadyExists) {
      throw new Error('User already exists!')
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        nick,
        password: passwordHash
      }
    })
  }
}

export { CreateUserUseCase }
