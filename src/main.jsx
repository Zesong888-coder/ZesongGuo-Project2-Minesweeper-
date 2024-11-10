import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';


import WelcomePage from './components/WelcomePage';
import RulesPage from './components/RulesPage';
import GamePage from './components/GamePage';
import './index.css';

// Set up routing configuration with different paths
const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,  // Homepage for the game title and welcome
  },
  {
    path: '/rules',
    element: <RulesPage />,    // Rules page for game instructions
  },
  {
    path: '/game/:difficulty',
    element: <GamePage />,     // Game page with dynamic difficulty
  },
]);

// Render the application with RouterProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
