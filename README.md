# Calculator UI

A simple, production-ready calculator frontend that implements **ADR-001**: Show the user's input expression in a dedicated display area.

## Quick Start

1. Ensure you have Node.js installed.
2. Run `npm install` (optional – only needed if you add dependencies).
3. Run `npm start` to launch a local development server (default: http://localhost:3000).
4. Open the URL in your browser.

## Features

- **Input Display**: Lives as the user types or clicks buttons, showing the concatenated expression (e.g., `12+3*4`).
- **Result Display**: Shows the computed result after pressing `=`.
- **Basic arithmetic**: addition, subtraction, multiplication, division.
- **Clear button** to reset both displays.

## Architecture

Single-page static application built with vanilla HTML, CSS, and JavaScript. No external frameworks or back-end required.

## ADR Reference

- **ADR-001**: Added a dedicated read-only input display area to the calculator UI (see `index.html`). Refer to the ADR for rationale and alternatives.
