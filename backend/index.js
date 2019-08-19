import express from 'express'

const app = express()

app.get('/', async (_, res, __) => {
	res.json({
		message: 'Hello world'
	})
})

app.listen(2450, () => console.log('Hello world by push notifications'))