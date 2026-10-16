import { useId } from "react";
import { inputClasses, labelClasses } from "./styles";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  className = "",
}: TextFieldProps) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className={inputClasses}
      />
    </div>
  );
}
