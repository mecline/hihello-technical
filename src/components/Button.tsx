import React from 'react';
import { ButtonProps } from '../types/types';

const Button: React.FC<ButtonProps> = ({ value, onClick, className = '', sx }) => (
  <button
    className={`h-16 flex items-center justify-center rounded-full text-2xl font-medium transition duration-100 ${className}`}
    onClick={onClick}
    style={sx as React.CSSProperties}
  >
    {value}
  </button>
);

export default Button;