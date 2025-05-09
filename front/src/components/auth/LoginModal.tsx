import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { Button } from "../ui/button";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const handleGoogleLogin = async () => {
  signIn("google", {
    redirect: true,
    callbackUrl: "/dashboard",
  });
};

function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Getting Started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to QuickChat</DialogTitle>
          <DialogDescription>
            Quick Chat makes it effortless to crate secure chat links
            conversations in seconds.
          </DialogDescription>
        </DialogHeader>

        <Button variant={"outline"} onClick={handleGoogleLogin}>
          <Image
            src="/images/google.png"
            className="mr-4"
            width={25}
            height={25}
            alt="googl_logo"
          ></Image>
          continue with google
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
