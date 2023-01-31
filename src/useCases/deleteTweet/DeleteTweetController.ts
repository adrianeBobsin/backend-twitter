import { Request, Response } from 'express'
import { GetUserIdFromToken } from '../../provider/GetUserIdFromToken'
import { DeleteTweetUseCase } from './DeleteTweetUseCase'

class DeleteTweetController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteTweetUseCase = new DeleteTweetUseCase()

    const getUserIdFromToken = new GetUserIdFromToken()
    const user_id = await getUserIdFromToken.execute(request.headers.authorization)

    const tweet = await deleteTweetUseCase.execute(id.toString(), user_id)

    return response.json(tweet)
  }
}

export { DeleteTweetController }
