const productModel = require("./model");
const fs = require("fs");

const createProduct = (newProduct) =>
  new Promise((resolve, reject) => {
    productModel
      .create(
       newProduct
      )
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const getAllProducts = page =>
  new Promise((resolve, reject) => {
    productModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * 25)
      .limit(25)
      .exec()
      .then(products => {
        resolve(products);
      })
      .catch(err => reject(err));
  });

  const getProductbyId = id =>
  new Promise((resolve, reject) => {
    productModel
      .findOne({
        _id: id
      })
      .then(data =>
        resolve({product: data})
      )
      .catch(err => reject(err));
  });

  const getProductbyType = productType =>
  new Promise((resolve, reject) => {
    productModel
      .find({type: productType})
      .then(data => resolve({data}))
      .catch(err => reject(err))
  })

  const getSimilarProduct = (productName, productType) =>
  new Promise((resolve, reject) =>{
    productModel
    .find({name:{$ne: productName}, type: productType})
    .sort({createdAt: -1})
    .limit(3)
    .exec()
    .then(similarProducts =>{
      resolve({similarProducts : similarProducts})
    })
    .catch(err => reject(err))
  })

// const updateProduct = (id, { imageFile, title, description }) =>
//   new Promise((resolve, reject) => {
//     imageModel
//       .update(
//         {
//           _id: id
//         },
//         {
//           image: fs.readFileSync(imageFile.path),
//           contentType: imageFile.mimetype,
//           title,
//           description
//         }
//       )
//       .then(data => resolve({ id: data._id }))
//       .catch(err => reject(err));
//   });

const deleteProduct = (id) =>
  new Promise((resolve, reject) => {
    productModel
      .findOne({_id: id})
      .remove()
      .exec()
      .then(data => resolve(data))
      .catch(err => reject({ status: 500, err }));
  });





module.exports = {
  getAllProducts,
  getProductbyId,
  getProductbyType,
  createProduct,
  deleteProduct,
  getSimilarProduct
};
