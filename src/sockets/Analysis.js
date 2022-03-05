const Analysis = require('../models/Analysis');

/*
O servidor fica aguardando as informações emitidas pelo cliente
Com essas mesmas informações enviadas, é emitido a cada 1 segundo
as informações das análises sendo inseridas no banco de dados
*/

module.exports = function (io) {
    io.of('/analysis').on('connection', (socket) => {
        console.log(`Client ${socket.id} connected`);

        let interval;

        socket.on('analysisArguments', async (analysisId) => {

            await Analysis.findByIdAndUpdate(analysisId, { status: 0 })

            interval = setInterval(async () => {
                await Analysis.findById(analysisId)
                    .populate('baseline.sensorId')
                    .populate('sensors.sensorId')
                    .then(({ currentSensor, baseline, sensors, status }) => {
                        socket.emit('status', status);
                        if (currentSensor) {
                            if ((currentSensor.toString() == baseline.sensorId._id.toString()) && baseline.finished === false) {
                                socket.emit('analysis', baseline);
                            } else {
                                sensors.forEach((sensor) => {
                                    if (currentSensor.toString() == sensor.sensorId._id.toString()) {
                                        socket.emit('analysis', sensor);
                                    }
                                })
                            }
                        }
                        socket.emit('status', status);
                    })
            }, 1000);
        })

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`)
            clearInterval(interval)
        })
    })
};