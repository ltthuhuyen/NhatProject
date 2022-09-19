import db from "../models/index";
import bcrypt from "bcryptjs";
// import { Model } from "sequelize/types";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
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

let searchUser = (search) => {
    return new Promise (async (resolve , reject) => {
        try {
            let data = await db.User.findAll({
                where: {
                    email : {
                        [Op.like]: `%${search}%` 
                    }      
                },
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
            })
            resolve(data)
        } catch (error) {
            reject(error)
        }
       // console.log("search", search)
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = ''
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
                    include: [
                        {
                            model: db.Allcode, as: 'roleIdData' , attributes: ['valueVi', 'valueEn']
                        },
                        {
                            model: db.Allcode, as: 'genderData' , attributes: ['valueVi', 'valueEn']
                        }
                    ],
                    raw: true,
                    nest: true,
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
    console.log('data', data)
    return new Promise(async (resolve, reject) =>{
        try {
            let check = await checkUserEmail(data.email);
            console.log(check)
            if (check === true){
                resolve({
                    errCode: 1,
                    errMessange:'Email này đã tồn tại '
                })
            }
            else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                let user = await db.User.create({
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
                await db.Address.create({
                    userId: user.id,
                    address_name: data.address,
                    ward_name: data.ward_name,
                    district_name: data.district_name,
                    city_name: data.city_name  
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
    console.log(data)
    return new Promise(async (resolve, reject) =>{
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu các thông số bắt buộc'
                })
            }
            else{
                let user = await db.User.findOne({
                    where: {id: data.id},
                    raw: false
    
                })    
                let address = await db.Address.findOne({
                    where: {userId: data.id},
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
                }
                if (address){
                    address.userId = data.userId
                    address.city_name = data.city_name,
                    address.district_name = data.district_name,
                    address.ward_name = data.ward_name
                    address.address_name = data.address
                    await address.save()
                }
                resolve({
                    errCode: 0,
                    errMessange: 'Người dùng đã được cập nhật thành công '
                });
                
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) =>
{
    return new Promise(async(resolve, reject) =>{
        
        let foundUser = await db.User.findOne({
            where: {id: userId}
        })
        // let foundAddress= await db.Address.findOne({
        //     where: {userId: userId}
        // })
        console.log(foundUser);
            if(!foundUser)
            {
                resolve({
                    errCode: 2,
                        errMessage: "không có người dùng này"
                })
            }
            await db.User.destroy({
                where: {id: userId}
            });
            await db.Address.destroy({
                where: {userId: userId}
            });
            resolve({
                errCode: 0,
                    errMessage: "thành công"
            })
    })
}

let getAllCodeSerVice = (typeInput) => {
    return new Promise(async (resolve , reject) =>{
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu các thông số bắt buộc'
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
    searchUser: searchUser,
    getAllUsers: getAllUsers,
    hashUserPassword:hashUserPassword,
    createNewUser:createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getAllCodeSerVice: getAllCodeSerVice,
    getRoleID:  getRoleID
   
}