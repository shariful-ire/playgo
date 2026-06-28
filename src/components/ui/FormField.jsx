"use client";

export default function FormField({
  label,
  name,
  type = "text",
  error,
  className = "",
  textarea = false,
  children,
  ...props
}) {
  const id = name;
  const inputClasses = `w-full input rounded-2xl bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
    error ? "input-error" : ""
  }`;
  const textareaClasses = `w-full textarea rounded-2xl bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
    error ? "textarea-error" : ""
  }`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-base-content">
          {label}
        </label>
      )}
      {children ? (
        children
      ) : textarea ? (
        <textarea id={id} name={name} className={textareaClasses} {...props} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={inputClasses}
          {...props}
        />
      )}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
