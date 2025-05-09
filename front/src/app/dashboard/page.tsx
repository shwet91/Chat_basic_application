import Dashnav from "@/components/dashboard/Dashnav";
import React from "react";


import CreateChat from "@/components/groupChat/createChat";
import {
  authOptions,
  CustomSession,
} from "../api/auth/[...nextauth]/nextAuthOptions";
import { getServerSession } from "next-auth";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

async function page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<GroupChatType> | [] = await fetchChatGroups(
    session?.user?.token!
  );
  return (
    <div>
      <Dashnav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      ></Dashnav>

      <div className="container">
        <div className="flex justify-end mt-10 ">
          <CreateChat user={session?.user!} />
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default page;
