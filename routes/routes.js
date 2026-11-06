import express from "express";
import controller from "../controllers/controllers.db.js";

const router = express.Router();

router.get("/todos", controller.getTodos);
router.post("/todos", controller.createTodo);
router.delete("/todos/:id", controller.deleteTodo); 
router.put("/todos/:id", controller.editTodo);





// Yoki oddiy PUT /todos/:id ichida completed ni ham qabul qilsa bo'ladi

router.delete("/todos", controller.deleteAlltodos);

export default router