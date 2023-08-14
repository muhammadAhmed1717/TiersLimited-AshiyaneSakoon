const express = require("express");
const router = express();
const employee = require("../controllers/c_employee");
// router.get("/", users.getUser);
// FUNCTION TO ADD EMPLOYEE
router.post("/",employee.addEmployee)
// FUNCTION TO VIEW EMPLOYEE
router.get("/",employee.getEmployee)
// FUNCTION TO VIEW EMPLOYEE BY ID
router.get("/:id",employee.getspecificEmployee)
// FUNCTION TO UPDATE EMPLOYEE
router.put('/update/:id',employee.updateEmployee)
module.exports = router;