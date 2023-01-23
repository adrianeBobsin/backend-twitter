import { Request, Response } from 'express'
import { FeedUseCase } from './FeedUserCase'

class FeedController {
  async handle(request: Request, response: Response) {
    const feedUseCase = new FeedUseCase()

    const feed = await feedUseCase.execute()

    return response.json(feed)
  }
}

export { FeedController }
