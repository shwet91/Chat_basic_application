import { Router } from "express";
import AuthController from "../controllers/AuthControllers.js";
import authMiddleware from "../middlewares/AuthMiddleware.js";
import ChatGroupCintroller from "../controllers/ChatGroupController.js";
import test from "../controllers/Test.controller.js";
import ChatGroupUserController from "../controllers/ChatGroupUserController.js";
import ChatsController from "../controllers/ChatsController.js";

const router = Router();

router.route("/auth/login").post(AuthController.login);

// chat Group routes

router.get("/chat-group" , authMiddleware , ChatGroupCintroller.index);
router.get("/chat-group/:id" , ChatGroupCintroller.show);
router.post("/chat-group" , authMiddleware , ChatGroupCintroller.store);
router.put("/chat-group" , authMiddleware , ChatGroupCintroller.update);
router.delete("/chat-group/:id" , authMiddleware , ChatGroupCintroller.destroy);

// * Chat group user
router.get("/chat-group-user", ChatGroupUserController.index);
router.post("/chat-group-user", ChatGroupUserController.store);

//  Chats messages 
router.get("/chats/:groupId", ChatsController.index);

router.post("/test" , test)


export default router;
