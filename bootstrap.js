
import express from 'express'
import { AppError } from './src/utils/error.handler.js'
import AuthRouter from './src/modules/Auth/routes/auth.routes.js'
// import TaskRouter from './src/modules/Task/Routes/Task.Route.js'
// import Imagerouter from './src/modules/Image/Routes/Image.Route.js'

export const bootstrap = (app) => {
	app.use(express.json())

	app.use('/auth', AuthRouter)
	// app.use('/Task', TaskRouter)
	// app.use('/Upload', Imagerouter)

	app.all('*', (req, res) => {
		throw new AppError("This route doesn't exist", 404)
	})

	app.use((error, req, res, next) => {
		const { message, status, stack } = error
		res.status(status || 500).json({ message, stack })
	})
}