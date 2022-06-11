import mongoose from 'mongoose'

export const connectionDB = async (): Promise<void> => {
  try {
    const URL_DB = process.env.URL_DB as string
    await mongoose.connect(URL_DB)
    return console.log('Conectado a la DB')
  } catch (err) {
    return console.log('Ha ocurrido un error al conectarse a la DB ', err)
  }
}
