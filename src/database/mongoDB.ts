import mongoose from 'mongoose'

export const mongoosedb  = async(url: string) => {
    mongoose.set('strictQuery', false)
    await mongoose.connect( url )
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')
}