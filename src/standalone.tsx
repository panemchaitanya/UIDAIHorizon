// Standalone (Vercel/GitHub) implementation of the '@instinct/files' surface
// this app uses. vite.config.ts aliases '@instinct/files' here.
import React from 'react';
import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
export { Link, NavLink, Route, Routes };
export function FileCard({ children }: { children: React.ReactNode }) {
  return <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 16px 40px' }}>{children}</div>;
}
export function FileRouter({ children }: { children: React.ReactNode }) {
  return <HashRouter>{children}</HashRouter>;
}
