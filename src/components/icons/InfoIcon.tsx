const InfoIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox="0 0 90 90"
      className='m-1 rotate-180'
      aria-hidden="true"
      focusable="false"
    >

      <circle cx="45" cy="45" r="45" className='fill-lavander-100' />

      <rect
        x="41"
        y="18"
        width="8"
        height="42"
        rx="4"
        fill="#fff"
      />

      <circle cx="45" cy="70" r="4" fill="#fff" />
    </svg>
  )
}

export default InfoIcon