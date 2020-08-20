import React from 'react';

export default function Label({ text }: { text: string }) {
  return (
    <span
      style={{
        cursor: 'default',
        display: 'inline-block',
        lineHeight: 0.1,
        verticalAlign: 'baseline',
        margin: '0 .15rem',
        padding: '.5rem .5rem',
        fontWeight: 700,
        border: '1px solid currentColor',
        borderRadius: '.28571429rem',
        fontSize: '.7rem',
      }}
    >
      {text}
    </span>
  );
}
