// Platform module: re-exported so app code never imports '@instinct/files'
// directly. Standalone builds (GitHub/Vercel) alias '@instinct/files' to
// src/standalone.ts via vite.config.ts.
export { Link, NavLink, Route, Routes, FileCard } from '@instinct/files';
