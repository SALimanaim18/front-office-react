import React from 'react';

export function RadioGroup({ children, defaultValue }) {
  return <div>{children}</div>;
}

export function RadioGroupItem({ value, id }) {
  return <input type="radio" name="role" value={value} id={id} className="mr-2" />;
}
