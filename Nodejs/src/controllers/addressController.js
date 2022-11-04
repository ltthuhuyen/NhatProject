import addressService from "../services/addressService";

let handleCreateNewAddress = async (req, res) => {
  let message = await addressService.createNewAddress(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleGetAllAddresses = async (req, res) => {
  let id = req.query.id; //all, id

  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      addresses: [],
    });
  }

  let addresses = await addressService.getAllAddresses(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    addresses,
  });
};

let handleGetAllAddressesOfUser = async (req, res) => {
  let userId = req.query.userId; //all, id

  if (!userId) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parmeters",
      addresses: [],
    });
  }

  let addresses = await addressService.getAllAddressesOfUser(userId);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    addresses,
  });
};

let handleEditAddressInfo = async (req, res) => {
  let data = req.body;
  let message = await addressService.updateAddressInfo(data);
  return res.status(200).json(message);
};

let handleDeleteAddress = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Không tìm thấy địa chỉ",
    });
  }
  let message = await addressService.deleteAddress(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewAddress: handleCreateNewAddress,
  handleGetAllAddresses: handleGetAllAddresses,
  handleGetAllAddressesOfUser: handleGetAllAddressesOfUser,
  handleEditAddressInfo: handleEditAddressInfo,
  handleDeleteAddress: handleDeleteAddress,
};
