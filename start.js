const app = require("./app");

app.listen(3000, (err) => {
    if(err){
        return console.log("Error", err)    
    }

    console.log("Works!")
});