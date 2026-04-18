import { useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeButton = true,
  className = '',
  ...props
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={clsx(
          'relative glass-card rounded-lg shadow-glow-blue-lg w-full mx-4',
          sizes[size],
          'animate-fade-in',
          className
        )}
        {...props}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-synchub-grey-lighter border-opacity-20">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {closeButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-synchub-grey hover:bg-opacity-20 rounded-md transition-colors"
                aria-label="Close"
              >
                <X size={24} className="text-synchub-grey-light" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        {children}
      </div>
    </div>
  );
}
