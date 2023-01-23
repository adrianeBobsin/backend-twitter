import { sign } from 'jsonwebtoken'

class GenerateToken {
  async execute(userId: string) {
    const token = await sign({}, '443865c0-2019-4f68-9fbe-b588f65ee8fb', {
      subject: userId,
      expiresIn: '20m'
    })

    return token
  }
}

export { GenerateToken }
