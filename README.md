# Ali Web Studio — Official Portfolio Website

> Modern Websites. Built to Make Your Business Stand Out.

A high-end personal agency portfolio website for **Ali Web Studio**, an independent web design and development studio focusing on modern, responsive, and conversion-focused websites for businesses, local brands, startups, and personal brands.

---

## 🚀 Live Demo & Concept Showcases

- **Main Studio**: [Ali Web Studio](https://aliwebstudio.co) (Preview)
- **Apex Auto Detailing**: [Live Demo](https://apex-auto-detailing-demo.pages.dev/)
- **Lumiere Dental Demo**: [Live Demo](https://ali25cit235-boop.github.io/Lumiere-Dental-Demo/)
- **FLAVORS Restaurant**: [Live Demo](https://flavourz-restaurant-demo.netlify.app/)

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Language**: TypeScript / Modern JavaScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (`framer-motion`)
- **Icons**: Lucide React (`lucide-react`)
- **Typography**: Syne (Display), Plus Jakarta Sans (Body), JetBrains Mono (Data/Code)
- **Deployment Target**: Cloudflare Pages / GitHub Pages / Vercel (Pure static single-page app, zero backend required)

---

## 📁 Central Configuration (`src/data/siteConfig.ts`)

All studio information, contact details, social links, portfolio projects, services, statistics, and methodology steps are managed centrally in:

```
src/data/siteConfig.ts
```

### Updating Contact Details
- **Email**: Edit `siteConfig.contact.email`
- **Instagram**: Edit `siteConfig.contact.instagramHandle` and `siteConfig.contact.instagramUrl`
- **Telegram**: Edit `siteConfig.contact.telegramHandle` and `siteConfig.contact.telegramUrl`
- **WhatsApp**: Update `siteConfig.contact.whatsappNumber` with your phone number (e.g., `"14155552671"` without `+` or spaces). When left empty, the site automatically displays `"WhatsApp number to be added"` and provides direct Email and Telegram options.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` (or the port Vite provides) in your browser.

### 3. Production Build
```bash
npm run build
```
This generates the optimized, production-ready static assets in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Cloudflare Pages Deployment & Custom Domain

This project is 100% static and configured for instant zero-configuration deployment to **Cloudflare Pages**:

### Step 1: Deploy to Cloudflare Pages
1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your GitHub repository (`ali-web-studio`).
4. In the **Build configuration** settings:
   - **Framework preset**: `React (Vite)`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: *(leave blank)*
   - **Node version**: `22` (configured via `.nvmrc` in repository root, or Environment Variable `NODE_VERSION` = `22`)
5. Click **Save and Deploy**.

### Step 2: Connect your Custom Domain (e.g. aliwebstudio.co)
1. In Cloudflare Pages, go to your project → **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter your domain name (e.g. `aliwebstudio.co` or `www.aliwebstudio.co`).
4. Cloudflare automatically sets up DNS CNAME routing and provisions an SSL certificate within a few minutes.
5. Your studio website is now live on your custom domain!

---

## 🐙 Uploading to GitHub

To push this codebase to your own GitHub account:

```bash
# Initialize git repository (if not already initialized)
git init

# Add all files
git add .

# Commit changes
git commit -m "feat: initial Ali Web Studio portfolio release"

# Rename branch to main
git branch -M main

# Link to your new GitHub repository
git remote add origin https://github.com/<YOUR-USERNAME>/ali-web-studio.git

# Push to GitHub
git push -u origin main
```

---

## 📬 Brand Contact Details

- **Email**: [aliwebstudio.co@gmail.com](mailto:aliwebstudio.co@gmail.com)
- **WhatsApp**: [+92 310 6449454](https://wa.me/923106449454)
- **Instagram**: [@aliwebstudio.co](https://www.instagram.com/aliwebstudio.co/)
- **Telegram**: [@aliwebstudio_co](https://t.me/aliwebstudio_co)

---

## 📄 License

Independent Web Design & Development Studio © All rights reserved.
