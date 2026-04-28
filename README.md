# Hover Play — Video Gallery

A minimal, dark-themed webpage with **3 hover-to-play video cards**. No native browser video controls — just a clean mute/unmute button per card.

## Features
- ▶ Videos play **only on hover** and pause + reset when cursor leaves
- 🔇 Each card has its own **mute / unmute** toggle button (no other controls)
- 🎨 Rounded corners on every player
- 📱 Responsive grid (stacks on mobile)
- Zero dependencies — pure HTML, CSS, JS

## File structure
```
/
├── index.html
├── style.css
└── script.js
```

## How to use
1. Clone / download the repo
2. Open `index.html` in a browser — no build step needed
3. Replace the `src` attributes in `index.html` with your own video URLs or local files

## Customising videos
In `index.html`, each `<video>` tag has:
```html
<video class="vid" loop muted playsinline
  src="YOUR_VIDEO_URL"
  poster="YOUR_THUMBNAIL_URL">
</video>
```
Swap `src` and `poster` for your own content.

## License
MIT
