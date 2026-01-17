import React from 'react'

const DeleteIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox="0 0 90 90"
      className='m-1'
      aria-hidden="true"
      focusable="false"
    >

      <circle cx="45" cy="45" r="45" className="fill-deelIndigo hover:fill-danger-100" />

      <rect
        x="40"
        y="20"
        width="12"
        height="50"
        rx="6"
        fill="#fff"
        transform="rotate(45 45 45)"
        className="pointer-events-none"
      />


      <rect
        x="40"
        y="20"
        width="12"
        height="50"
        rx="6"
        fill="#fff"
        transform="rotate(-45 45 45)"
        className="pointer-events-none"
      />


    </svg>
  );
}

export default DeleteIcon