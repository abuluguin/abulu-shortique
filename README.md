# ABULU Shortique website

*Short. Funny. Unpredictable.*

A completely static website (HTML + CSS + JavaScript). No backend, no database, no paid service.
It is built to be hosted for free on **GitHub Pages**.

---

## 1. File structure

```
abulu-shortique/                 <- the repository (upload everything inside this folder)
├── index.html                   the page (SEO tags live here)
├── 404.html                     "page not found" page
├── robots.txt                   tells search engines they are welcome
├── sitemap.xml                  list of pages for Google
├── site.webmanifest             lets phones "Add to Home Screen" with the right icon
├── favicon.svg                  browser tab icon (modern browsers)
├── favicon.ico                  browser tab icon (older browsers)
├── .nojekyll                    tells GitHub Pages not to process the files (keep it!)
├── README.md                    this guide
├── css/
│   └── style.css                all the design (colours are at the top)
├── js/
│   ├── data.js                  *** YOUR CONTENT: Shorts, characters, milestones, followers, ideas ***
│   └── app.js                   the code that builds the page from data.js (no need to edit)
├── fonts/
│   └── bangers.woff2            the logo font
├── images/
│   ├── avatar.jpg               round logo picture
│   ├── fan.jpg                  Fan's character picture
│   ├── duck.jpg                 Duck's character picture
│   ├── og-image.jpg             picture shown when the link is shared (1200x630)
│   ├── icon-192.png             app icon
│   ├── icon-512.png             app icon
│   ├── apple-touch-icon.png     iPhone home-screen icon
│   └── thumbs/                  one thumbnail per Short (13 files)
└── videos/                      one MP4 per Short (13 files)
```

---

## 2. BEFORE you upload: put in your own web address (2 minutes)

Your final address will be:

```
https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/
```

The text `YOUR-GITHUB-USERNAME` appears in **4 files**. After you create your GitHub account
(step 3), replace it with your real username (all lowercase is safest) in:

| File | What to change |
|------|----------------|
| `index.html` | search for `YOUR-GITHUB-USERNAME` - there are 6 places (canonical, og:url, og:image, twitter:image, structured data) |
| `robots.txt` | the `Sitemap:` line |
| `sitemap.xml` | the `<loc>` line |
| `js/data.js` | `url:` inside `SITE` |

Easiest way: before uploading, open each of the 4 files in any text editor (Notepad, TextEdit in plain-text mode,
VS Code) and use **Find & Replace -> Replace All**: find `YOUR-GITHUB-USERNAME`, replace with your username. Save. Then upload.
(Or do it after uploading: open the file on GitHub, click the pencil icon, edit, **Commit changes**.)
If you name the repository something other than `abulu-shortique`, change that part of the address too.

---

## 3. Create the GitHub repository

1. Go to **https://github.com** and click **Sign up**. Choose a username (this becomes part of your web address). Verify your email.
2. Log in. Click the **+** button (top right) -> **New repository**.
3. Fill in:
   - **Repository name:** `abulu-shortique`
   - **Description:** `ABULU Shortique - Short. Funny. Unpredictable.` (optional)
   - Choose **Public** (GitHub Pages is free for public repositories)
   - Leave **Add a README file** unticked (our folder already has one)
4. Click **Create repository**.

---

## 4. Upload the files

Use a **computer** (Windows / Mac) for this step - phones cannot upload whole folders.

1. Unzip `abulu-shortique-site.zip`. Open the unzipped folder. You should see `index.html`, `css`, `js`, `images`, `videos` ... directly inside.
2. On your new repository page, click **uploading an existing file** (or **Add file -> Upload files**).
3. Select **everything inside the folder** (Windows: `Ctrl+A`, Mac: `Cmd+A`) and **drag it into the browser window**.
   Wait until every file shows as uploaded (the videos take a minute). Make sure the folders `css`, `js`, `images`, `videos`, `fonts` appear in the list.
   > The upload page accepts up to 100 files at a time. This site has about 50, so one go is enough.
   > If `.nojekyll` did not come along (hidden files are sometimes skipped): click **Add file -> Create new file**, type `.nojekyll` as the name, and click **Commit changes**.
4. Scroll down. In the box write `Upload website`, keep **Commit directly to the main branch**, click **Commit changes**.

**Alternative (GitHub Desktop):** install https://desktop.github.com, sign in, **File -> New repository** (name `abulu-shortique`), copy the files into the folder it makes, click **Commit to main**, then **Publish repository** (untick "Keep this code private").

**Alternative (command line):**
```
cd abulu-shortique
git init
git add .
git commit -m "Upload website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/abulu-shortique.git
git push -u origin main
```

---

## 5. Turn on GitHub Pages

1. In your repository click **Settings** (top row of tabs).
2. In the left menu click **Pages**.
3. Under **Build and deployment -> Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and the folder **/ (root)**, then click **Save**.
5. Wait 1-3 minutes and refresh the page. A green box appears:
   **"Your site is live at https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/"**
6. Click **Visit site**. Open it on your phone too.

### Your public URL
```
https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/
```
Example: if your username is `khadhijah`, the address is `https://khadhijah.github.io/abulu-shortique/`.
(The `/abulu-shortique/` at the end matches the repository name. Keep the final `/`.)

