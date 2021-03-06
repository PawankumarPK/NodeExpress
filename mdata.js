const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://SampleDatabase:9810507699@cluster0.hawxu.mongodb.net/SampleDatabase?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true});

var conn = mongoose.connection

var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    eType: String,
    hourlyrate: Number,
    totalHour: Number,
    total:Number
})

employeeSchema.methods.totalSalary = function(){
    console.log("Total Income of %s: Rs. %d",this.name,this.hourlyrate);
    return this.hourlyrate * this.totalHour
}

var employeeModel = mongoose.model("Employee", employeeSchema)
var employee = new employeeModel({
    name: "Pankaj", email: "PANKAJ@gmail.com", eType: "daily",
    hourlyrate: 8, totalHour: 16
})

employee.total = employee.totalSalary()

conn.on("connected",function(){
    console.log("Connected Successfully");
})


conn.on("disconnected",function(){
    console.log("Disonnected Successfully");
})

conn.on("error",console.error.bind(console,"Connection error: "))
conn.once("open",function(){
     employee.save(function(err,res){
        if(err) throw error
        console.log(res);
        conn.close()

    })

    //find Query
    // employeeModel.find({},function(err,data){
    //     if(err)throw err
    //     console.log(data);
    //     conn.close

    // })
})