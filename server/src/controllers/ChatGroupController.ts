import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupCintroller {
  static async index(req: Request, res: Response) {
   
    try {
      const user = req.body;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.json({ data: groups });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong . Please try again" });
    }
  }

  static async show(req: Request, res: Response) {
    console.log("index2")
    try {
      const { id } = req.params;
      if (id) {
        const groups = await prisma.chatGroup.findUnique({
          where: {
            id: id,
          },
        });
        return res.json({ data: groups });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong . Please try again" });
    }
  }

  static async store(req: Request, res: Response) {
    console.log("startrd");
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroup.create({
        data: {
          title: body?.title,
          passcode: body?.passcode,
          user_id: user.id,
        },
      });

      return res.json({ message: "Chat Group created successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }

  static async update(req: Request, res: Response) {
    console.log("index3")
    try {
      const { id } = req.params;
      const body = req.body;
      if (id) {
        const groups = await prisma.chatGroup.update({
          data: body,
          where: {
            id: id,
          },
        });
        return res.json({ message: "Group updated successfully!" });
      }

      return res.status(404).json({ message: "No groups found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong . Please try again" });
    }
  }

  static async destroy(req: Request, res: Response) {
    // console.log("started")
    try {
      console.log("index5")
      const { id } = req.params;

      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      return res.json({ message: "Chat Deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong . Please try again" });
    }
  }
}

export default ChatGroupCintroller;
