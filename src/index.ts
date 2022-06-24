import app from './app'
import { connectionDB } from './config/connectionDB'
import { config } from 'dotenv'
config()
const PORT = process.env.PORT as string

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(PORT, async () => {
  await connectionDB()
  console.log('Conectado en el puerto ', PORT)
})
