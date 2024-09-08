import { Router } from 'express';
// import { ProductsManager } from '../dao/ProductsManager.js';
import { ProductsManagerMongoDao as ProductsManager } from '../dao/ProductsManagerMongoDao.js';
export const router=Router()

router.get('/', async(req,res)=>{


    let products = await ProductsManager.get()
    

    res.setHeader('Content-Type','text/html')
    res.status(200).render("home", {products})
})


router.get('/realtimeproducts', async(req,res)=>{


    let realTimeProducts = await ProductsManager.get()
    

    res.setHeader('Content-Type','text/html')
    res.status(200).render("realtimeproducts", {realTimeProducts})
})

