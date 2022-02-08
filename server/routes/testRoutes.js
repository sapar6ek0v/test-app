import express from "express";
import {testGet, testPost, checkPost, getAllTest} from "../controllers/testControllers.js";

const router = express.Router()


router.get('/test/get-test/:category', testGet)
router.get('/test/get-all', getAllTest)
router.post('/test/add-test/:category', testPost)
router.post('/test/check-test/:category', checkPost)


export default router