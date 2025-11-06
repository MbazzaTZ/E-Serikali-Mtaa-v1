import { ReactNode } from "react";

interface GlassFormProps {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export function GlassForm({ title, onSubmit, children }: GlassFormProps) {
  return (
    <div className="bg-glass-panel backdrop-blur-md shadow-glass rounded-2xl max-w-lg mx-auto p-8 space-y-6 animate-fade-in border border-white/10">
      <h2 className="text-2xl font-bold text-primary text-center">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
}
