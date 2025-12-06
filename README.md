# AI Fitness Coach

Next.js + TypeScript app using:

- Drizzle ORM + LibSQL
- Better Auth
- shadcn/ui
- React

## 1. Prerequisites

- Node.js >= 20
- npm >= 10
- Git

## 2. Install dependencies

```bash
npm install
```

## 3. Environment variables

Create a `.env` file in the project root (or update the existing one):

```bash
cp .env .env.local  # optional: keep a local override
```

Minimum variables:

```env
BETTER_AUTH_SECRET=your-strong-random-secret
BETTER_AUTH_URL=http://127.0.0.1:3000
DATABASE_URL=file:dev.db             # or your LibSQL / Turso URL
auth_TOKEN=your-libsql-auth-token   # only if using remote LibSQL
```

Adjust to your actual DB setup. This project uses `createClient` from `@libsql/client` in `src/db/index.ts`.

## 4. Database / Drizzle ORM

### 4.1. Configure Drizzle

Drizzle is configured via `drizzle.config.ts` and the schema in `src/db/schema/*`.

If you change table definitions (e.g. in `auth-schema.ts`, `training-plans.ts`, `users.ts`), regenerate and apply migrations.

### 4.2. Generate migrations

```bash
npx drizzle-kit generate
```

This will create SQL migration files under the `drizzle/` folder.

### 4.3. Apply migrations (push schema)

If you just want to sync the schema directly to the database:

```bash
npx drizzle-kit push
```

Or, if you prefer running migrations:

```bash
npx drizzle-kit migrate
```

### 4.4. Drizzle Studio (optional)

Inspect and edit the DB in a browser UI:

```bash
npx drizzle-kit studio
```

## 5. shadcn/ui

This project already contains some shadcn/ui components under `src/components/ui` (e.g. `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `form.tsx`).

If you need to add more components or re-initialize shadcn:

```bash
# Initialize shadcn in this project (if not already done)
npx shadcn-ui@latest init

# Add common components
npx shadcn-ui@latest add button card input label form separator
```

The generator will place components in `src/components/ui` according to your config in `components.json`.

## 6. Better Auth setup

Better Auth is configured in `src/lib/auth.ts` and wired to Next.js via `src/app/api/auth/[...all]/route.ts`.

Key pieces:

- `src/db/schema/auth-schema.ts` defines `user`, `session`, `account`, `verification` tables.
- `src/db/schema/index.ts` re-exports these tables so they are available to Drizzle.
- `src/db/index.ts` creates a LibSQL client and Drizzle instance.
- `src/lib/auth.ts` initializes Better Auth with the Drizzle adapter and email+password auth enabled.

To verify or adjust the configuration:

1. **Tables exported** from `src/db/schema/index.ts`:
   - `export * from './auth-schema'`
   - `export * from './users'`
   - `export * from './training-plans'`

2. **Better Auth instance** in `src/lib/auth.ts`:

   - Uses `betterAuth` with `drizzleAdapter(db, { provider: 'sqlite' })`.
   - Has `emailAndPassword: { enabled: true }`.
   - Uses `nextCookies()` plugin for Next.js integration.

3. **Next.js route handler** in `src/app/api/auth/[...all]/route.ts`:

   - Exposes `GET` and `POST` handlers via `toNextJsHandler(auth)`.

4. **Auth server actions** in `src/app/actions/auth.ts`:

   - `signUpAction` uses `auth.api.signUpEmail`.
   - `signInAction` uses `auth.api.signInEmail`.
   - `signOutAction` uses `auth.api.signOut`.

After changing auth schema, regenerate and apply Drizzle migrations (see section 4).

## 7. Running the app

### 7.1. Development server

```bash
npm run dev
```

Then open:

- App: http://localhost:3000
