import { Router } from 'express'
import { Authentication } from './middlewares/authentication'
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController'
import { CreateTweetController } from './useCases/createTweet/CreateTweetController'
import { CreateUserController } from './useCases/createUser/CreateUserController'
import { FeedController } from './useCases/feed/FeedController'
import { LikeController } from './useCases/likes/likeController'
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController'

const router = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const createTweetController = new CreateTweetController()
const refreshTokenUserController = new RefreshTokenUserController()
const likeController = new LikeController()
const feedController = new FeedController()

router.post('/user', createUserController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/refresh-token', refreshTokenUserController.handle)

/** Rotas autenticadas */
router.post('/tweet', Authentication, createTweetController.handle)
router.patch('/tweet/:id/like', Authentication, likeController.handle)
router.get('/feed', Authentication, feedController.handle)

export { router }
