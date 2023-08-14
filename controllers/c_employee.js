const Employee = require("../models/Employee");

// FUNCTION TO ADD EMPLOYEE
exports.addEmployee=async (req,res)=>{
    try{
        const exist= await Employee.findOne({email:req.body.email});
        if(exist){
            res.json("Employee Already Created")
        }
        else{
            const employee = new Employee({
                name:req.body.name,
                cnic:req.body.cnic,
                contact:req.body.contact,
                email:req.body.email,
                salary:req.body.salary
            })
            await employee.save();
            res.json("Employee Created Successfully")
        }
    }catch(err){
        res.json(err);
    }
}
// FUNCTION TO GET EMPLOYEE
exports.getEmployee = async  (req,res)=>{
    try{
        const employee= await Employee.find();
        res.json(employee)
    } catch(err){
        res.json(err)
    }
}
// FUNCTION TO VIEW EMPLOYEE BY ID
exports.getspecificEmployee = async (req,res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        console.log(employee)
        res.json(employee);
    } catch (error) {
        res.json(error)
    }
}
// FUNCTION TO UPDATE EMPLOYEE
exports.updateEmployee = async (req,res)=> {
    try {
        const employee = await Employee.findById(req.params.id);
        const options = { upsert: true };
        if (!req.body.name) {
            req.body.name = employee.name;
        }
        if (!req.body.cnic) {
            req.body.cnic = employee.cnic;
        }
        if (!req.body.contact) {
            req.body.contact = employee.contact;
        }
        if (!req.body.email) {
            req.body.email = employee.email;
        }
        if (!req.body.salary) {
            req.body.salary = employee.salary;
        }
        const toupdate = {
            $set: {
                name: req.body.name,
                cnic: req.body.cnic,
                contact: req.body.contact,
                email: req.body.email,
                salary: req.body.salary,
            },
        };
        const update = await Employee.updateOne(
            { _id: employee.id },
            toupdate,
            options
        );
        res.json("Employee Updated Successfully");
    } catch (err) {
        res.json(err)
    }
}