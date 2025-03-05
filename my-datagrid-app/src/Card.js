import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <h2 className="card-title">Dettagli documenti presenti</h2>
      </div>
      <div className="card-content">
        <h4 className="card-title">Cntenuto Card</h4>
      </div>
    </div>
  );
};

export default Card;