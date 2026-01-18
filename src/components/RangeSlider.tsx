type Props = {
	label: string;
	min: number;
	max: number;
  value: number;
  onChange: (value: number) => void;
}

const RangeSlider = ({label, min, max, value, onChange}: Props) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className='w-full mb-10'>
      <span className='block'>{label}</span>

      <div className='flex justify-between translate-y-2'>
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <div className='relative'>
        <input
          type='range'
					step='1'
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='range-slider w-full'
          style={{ "--progress": `${percentage}%` } as React.CSSProperties}
        />

        <div className='absolute -translate-x-1/2' style={{ left: `clamp(0%, ${percentage}%, 100%)` }} >
          <div className='absolute z-10 w-2 h-2 -translate-x-1/2 left-1/2 translate-y-1/2 top-[0.25px] bg-white border-l border-t border-lavander-100 rotate-45' />
          <div className='relative top-2 px-4 py-1 bg-white text-active-100 border border-lavander-100 rounded font-medium'>
            {value}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RangeSlider