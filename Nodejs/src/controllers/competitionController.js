import db from '../models/index'
import competitionService from '../services/competitionService';

let handleGetAllCompetition = async (req, res) => {
    try {
        let id = req.query.id;
        let competitions = await competitionService.getAllCompetition(id)
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            competitions
        })
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from server'
        })
    }
}

let handleCreateCompetition = async (req, res) => {
    try {
        let data = req.body
        let message = await competitionService.createCompetition(data)
        console.log(message)
        return res.status(200).json(message) 
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage:'Error from server'
        })
    }
}

let handleEditCompetition = async (req, res) => {
    let data = req.body;
    let message = await competitionService.editCompetition(data);
    return res.status(200).json(message)
}

let handleDeleteCompetition = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Không tìm thấy cuộc thi"
        })
    }
    let message = await competitionService.deleteCompetition(id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllCompetition: handleGetAllCompetition,
    handleCreateCompetition: handleCreateCompetition,
    handleEditCompetition: handleEditCompetition,
    handleDeleteCompetition: handleDeleteCompetition,
    
}