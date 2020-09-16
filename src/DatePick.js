import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import './App.css'

 
export default function DatePick() {
  const [value, onChange] = useState(new Date());
 
  return (
    <div>
      <DatePicker className="datePicker"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}