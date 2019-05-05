const userModel = require("./model");

const createUser = (newUser) =>
  new Promise((resolve, reject) => {

    userModel
      .create(newUser)
      .then(user => resolve(user))
      .catch(err => reject(err));
  });

const getOneUser = id =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        active: true,
        _id: id
      })
      .select("_id username email password")
      .exec()
      .then(data =>
        resolve(
          Object.assign({}, data._doc, { avatarUrl: `/api/users/${id}/avatar` })
        )
      )
      .catch(err => reject(err));
  });


const getUserByFacebookId = id =>
  new Promise((resolve, reject) => {
    userModel.findOne({'facebookProvider.id': id})
    .then(user => {
      resolve(user)
    })
    .catch(err => reject(err))
  })


// const updateUsername = (id, username) =>
//   new Promise((resolve, reject) => {
//     userModel
//       .update(
//         {
//           _id: id
//         },
//         {
//           username
//         }
//       )
//       .exec()
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//   });

// const updateEmail = (id, email) =>
//   new Promise((resolve, reject) => {
//     userModel
//       .update(
//         {
//           _id: id
//         },
//         {
//           email
//         }
//       )
//       .exec()
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//   });

// const updatePassword = (id, password) =>
//   new Promise((resolve, reject) => {
//     userModel
//       .findById(id)
//       .then(user => {
//         user.password = password;
//         return user.save();
//       })
//       .then(data => resolve(data._id))
//       .catch(err => reject(err));
//   });

// const deleteUser = id =>
//   new Promise((resolve, reject) => {
//     userModel
//       .update({ _id, id }, { active: false })
//       .exec()
//       .then(data => resolve(data._id))
//       .catch(err => reject(err));
//   });

module.exports = {
  createUser,
  getOneUser
};
