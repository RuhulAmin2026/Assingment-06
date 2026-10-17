# FitLog — React + TypeScript

FitLog is a responsive workout library and daily workout planner built with React, TypeScript (`.tsx`), Vite, React Router, and Lucide icons.

## Features

- Separate Workouts and My Plan pages
- 12 sample exercises with details, equipment, categories, sets, reps, calories, and instructions
- Search, category filters, and sorting
- Add up to 5 workouts to today's plan
- Mark workouts as done and remove them from today's plan
- Save and unsave workouts for later
- Local storage keeps the plan and saved list in this browser
- Responsive dark UI with image/logo placeholders

## Requirements

- Node.js 18+ (recommended)
- npm

## Run the project

1. Extract the ZIP file.
2. Open the `fitlog-react` folder in VS Code.
3. Open the VS Code terminal in that folder.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown by Vite in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Folder structure

```text
fitlog-react/
├── public/
│   └── images/
│       ├── hero/
│       ├── logo/
│       └── workouts/
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── WorkoutCard.tsx
│   │   └── WorkoutModal.tsx
│   ├── context/
│   │   └── FitLogContext.tsx
│   ├── data/
│   │   └── workouts.ts
│   ├── pages/
│   │   ├── MyPlanPage.tsx
│   │   └── WorkoutsPage.tsx
│   ├── styles/
│   │   └── global.css
│   ├── types/
│   │   └── workout.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Add your own images later

The image folders are included and your uploaded assets have been placed into the project.

- Logo: `public/images/logo/fitlog-logo.svg` (your uploaded SVG logo).
- Hero: `public/images/hero/fitlog-hero.png` (your uploaded banner image).
- Workout images: `public/images/workouts/overhead-press.png` and `public/images/workouts/conventional-deadlift.png`.
- Extra SVG assets: `public/images/icons/`.

Example for a public image file:

```tsx
<img src="/images/logo/your-logo.png" alt="FitLog logo" />
```

To replace the logo, change the image path in `src/components/Logo.tsx`. To replace the hero image, change the path in `src/pages/WorkoutsPage.tsx`. Workout card, details modal, and plan images use the optional `image` field in `src/data/workouts.ts`; add image paths there for more exercises. Only the images supplied in your ZIP were used, so exercises without a matching supplied image keep their designed placeholder.

## Notes

- No backend is configured. Plan and saved data are stored in browser local storage.
- Exercise details and calorie values are sample reference data, not medical advice.
- The PDF reference was used for the FitLog visual direction and the two main pages.
