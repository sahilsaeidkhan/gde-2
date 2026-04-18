import clsx from 'clsx';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) {
  const baseStyles = 'font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-synchub-blue';

  const variants = {
    primary: 'bg-synchub-blue text-white hover:bg-synchub-blue-hover hover:scale-105 active:scale-95 disabled:opacity-50',
    secondary: 'bg-synchub-card text-white border border-synchub-grey-lighter hover:border-synchub-blue hover:shadow-glow-blue disabled:opacity-50',
    ghost: 'bg-transparent text-synchub-blue border border-synchub-blue hover:bg-synchub-card disabled:opacity-50',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95 disabled:opacity-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}
