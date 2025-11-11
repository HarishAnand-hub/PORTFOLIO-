# 🤖 Harish Anand - Robotics & AI Engineer Portfolio

A modern, animated portfolio website built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌓 Modern gradient effects
- 🚀 Optimized performance
- 💫 Particle background animations
- 📧 Contact form integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

Your portfolio will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## 🔧 Customization

Before deploying, update these placeholders in `src/Portfolio.jsx`:

### 1. Resume Link (Line ~168)
```javascript
href="https://drive.google.com/file/d/YOUR-RESUME-ID/view"
```

### 2. LinkedIn URL (Lines ~174, 439, 622)
```javascript
href="https://linkedin.com/in/YOUR-LINKEDIN-USERNAME"
```

### 3. GitHub Username (Lines ~181, 445, 628)
```javascript
href="https://github.com/YOUR-GITHUB-USERNAME"
```

### 4. Project GitHub Repos (Lines ~299, 311, 323, 335)
```javascript
github: 'https://github.com/YOUR-USERNAME/PROJECT-REPO-NAME'
```

### 5. IEEE Paper DOI (Line ~318)
```javascript
paper: 'https://doi.org/YOUR-PAPER-DOI'
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect the settings
6. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

### Custom Domain (Optional)

After deploying, you can add a custom domain like `harishanand.dev`:

**On Vercel:**
- Go to your project → Settings → Domains
- Add your custom domain
- Update DNS records as shown

**On Netlify:**
- Go to Site settings → Domain management
- Add custom domain
- Follow DNS configuration instructions

## 📂 Project Structure

```
portfolio-project/
├── src/
│   ├── Portfolio.jsx      # Main portfolio component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & Tailwind
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## 🎨 Tech Stack

- **Framework:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Vercel / Netlify

## 📧 Contact

- **Email:** harishanand077@gmail.com
- **LinkedIn:** [Your LinkedIn Profile]
- **GitHub:** [Your GitHub Profile]

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with 💙 by Harish Anand
