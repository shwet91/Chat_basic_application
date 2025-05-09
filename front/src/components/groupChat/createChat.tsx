"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { Input } from "../ui/input";

import { Button } from "../ui/button";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/chatSchema";
import { CustomUser } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { tryLoadManifestWithRetries } from "next/dist/server/load-components";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";
import { clearCache } from "@/action/common";

function CreateChat( {user}: { user : CustomUser} ) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async(payload: createChatSchemaType) => {
    // console.log("The chat paylod is ", payload);
    try {
      setLoading(true);
      const { data } = await axios.post(CHAT_GROUP_URL, payload, {
        headers: {
          Authorization: user.token,
        }
      });

      if(data?.message) {
        setOpen(false)
        toast.success(data?.message);
        clearCache("dashboard")
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your new chat</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateChat;
