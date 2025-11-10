import { ReactNode } from 'react';

interface MenuButtonProps {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function MenuButton({ children, onClick, icon, variant = 'primary' }: MenuButtonProps) {
  const baseClasses = "w-full px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-3";

  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white",
    secondary: "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white",
    danger: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {icon && <span className="text-2xl">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
