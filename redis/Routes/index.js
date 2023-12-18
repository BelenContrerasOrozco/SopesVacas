const router = require("express").Router()
const { Controller } = require("../Controller/Controller")

const controller = new Controller()

router.get("/", controller.runing)
router.get("/hw", controller.helloWorld)
router.post("/save", controller.save)
router.get("/next", controller.next)

module.exports = router