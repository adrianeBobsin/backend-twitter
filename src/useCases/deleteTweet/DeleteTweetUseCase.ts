import { response } from 'express'
import { prisma } from '../../lib/prisma'

class DeleteTweetUseCase {
  async execute(id: string) {
    const tweet = await prisma.tweet.findFirst({
      where: {
        id
      }
    })

    if (!tweet) {
      throw new Error('Tweet does not exist!')
    }

    await prisma.tweet.delete({
      where: {
        id
      }
    })
  }
}

export { DeleteTweetUseCase }
