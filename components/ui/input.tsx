import React from 'react';

export function Input({ placeholder }: { placeholder: string }) {
  return <input className="border p-2 rounded w-full" placeholder={placeholder} />;
} 