---

## 6. Connect to Google Search Console

Google only lists a site after you prove it is yours.

1. Go to **https://search.google.com/search-console** and sign in with your Google account.
2. Click **Add property** (top-left drop-down).
3. Choose the **right-hand box: "URL prefix"** (the left "Domain" option does not work for github.io).
4. Type your full address **exactly**, with `https://` and the final `/`:
   `https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/`
   Click **Continue**.
5. Pick a verification method. **Easiest: "HTML tag"**
   1. Google shows a line like: `<meta name="google-site-verification" content="abc123..." />` - copy it.
   2. On GitHub open `index.html` -> click the pencil icon.
   3. Find the line `<meta name="robots" ...>` near the top and paste the copied line on a new line right under it.
   4. Click **Commit changes**. Wait about a minute for GitHub Pages to update.
   5. Go back to Search Console and click **Verify**. You should see "Ownership verified".

   *Other method: "HTML file"* - download the file Google gives you (named like `google1234abcd.html`), upload it to the **root** of the repository (**Add file -> Upload files**), wait a minute, open `https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/google1234abcd.html` to check it loads, then click **Verify**.
6. Keep the verification tag/file in the repository forever, or Google may un-verify you.

---

## 7. Submit the sitemap to Google

1. In Search Console choose your property (top-left).
2. In the left menu click **Sitemaps**.
3. Under **Add a new sitemap** type just: `sitemap.xml`
4. Click **Submit**. Status should change to **Success** (can take a few hours).
5. To speed things up: top search bar -> paste your address -> **Request indexing**.

Google can take from a few days to a few weeks to show a brand-new site in search results. That is normal.
Check `https://YOUR-GITHUB-USERNAME.github.io/abulu-shortique/sitemap.xml` loads in your browser first.

> Honest note about `robots.txt`: search engines only read `robots.txt` at the very top of a domain
> (`https://YOUR-GITHUB-USERNAME.github.io/robots.txt`), which you do not control on a free project site.
> The file is included as requested and does no harm; your sitemap submission in Search Console is what matters.
> A custom domain (optional, ~RM50/year) would make `robots.txt` work at the top level.

---

## 8. HOW TO UPDATE THE WEBSITE LATER

Everything you will change is in **`js/data.js`**. It has clearly labelled sections with comments.

**To edit a file on GitHub:** open the file -> click the pencil icon -> change it -> **Commit changes**. The site refreshes in about a minute.
**To add pictures/videos:** open the folder (e.g. `videos`) -> **Add file -> Upload files**.

### Add a new Short
1. Upload the thumbnail (JPG, 9:16, ~360x640) to `images/thumbs/` e.g. `my-new-short.jpg`
2. Upload the MP4 (720p, under 25 MB) to `videos/` e.g. `my-new-short.mp4`
3. In `js/data.js`, find `var SHORTS = [`, scroll to the last block, add a comma after its `}` and paste this under it:
```js
  {
    id: "my-new-short",
    title: "My New Short",
    description: "One or two funny sentences.",
    thumbnail: "images/thumbs/my-new-short.jpg",
    video: "videos/my-new-short.mp4",
    watchUrl: "https://www.youtube.com/shorts/XXXXXXXX",
    views: 1200,
    date: "2026-10-30",
    duration: "0:30",
    tags: ["fan"],
    milestone: ""
  }
```
   - The newest Short is always the **last** one in the list.
   - No video file? Leave `video: ""` and fill `watchUrl`: the Watch button opens YouTube/TikTok instead.
   - Don't want to host the video here? Same thing - use only `watchUrl`.

### Update the follower chart
In `FOLLOWER_HISTORY` add one line at the bottom, then commit:
```js
  { date: "2026-10-30T21:00:00+08:00", followers: 25 },
```
The big follower number, progress bar, milestones and stats all update by themselves.

### Update view counts
Change `views: null` to a number (`views: 1250`) in any Short.

### Milestones / Characters / Fan Ideas / What's new / Ticker
Each is a list in `data.js` - copy a block, paste it, change the words. Fan idea statuses are `"idea"`, `"planned"`, `"making"`, `"made"`.

### Social links and the idea inbox
In `SITE.links` fill in YouTube / TikTok / Instagram / Facebook links (empty `""` hides the button).
In `SITE.ideaInbox` set `githubRepo: "your-username/abulu-shortique"` and/or `email: "you@example.com"` so the "Suggest an idea" form can send ideas to you.

### If something breaks
99% of the time it is a missing comma or quote in `data.js`. Open the site, press `F12` -> Console, and it tells you the line. Or re-upload the original `data.js`.

---

## 9. Good to know

- **No likes/comments/live counter.** A free static site cannot store visitor data. Visitors comment on your YouTube/TikTok Shorts instead.
- **Fan Ideas** from visitors reach you by GitHub issue or email (see above) - you then paste the good ones into `FAN_IDEAS`.
- GitHub Pages limits: site up to 1 GB, about 100 GB bandwidth per month. This site is ~58 MB, so you can host roughly 12 more Shorts before you may want to rely on YouTube links.
- There is one small hidden duck somewhere on the site. It lives in the function `initSecrets()` in `js/app.js` if you ever want to change it. 🦆
