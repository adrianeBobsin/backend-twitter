import { Request, Response } from 'express'
import { GetUserIdFromToken } from '../../provider/GetUserIdFromToken'
import { LikeUseCase } from './LikeUseCase'

class LikeController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const getUserIdFromToken = new GetUserIdFromToken()
    const user_id = await getUserIdFromToken.execute(request.headers.authorization)

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
