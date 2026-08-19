# Implementation Plan - Portfolio Dark & Light Theme Support

Implement a seamless **Dark & Light Theme Toggle** system across the portfolio website with smooth CSS transitions, Redux state management, local storage persistence, and full component color palette adaptations.

---

## Technical Approach & Architecture

1. **State Management & Persistence (`uiSlice.ts`)**:
   - Add `theme: 'dark' | 'light'` to Redux `UIState`.
   - Add `setTheme` and `toggleTheme` reducers that update Redux state and sync with `localStorage` (`portfolio_theme`).
   - Automatically sync the HTML root element class (`document.documentElement.classList.add/remove('dark')`).

2. **CSS Custom Variables & Tailwind System (`globals.css` & `tailwind.config.ts`)**:
   - Define CSS variables for Light and Dark modes in `globals.css`:
     - **Dark Mode**: Background `#090D16`, text `#F8FAFC`, glass background `rgba(15, 23, 42, 0.75)`, borders `rgba(255, 255, 255, 0.1)`.
     - **Light Mode**: Background `#F8FAFC`, text `#0F172A`, glass background `rgba(255, 255, 255, 0.85)`, borders `rgba(15, 23, 42, 0.1)`, shadow highlights.
   - Update `.glass-panel` and `.glass-card` classes to adapt smoothly based on `.dark` vs light theme.

3. **Theme Switcher UI Component (`ThemeToggle.tsx`)**:
   - Create a sleek `ThemeToggle` button displaying a Sun icon (in Dark mode) or Moon icon (in Light mode) with micro-animations.
   - Integrate `ThemeToggle` into the desktop header navigation bar (next to `LanguageSwitcher`) and inside the mobile menu drawer.

4. **Interactive Component Adaptations**:
   - Update `BackgroundCanvas.tsx` particle colors and background fill based on current active theme (light vs dark particles).
   - Ensure high contrast and WCAG compliance for text, cards, buttons, badges, modals, form inputs, and section headers in both modes.

---

## Proposed Changes

### Core Infrastructure & State

#### [MODIFY] [uiSlice.ts](file:///d:/internship/Task-3(Portfolio)/src/store/uiSlice.ts)
- Add `theme: 'dark' | 'light'` to `UIState`.
- Add `setTheme` and `toggleTheme` action reducers with `localStorage` persistence and `document.documentElement` class toggle.

#### [MODIFY] [globals.css](file:///d:/internship/Task-3(Portfolio)/src/app/globals.css)
- Add light theme CSS variable overrides (`:root`, `.dark`).
- Enhance `.glass-panel` and `.glass-card` styling for light and dark modes.

#### [NEW] [ThemeToggle.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/common/ThemeToggle.tsx)
- Sun/Moon interactive toggle button with smooth Framer Motion rotation and tooltips.

---

### UI Components Adaptation

#### [MODIFY] [Navbar.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/layout/Navbar.tsx)
- Embed `ThemeToggle` in desktop nav header and mobile drawer menu.
- Adapt header blur background for light and dark modes.

#### [MODIFY] [BackgroundCanvas.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/ui/BackgroundCanvas.tsx)
- Adjust particle colors, grid lines, and canvas clear color dynamically based on theme.

#### [MODIFY] [HeroSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/HeroSection.tsx)
- Adapt ambient glow halo, profile card background, text contrast, and stat badges for light mode.

#### [MODIFY] [ServicesSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ServicesSection.tsx) & [ProjectsSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ProjectsSection.tsx)
- Adapt card glassmorphism background, text readability, category pills, search input, and modal borders for light mode.

#### [MODIFY] [ProjectDetailModal.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ProjectDetailModal.tsx)
- Adapt modal overlay backdrop, panel background, and text colors.

#### [MODIFY] [SkillsSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/SkillsSection.tsx), [ExperienceSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ExperienceSection.tsx) & [LeadershipSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/LeadershipSection.tsx)
- Adapt category panels, skill pills, timeline nodes, achievement lists, and certification cards.

#### [MODIFY] [ContactSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ContactSection.tsx) & [Footer.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/layout/Footer.tsx)
- Adapt form input background, text contrast, contact cards, and footer styling.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure TypeScript compilation and Next.js static site generation pass with 0 build errors.

### Manual Verification
- Toggle between Dark and Light mode using `ThemeToggle` in desktop header and mobile drawer.
- Verify theme persistence across browser reloads via `localStorage`.
- Verify readability, glassmorphism aesthetics, contrast ratios, and particle canvas rendering in both Dark and Light modes.
