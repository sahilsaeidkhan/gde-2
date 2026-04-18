import clsx from 'clsx';
import { forwardRef } from 'react';

export const Input = forwardRef(({
  type = 'text',
  placeholder = '',
  icon: Icon = null,
  error = '',
  label = '',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-synchub-grey-light mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-synchub-grey" size={18} />
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            'w-full px-4 py-2 bg-synchub-card border border-synchub-grey-lighter rounded-md text-white placeholder-synchub-grey',
            'focus:outline-none focus:border-synchub-blue focus:ring-2 focus:ring-synchub-blue-glow',
            Icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
