const PredictionModel = require('../models/predictionModel');

const predictionModel = new PredictionModel();

async function trainModel(csvFilePath){
    await predictionModel.train(csvFilePath);
}

function predictPrice(req,res) {
    const {date} = req.query;

    const prediction = predictionModel.predict(date)

    res.json({prediction})
}

module.exports = {trainModel, predictPrice};