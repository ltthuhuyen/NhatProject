import express from "express"
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController"
import scheduleController from '../controllers/schechuleController'
import appointmentController from "../controllers/appointmentController"
import tempController from "../controllers/tempController"
import newsController from "../controllers/newsController"

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    router.get('/api/allcode',userController.getAllCode)
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser)
    router.get('/api/get-user-role', userController.handleGetUsersRole);
   
    router.post('/api/create-new-product',productController.handleCreateNewProduct);
    router.get('/api/get-all-products', productController.handleGetAllProducts);
    router.put('/api/edit-product',productController.handleEditProduct);
    router.delete('/api/delete-product',productController.handleDeleteProduct);

    router.post('/api/create-new-schedule', scheduleController.handleCreateSchedule)
    router.get('/api/get-all-apointmenpts' , appointmentController.handleGetAllAppointments);
    router.get('/api/get-apointmenpt-of-giver' , appointmentController.handleAppointmentsOfGiver);
    router.put('/api/update-status', scheduleController.handleUpdateStatus)

    router.post('/api/create-new-temp', tempController.handleCreateTemp)
    router.get('/api/get-all-temps' , tempController.handleGetAllTemps)
    router.delete('/api/delete-temp',  tempController.handleDeleteTemp);

    router.post('/api/create-new-news', newsController.handleCreateNews)
    router.get('/api/get-all-news' , newsController.handleGetAllNews)
    router.put('/api/edit-news', newsController.handleEditNews)
    router.delete('/api/delete-news',  newsController.handleDeleteNews);

    return app.use("/", router);
}

module.exports = initWebRoutes;