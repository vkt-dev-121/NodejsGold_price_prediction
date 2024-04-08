const express = require('express')
const bodyParser = require('body-parser')
const {trainModel, predictPrice} = require('./controllers/predictController')
const path = require('path')

const app = express();
const PORT = 9000;

app.use(bodyParser.json());

// 
app.get('/train', (req, res) => {
    // const {csvFilePath} = req.body;
    const csvFileName = 'gold_data1.csv';
    const csvFilePath =  path.join(__dirname, 'data', csvFileName);
    const csvFilesPath =  path.join(__dirname, 'data', csvFileName);
    trainModel(csvFilesPath)
           .then(() => res.send('Model trained successfully'))
           .catch((err) => res.send(err.message));

});

app.get('/predict' , predictPrice)

app.listen(PORT, () => {
    console.log('Server running on port 9000');
})