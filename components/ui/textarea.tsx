import React from 'react';

export function Textarea({ placeholder }: { placeholder: string }) {
  return <textarea className="border p-2 rounded w-full" placeholder={placeholder}></textarea>;
} 