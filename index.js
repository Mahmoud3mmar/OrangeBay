import express from 'express'
import dotenv from 'dotenv'
import  ConnectToDb  from './db/connection.js'
import  {bootstrap}  from './bootstrap.js'

dotenv.config()

const app = express()

const port = process.env.PORT



ConnectToDb()
bootstrap(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))