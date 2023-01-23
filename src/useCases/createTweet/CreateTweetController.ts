import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { CreateTweetUseCase } from './CreateTweetUseCase'

class CreateTweetController {
  async handle(request: Request, response: Response) {
    const { content } = request.body

    const authToken = request.headers.authorization
    const [, token] = authToken.split(' ')
    const tokenDecoded = await verify(token, '443865c0-2019-4f68-9fbe-b588f65ee8fb')
    const userId = tokenDecoded.sub.toString()

    const createTweetUseCase = new CreateTweetUseCase()

    const tweet = await createTweetUseCase.execute({
      content,
      userId
    })

    return response.json(tweet)
  }
}

export { CreateTweetController }
