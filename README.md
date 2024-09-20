# I'tikafConnect Project

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![AWS S3](https://img.shields.io/badge/Amazon_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-282828?style=for-the-badge&logo=radix&logoColor=white)](https://www.radix-ui.com/)

I'tikafConnect is an online platform for managing I'tikaf registrations and events for mosques. It allows participants to register and administrators to manage the entire process efficiently. Built using cutting-edge technologies, it ensures security, scalability, and a seamless user experience.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Node.js, [Prisma](https://www.prisma.io/) (for ORM)
- **Database**: [MySQL](https://www.mysql.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **File Storage**: [Amazon S3](https://aws.amazon.com/s3/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Password Encryption**: [bcrypt](https://www.npmjs.com/package/bcrypt)

---

## ✨ Features

- **User Roles**: Role-based access for Admins and Users.
- **Event Management**: Create, manage, and register for various I'tikaf events.
- **Authentication**: Secure login and signup with NextAuth.js.
- **Profile Management**: Edit, update, and print user profile information including next of kin details and attachments.
- **File Uploads**: Upload and manage user attachments using AWS S3.
- **Image Thumbnails**: Automatically generate and serve image thumbnails via Bull queues.
- **Responsive UI**: Adaptive user interface using Radix UI and Tailwind CSS for a smooth experience across devices.
- **Performance**: Leveraging Next.js and optimized components for fast page load times.

---



## Tech Stack

- **Frontend**: Vite + React, Tailwind CSS
- **Backend**: Python (FastAPI or Flask)
- **Database**: MySQL (via Prisma for database schema management)
- **Auth**: NextAuth.js for authentication
- **File Storage**: Amazon S3 for managing user profile attachments
- **Others**: Radix UI themes, React Hook Form, Zod for validation, bcrypt for password encryption

## Features

- **User Roles**: Admin and User roles with specific access permissions.
- **I'tikaf Events**: Add, manage, and register for different I'tikaf events.
- **Authentication**: Secure signup and login using NextAuth.js.
- **Profile Management**: Update and print profile information, manage next of kin details, and upload attachments.
- **Image Thumbnails**: Automatically generate and display image thumbnails using Bull queues.
- **AWS S3 Integration**: Attach and manage user profile pictures and documents in an S3 bucket.

## 🗂 Project Structure
```bash
.
├── Actions
├── README.md
├── actions
│   ├── login.ts
│   └── signup.ts
├── app
│   ├── (account)
│   │   ├── profile
│   │   │   ├── Attachments.tsx
│   │   │   ├── NextOfKeen.tsx
│   │   │   ├── ProfiLeInfor.tsx
│   │   │   ├── [id]
│   │   │   │   ├── Attachments.tsx
│   │   │   │   ├── NextOfKeen.tsx
│   │   │   │   ├── ProfiLeInfor.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── settings
│   │       └── page.tsx
│   ├── EventSummary.tsx
│   ├── EventsCharts.tsx
│   ├── Footer.tsx
│   ├── LatestEvents.tsx
│   ├── NavItem.tsx
│   ├── Navbar.tsx
│   ├── Profile.tsx
│   ├── QueryClientProvider.tsx
│   ├── Sidebar copy 2.tsx
│   ├── Sidebar copy.tsx
│   ├── Sidebar.tsx
│   ├── api
│   │   ├── auth
│   │   │   ├── [...nextauth]
│   │   │   │   └── route.tsx
│   │   │   └── signout.tsx
│   │   ├── awsS3
│   │   │   ├── route.tsx
│   │   │   └── s3.tsx
│   │   ├── events
│   │   │   ├── [id]
│   │   │   │   └── route.tsx
│   │   │   └── route.tsx
│   │   ├── register
│   │   │   ├── [id]
│   │   │   │   └── route.tsx
│   │   │   └── route.tsx
│   │   └── users
│   │       ├── [id]
│   │       │   └── route.tsx
│   │       ├── login
│   │       │   └── route.tsx
│   │       ├── route.tsx
│   │       └── signup
│   │           └── route.tsx
│   ├── assets
│   │   └── images
│   │       ├── bg-13.jpg
│   │       ├── defaultImage.png
│   │       ├── defaultImage1.png
│   │       ├── favicon.png
│   │       ├── logo.png
│   │       ├── msq1.jpg
│   │       └── profile.jpg
│   ├── auth
│   │   ├── Provider.tsx
│   │   ├── copy.tsx
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   ├── copy.tsx
│   │   │   ├── page.tsx
│   │   │   └── session.tsx
│   │   └── signup
│   │       ├── page.tsx
│   │       └── page1.tsx
│   ├── components
│   │   ├── ErrorMessage.tsx
│   │   ├── FormWrapper.tsx
│   │   ├── Link.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LoginForm.tsx
│   │   ├── LogoutForm.tsx
│   │   ├── Pagination.tsx
│   │   ├── RegistrationStatusBadge.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Spinner.tsx
│   │   ├── card
│   │   │   └── Card.tsx
│   │   ├── content
│   │   │   └── Content.tsx
│   │   ├── eventStatusBadge.tsx
│   │   ├── index.tsx
│   │   └── sign-in.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── events
│   │   ├── [id]
│   │   │   ├── DeleteButton.tsx
│   │   │   ├── EditButton.tsx
│   │   │   ├── EventDetails.tsx
│   │   │   ├── RegisterEventButton.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   └── showSubscribers.tsx
│   │   ├── _components
│   │   │   ├── EventForm.tsx
│   │   │   └── EventFormSkeleton.tsx
│   │   ├── edit
│   │   │   └── [id]
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx
│   │   ├── list
│   │   │   ├── EventActions.tsx
│   │   │   ├── EventStatusFilter.tsx
│   │   │   ├── EventsTable.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── myEvents.tsx
│   │   │   └── page.tsx
│   │   └── new
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout copy.tsx
│   ├── layout.tsx
│   ├── page copy.tsx
│   ├── page.tsx
│   ├── subscribers
│   │   ├── EventActions.tsx
│   │   ├── RegistrationStatusFilter.tsx
│   │   ├── RegistrationTable.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── users
│   │   ├── [id]
│   │   │   ├── events
│   │   │   │   ├── EventActions.tsx
│   │   │   │   ├── EventStatusFilter.tsx
│   │   │   │   ├── EventsTable.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── users.tsx
│   └── validationSchema.tsx
├── auth.config.tsx
├── auth.tsx
├── components
│   ├── auth
│   │   ├── back-button.tsx
│   │   ├── card-wrapper.tsx
│   │   ├── header.tsx
│   │   ├── login-button.tsx
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   └── social.tsx
│   ├── form-error.tsx
│   ├── form-success.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       └── label.tsx
├── components.json
├── lib
│   └── utils.ts
├── middleware.ts
├── next-auth.d.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── routes.tsx
├── tailwind.config.ts
└── tsconfig.json

44 directories, 135 files
```
## 🛠 Installation & Setup
1. Clone the repository:

```bash
Copy code
git clone https://github.com/AbuArwa001/itikafconnect.git
cd itikafconnect```
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a ```.env``` file and fill in the required environment variables.

4. Run the app:

```
cp .env.example .env
npm run dev
```
## 📄 API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | /api/events              | Fetch all I'tikaf events           |
| POST   | /api/events              | Create a new event                 |
| GET    | /api/events/:id          | Get event details by ID            |
| POST   | /api/auth/signup         | Register a new user                |
| POST   | /api/auth/login          | Log in an existing user            |
| GET    | /api/users/profile       | Fetch the current user's profile   |
| POST   | /api/users/profile       | Update user profile                |

## 🛠️ Software Architecture

This project follows a **3-tier architecture**:

1. **Presentation Layer** (Frontend): Built using Next.js and React. This layer is responsible for handling the user interface, including registration, authentication, and user profile management.
   
2. **Business Logic Layer** (API): The API layer is developed using Node.js and Express. It processes incoming HTTP requests and handles application logic for user registration, login, events, and profile management.

3. **Data Layer** (Database): The database is managed using Prisma ORM with a MySql database. Prisma serves as the bridge between the API and the database, offering type-safe database interactions.

## 🗄️ Database

The database for the I'tikafConnect project is built on **MySQL**. It consists of tables for managing events, users, profiles, and other data required by the system.

Key tables include:

- **Users**: Stores user information, including authentication details.
- **Events**: Stores I'tikaf event details.
- **Profiles**: Stores user profile details, including next of kin information and attachments.

The schema is managed using **Prisma**, an ORM that makes database migrations, queries, and schema management easy by integrating directly with our codebase.

## 🏗️ Prisma ORM

We are using **Prisma ORM** to interact with the MySql database. Prisma allows us to write queries in a type-safe manner, ensuring that we catch errors at compile-time rather than runtime. 

With Prisma, we get the following benefits:
- **Type-safety**: Queries are strongly typed, so we catch schema-related errors early.
- **Database migrations**: Prisma allows for easy database migrations to ensure the schema is up-to-date.
- **Auto-generated queries**: Common database operations such as `create`, `update`, and `delete` are auto-generated, saving us time and reducing human error.

To manage the database schema and migrations, run:
```bash
npx prisma migrate dev --name migration_name
```

## 🧑‍💻 Contributing

We welcome contributions to improve I'tikafConnect! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add a new feature"`.
4. Push your branch: `git push origin feature-name`.
5. Open a pull request.

## 🔒 License

This project is licensed under the MIT License. See the LICENSE file for details.
