import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function Authentication(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      message: 'Token is missing'
    })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, '443865c0-2019-4f68-9fbe-b588f65ee8fb')

    return next()
  } catch (err) {
    return response.status(401).json({
      message: 'Token invalid'
    })
  }
}
