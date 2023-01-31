import { response } from 'express'
import { prisma } from '../../lib/prisma'

class DeleteTweetUseCase {
  async execute(id: string, user_id: string) {
    const tweet = await prisma.tweet.findFirst({
      where: {
        id
      }
    })

    if (!tweet) {
      throw new Error('Tweet does not exist!')
    }

    if (tweet.user_id !== user_id) {
      throw new Error('Only the author can remove the tweet!')
    }

    await prisma.tweet.delete({
      where: {
        id
      }
    })
  }
}

export { DeleteTweetUseCase }
