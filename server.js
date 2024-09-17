const express = require("express")
const path = require("path")
const app = express()
const bodyParser = require("body-parser")

const port = process.env.PORT || 3000

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

let Task = [
    {
    Id: 0, Name: "Do homework", isCompleted: true 
    },
    {
    Id: 1, Name: "Clean Home", isCompleted: false 
    },
    {
    Id: 2, Name: "Cook Food", isCompleted: false
    },
    {
    Id: 3, Name: "Buy Groceries", isCompleted: true
    }    
]

app.get("/", (req,res) => {
 res.render("tasks.ejs", {Tasks: Task});
 //console.log(`${Task[0].Name}`)

});

app.get("/completed-tasks", (req, res) => {
    const completedTasks = Task.filter(task => task.isCompleted === true);
    res.render("tasks.ejs", {Tasks: completedTasks})
});

app.post("/add-task", (req, res) => {
    const task = 
        {
        Id: Task.length,
        Name: req.body["Name"],
        isCompleted: false
        }
    
        Task.push(task);
        res.redirect("/");
});

app.post("/update-task/:id", (req, res) =>{
    const T_id = parseInt(req.params.id, 10);
    const task = Task.find(TASK => TASK.Id === T_id);
   // console.log(`${T_id}`);
    if(task){
        if(req.body["isCompleted"] === "on"){
            task.isCompleted = true;
        }else{
            task.isCompleted =false;
        }
    }
    res.redirect("/");
})


app.listen(port, () => {
    console.log(`port is : ${port}`)
})