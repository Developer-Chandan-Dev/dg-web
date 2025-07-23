This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# ✅ 📋 Project Master Checklist
🔧 SETUP PHASE
✅ Next.js project setup with Tailwind CSS

✅ shadcn/ui integration

✅ Supabase project created

✅ Supabase pdf_courses and purchases tables created

✅ Supabase Storage bucket (pdfs) created and set to private

✅ Clerk authentication setup (login, signup)

✅ Clerk and Supabase integration complete

👤 User Side (Main Website)
📂 Course (PDF) Listing Page
Show all available PDF courses from pdf_courses table

Show title, price, short description

"Buy Now" button for each course

💳 Payment Flow
Integrate Razorpay

Create Razorpay checkout session on "Buy Now"

Redirect to Razorpay payment page

Payment Vertifcation: On successful payment, insert record in purchases table

📥 PDF Download Access
After payment, show "Download" button for purchased PDFs

Check if purchases table has record for user and that pdf_id

Use signed URL from Supabase Storage to securely download

👤 User Dashboard (Optional)
List all PDFs the user has purchased

Allow download again anytime

🛠️ Admin Panel (/admin route group)
Only allow admin access (based on Clerk role or userId check)

Upload PDF form:

Title, description, price input

Upload file to Supabase Storage

Insert metadata into pdf_courses table

Show list of all uploaded courses

Edit/Delete option for each

🔐 Security & RLS
Supabase RLS enabled for purchases table

RLS policy: only allow logged-in user to view/insert their purchases

PDFs storage access secured using Supabase signed URLs

🧪 Testing
Test: PDF upload from admin

Test: Buy and pay PDF from user side

Test: PDF accessible only after purchase

Test: Repeat download allowed to same user

Test: Unauthorized user can't download paid PDFs

✨ Bonus Features (Optional)
Add categories/tags to PDFs

User profile page with Clerk

Search/filter PDF list

Coupon/discount integration

Email notifications on purchase

📊 Example Progress View (Current Status)
Feature	Status
Project Setup	✅ Done
Supabase Tables	✅ Done
Clerk Auth	✅ Done
PDF Upload	⏳ In Progress
Course Listing	❌ Not Started
Razorpay Payment	❌ Not Started
Purchase Table Entry	❌ Not Started
PDF Download Logic	❌ Not Started
Admin Panel	⏳ Partial
RLS Policies	✅ Done