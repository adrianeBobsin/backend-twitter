import { prisma } from '../../lib/prisma'

class FeedUseCase {
  async execute() {
    const feed = await prisma.$queryRaw`
      SELECT T.*,
      (
        SELECT cast(count(L.id) as float)
        FROM likes L
        WHERE L.tweet_id = T.id
      ) as likes
      FROM tweets T
    `

    return feed
  }
}

export { FeedUseCase }
