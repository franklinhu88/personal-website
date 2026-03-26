# Franklin Hu – Personal Portfolio Website

Welcome to my personal website and portfolio! This project showcases my **experience, projects, and technical skills**, and serves as a platform to experiment with **frontend/backend integration** and various public APIs.

---

## 🌐 Live Site

> Hosted on Vercel: [https://franklin-hu.vercel.app](https://franklin-hu.vercel.app)

---

## 💡 About

This website is designed to:

* Present my professional experience and projects in a **LinkedIn-style layout**.
* Highlight technical skills and hands-on projects.
* Integrate with **real-time APIs** like Spotify and Discord to show dynamic activity/status.
* Serve as a platform for experimentation with **modern web technologies**.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend/API:** Node.js, Express, Resend (for contact form emails)
* **Deployment:** Vercel
* **APIs:** Spotify Web API, Discord API

---

## ✨ Features

* **Profile Section:** LinkedIn-style profile with photo, headline, and about section.
* **Experience Section:** Full list of internships, research, and team roles with bullet highlights.
* **Projects Section:** Detailed project cards with descriptions, tech used, motivation, and GitHub links.
* **Dynamic Status Panel:** Real-time Spotify/Discord status tracking (via backend).
* **Contact Form:** Send me an email securely via Resend API.
* **Responsive Layout:** Works on desktop and mobile with sticky sidebar and smooth scrolling navigation.

---
## 🔌 Spotify (Currently Playing)

To enable the live “currently listening” line in the right sidebar, set these environment variables:

* `SPOTIFY_CLIENT_ID`
* `SPOTIFY_CLIENT_SECRET`
* `SPOTIFY_REFRESH_TOKEN`

Your Spotify app must request the `user-read-currently-playing` scope, and the refresh token must correspond to that authorization.

---

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/franklinhu88/personal-website.git
cd personal-website
```

2. Install dependencies:

```bash
npm install
```

3. Run locally:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔗 Adding Your Own Projects or Experience

* Edit `ExperienceSection.tsx` to add/remove experience items.
* Edit `ProfileSection.tsx` to add/remove project cards.
* Use `/assets/` to store logos or images referenced by your items.

---

## 📧 Contact

You can reach me via the **contact form** on this site or directly at:

**Email:** [franklinhu88@gmail.com](mailto:franklinhu88@gmail.com)

