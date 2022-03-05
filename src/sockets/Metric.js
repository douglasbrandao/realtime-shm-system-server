const Analysis = require('../models/Analysis');
const calculateRMSD = require('../../utils/CalculateRMSD');
const calculateCCDM = require('../../utils/CalculateCCDM');

/*
O servidor fica aguardando as informações de qual sensor o usuário quer
saber as informações de métricas de avaliação. Se não tiver as duas informações
(baseline e análise) no banco de dados, é enviado um erro para o cliente informando
que é necessário ter uma baseline e análise para ser efetuado as métricas de avaliação
*/


module.exports = function (io) {

    io.of('/metric').on('connection', (socket) => {
        console.log(`Client ${socket.id} connected`);

        let interval;

        socket.on('metrics', async ({ module, analysis, realtime }) => {

            console.log('Metrics started')

            async function calculateMetrics(analysis) {
                const { baseline, sensors } = await Analysis.findById(analysis)
                    .populate('sensors.sensorId')
                    .then(response => response)
                return sensors.map((sensor) => ({
                    rmsd: {
                        sensorId: sensor.sensorId._id,
                        name: sensor.sensorId.name,
                        value: calculateRMSD(baseline.frequencies, sensor.frequencies)
                    },
                    ccdm: {
                        sensorId: sensor.sensorId._id,
                        name: sensor.sensorId.name,
                        value: calculateCCDM(baseline.frequencies, sensor.frequencies)
                    }
                }));
            }

            let results = null;

            try {

                if (realtime) {
                    interval = setInterval(async () => {
                        results = await calculateMetrics(analysis);
                        socket.emit('responseMetrics', results)
                    }, 1000)
                } else {
                    results = await calculateMetrics(analysis);
                    socket.emit('responseMetrics', results);
                }

            } catch (err) {
                socket.emit('metricsNotFound', { message: "We couldn't find a baseline or analysis with this sensor", ccdm: 0, rmsd: 0 })
            }

        })

        socket.on('metricsErase', () => {
            console.log('Unmount Metric')
            clearInterval(interval)
        })

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`)
            clearInterval(interval)
        })
    })
};