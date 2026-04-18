import clsx from 'clsx';

export function Card({
  children,
  className = '',
  glowing = false,
  hover = true,
  ...props
}) {
  return (
    <div
      className={clsx(
        'glass-card p-6 rounded-lg',
        glowing && 'shadow-glow-blue border-synchub-blue border-opacity-50',
        hover && 'hover:shadow-glow-blue hover:border-synchub-blue hover:border-opacity-50 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
