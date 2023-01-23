import { prisma } from '../../lib/prisma'

interface ICreateTweet {
  content: string
  userId: string
}

class CreateTweetUseCase {
  async execute({ content, userId }: ICreateTweet) {
    const tweet = await prisma.tweet.create({
      data: {
        content,
        user_id: userId,
        created_at: new Date()
      }
    })

    return tweet
  }
}

export { CreateTweetUseCase }
