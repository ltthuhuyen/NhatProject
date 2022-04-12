import { use } from 'express/lib/router';
import productService from '../services/productService'


let  handleCreateNewProduct = async (req, res) =>{
    let message = await productService.createNewProduct(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleGetAllProducts = async(req, res) => {
    let id = req.query.id; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            products: []  
        })
    }

    let products = await productService.getAllProducts(id);
    // console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleEditProduct = async (req, res) =>{
    let data = req.body;
    let message = await productService.updateProduct(data);
    return res.status(200).json(message);
}

let handleDeleteProduct  = async (req, res) =>{
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Không tìm thấy sản phẩm'
        });
    }
    let message = await productService.deleteProduct(req.body.id);
    return res.status(200).json(message);
  
}

module.exports ={
    handleCreateNewProduct: handleCreateNewProduct,
    handleGetAllProducts: handleGetAllProducts,
    handleEditProduct: handleEditProduct,
    handleDeleteProduct: handleDeleteProduct
}