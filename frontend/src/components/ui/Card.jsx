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
        'p-6 rounded-lg bg-cyber-charcoal/40 backdrop-blur-sm border border-cyber-blue border-opacity-20',
        glowing && 'shadow-glow-blue border-cyber-blue border-opacity-50',
        hover && 'hover:shadow-glow-blue hover:border-cyber-blue hover:border-opacity-50 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
