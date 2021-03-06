import db from "../models/index";
import bcrypt from "bcryptjs";
// import { Model } from "sequelize/types";

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve,reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    // attributes: ['id','email','firstName', 'lastName', 'roleId', 'password'],
                    where: {email: email},
                    raw: true
                    
                });
                if(user){
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok',

                        delete user.password;
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }

                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Please try other em.ail`
            }
            resolve(userData)
            console.log('userData', userData)
        }catch(e){
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user) {
                resolve(true)
            }else {
                resolve(false)
            }
        } catch(e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL') {
                users = await db.User.findAll({
                    include: [
                        {
                            model: db.Allcode, as: 'roleIdData' , attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'genderData' , attributes: ['valueVi', 'valueEn']
                        },  
                    ],
                    raw: true,
                    nest: true,
                    attributes:{
                        exclude: ['password']
                    }

                })
            }
            if(userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        }catch(e) {
            reject(e)
        }
    })
}

 let getRoleID = (role) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
                users = await db.User.findAll({
                    where: { roleId: role},
                    include: [
                        {
                            model: db.Allcode, as: 'roleIdData' , attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'genderData' , attributes: ['valueVi', 'valueEn']
                        },  
                    ],
                    raw: true,
                    nest: true,
                    attributes:{
                        exclude: ['password']
                    }
                   
                })
            resolve(users)
        }catch(e) {
            reject(e)
        }
    })
 }

const  salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }catch(e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            let check = await checkUserEmail(data.email);
            console.log(check)
            if (check === true){
                resolve({
                    errCode: 1,
                    errMessange:'Email n??y ???? t???n t???i '
                })
            }
            else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessange:'OK'
                })
            }
        } catch (error) {
            reject(error)
        }

    })

}

let updateUser = (data) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Thi???u c??c th??ng s??? b???t bu???c'
                })
            }
            else{
                let user = await db.User.findOne({
                    where: {id: data.id},
                    raw: false
    
                })               
                if (user) {
                    user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.phone = data.phone,
                    user.gender = data.gender,
                    user.roleId = data.roleId,
                    user.image = data.avatar,
                    user.address = data.address,
    
                
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessange: 'Ng?????i d??ng ???? ???????c c???p nh???t th??nh c??ng '
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessange: 'Ng?????i d??ng kh??ng t??m th???y'
                    });
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) =>
{
    return new Promise(async(resolve, reject) =>{
        
       let foundUser = await db.User.findOne({
            where: {id: id}
        })
        console.log(foundUser);
            if(!foundUser)
            {
                resolve({
                    errCode: 2,
                        errMessage: "kh??ng c?? ng?????i d??ng n??y"
                })
            }
             
            await db.User.destroy({
                where: {id: id}
            });
            resolve({
                errCode: 0,
                    errMessage: "th??nh c??ng"
            })
    })
}

let getAllCodeSerVice = (typeInput) => {
    return new Promise(async (resolve , reject) =>{
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Thi???u c??c th??ng s??? b???t bu???c'
                })
            }else{
                let res= {};
                let allcode = await db.Allcode.findAll({
                    where : {type: typeInput},

                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res)
            }
          
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    hashUserPassword:hashUserPassword,
    createNewUser:createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCodeSerVice: getAllCodeSerVice,
    getRoleID:  getRoleID
   
}