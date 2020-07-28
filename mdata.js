const mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    eType: String,
    hourlyrate: Number,
    totalHour: Number
})

employeeSchema.methods.totalSalary = function(){
    console.log("Total Income of %s: Rs. %d",this.name,this.hourlyrate);
}

var employeeModel = mongoose.model("Employee", employeeSchema)

var employee = new employeeModel({
    name: "Pawan", email: "pawan@gmail.com", eType: "hourly",
    hourlyrate: 10, totalHour: 16
})

employee.totalSalary()
//console.log(employee);