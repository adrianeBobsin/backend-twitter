import { Request, Response } from 'express'
import { GetUserIdFromToken } from '../../provider/GetUserIdFromToken'
import { CreateTweetUseCase } from './CreateTweetUseCase'

class CreateTweetController {
  async handle(request: Request, response: Response) {
    const { content } = request.body

    const getUserIdFromToken = new GetUserIdFromToken()
    const userId = await getUserIdFromToken.execute(request.headers.authorization)

    const createTweetUseCase = new CreateTweetUseCase()

    const tweet = await createTweetUseCase.execute({
      content,
      userId
    })

    return response.json(tweet)
  }
}

export { CreateTweetController }
