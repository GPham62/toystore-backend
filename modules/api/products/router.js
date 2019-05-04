const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const productController = require("./controller");

router.get("/", (req, res) => {
  productController
    .getAllProducts(req.query.page || 1)
    .then(products => res.send(products))
    .catch(err => res.send({err}))
})

router.get("/:productId", (req, res) =>{
  productController
    .getProductbyId(req.params.productId)
    .then(product => res.send(product))
    .catch(err =>res.send({err}))
})

router.get("/similar/:productName/:productType", (req,res)=>{
  productController
    .getSimilarProduct(req.params.productName, req.params.productType)
    .then(data => {
      console.log(data)
      res.send(data.similarProducts)
    })
    .catch(err => res.send({err}))
})

router.get("/type/:productType", (req, res) => {
  console.log(req.params.productType)
  productController
    .getProductbyType(req.params.productType)
    .then(products => {
      res.send(products.data)
    })
    .catch(err => res.send({err}))
})

router.post("/", (req, res) => {
  productController
    .createProduct(req.body)
    .then(product => res.send(product))
    .catch(err => res.send(err))
})

router.delete("/:id", (req, res) => {
  productController
    .deleteProduct(req.params.id)
    .then(product => {
      res.send(product)
      console.log("delete success!")
    })
    .catch(err=>res.send(err))
})
// router.post(
//   "/",
//   authMiddleware.authorize,
//   upload.single("image"),
//   (req, res) => {
//     console.log("req.file: ", req.file);
//     console.log("req.body: ", req.body);
//     req.body.userId = req.session.userInfo.id;
//     req.body.imageFile = req.file;

//     imageController
//       .createImage(req.body)
//       .then(result => res.send(result))
//       .catch(err => {

//         console.error(err);
//         res.status(500).send(err);
//       });
//   }
// );

// router.delete("/:id", authMiddleware.authorize, (req, res) => {
//   imageController
//     .deleteImage(req.params.id, req.session.userInfo.id)
//     .then(image => res.send(image))
//     .catch(error => {
//       console.error(error);
//       res.status(error.status).send(error.err);
//     });
// });

// router.post("/:imageId/comments", authMiddleware.authorize, (req, res) => {
//   req.body.userId = req.session.userInfo.id;

//   imageController
//     .addComment(req.params.imageId, req.body)
//     .then(result => res.send(result))
//     .catch(err => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// router.delete(
//   "/:imageId/comments/:commentId",
//   authMiddleware.authorize,
//   (req, res) => {
//     imageController
//       .deleteComment(
//         req.params.imageId,
//         req.params.commentId,
//         req.session.userInfo.id
//       )
//       .then(result => res.send(result))
//       .catch(err => {
//         console.error(err);
//         res.status(500).send(err);
//       });
//   }
// );

// router.post("/:imageId/like", authMiddleware.authorize, (req, res) => {
//   imageController
//     .likeImage(req.params.imageId)
//     .then(result => res.send(result))
//     .catch(err => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

// router.delete("/:imageId/like", authMiddleware.authorize, (req, res) => {
//   imageController
//     .unlikeImage(req.params.imageId)
//     .then(result => res.send(result))
//     .catch(err => {
//       console.error(err);
//       res.status(500).send(err);
//     });
// });

module.exports = router;
