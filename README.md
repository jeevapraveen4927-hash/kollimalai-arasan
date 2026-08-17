# Kollimalai Arasan — E-commerce Frontend

A pixel-accurate Next.js + TypeScript + Tailwind CSS rebuild of the Kollimalai
Arasan Figma design (spices & millets e-commerce site).

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages included

| Route        | Description                              |
| ------------ | ----------------------------------------- |
| `/`          | Home page (hero, products, testimonials…) |
| `/shop`      | Shop All products grid                    |
| `/spices`    | Spices category                           |
| `/millets`   | Millets category                          |
| `/about`     | About Us                                  |
| `/contact`   | Contact form                              |
| `/login`     | Login page                                |
| `/register`  | Create account page                       |
| `/cart`      | Shopping cart with live totals            |
| `/profile`   | User profile / account dashboard          |

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — brand colors extracted directly from the Figma
  screenshots (`brand.green #007F06`, `accent.orange #CE4800`,
  `cream #FFF6F5`)

## Project structure

```
app/            → routes (App Router)
components/     → shared UI components (Header, Footer, ProductCard, etc.)
lib/            → static data + TypeScript types
public/images/  → product photos, logo, icons cropped from the Figma export
```

## Notes

- Cart and profile pages use local React state (mock data) — wire them up to
  your backend/API of choice.
- Avatar images on the profile page are placeholder icons since real customer
  photos weren't provided as export assets.
