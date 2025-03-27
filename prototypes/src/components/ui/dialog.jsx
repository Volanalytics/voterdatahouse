import * as React from "react"

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  
  React.useEffect(() => {
    // Lock body scroll when dialog is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    // Listen for escape key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onOpenChange]);
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto"
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
};

const DialogTrigger = ({ asChild, children, onClick }) => {
  if (asChild) {
    return React.cloneElement(children, { onClick });
  }
  
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 animate-in fade-in-0 zoom-in-95 ${className}`}
    onClick={(e) => e.stopPropagation()}
    {...props}
  >
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left mb-4 ${className}`} {...props} />
);

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={`text-lg font-semibold text-gray-900 ${className}`} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`text-sm text-gray-500 ${className}`} {...props} />
));
DialogDescription.displayName = "DialogDescription";

const DialogFooter = ({ className, ...props }) => (
  <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 ${className}`} {...props} />
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
