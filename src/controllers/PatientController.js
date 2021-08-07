const express = require("express");
const patientRoute = express.Router();
const Patient = require('../models/patientModel').default;
// const validateToken = require('../middleware').default; 

patientRoute.get("/get-all-patients", async(req,res,next) => {
try{
  let patientDetailsObj = await Patient.query().orderBy('name');
    
  if(patientDetailsObj){
    res.status(200).send({
      success:true,
      message:'get all patients.',
      res: patientDetailsObj
    });
  }

}catch(error){
  res.status(500).send({
    error:error.meassge,
    stack:error.stack
  });
}
});

patientRoute.post("/", async (req, res, next) => {
  
  const pageNo = parseInt(req.body.PageNo || 0);
  const PageSiZe = parseInt(req.body.PageSize || 5);
  const sortColumn = req.body.SortColumn;
  const sortOrder = req.body.SortOrder;
  const SearchText = req.body.SearchText;

  const patientDetailsObj = await Patient.query().andWhere('is_deleted', false)
    .andWhere('patients.name', 'like', '%' + SearchText + '%')
    .orderBy(sortColumn || 'patients.name', sortOrder || 'ASC')
    .page(pageNo, PageSiZe);

  try {
    if (patientDetailsObj) {
      res.status(200).send({
        success: true,
        meassge: "Get all Patients Successfully.",
        res: patientDetailsObj
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
      error: error.stack,
    });
  }
});

patientRoute.get("/:id", async (req, res, next) => {
  let is_id = req.params.id;
  if (is_id) {
    try {
      const patientById = await Patient.query().where("id", is_id).first();

      if (patientById) {
        res.status(200).send({
          success: true,
          message: "patient get Successfully",
          res: patientById
        })
      }
    } catch (error) {
      res.status(500).send({
        error: error.meassge,
        stack: error.stck
      });
    }
  } else {
    res.status(400).send({
      error: error.meassge,
      stack: error.stck,
      message: "Patient Id Not Found."
    });
  }
});

patientRoute.post("/add-patient", async (req, res, next) => {
  
  const patientDetailsobj = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    mobile_number: req.body.mobile_number,
    username: req.body.username,
    password: req.body.password
  }
  try {
    const patientObj = await Patient.query().insertGraphAndFetch(patientDetailsobj);
    if (patientObj) {
      res.status(201).send({
        success: true,
        message: "Patient Created Successfully!",
        section: patientObj
      })
    } else {
      res.status(500).send({
        error: error.message,
        stack: error.stack
      })
    }
  } catch (error) {
    res.status(400).send({
      error: error.meassge,
      stack: error.stack
    })
  }
});

patientRoute.delete("/delete-patient/:id", async (req, res, next) => {
  const is_patient_id = req.params.id;

  let deleted_record = await Patient.query().where("id", is_patient_id).first();
  try {
    if (deleted_record) {
      let a = await Patient.query().where('id', is_patient_id).patch({ is_deleted: true, deleted_on: new Date() });
      res.status(200).send({
        success: true,
        message: "Patient Deleted Successfully!"
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Patient Not Found!"
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
      stack: error.stack
    });
  }
});

patientRoute.put("/update-patient/:id", async (req, res, next) => {
  const is_patient_id = req.params.id;

  const patientDetailsobj = {
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    mobile_number: req.body.mobile_number
  }

  try {
    const patientById = await Section.query().where("id", is_patient_id).first();
    if (patientById) {
      const patientObj = await Section.query().patchAndFetchById(is_patient_id, patientDetailsobj);

      if (patientObj) {
        res.status(200).send({
          success: true,
          message: "Patient Updated Successfully!",
          section: patientObj
        })
      } else {
        res.status(500).send({
          success: false,
          message: "Patient Not Found!"
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error.meassge,
      stack: error.stack
    })
  }
});

// export default patientRoute;
module.exports = patientRoute;