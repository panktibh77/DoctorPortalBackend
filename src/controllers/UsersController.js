
const express = require("express");
const UsersRoute = express.Router();
const Users = require("../models/usersModel").default;
const validateToken = require('../middleware').default;


UsersRoute.get("/users", async (req, res, next) => {
  try {
    let userDetailObj = await Users.query().select()
    if (userDetailObj && userDetailObj.length > 0) {
      res.status(200).send({
        statusCode: res && res.statusCode,
        statue: "OK",
        count: userDetailObj.length,
        user: userDetailObj,
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: res && res.statusCode,
      status: "Internal Server Error",
      error: error.message,
      error: error.stack,
    });
  }
});

UsersRoute.get("get_user/:id", validateToken, async (req, res, next) => {
  let is_id = req.params.id;

  if (is_id) {
    try {
      let userById = await clients.query().where("id", is_id).where("is_delete", false).first();

      if (userById) {
        res.status(200).send({
          success: true,
          message: "User By Id get Successfully",
          res: clientById
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        error: error.message,
        stack: error.stack
      })
    }
  } else {
    res.status(404).send({
      message: "Id Not Found.Please Check Again!"
    })
  }

})

UsersRoute.post("/save-user", async (req, res, next) => {
  const userObj = {
    first_name: req && req.body && req.body.first_name,
    last_name: req && req.body && req.body.last_name,
    username: req && req.body && req.body.username,
    email: req && req.body && req.body.email,
    password: req && req.body && req.body.password
  };
  try {
    const _saveUser = await users.query().insertGraphAndFetch(userObj);
    if (_saveUser) {
      res.status(200).send({
        statusCode: res && res.statusCode,
        statue: "OK",
        message: "user created successfully",
        user: _saveUser,
      });
    }
  } catch (error) {
    res.status(500).send({
      statusCode: res && res.statusCode,
      status: "Internal Server Error",
      error: error.message,
      error: error.stack,
    });
  }
});

UsersRoute.delete("/delete_user/:id", validateToken, async (req, res, next) => {
  let is_delete_id = req.params.id;

  let deleted_record = await users.query().where("id", is_delete_id).first();
  try {
    if (deleted_record) {
      let a = await users.query().where("id", is_delete_id).patch({ is_deleted: true, deleted_on: new Date() });
      res.status(200).send({
        success: true,
        message: "deleted Successfully."
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Client Not Found."
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
      stack: error.stack
    });
  }
});

UsersRoute.put("/update-user/:id", validateToken, async (req, res, next) => {
  const is_user_id = req.params.id;
  let user_record = await users.query().where('id', is_user_id).first();
  if (user_record) {

    let usersObj = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    try {

      let patchAccountObj = await users.query().patchAndFetchById(is_user_id, usersObj);

      if (patchAccountObj) {
        res.status(200).send({
          success: true,
          message: "User Updated successfully.!",
          account: patchAccountObj,
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
        stack: error.stack,
      });
    }
  } else {
    res.status(500).send({
      success: false,
      message: "User Not Found."
    })
  }
});


// export default UsersRoute;
module.exports = UsersRoute;
