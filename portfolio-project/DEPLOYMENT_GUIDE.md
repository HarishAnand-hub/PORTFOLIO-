# 🚀 DEPLOYMENT GUIDE - Step by Step

## 📋 Pre-Deployment Checklist

Before deploying, make sure you've updated these personal links in `src/Portfolio.jsx`:

- [ ] Resume download link (Line 168)
- [ ] LinkedIn profile URLs (Lines 174, 439, 622)
- [ ] GitHub profile URLs (Lines 181, 445, 628)
- [ ] Project repository links (Lines 299, 311, 323, 335)
- [ ] IEEE paper DOI (Line 318)

---

## 🎯 Method 1: Deploy to Vercel (Easiest - Recommended)

### Step 1: Prepare Your Code
```bash
# Make sure everything is committed
git init
git add .
git commit -m "Initial portfolio commit"
```

### Step 2: Push to GitHub
1. Create a new repository on GitHub (name it `portfolio` or `harish-anand-portfolio`)
2. Push your code:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (use GitHub account for easy integration)
2. Click **"Add New Project"**
3. **Import** your GitHub repository
4. Vercel will auto-detect settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **"Deploy"**
6. Wait 1-2 minutes ⏳
7. Your site is live! 🎉

### Step 4: Add Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., `harishanand.dev`)
3. Update DNS records as shown by Vercel
4. Wait for DNS propagation (5-30 minutes)

**Cost:** Free forever (Vercel hobby plan)

---

## 🌐 Method 2: Deploy to Netlify

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy via Netlify
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop the `dist` folder to Netlify
3. Your site is live immediately! 🎉

### Alternative: Connect to GitHub
1. Click **"Add new site"** → **"Import an existing project"**
2. Connect GitHub and select your repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **"Deploy site"**

**Cost:** Free forever (Netlify starter plan)

---

## 💻 Method 3: Traditional Hosting (cPanel/FTP)

If you have traditional web hosting:

### Step 1: Build for Production
```bash
npm run build
```

### Step 2: Upload Files
1. Open your hosting cPanel or FTP client
2. Navigate to `public_html` or `www` directory
3. Upload ALL files from the `dist` folder
4. Your site is live at your domain! 🎉

---

## 🔒 Method 4: GitHub Pages (Free)

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add these lines:
```json
{
  "homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Deploy
```bash
npm run deploy
```

Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

---

## 🎨 Custom Domain Setup

### For Vercel:
1. Buy domain from Namecheap, GoDaddy, or Google Domains
2. In Vercel: Settings → Domains → Add domain
3. Update DNS records:
   - Type: **A Record** | Name: **@** | Value: **76.76.21.21**
   - Type: **CNAME** | Name: **www** | Value: **cname.vercel-dns.com**

### For Netlify:
1. In Netlify: Site settings → Domain management → Add custom domain
2. Update DNS records as shown by Netlify

### DNS Propagation
- Takes 5-30 minutes (sometimes up to 24 hours)
- Check status at: [dnschecker.org](https://dnschecker.org)

---

## ⚡ Performance Optimization Tips

After deployment:

1. **Enable HTTPS** (automatic on Vercel/Netlify)
2. **Add Analytics** (Vercel Analytics or Google Analytics)
3. **Test Performance**:
   - PageSpeed Insights: [pagespeed.web.dev](https://pagespeed.web.dev)
   - GTmetrix: [gtmetrix.com](https://gtmetrix.com)
4. **Set up monitoring** (Uptime Robot for free monitoring)

---

## 🐛 Troubleshooting

### Build fails on Vercel/Netlify
- Check Node version: Should be v16 or higher
- Run `npm install` and `npm run build` locally first
- Check for console errors

### Site loads but looks broken
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check if all dependencies installed
- Verify Tailwind CSS is configured correctly

### 404 errors on refresh
- For Vercel: Automatic SPA handling ✅
- For Netlify: Add `_redirects` file with: `/* /index.html 200`

---

## 📊 Post-Deployment Checklist

- [ ] Site loads correctly on desktop
- [ ] Site loads correctly on mobile
- [ ] All links work (LinkedIn, GitHub, email)
- [ ] Contact form sends emails
- [ ] Animations work smoothly
- [ ] No console errors
- [ ] Custom domain configured (if using)
- [ ] HTTPS enabled (should be automatic)
- [ ] Share your portfolio! 🎉

---

## 🎓 Next Steps

1. **Share your portfolio:**
   - Update LinkedIn with portfolio link
   - Add to GitHub profile README
   - Include in resume

2. **Get feedback:**
   - Share with friends/mentors
   - Post on Reddit r/webdev
   - LinkedIn post

3. **Keep updating:**
   - Add new projects
   - Update experience
   - Refine animations

---

**Need Help?** 
- Email: harishanand077@gmail.com
- GitHub Issues: Create issue in your repo

**Estimated Time:** 10-15 minutes for first deployment! 🚀
