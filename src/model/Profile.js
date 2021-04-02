let data = {
    name: "Nino",
    avatar: "https://avatars.githubusercontent.com/u/79278621?s=400&u=ab5cc8b8d3b9ccfcf5d97b726b26683b22a99f96&v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
}

module.exports = {
    get(){
        return data;
    },

    update(newData){
        data = newData;
    }
}