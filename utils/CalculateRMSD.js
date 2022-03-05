/*
A métrica de avaliação RMSD é calculada pela soma das raízes
da diferença entre a análise com dano pela baseline elevado ao quadrado
sobre a baseline elevado ao quadrado
*/

module.exports = function calculateRMSD(baseline, analysis) {
    const rmsd = baseline.reduce((total, current, index) => {
        const numerator = Math.pow((analysis[index].sample.real - current.sample.real), 2)
        const denominator = Math.pow(current.sample.real, 2)
        const result = numerator / denominator
        return total + Math.sqrt(result)
    }, 0)
    return rmsd
}