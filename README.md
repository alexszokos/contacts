## Setup

This is a Next.js fullstack project with Server Actions, SQLite and Prisma.  
As requested, the db file is included in the repo with prepopulated default contacts. No containers, no db setup, no migration, no generation, no env config, just a simple install and start.

Install packages:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

## Tech stack

- **Framework**: Next.js

- **Database**: SQLite via Prisma ORM

- **Styling**: Tailwind CSS

- **Animations**: Framer Motion (motion/react)

- **Testing**: Vitest (Unit/Component) & Playwright (E2E CRUD Flow)

## Dev notes

**Framework**  
I chose Next.js because Server Actions provide a seamless, type-safe bridge for CRUD operations without the need for a separate API layer.

**Database**  
SQLite and Prisma allows for a portable, zero-setup database while guaranteeing full type safety across the entire stack.

**Styling**  
Chose Tailwind because of its speed of development and ability to maintain a consistent design system without the overhead of external CSS files.

**Animations**  
Used Framer Motion to animate the modal opening and closing actions.

**Forms**  
Went with native FormData and useActionState instead of React Hook Form and Zod, because it would have been an overkill for a simple form like this.

**UI Kit**  
Aimed for the reusable UI components to pixel perfectly match the provided design. For accessibility, customization and dev experience reasons I chose Radix UI Primitives for the modal and dropdown.

**Responsiveness**  
Mobile view wasnt included in the design, but I tried my best to make everything look good on small screens as well, taking advantage of Tailwind classes.

## Personal notes

It was a fun little project that I liked working on. I had a lot of ideas for it, and there are many ways to implement this project. My goal was to cover everything and solve it in the simplest way possible, without any over-engineering.  
(I also planned to deploy it on Vercel and use an S3 bucket for persistent storage to cover the bonus points, but in the end I simply just did not have the time to set it all up.)

Hope you like the project. 🙏
