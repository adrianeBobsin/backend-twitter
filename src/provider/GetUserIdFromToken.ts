import { verify } from 'jsonwebtoken'

class GetUserIdFromToken {
  async execute(authToken: string) {
    const [, token] = authToken.split(' ')
    const tokenDecoded = await verify(token, '443865c0-2019-4f68-9fbe-b588f65ee8fb')
    return tokenDecoded.sub.toString()
  }
}

export { GetUserIdFromToken }
