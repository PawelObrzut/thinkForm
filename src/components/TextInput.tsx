import { useState } from "react";
import WarningIcon from "./icons/WarningIcon";

type Props<Key extends string> = {
  label: string;
  name: Key;
  type?: 'text' | 'email';
  value: string;
  onChange: (key: Key, value: string) => void;
  validateInput: (type: string, value: string) => boolean;
};

const TextInput = <Key extends string>({
  label,
  name,
  type = 'text',
  value,
  onChange,
  validateInput
}: Props<Key>) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState(false);

  const handleFocus = () => setIsInputFocused(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { onChange(name, e.target.value) };
  const handleBlur = () => {
    setIsInputFocused(false);

    const trimmedValue = value.trim();
    if (trimmedValue !== value) {
      onChange(name, trimmedValue);
    }
    const isValid = validateInput(type, trimmedValue);
    setError(!isValid);
  };

  return (
    <div>
      <label
        data-testid={`${name}-label`}
        htmlFor={name}
        className='font-normal text-base block mb-2 cursor-pointer'
      >
        {label}
      </label>

      <input
        data-testid={`${name}-input`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={error}
        aria-describedby={error ? `${name}-error` : undefined}
        required
        className={`
          text-base font-medium rounded-lg pl-4 h-12 w-full
          ${error ? 'border-2 border-danger-100 bg-danger-50'
            : isInputFocused ? 'border-2 border-active-100 bg-active-50'
              : 'border border-lavander-100 bg-white'
          }`}
      />

      {error && type === 'email' && (
        <div className='flex gap-2 mt-2.25' id={`${name}-error`} data-testid={`${name}-error`}>
          <WarningIcon aria-hidden="true" />
          <div>
            <p>Please use correct formatting</p>
            <p>Example: address@email.com</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;
