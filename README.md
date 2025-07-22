# 📘 SkillsBazzar2 – Digital Course Selling Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)](https://skillsbazzar2.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-blueviolet)](https://clerk.dev)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ecf8e)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-blue)](https://stripe.com)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-3776ab)](https://razorpay.com)

SkillsBazzar2 is a full-stack web application for selling and downloading PDF-based courses. It supports secure user authentication, role-based access control, digital payment integration, and admin functionalities for managing content.

🔗 **Live Site:** [https://skillsbazzar2.vercel.app](https://skillsbazzar2.vercel.app)

---

## 📌 Features

- 🔐 **Authentication** – Sign in & Sign up with [Clerk.dev](https://clerk.dev)
- 🎫 **Role-based Access** – Admin can upload/delete; users can only view & purchase
- 📄 **PDF Storage** – Courses stored in Supabase Storage (with thumbnails)
- 💰 **Razorpay Integration** – Secure payment flow (test + live support)
- 📥 **Purchases** – Users can buy and download their PDFs
- 📊 **Admin Panel** – List, create, update, and delete PDF courses
- 📦 **Supabase RLS** – Row-level security for protecting sensitive data
- 📈 **User Tracking** – Records new signups in Supabase `users` table
- 📄 **SEO Friendly** – Structured metadata, clean routing with Next.js

---

## 🛠 Tech Stack

| Category       | Technology              |
|----------------|-------------------------|
| Frontend       | Next.js 14 (App Router) |
| Styling        | Tailwind CSS            |
| Authentication | Clerk.dev               |
| Database       | Supabase PostgreSQL     |
| File Storage   | Supabase Storage        |
| Payments       | Stripe (test ), Razorpay (live) |
| Deployment     | Vercel                  |

---

## 🧑‍💻 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Developer-Chandan-Dev/skillsbazzar2.git
cd skillsbazzar2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_BASE_URL=https://skillsbazzar2.vercel.app
NEXT_PUBLIC_WEBSITE_NAME=Skillsbazzar2
NEXT_PUBLIC_SUPABASE_STORAGE_URL=https://[project_id].supabase.co/storage/v1/object/public/[bucket_name]/[file_path]

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_secret
```

---

## ⚙️ Supabase Setup

- Create tables: `pdf_courses`, `purchases`, `users`
- Enable **RLS** and define access policies
- Use **Storage Buckets** for uploading PDFs and thumbnails

---

## 🔁 Webhooks

- Stripe: Handle `checkout.session.completed` for purchase creation
- Razorpay: Add similar webhook and insert data manually into Supabase

---

## ✅ Admin Features

- Upload new courses (PDF + Thumbnail)
- Edit existing course metadata
- Delete courses with file cleanup
- View purchase logs

---

## 🧾 License

This project is licensed under the MIT License.

---

## ✨ Author

Built with ❤️ by [Chandan Dev](https://github.com/Developer-Chandan-Dev)
