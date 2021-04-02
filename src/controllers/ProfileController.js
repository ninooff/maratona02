const Profile = require('../model/Profile')

module.exports =  {
    index(req, res) {
         return res.render( "profile", { profile: Profile.get() })
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

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        }) 
        
        return res.redirect("/profile")
    },
}