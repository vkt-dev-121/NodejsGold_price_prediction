const tf = require('@tensorflow/tfjs')
const csv = require('csv-parser')
const fs = require('fs')

class PredictionModel {
    constructor () {
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({units: 1 , inputShape: [1]}));
        this.model.compile({loss: 'meanSquaredError', optimizer : 'sgd'});
    }

    async train(csvFilePath) {
        const xs = [];
        const ys = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => {
                xs.push(new Date(data.Date).getTime())
                ys.push(parseFloat(data.Price))
            })
            .on('end', () => {
                const xTrain = tf.tensor2d(xs, [xs.lengh,1]);
                const yTrain = tf.tensor2d(ys, [ys.lengh,1]);
                this.model.fit(xTrain, yTrain, {apoche: 100})
            });
    }

    predict(date) {
        const dateInMs = new Date(date).getTime();
        const input = tf.tensor2d([dateInMs], [1,1]);
        const prediction = this.model.predict(input);
        return prediction.dataSync()[0];
    }
}

module.exports = PredictionModel;