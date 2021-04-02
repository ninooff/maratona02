let data = [
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
];

module.exports = {
    get(){
        return data
    },

    update(newJob){
        data = newJob
    },

    delete(id){
        data = data.filter(job => Number(job.id) !== Number(id))
    }
}