import React from 'react'

type Props = {
  label: string;
  isSelected?: boolean;
  onSelect: (label: string) => void;
}

const TimeSlot = ({label, isSelected, onSelect}: Props) => {
  return (
    <button 
      type='button'
      onClick={() => onSelect(label)}
      className={`
        flex align-middle justify-center
        rounded-lg text-base p-4.25 bg-white cursor-pointer
        ${isSelected ? 'border-active-100 border-2' : 'border-lavander-100 border'}
        `}>
      {label}
    </button>
  )
}

export default TimeSlot