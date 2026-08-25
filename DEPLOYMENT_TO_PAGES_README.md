# Cloudflare Pages Deployment Guide (Next.js App)

এই ডকুমেন্টটিতে Next.js (App Router) প্রজেক্টকে Cloudflare Pages-এ সফলভাবে হোস্ট করার সকল নিয়ম ও কনফিগারেশন ধাপে ধাপে লিখে রাখা হয়েছে।

---

## 1. Cloudflare Dashboard Setup Instructions

Cloudflare Pages-এ প্রজেক্ট সেটআপ করার সময় নিচের সেটিংসগুলো ব্যবহার করুন:

* **Repository:** `ardhimart/ardhimart`
* **Production Branch:** `main`
* **Framework Preset:** `None`
* **Build Command:** `npm run pages:build`
* **Build Output Directory:** `.vercel/output/static`
* **Root Directory:** `/` (ফাঁকা রাখুন, যদি রেপোর রুটে `package.json` থাকে)

### Environment Variables (আবশ্যক):
Cloudflare Pages **Settings > Environment variables** এ গিয়ে যোগ করুন:
* `NODE_VERSION` = `20`
* `NEXT_PUBLIC_API_URL` = `https://your-backend-api-domain.com`

### Functions Compatibility Flags (আবশ্যক):
Cloudflare Pages **Settings > Functions > Compatibility Flags** এ গিয়ে **Production** এবং **Preview** দুটিতেই নিচের ফ্ল্যাগটি যোগ করুন:
* `nodejs_compat`

---

## 2. Project Code Requirements

### (A) `package.json` Scripts
[`package.json`](file:///c:/Projects/websites/frontend-v1/package.json) এ অবশ্যই `pages:build` স্ক্রিপ্ট থাকতে হবে:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "pages:build": "npx @cloudflare/next-on-pages",
  "start": "next start",
  "lint": "eslint"
}
```

---

### (B) Dynamic Routes Edge Runtime Setup (⚠️ অত্যন্ত গুরুত্বপূর্ণ)
Cloudflare Pages-এ Next.js চালানোর সময় সকল **Dynamic Route** (যেমন: `[id]` বা Dynamic parameters যুক্ত `page.tsx`) অবশ্যই **Edge Runtime** এ চলতে হবে।

যেকোনো নতুন ডাইনামিক রাউট পেজ তৈরি করলে ফাইলের একেবারে উপরে `'use client';` বা import এর সাথে নিচের লাইনটি যোগ করতে হবে:

```ts
export const runtime = 'edge';
```

#### প্রজেক্টের বিদ্যমান Dynamic Routes সমূহ:
1. [`src/app/products/[id]/page.tsx`](file:///c:/Projects/websites/frontend-v1/src/app/products/%5Bid%5D/page.tsx)
2. [`src/app/account/orders/[id]/track/page.tsx`](file:///c:/Projects/websites/frontend-v1/src/app/account/orders/%5Bid%5D/track/page.tsx)

---

## 3. Common Errors & Fixes (সমস্যা ও সমাধান)

### Problem 1: `The following routes were not configured to run with the Edge Runtime`
* **কারণ:** প্রজেক্টে থাকা কোনো ডাইনামিক রাউটে `export const runtime = 'edge';` যোগ করা হয়নি।
* **সমাধান:** যে যে রাউটের নাম এররে দেখাবে, সেই পেজ ফাইলের উপরে `export const runtime = 'edge';` যোগ করে Git-এ Push করতে হবে।

---

### Problem 2: Cloudflare পুরাতন Commit বিল্ড করছে
* **কারণ:** গিট পুশ করার পর Cloudflare ড্যাশবোর্ডে পুরাতন Failed বিল্ডের ওপর Retry দিলে সেটি পুরাতন কমিটই বিল্ড করে।
* **সমাধান:** Cloudflare Dashboard > **Deployments** ট্যাবে গিয়ে লেটেস্ট কমিটের (যেখানে সমাধান পুশ করা হয়েছে) পাশে Retry বা Deploy দিতে হবে।

---

### Problem 3: `missing script: pages:build`
* **কারণ:** `package.json` এ `pages:build` কমান্ড যুক্ত নেই।
* **সমাধান:** `"pages:build": "npx @cloudflare/next-on-pages"` লাইনটি `package.json` এ যোগ করা।

---

## 4. Summary Checklist Before Deployment
- [x] `package.json` এ `pages:build` স্ক্রিপ্ট আছে।
- [x] সকল dynamic route এ `export const runtime = 'edge';` দেওয়া আছে।
- [x] Git-এ `git push origin main` করা হয়েছে।
- [x] Cloudflare-এ `NODE_VERSION: 20` এবং `nodejs_compat` সেট করা আছে।
