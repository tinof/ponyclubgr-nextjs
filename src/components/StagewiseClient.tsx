'use client';

import dynamic from 'next/dynamic';
import ReactPlugin from '@stagewise-plugins/react';

// Dynamically import the StagewiseToolbar with SSR disabled
const StagewiseToolbar = dynamic(
  () => import('@stagewise/toolbar-next').then((mod) => ({ default: mod.StagewiseToolbar })),
  { ssr: false }
);

export function StagewiseClient() {
  return <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />;
}
