👾 2048 Game: Aesthetic React/TypeScript Implementation: 

This project is a modern, responsive implementation of the classic 2048 game, developed using React, TypeScript, and styled with Tailwind CSS to achieve a high-contrast, aesthetic dark theme. The design emphasizes clean component separation and robust, pure game logic.

Project Deliverables Summary:
Public GitHub Repository      ✅ - https://github.com/ankushjana29/2048-Game

Graphical User Interface (GUI)✅ - Web-based, built with React components.

Deployed Application Link     ✅ - https://2048-game-n3lq.vercel.app/

README Documentation          ✅ - This document.

🚀 Deployed Application (Web-Based GUI):
The game is hosted and fully playable in any modern web browser.
Deployed Link: [INSERT YOUR DEPLOYMENT LINK HERE (e.g., Vercel or Netlify)]

🕹️ Gameplay Instructions:
The goal is to merge numbered tiles to reach the 2048 tile.
Movement: Use the Arrow Keys (Up, Down, Left, Right) on your keyboard OR click the on-screen directional buttons.

Merging: When two tiles with the same number collide during a move, they merge into a single tile with the sum of their values (e.g., $2 + 2 = 4$).

Spawning: After every successful move, a new '2' or '4' tile appears in a random empty spot on the board.

Winning: The game is won when the 2048 tile is created.

Losing: The game ends when the board is full and no further moves or merges are possible.


🛠️ Implementation Details:
Technology Stack:
Frontend - React (Functional Components, Hooks)

Language - TypeScriptStyling: Tailwind CSS (for responsiveness and modern utility classes) and custom CSS variables (for specific tile colors).

Build Tool - Vite (for fast development and production builds).

Architecture and Design Choices:

Pure Game Logic - The core mechanics (e.g., moveUp, slideAndMerge) are kept entirely separate in src/logic/game.ts. These functions are pure (no side effects) and only manipulate data structures (Board), making them highly testable and robust.

Component Separation - The application is divided into three focused components: App.tsx (State Management), Board.tsx (Layout and Positioning), and Controls.tsx (User Input).

Styling - Achieved a high-contrast, dark aesthetic by defining a custom color palette in src/App.css and leveraging Tailwind utility classes for layout and interactive effects (e.g., 3D button press).

Module Handling - Fixed persistent build errors by standardizing all component imports/exports to the Named Export Pattern (import { Component } from '...').

⚙️ Installation and Running Locally:

To run this project on your local machine, follow these steps:

Clone the Repository -

git clone https://github.com/ankushjana29/2048-Game

cd 2048-aesthetic-game

Install Dependencies -
npm install

Start the Development Server -
npm run dev

The game will open in your browser, typically at http://localhost:5173.
