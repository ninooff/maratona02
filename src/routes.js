const express = require('express');
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {
    data: {
        name: "Nino",
        avatar: "https://avatars.githubusercontent.com/u/79278621?s=400&u=ab5cc8b8d3b9ccfcf5d97b726b26683b22a99f96&v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75,
        
    },

    controllers: {
        index(req, res) {
             return res.render(views + "profile", { profile: Profile.data })
            },

        update(req,res) {
            //req.body para pegar os dados
            const data = req.body
            //definir quantas semanas tem num ano
            const weeksPerYear = 52
            //remover semanas de ferias do ano
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            //quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
            //total de horas trabalhadas no mes
            const monthlyTotalHours = weekTotalHours * weeksPerMonth
            //qual sera o valor da minha hora?
            const valueHour = data["value-hour"] = data["monthly-budget"]/ monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect("/profile")
        },
    }

}

const Job = {
    data: [
        {
            id: 1,
            name: "zeez",
            "daily-hours": 2,
            "total-hours": 80,
            created_at: Date.now(),
            
        },
        {
            id: 2,
            name: "Vemcmg",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            
        }
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? "done" : "progress"
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }

            })

            return res.render(views + "index", { jobs: updatedJobs })

        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
            
            // req.body = {name: 'ANTONINO BRANCO PEREIRA','daily-hours': '23','total-hours': '12'}
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo data de hoje

            })
            return res.redirect("/")
        },

        show(req, res){
            console.log(Job.data)
            // const joId = req.params.qualquercoisa
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            
            if(!job){
                return res.send('Job not found')
            }


           job.budget =  Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit", {job})
        },

        update(req, res){
            console.log(Job.data)
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            
            if(!job){
                return res.send('Job not found')
            } 
            const updatedJob = {
                ...job, 
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"],
            }

            Job.data = Job.data.map(job => {
               if(Number(job.id) === Number(jobId)){
                   job = updatedJob
               }

               return job
            })

            res.redirect('/job/' + jobId)
        },

        delete(req, res){
            const jobId = req.params.id
            //quando encontrar o match retira do array
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }

    },

    services: {
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
}



routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)

routes.post('/job', Job.controllers.save)

//routes.get('/job/:qualquercoisa', Job.controllers.show)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;