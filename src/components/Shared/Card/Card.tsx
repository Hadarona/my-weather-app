import React from 'react';
import './Card.css'

interface ICardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<ICardProps> = ({ title, children, className }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-content">
        <p>{title}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;