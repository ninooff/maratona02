module.exports = {
    remainingDays(job) {
        //calculo do tempo restante no job
        //numero de dias para terminar o projeto
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        //dia de criação
        const createdDate = new Date(job.created_at)
        //dia final = dia de criação + o total de dias para terminar o projeto
        const dueDay = createdDate.getDate() + Number(remainingDays)
        //data que vai vencer em ms
        const dueDateInMs = createdDate.setDate(dueDay)
        //tempo restante para vencer 
        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar ms em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        //restam x dias
        return dayDiff

    },

    calculateBudget: (job,valueHour) =>  valueHour * job["total-hours"]

}