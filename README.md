# Mila's Indonesian Adventure 🦋

A tiny, visual, Duolingo-style app to help my 5-year-old **Mila** learn **Bahasa Indonesia**. Her mom's from Jakarta, her *Yangti* and *Yangkung* live there, and she visits often — but she's growing up in Germany with German and English as her strongest languages. This app is how we keep Indonesian fun for her.

## What makes it work for a 5-year-old

- **No reading required.** She can't read yet. Every instruction is spoken, every answer is a picture or her own voice.
- **Two voices.** The narrator speaks English (or German — togglable) and explains what to do. The target word is always spoken in Indonesian.
- **Personalized.** Her family (Mama, Papa, adik Kian, Yangti, Yangkung, Oma), her school (Bienenkorb), her favorite foods (pommes, bolognese), Jakarta, Nürnberg — all woven into lessons.
- **Gentle.** Hearts regenerate, "wrong" is never harsh, there's always a ⭐ "I said it!" override on speaking exercises.

## Features

- **10 units** × 2–3 lessons each: Keluarga, Salam, Angka, Warna, Makanan, Hewan, Mainan, Badan, Kegiatan, Tempat
- **5 exercise types**: HearAndPick, PictureMatch, TrueFalse, WhoIsThis, and 🎤 **SayIt** (speaking with in-browser recognition + playback)
- **4 per-lesson minigames** (Balloon Pop, Memory Match, Feed the Kucing, Dance Party) and **4 big per-unit minigames** (Fashion Studio, Swimming with Ikan, Jakarta Trip, Kitchen with Mama)
- **Sticker book** collects a themed sticker per unit; tap one to hear its word
- **Streak butterfly** that grows more colorful the longer she plays
- Comic-style **SVG avatars** for the whole family — no photos shipped

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Tech

- Vite + React 18 + TypeScript + Tailwind CSS
- Framer Motion for bouncy animations
- Web Speech API `speechSynthesis` for Indonesian/English/German playback
- Web Speech API `SpeechRecognition` (Chrome/Safari) for speaking practice, with MediaRecorder-based voice playback
- LocalStorage for progress — nothing leaves the device

## Browser support notes for parents

- **Best**: iPad Safari, macOS Safari, Chrome, Edge. All ship Indonesian and English TTS voices.
- **Speech recognition** works in Chrome, Edge, and Safari 14.5+. Firefox has no recognition API — SayIt falls back to record + playback + self-grade.
- If you don't hear an Indonesian voice on macOS: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → add *Indonesian*.

## Privacy

Everything runs in the browser. No accounts, no analytics, no uploads. Speech recognition and microphone recordings stay on-device and are discarded when the exercise ends.

## For Mila ❤️

Selamat belajar, anak cantik! 🦋
