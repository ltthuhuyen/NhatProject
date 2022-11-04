import { use } from "express/lib/router";
import appreciateService from "../services/appreciateService";

let handleCreateAppreciate = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let message = await appreciateService.createNewAppreciate(data);
    return res.status(200).json(message);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleCreateAppreciate: handleCreateAppreciate,
};
