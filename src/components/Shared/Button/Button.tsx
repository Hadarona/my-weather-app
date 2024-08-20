import React from 'react';
import './Button.css';

interface IButtonProps {
  type?: 'button' | 'reset' | 'submit';
  onClick: () => void;
  children: React.ReactNode;
  text?: string;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({ text, type, onClick, children, className = "" }) => {
  return (
    <button className={`regular-button ${className}`} type={type} onClick={onClick}>
      {text || children}
    </button>
  );
};

export default Button;
