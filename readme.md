# 🔐 Realtime Chat Rooms App

A real-time chat application where users can create and join private chat rooms using unique URLs and passwords. Built with **Next.js**, **Prisma**, **Socket.IO**, and **Redis**.

## 🚀 Features

- Create chat rooms with unique URLs and password protection
- Join rooms by URL + password
- Real-time messaging via Socket.IO
- Persistent room and user data using Prisma ORM
- Scalable messaging infrastructure with Redis Pub/Sub

## 🛠 Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Node.js with Socket.IO
- **Database:** PostgreSQL (via Prisma ORM)
- **Realtime:** Socket.IO + Redis
- **Cache/Message Broker:** Redis

## 📸 Screenshots

> _Optional: Add screenshots/gifs of chat interface, room creation, etc._

## 🧩 Project Structure



/app
└── (UI pages and components)
/api
└── room (room creation, validation, etc.)
/lib
└── prisma.ts
└── redis.ts
/socket
└── server.ts (Socket.IO server handlers)




## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app



2. Install Dependencies


bash
Copy
Edit
npm install
3. Configure environment variables
Create a .env file in the root:

env
Copy
Edit
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/chatapp
REDIS_URL=redis://localhost:6379
NEXT_PUBLIC_BASE_URL=http://localhost:3000


4. Setup the database
bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
5. Start the development server
bash
Copy
Edit
npm run dev
⚙️ Usage
Go to the homepage and create a room.

Share the generated URL and password with others.

Anyone with the correct password can join and chat in real time.




🚧 Future Improvements
Message history persistence

Admin/moderator roles

Typing indicators and online presence

Emoji and file sharing support

Rate limiting & abuse protection

📄 License
MIT

Made with ❤️ using Next.js, Prisma, and Socket.IO