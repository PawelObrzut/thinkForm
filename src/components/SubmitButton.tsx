const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={`
      w-full my-12 py-4 text-white font-medium text-lg
      rounded border-0
      ${disabled
          ? "bg-lavander-100 cursor-not-allowed"
          : "bg-active-100 hover:bg-active-200 cursor-pointer"}
    `}
    >
      Send Application
    </button>
  )
}

export default SubmitButton