import Router from 'express'
import ProductManager from '../ProductM'
import dirname from 'path'
import app from '../app'

const app = app()

const router = Router()

const productsList = new ProductManager(`${dirname(__dirname)}/productos.json`)

router.get('/', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const objeto = {
        styled: "main.css",
        title: "PRODUCTS LIST",
        products
    }
    res.render('index', objeto)
    console.log('log views router linea 13', products)
})

router.get('/realTimeProducts', async (req, res) => {
    const limit = req.query.limit
    const products = await productsList.getProducts(limit)
    const data = {
        style: "styleProdRt.css",
        title: "PRODUCTS LIST",
        products
    }
    res.render('realTimeProducts', data)
})
export default router

/*router.get ('realtimeprod', (req, res) => {
    res.render('realtimeprod', {})
})*/