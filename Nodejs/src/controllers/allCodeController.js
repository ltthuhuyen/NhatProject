import { use } from "express/lib/router";
import allCodeService from "../services/allCodeService";

let getTime = async (req, res) => {
  let keyMap = req.query.keyMap;
  let data = await allCodeService.getTimeSerVice(keyMap);
  return res.status(200).json(data);
};

module.exports = {
  getTime: getTime,
};
