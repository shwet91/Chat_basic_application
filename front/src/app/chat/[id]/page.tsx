import ChatBase from '@/components/chat/chatBase';
import { fetchChats } from '@/fetch/chatsFetch';
import { fetchChatGroup, fetchChatGroups, fetchChatUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';
import React from 'react'

async function page({ params } : { params : { id: string }}) {

  if(params.id.length !== 36 ){
    return notFound();
  }

  const chatGroup: GroupChatType | null = await fetchChatGroup(params.id);
  if(chatGroup === null ) {
    return notFound();
  }

  const users: Array<GroupChatUserType> | [] =
  await fetchChatUsers(params?.id);

const chats: Array<MessageType> | [] = await fetchChats(params.id);

  return (
    <div>
      <ChatBase group={chatGroup} users={users} oldMessages={chats} />
    </div>
  )
}

export default page