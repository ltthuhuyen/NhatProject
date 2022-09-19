import addressService from '../services/addressService'

let  handleCreateNewAddress = async (req, res) =>{
    let message = await addressService.createNewAddress(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleGetAllAddressesOfUser = async(req, res) => {
    let userId= req.query.userId; //all, id

    if(!userId) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            addresses: []  
        })
    }

    let addresses = await addressService.getAllAddressesOfUser(userId);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        addresses
    })
}

module.exports ={
    handleCreateNewAddress: handleCreateNewAddress,
    handleGetAllAddressesOfUser: handleGetAllAddressesOfUser
   
}