# Implementation Plan - Portfolio i18n Localization (Bangla & English)

Implement full internationalization (i18n) localization for the portfolio project, enabling seamless switching between **English (`en`)** and **Bangla (`bn`)**.

---

## Technical Approach & Architecture

1. **State Management**:
   - Extend Redux `uiSlice.ts` to manage active language state (`'en' | 'bn'`).
   - Sync language preference with `localStorage` so the user's choice persists across browser reloads.

2. **Translation Dictionaries**:
   - `src/i18n/locales/en.ts`: English UI strings, navigation, hero details, service cards, project descriptions, skills labels, experience timeline, leadership highlights, and contact form text.
   - `src/i18n/locales/bn.ts`: Precise, high-quality Bangla translations for all UI strings and portfolio content.
   - `src/i18n/useTranslation.ts`: A lightweight React hook (`useTranslation()`) providing `t` helper function, current `language`, and `setLanguage` dispatch.

3. **Language Switcher UI**:
   - Add a stylish, glassmorphism `LanguageSwitcher` component in `Navbar.tsx` (for desktop) and in the mobile menu drawer.
   - Features animated toggle button (`EN` | `BN` / `বাংলা`) with smooth Framer Motion / CSS transitions.

4. **Component Updates**:
   - Update all UI components (`Navbar`, `Footer`, `HeroSection`, `ServicesSection`, `ProjectsSection`, `ProjectDetailModal`, `SkillsSection`, `ExperienceSection`, `LeadershipSection`, `ContactSection`) to consume translated strings dynamically based on selected language.

---

## Proposed Changes

### Core State & i18n Infrastructure

#### [MODIFY] [uiSlice.ts](file:///d:/internship/Task-3(Portfolio)/src/store/uiSlice.ts)
- Add `language: 'en' | 'bn'` to `UIState`.
- Add `setLanguage` action reducer with `localStorage` persistence.

#### [NEW] [en.ts](file:///d:/internship/Task-3(Portfolio)/src/i18n/locales/en.ts)
- English dictionary for all portfolio UI strings, section titles, subtitles, personal details, services, projects, skills, experience, and contact forms.

#### [NEW] [bn.ts](file:///d:/internship/Task-3(Portfolio)/src/i18n/locales/bn.ts)
- Bangla dictionary with rich, professional Bengali text for all UI elements and portfolio content.

#### [NEW] [useTranslation.ts](file:///d:/internship/Task-3(Portfolio)/src/i18n/useTranslation.ts)
- Custom React hook for component translation access.

#### [NEW] [LanguageSwitcher.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/common/LanguageSwitcher.tsx)
- Interactive language toggle component (`EN` / `বাংলা`) with sleek glass design and sound/animation effects.

---

### Layout & Component Modifications

#### [MODIFY] [Navbar.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/layout/Navbar.tsx)
- Embed `LanguageSwitcher` in header nav bar and mobile drawer.
- Localize nav labels and CTA buttons ("Book Meeting", "Let's Talk", "Available for hire").

#### [MODIFY] [Footer.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/layout/Footer.tsx)
- Localize footer text, tagline, quick links, and copyright notice.

#### [MODIFY] [HeroSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/HeroSection.tsx)
- Localize hero headline, role title, bio summary, CTA buttons, and stat labels.

#### [MODIFY] [ServicesSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ServicesSection.tsx)
- Localize service section header, card titles, descriptions, and feature bullet points.

#### [MODIFY] [ProjectsSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ProjectsSection.tsx) & [ProjectDetailModal.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ProjectDetailModal.tsx)
- Localize project category tabs, project titles, summaries, key features, solved challenges, tech stack categories, and modal buttons.

#### [MODIFY] [SkillsSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/SkillsSection.tsx)
- Localize category tabs, section titles, and proficiency badges ("Proficient" / "দক্ষ", "Familiar" / "পরিচিত").

#### [MODIFY] [ExperienceSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ExperienceSection.tsx)
- Localize timeline tabs ("Work Experience", "Education & Certifications"), roles, company descriptions, achievements, and credential badges.

#### [MODIFY] [LeadershipSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/LeadershipSection.tsx)
- Localize leadership initiative cards, roles, descriptions, and achievements.

#### [MODIFY] [ContactSection.tsx](file:///d:/internship/Task-3(Portfolio)/src/components/sections/ContactSection.tsx)
- Localize form labels, input placeholders, submit button, contact detail cards, and Sonner toast messages.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify TypeScript compilation and Next.js static site generation without build or type errors.

### Manual Verification
- Toggle between English and Bangla using the Language Switcher in desktop Navbar and mobile drawer.
- Verify state persistence across page reloads via `localStorage`.
- Verify clear font rendering and layout integrity for Bangla script (`bn`) across all sections.
