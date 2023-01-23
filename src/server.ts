import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { router } from './routes'
import swaggerUi from 'swagger-ui-express'

import swaggerDocs from './swagger.json'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())
app.use(router)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: 'Error',
    message: error.message
  })
})

app.listen(3000, () => console.log('Server is running on port 3000'))
