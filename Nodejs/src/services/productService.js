import db from "../models/index";

let createNewProduct = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
                await db.Product.create({
                    product_name: data.product_name,
                    image: data.image,
                    description: data.description,
                })
                resolve({
                    errCode: 0,
                    errMessange:'OK'
                })
        } catch (error) {
            reject(error)
        }

    })

}

let getAllProducts = (productId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let products = '';
            if(productId === 'ALL') {
                products = await db.Product.findAll({
                   
                })
            }
            if(productId && productId !== 'ALL') {
                products = await db.Product.findOne({
                    where: { id: productId},
                   
                })
            }
            resolve(products)
        }catch(e) {
            reject(e)
        }
    })
}

let updateProduct = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu các thông số bắt buộc'
                })
            }
            else{
                let product = await db.Product.findOne({
                    where: {id: data.id},
                    raw: false
    
                })               
                if (product) {
                    product.product_name = data.product_name,
                    product.image = data.image,
                    product.description = data.description
                
                    await product.save();
                    resolve({
                        errCode: 0,
                        errMessange: 'Sản phẩm đã được cập nhật thành công '
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessange: 'Không tìm thấy sản phẩm'
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteProduct = (id) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundProduct = await db.Product.findOne({
            where: {id: id}
        })
        // console.log(foundProduct);
            if(!foundProduct)
            {
                resolve({
                    errCode: 2,
                        errMessage: "không có người dùng này"
                })
            }
             
            await db.Product.destroy({
                where: {id: id}
            });
            resolve({
                errCode: 0,
                    errMessage: "thành công"
            })
    })
}

module.exports ={
    createNewProduct: createNewProduct,
    getAllProducts: getAllProducts, 
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}