/*
Métrica de avaliação CCDM 
*/

module.exports = function calculateCCDM(baseline, analysis) {

    const baselineMean = baseline.reduce((total, current) => total + current.sample.real, 0) / baseline.length
    const analysisMean = analysis.reduce((total, current) => total + current.sample.real, 0) / analysis.length

    const numerator = baseline.reduce((total, current, index) => {
        return total + ((current.sample.real - baselineMean) * (analysis[index].sample.real - analysisMean))
    }, 0)

    const firstDenominator = baseline.reduce((total, current) => {
        return total + Math.pow((current.sample.real - baselineMean), 2)
    }, 0)

    const secondDenominator = analysis.reduce((total, current) => {
        return total + Math.pow((current.sample.real - analysisMean), 2)
    }, 0)

    const denominator = Math.sqrt(firstDenominator) * Math.sqrt(secondDenominator)

    const result = numerator / denominator

    return 1 - Math.abs(result)
}