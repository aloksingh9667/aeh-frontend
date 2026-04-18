# AEH Frontend — Avviare Educational Hub Website

React + Vite frontend with multi-page website, admin panel, and student portal.

## Tech Stack
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Routing**: Wouter
- **State**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Payments**: Razorpay Checkout (client-side)
- **Deployment**: Cloudflare Pages

## Pages

### Public Website
- Home, About, Core Values, Leadership
- 9 School pages (Management, CS & IT, Commerce, etc.)
- Infrastructure, Placements, Top Recruiters
- News & Gallery, Apply, Contact, Careers

### Student Portal
- `/student/login` — Student login
- `/student/register` — Student registration
- `/student/dashboard` — Dashboard
- `/student/fees` — Fee payment (Razorpay)
- `/student/receipts` — College-format receipts with download

### Admin Panel
- `/admin/login` — Admin login
- `/admin/dashboard` — Stats overview
- `/admin/applications` — Manage applications
- `/admin/contacts` — Manage contacts
- `/admin/careers` — Manage career applications

## Setup

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Local Development
```bash
pnpm install
cp .env.example .env
# Set VITE_API_URL to your backend URL
pnpm dev
```

### Environment Variables
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

## Deploy to Cloudflare Pages

1. Connect this GitHub repo to Cloudflare Pages
2. Set build command: `npm install -g pnpm && pnpm install && pnpm build`
3. Set output directory: `packages/aeh-website/dist`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. The `_redirects` file handles SPA routing automatically

## Razorpay Integration (Student Portal)
- Uses Razorpay Checkout.js (loaded from CDN)
- Test mode: use test keys (`rzp_test_*`) — no real money charged
- Test card: 4111 1111 1111 1111, any future expiry, any CVV
