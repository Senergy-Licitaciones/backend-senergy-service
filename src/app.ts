import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routerAuth from './apiServices/auth/route'
import routerLicitacion from './apiServices/licitacion/route'
import routerProveedor from './apiServices/proveedor/route'
import routerUser from './apiServices/usuario/route'
import routerBrg from './apiServices/brg/route'
import routerPuntoSum from './apiServices/puntoSum/route'
import routerServicio from './apiServices/servicio/route'
import routerOferta from './apiServices/oferta/route'
import routerAdmin from './apiServices/admin/route'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// routes
app.use('/api/admin', routerAdmin)
app.use('/api/auth', routerAuth)
app.use('/api/licitacion', routerLicitacion)
app.use('/api/proveedor', routerProveedor)
app.use('/api/user', routerUser)
app.use('/api/brg', routerBrg)
app.use('/api/puntoSum', routerPuntoSum)
app.use('/api/servicio', routerServicio)
app.use('/api/oferta', routerOferta)

export default app
