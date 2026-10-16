import { useId } from "react";
import { inputClasses, labelClasses } from "./styles";

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  hint?: string;
  hideLabel?: boolean;
  className?: string;
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  hint,
  hideLabel = false,
  className = "",
}: TextAreaFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : labelClasses}
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-describedby={hint ? hintId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClasses} resize-y leading-relaxed`}
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
