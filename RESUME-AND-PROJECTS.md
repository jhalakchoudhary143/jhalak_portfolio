# Resume link + project summary (Jhalak)

## Resume par kaunsa link lagana hai? (localhost mat likhna)

**Ek hi public link copy karo — apna deployed portfolio:**

```
https://jhalak-portfolio.vercel.app
```

- Ye value file **`src/lib/constants.ts`** mein **`RESUME_PORTFOLIO_URL`** hai.
- Pehli baar **Vercel** par deploy karne ke baad jo URL mile (jaise `https://tumhara-project.vercel.app`), wahi yahan aur resume dono jagah same rakho.
- **`.env.local`** mein bhi optional: `NEXT_PUBLIC_SITE_URL=https://wahi-url.vercel.app` (metadata / sitemap ke liye).

Resume mein example line:

> Portfolio: https://jhalak-portfolio.vercel.app  
> (GitHub repos project cards se — Amazon clone, etc.)

---

## Projects kahan add / delete karne hain?

| Kaam | File |
|------|------|
| Project **list**, titles, descriptions, tech tags, **GitHub / Live links** | **`src/lib/constants.ts`** → array **`PROJECTS`** |
| Resume / site ka **ek hi live URL** | Same file → **`RESUME_PORTFOLIO_URL`** (aur **`SITE.url`** isi se match rehta hai) |
| About text, social links | **`src/lib/constants.ts`** → `ABOUT_TEXT`, `SOCIAL` |
| Assistant ke answers (FAQ text) | **`src/lib/assistant-knowledge.ts`** |

**Delete:** `PROJECTS` array se poora `{ ... }` block hata do.  
**Add:** existing project jaisa naya object copy karke `id`, `title`, `description`, `tech`, `gradient`, `links` badlo. Optional: `"badge": "In progress"`.

---

## Abhi site par kaunse projects dikh rahe hain?

1. **Amazon Clone** — GitHub link (apna real repo URL `constants.ts` mein daalna).  
2. **Train Reservation System** — *In progress* badge; links abhi khali (repo public karte hi `links` mein GitHub add karna).  
3. **Portfolio Website** — **Live** = `RESUME_PORTFOLIO_URL`, **GitHub** = portfolio repo (URL apne hisaab se).

Purane sample projects (e-commerce dashboard, weather, chat, etc.) **remove** kar diye gaye.

---

## Tech stack — kya use hua, versions (~`package.json`)

| Tool | Version (approx) | Use |
|------|------------------|-----|
| **Next.js** | 16.2.x | App Router, pages, API route `/api/chat`, SEO |
| **React** | 19.2.x | UI |
| **TypeScript** | 5.x | Types |
| **Tailwind CSS** | 4.x | Styling |
| **Framer Motion** | 12.x | Animations |
| **Three.js** + **R3F** + **drei** | 0.183 / 9.x / 10.x | 3D assistant |
| **next-themes** | 0.4.x | Dark / light mode |
| **react-hook-form** | 7.x | Contact form |
| **@emailjs/browser** | 4.x | Email from browser (optional keys) |
| **lucide-react** | 1.x | Icons (brand icons custom SVG) |

Optional: **`OPENAI_API_KEY`** → assistant zyada smart answers (server env).

---

## Theory / concepts — kya seekhne jaisa hai (short)

| Topic | Kitna / kya |
|-------|----------------|
| **Responsive UI** | Mobile-first, breakpoints, flex/grid |
| **Component structure** | Reusable sections, separation of data (`constants`) vs UI |
| **Animations** | Scroll / hover motion, flip cards, page transitions |
| **3D (basic)** | Scene, lights, mesh, `useFrame` animation |
| **API route** | Next.js `POST` handler for chat + optional OpenAI |
| **Forms & validation** | React Hook Form, EmailJS |
| **SEO basics** | `metadata`, `robots`, `sitemap`, one canonical URL |
| **Deployment** | Static + serverless API on Vercel |

Ye portfolio **full course** nahi hai — practical **project-based** mix: frontend heavy, thoda backend (API route), deployment-ready.

---

## GitHub URLs galat hon to

`constants.ts` mein `jhalak-choudhary` / repo names apne **real** GitHub username aur repo se replace karo. Train project ke liye jab repo ho:

```ts
links: [{ label: "GitHub", href: "https://github.com/USERNAME/REPO" }],
```

---

*Last updated with your 3-project list: Amazon clone, Train reservation (WIP), Portfolio.*
