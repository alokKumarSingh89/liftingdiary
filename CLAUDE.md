# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lifting Diary — a Next.js 16 app using the App Router, React 19, TypeScript 5 (strict mode), and Tailwind CSS v4.

## Commands

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint` (ESLint 9 with next/core-web-vitals and next/typescript configs)

No test runner is configured yet.

## Architecture

- **App Router** with source in `src/app/` — all pages, layouts, and future API routes live here
- **Path alias:** `@/*` maps to `./src/*`
- **Styling:** Tailwind CSS v4 via PostCSS; theme variables (light/dark) defined in `src/app/globals.css` using CSS custom properties and `prefers-color-scheme`
- **Fonts:** Geist and Geist Mono loaded via `next/font/google` in the root layout
- **Auth:** Clerk (`@clerk/nextjs`) — `<ClerkProvider>` wraps the app in `layout.tsx`; `clerkMiddleware()` runs from `src/proxy.ts`; Clerk components (`SignInButton`, `SignUpButton`, `UserButton`, `SignedIn`, `SignedOut`) render in the layout header
- **Environment:** Clerk keys go in `.env.local` (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) — never commit real keys
