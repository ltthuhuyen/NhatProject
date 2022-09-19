import express from "express"
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController"
import scheduleController from '../controllers/schechuleController'
import appointmentController from "../controllers/appointmentController"
import tempController from "../controllers/tempController"
import newsController from "../controllers/newsController"
import addressController from '../controllers/addressController'

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
    router.get('/api/search-user', userController.handleSearchUser);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser)
    router.get('/api/get-user-role', userController.handleGetUsersRole);
   
    router.get('/api/search-product', productController.handleSearchProduct);
    router.post('/api/create-new-product',productController.handleCreateNewProduct);
    router.get('/api/get-all-products', productController.handleGetAllProducts);
    router.put('/api/edit-product',productController.handleEditProduct);
    router.delete('/api/delete-product',productController.handleDeleteProduct);

    router.post('/api/create-new-schedule', scheduleController.handleCreateSchedule)
    router.get('/api/get-all-apointmenpts' , appointmentController.handleGetAllAppointments);
    router.get('/api/get-apointmenpts-status-s1' , appointmentController.handleAppointmentsNew);
    router.get('/api/get-apointmenpts-status-s2' , appointmentController.handleAppointmentsStatusS2);
    router.get('/api/get-apointmenpts-status-s3' , appointmentController.handleAppointmentsStatusS3);
    router.get('/api/get-apointmenpts-status-s4' , appointmentController.handleAppointmentsStatusS4);
    router.get('/api/get-apointmenpts-status-s5' , appointmentController.handleAppointmentsStatusS5);
    router.get('/api/get-apointmenpt-of-giver' , appointmentController.handleAppointmentsOfGiver);
    router.get('/api/get-apointmenpt-of-recipient-status-s2' , appointmentController.handleAppointmentsOfRecipientStatusS2);
    router.get('/api/get-apointmenpt-of-recipient-status-s3' , appointmentController.handleAppointmentsOfRecipientStatusS3);
    router.get('/api/get-apointmenpt-of-recipient-status-s4' , appointmentController.handleAppointmentsOfRecipientStatusS4);
    router.get('/api/get-apointmenpt-of-recipient-status-s5' , appointmentController.handleAppointmentsOfRecipientStatusS5);
    router.put('/api/update-status-s2', scheduleController.handleUpdateStatusS2)
    router.put('/api/update-status', scheduleController.handleUpdateStatus)

    router.post('/api/create-new-temp', tempController.handleCreateTemp)
    router.get('/api/get-all-temps' , tempController.handleGetAllTemps)
    router.delete('/api/delete-temp',  tempController.handleDeleteTemp);

    router.post('/api/create-new-news', newsController.handleCreateNews)
    router.get('/api/get-all-news' , newsController.handleGetAllNews)
    router.put('/api/edit-news', newsController.handleEditNews)
    router.delete('/api/delete-news',  newsController.handleDeleteNews);

    router.get('https://provinces.open-api.vn/api/')
    router.get('https://provinces.open-api.vn/api/d/')
    router.get('https://provinces.open-api.vn/api/w/')
    router.post('/api/create-new-address', addressController.handleCreateNewAddress)
    router.get('/api/get-all-address-of-user', addressController.handleGetAllAddressesOfUser)

    return app.use("/", router);
}

module.exports = initWebRoutes;