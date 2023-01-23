import { prisma } from '../../lib/prisma'

interface ILikeRequest {
  tweet_id: string
  user_id: string
}

class LikeUseCase {
  async execute({ tweet_id, user_id }: ILikeRequest) {
    const tweetAlreadyLiked = await prisma.like.findFirst({
      where: {
        tweet_id,
        user_id
      }
    })

    if (!tweetAlreadyLiked) {
      const like = await prisma.like.create({
        data: {
          tweet_id,
          user_id,
          created_at: new Date()
        }
      })
    } else {
      const dislike = await prisma.like.delete({
        where: {
          id: tweetAlreadyLiked.id
        }
      })
    }
  }
}

export { LikeUseCase }
