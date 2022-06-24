import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const connectionDB = async () => {
  try {
    const URL_DB = process.env.URL_DB as string
    await mongoose.connect(URL_DB)
    console.log('Conectado a la DB')
  } catch (err) {
    console.log('Ha ocurrido un error al conectarse a la DB ', err)
  }
}
