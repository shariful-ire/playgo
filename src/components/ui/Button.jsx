"use client";

const variantClasses = {
  primary: "btn btn-primary rounded-2xl",
  secondary: "btn btn-secondary rounded-2xl",
  accent: "btn btn-accent text-accent-content rounded-2xl",
  ghost: "btn btn-outline btn-primary rounded-2xl",
  danger: "btn btn-error text-error-content rounded-2xl",
};

const sizeClasses = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
