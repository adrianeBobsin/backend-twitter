import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { LikeUseCase } from './LikeUseCase'

class LikeController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const authToken = request.headers.authorization
    const [, token] = authToken.split(' ')
    const tokenDecoded = await verify(token, '443865c0-2019-4f68-9fbe-b588f65ee8fb')
    const user_id = tokenDecoded.sub.toString()

    const likeUseCase = new LikeUseCase()
    const tweet_id = id.toString()

    const like = await likeUseCase.execute({
      tweet_id,
      user_id
    })

    return response.json(like)
  }
}

export { LikeController }
