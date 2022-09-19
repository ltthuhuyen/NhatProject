import db from "../models/index";
import bcrypt from "bcryptjs";

let createNewAddress = (data) => {
    return new Promise(async (resolve, reject) =>{
        try {
            if(!data.address_name || !data.ward_name  || !data.district_name || !data.city_name){
                resolve({
                    errCode: 1,
                    errMessange: 'Thiếu thông tin'
                });
            }
            else{
                await db.Address.create({
                    userId: data.userId,
                    address_name: data.address_name,
                    ward_name: data.ward_name,
                    district_name: data.district_name,
                    city_name: data.city_name
                    
                })
            }
            resolve({
                errCode: 0,
                errMessange:'OK'
            })
        } catch (error) {
            reject(error)
        }

    })

}

let getAllAddressesOfUser = (userId) => {
    return new Promise(async(resolve , reject) => {
        try {
            let addresses = '';
            if(userId === 'ALL'){
                addresses = await db.Address.findAll({
                    where : {userId: userId},
                    include: [
                        {
                            model: db.User , as: 'userData'
                        }
                    ],  
                    raw: true,
                    nest: true,
                })
            }
            if(userId && userId !== 'ALL') {
                addresses = await db.Address.findOne({
                    where: { userId: userId},
                    include: [
                        {
                            model: db.User, as: 'userData'
                        }
                    ],
                    raw: true,
                    nest: true,
                })


            }
            resolve(addresses)
            console.log('addresses', addresses)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewAddress: createNewAddress,
    getAllAddressesOfUser: getAllAddressesOfUser
}