# Simple Calculator

A minimalist, client-side calculator application built as a single-page application (SPA) using HTML, CSS, and vanilla JavaScript.

## Architecture Decisions (ADR)

This project follows the agreed Architecture Decision Records:

- **ADR-001**: Client-Side SPA – all logic runs in the browser; no server required.
- **ADR-002**: Functional Approach – arithmetic operations are implemented as pure functions (`add`, `subtract`, `multiply`, `divide`).

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Percentage and negation
- Clear display (C)
- Keyboard support
- Division by zero error handling
- Responsive design

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)

### Running Locally

Simply open `index.html` in your browser. For a more realistic dev experience, serve it via a lightweight HTTP server:

```bash
# If you have Node.js installed
npm install -g http-server
http-server . -o
```

Or use Python:
```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Project Structure

```
.
├── index.html      # Main calculator application (HTML, CSS, JS)
├── README.md       # This file
├── package.json    # Optional: for local development server
└── .gitignore      # Ignores node_modules (if using npm)
```

## Usage

- Click the buttons or use your keyboard.
- Numbers: `0-9`, decimal `.`
- Operators: `+`, `-`, `*`, `/`
- Equals: `Enter` or `=`
- Clear: `Escape` or `C` button
- Backspace: `Backspace` key

## Build & Deploy

No build step required. Deploy `index.html` to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## License

MIT
