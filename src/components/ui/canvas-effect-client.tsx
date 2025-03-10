'use client';

import dynamic from 'next/dynamic';

export const CanvasRevealEffect = dynamic(
  () => import('./canvas-effect').then((mod) => mod.CanvasRevealEffect),
  { ssr: false }
);

export default CanvasRevealEffect; 