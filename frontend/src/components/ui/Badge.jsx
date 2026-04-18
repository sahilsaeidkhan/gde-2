import clsx from 'clsx';

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-synchub-card text-synchub-blue-light border border-synchub-blue border-opacity-30',
    success: 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30',
    warning: 'bg-amber-500 bg-opacity-20 text-amber-300 border border-amber-500 border-opacity-30',
    error: 'bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30',
    blue: 'bg-synchub-blue-glow text-synchub-blue border border-synchub-blue border-opacity-50',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={clsx(
        'inline-block rounded-full font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
