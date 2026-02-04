import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, className = '', onClick }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition duration-200 cursor-pointer';
  
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    secondary: 'bg-white text-red-600 border border-red-600 hover:bg-red-50 shadow-sm',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
