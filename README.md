<div align="center">

# :stadium: GameZone

### Book Premium Sports Facilities

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5A0EF8?logo=daisyui)](https://daisyui.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.6-000?logo=lock)](https://www.better-auth.com/)

A sports facility booking platform where users can browse, search, and book venues — turf grounds, football fields, badminton courts, swimming pools, and tennis courts. Facility owners can list, edit, and manage their own venues. Built with a premium sports-themed UI featuring custom dark/light themes, animated page transitions, and a fully responsive layout.

[Live Site](your-deployed-url-here) &bull; [Server Repo](your-server-repo-url-here)

</div>

---

## :bookmark_tabs: Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [NPM Packages Used](#-npm-packages-used)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Related Repo](#-related-repo)

---

## :sparkles: Features

| Feature | Description |
|---------|-------------|
| **Facility Browsing** | Search by name, filter by sport type (Turf, Football, Badminton, Swimming, Tennis), price range, and location |
| **Facility Details & Booking** | View facility info, image gallery, available slots, and book directly from the detail page |
| **My Bookings** | View all bookings with tabs (All / Upcoming / Past / Cancelled) and cancel upcoming ones via confirmation modal |
| **Add Facility** | Owners can create new listings with image upload (ImgBB), time slots, pricing, and capacity |
| **Manage Facilities** | Owners can view, edit, and delete their own listings |
| **Authentication** | Email/password sign-up & login, Google OAuth, session-based auth with protected routes |
| **Theme Toggle** | Custom `gamezone-dark` / `gamezone-light` themes with persistent preference |
| **Animated UI** | Page transitions, staggered reveals, and interactive elements via Framer Motion |
| **Responsive Layout** | Mobile-first design with adaptive navbar, grid layouts, and touch-friendly controls |

---

## :hammer_and_wrench: Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| UI Library | **React 19** |
| Styling | **Tailwind CSS 4** + **DaisyUI 5** + **HeroUI** |
| Auth | **Better Auth** (email/password + Google OAuth, session cookies) |
| Database | **MongoDB** (via the server repo) |
| Animations | **Framer Motion** |
| Notifications | **Sonner** (toast system) |
| Fonts | **Sora** (headings) &bull; **Inter** (body) &bull; **Space Grotesk** (numeric) |

---

## :package: NPM Packages Used

| Package | Purpose |
|---------|---------|
| `next` | React framework — App Router, SSR, API routes, rewrites |
| `react` / `react-dom` | UI library |
| `better-auth` | Authentication — email/password, Google OAuth, session management |
| `mongodb` | MongoDB driver for Better Auth's database adapter |
| `@heroui/react` | UI component library |
| `daisyui` | Tailwind CSS component plugin — themes, buttons, inputs, badges |
| `framer-motion` | Page transitions, scroll animations, staggered reveals |
| `react-icons` | Icon set (Remix Icons) used throughout the UI |
| `sonner` | Toast notification system |
| `tailwindcss` | Utility-first CSS framework (v4) |
| `@tailwindcss/postcss` | PostCSS integration for Tailwind |
| `eslint` / `eslint-config-next` | Linting |

---

## :rocket: Getting Started

**Prerequisites:** Node.js 18+ and npm installed.

```bash
# Clone the repo
git clone <your-client-repo-url>
cd game-zone-client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at **http://localhost:3000**.
The Express server ([see related repo](#-related-repo)) must be running on port `5000` for API calls to work.

---

## :key: Environment Variables

Create a `.env.local` file in the project root:

```env
API_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
BETTER_AUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
```

> **Note:** Never commit real secret values. The `.env.example` file shows the required variable names.

---

## :file_folder: Project Structure

```
src/
├── app/
│   ├── layout.js                            # Root layout — fonts, Navbar, Footer, AuthProvider
│   ├── page.js                              # Home — Hero, Featured, HowItWorks, Stats
│   ├── login/page.js                        # Email/password + Google sign-in
│   ├── register/page.js                     # Email/password + Google sign-up
│   ├── api/auth/[...all]/route.js           # Better Auth API handler
│   │
│   ├── (public)/
│   │   └── facilities/page.js               # Browse & filter all facilities
│   │
│   └── (private)/                           # Auth-guarded (redirects to /login)
│       ├── layout.js                        # Private route guard
│       ├── facility/[id]/page.js            # Facility detail + booking panel
│       ├── my-bookings/page.js              # User's bookings — tabs & cancel
│       ├── add-facility/page.js             # Create new listing
│       └── manage-facilities/
│           ├── page.js                      # Owner's listings — edit / delete
│           └── [id]/edit/page.js            # Edit existing facility
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx                       # Responsive nav with auth-aware menu
│   │   ├── Footer.jsx                       # Site footer
│   │   ├── Hero.jsx                         # Landing page hero with CTA
│   │   ├── FeaturedFacilities.jsx           # Featured listings section
│   │   ├── HowItWorks.jsx                  # Step-by-step explainer
│   │   ├── StatsSection.jsx                # Animated stat counters
│   │   └── PageTransition.jsx              # Framer Motion page wrapper
│   │
│   └── ui/
│       ├── FacilityCard.jsx                 # Facility listing card
│       ├── BookingPanel.jsx                 # Slot selection + booking form
│       ├── FilterBar.jsx                    # Search, type, price, location filters
│       ├── ImageGallery.jsx                 # Facility image viewer
│       ├── ImageUploader.jsx                # ImgBB upload with progress bar
│       ├── ThemeToggle.jsx                  # Dark / light theme switch
│       ├── ConfirmModal.jsx                 # Confirmation dialog
│       ├── Button.jsx                       # Primary button component
│       ├── FormField.jsx                    # Labeled input with validation
│       ├── StatusBadge.jsx                  # Booking status indicator
│       ├── EmptyState.jsx                   # No-data placeholder
│       ├── StatCounter.jsx                  # Animated number counter
│       ├── SkeletonCard.jsx                 # Card loading skeleton
│       ├── SkeletonRow.jsx                  # Row loading skeleton
│       └── index.js                         # Barrel exports
│
└── lib/
    ├── auth.js                              # Server-side Better Auth instance
    ├── auth-client.js                       # Browser auth client (signIn, signOut, useSession)
    ├── AuthProvider.jsx                     # React context for auth state
    ├── api.js                               # API fetch helper — proxied via Next.js rewrites
    ├── mongodb.js                           # MongoDB client connection
    ├── constants.js                         # Sport types, booking statuses
    └── mockData.js                          # Fallback mock data
```

---

## :link: Related Repo

| Repo | Description |
|------|-------------|
| **[GameZone Server](your-server-rhttps://github.com/shariful-ire/game-zone-serverepo-url-here)** | Express.js REST API — Better Auth, MongoDB, facility & booking CRUD |

---

<div align="center">

**Built with :heart: using Next.js, Tailwind CSS & DaisyUI**

</div>
