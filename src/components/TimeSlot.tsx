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
        rounded-lg text-base px-4.25 py-3.5 bg-white cursor-pointer
        border-lavander-100 border
        ${isSelected && 'ring-2 ring-active-100 outline-active-100 border-transparent'}
        `}>
      {label}
    </button>
  )
}

export default TimeSlot