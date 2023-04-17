import express from 'express';
import productsRouter from './Routes/product.router.js'
import cartRouter from './Routes/cart.router.js'
import __dirname from './util.js'
import handlebars from './Routes/views'
import viewsRouter from './Routes/views.router.js'
import { Server } from 'socket.io';
import http from 'http'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/views')
app.set('view engine', 'handlebars')


//con _dirname tenemos la ruta absoluta
//app.use(express.static(__dirname +'/public'))(aun no agrego html)

// http://localhost:8080/api/products
app.use('/api/products', productsRouter)

// http://localhost:8080/api/carts
app.use('/api/carts', cartRouter)

app.use("/api", routers)
app.use("/", viewsRouter)

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado', socket.id)

    socket.on('client:productDelete', async (pid, cid) => {
        const id = await productsList.getProductById(parseInt(pid.id))
        if(id) {
        await productsList.deleteById(parseInt( pid.id ))
        const data = await productsList.getProducts()
        console.log(data);
        return io.emit('newList', data)
        }
        console.log('log desde app ', cid);
        const dataError = {status: "error", message: "Product not found"}
        return io.emit('newList', dataError)
    })
    socket.on('client:newProduct', async data => {
        console.log(data)
        // const imagePath = data.file.path
        // const imageName = file.filename
        const productAdd = await productsList.addProduct(data)
        if(productAdd.status === 'error'){
            let errorMess = productAdd.message
            io.emit('server:producAdd', {status:'error', errorMess})
        }
        const newData = await productsList.getProducts()
        console.log('log de app linea 69', newData);
        return io.emit('server:productAdd', newData)
    })
})


httpServer.on('error', (error) => {
    console.log('Error', error)
})

const httpServer = http.createServer(app)

const io = new Server(httpServer)
httpServer.listen(PORT, ()=>{
    console.log(`Escuchando el puerto: ${PORT}`)
})











//______________________________________________________________________________________________
/*app.get ('/', (request, response)=> {
    response.send('Whats happend')

})*/

/*app.get('/products',  (req, res) => {

    const { limit } = req.query
    producto.getProducts().then(products => {
    if (!limit){
        res.send(products)
    } else{
        const limitProduts = products.slice(0, limit)
        res.send(limitProduts)
    }

    })
        .catch(err => res.status(500).send(err))

})*/

/*app.get('/products/:pid', (req, res) => {

    const id = parseInt(req.params.pid)
    producto.getProductById(id)
        .then(product =>{
            (res.send(product))
        })
        .catch(err => res.status(500).send(err))
})

app.listen(8080, () => {
    console.log('Estoy escuchando el puerto 8080...');
});*/