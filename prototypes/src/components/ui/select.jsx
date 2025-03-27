import * as React from "react"

const Select = ({ children, onValueChange, defaultValue }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue || "")
  
  React.useEffect(() => {
    if (onValueChange) {
      onValueChange(value)
    }
  }, [value, onValueChange])
  
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child
        
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setOpen(!open),
            isOpen: open,
            value
          })
        }
        
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen: open,
            onSelect: (newValue) => {
              setValue(newValue)
              setOpen(false)
            },
            value
          })
        }
        
        return child
      })}
    </div>
  )
}

const SelectValue = ({ placeholder, children }) => {
  return <span>{children || placeholder}</span>
}

const SelectTrigger = React.forwardRef(({ className, children, onClick, isOpen, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''} ${className}`}
      {...props}
    >
      {children}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = ({ className, children, isOpen, onSelect, value, ...props }) => {
  if (!isOpen) return null
  
  // Close the dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.select-content') && !event.target.closest('button')) {
        onSelect(value) // Keep the current value and close
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onSelect, value])
  
  return (
    <div 
      className={`select-content absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md animate-in fade-in-0 zoom-in-95 mt-1 ${className}`}
      {...props}
    >
      <div className="p-1">
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child
          
          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              onSelect,
              isSelected: child.props.value === value
            })
          }
          
          return child
        })}
      </div>
    </div>
  )
}

const SelectItem = React.forwardRef(({ className, children, value, onSelect, isSelected, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 ${isSelected ? 'bg-gray-100' : ''} ${className}`}
      onClick={() => onSelect(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
