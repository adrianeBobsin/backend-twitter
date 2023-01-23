import { Request, Response } from 'express'
import { DeleteTweetUseCase } from './DeleteTweetUseCase'

class DeleteTweetController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteTweetUseCase = new DeleteTweetUseCase()

    const tweet = await deleteTweetUseCase.execute(id.toString())

    return response.json(tweet)
  }
}

export { DeleteTweetController }
