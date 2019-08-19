import express from 'express'

require('dotenv').config()

const app = express()

app.get('/', async (_, res, __) => {
	res.json({
		message: 'Hello world'
	})
})

app.listen(process.env.PORT, () => console.info(`Application works on ${process.env.PORT}`))