import express from "express"
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser)

   
    router.post('/api/create-new-product',productController.handleCreateNewProduct);
    router.get('/api/get-all-products', productController.handleGetAllProducts);
    router.put('/api/edit-product',productController.handleEditProduct);
    router.delete('/api/delete-product',productController.handleDeleteProduct);

    router.get('/api/allcode',userController.getAllCode)
 
    return app.use("/", router);
}

module.exports = initWebRoutes;