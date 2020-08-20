import './year.css';
import React from 'react';

export default function Year({ year }: { year: string }) {
  return <span className="year">{year}</span>;
}
