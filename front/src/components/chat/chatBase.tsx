"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";
import ChatSidebar from "./ChatSidebar";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialogue";
import Chats from "./Chats";

function chatBase({
  group,
  users,
  oldMessages,
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  // let socket = useMemo(() => {
  //   const socket = getSocket();
  //   socket.auth = {
  //     room: groupId,
  //   }

  //   return socket.connect();
  // }, []);

  // useEffect(() => {
  //   socket.on("serverMessage", (data: any) => {
  //     console.log("The socket message is", data);
  //   });

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const [open, setOpen] = useState(true);

  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  useEffect(() => {
    const data = localStorage.getItem(group.id);

    if (data) {
      const pData = JSON.parse(data);

      setChatUser(pData);
    }
  }, []);

  return (
    <div className="flex">
      <ChatSidebar users={users}></ChatSidebar>
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}

        <Chats group={group} chatUser={chatUser} oldMessages={oldMessages}></Chats>
      </div>
    </div>
  );
}

export default chatBase;
