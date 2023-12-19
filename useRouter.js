const { products, Cart, productsI, User, getInfo,Login, Getcart, Delete,DeleteCartItemByName } = require("./service");

const router = require("express").Router();

router.get("/products", products);
router.get("/getcart", Getcart);
router.get("/:ID",getInfo)
router.post("/cart", Cart);
router.delete("/clear", Delete);
router.delete('/deletebyname/:name', DeleteCartItemByName);
router.post("/productsI", productsI);
router.post("/user", User);
router.post("/login", Login);



module.exports = router;