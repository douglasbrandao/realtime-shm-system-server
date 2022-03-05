module.exports = class Config {
    constructor(freqInicial, freqFinal, qtdAnalises, tensaoExcitacao, numIncrementos) {
        this.freqInicial = freqInicial
        this.freqFinal = freqFinal
        this.qtdAnalises = qtdAnalises
        this.tensaoExcitacao = tensaoExcitacao
        this.numIncrementos = numIncrementos
    }
}