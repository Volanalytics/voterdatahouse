import * as React from "react"

const Tabs = React.forwardRef(({ className, defaultValue, onValueChange, ...props }, ref) => {
  const [value, setValue] = React.useState(defaultValue)
  
  React.useEffect(() => {
    if (onValueChange) {
      onValueChange(value)
    }
  }, [value, onValueChange])
  
  const handleValueChange = (newValue) => {
    setValue(newValue)
  }
  
  return (
    <div ref={ref} className={className} {...props} data-value={value}>
      {React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) return child
        
        if (child.type === TabsContent) {
          return React.cloneElement(child, {
            value: child.props.value,
            isSelected: child.props.value === value
          })
        }
        
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            onValueChange: handleValueChange,
            currentValue: value
          })
        }
        
        return child
      })}
    </div>
  )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef(({ className, onValueChange, currentValue, ...props }, ref) => {
  return (
    <div 
      ref={ref} 
      className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`} 
      {...props}
    >
      {React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) return child
        
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, {
            onSelect: () => onValueChange(child.props.value),
            isSelected: child.props.value === currentValue
          })
        }
        
        return child
      })}
    </div>
  )
})
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, onSelect, isSelected, ...props }, ref) => {
  return (
    <button
      ref={ref}
      role="tab"
      onClick={onSelect}
      data-state={isSelected ? "active" : "inactive"}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ${isSelected ? "bg-white text-gray-950 shadow-sm" : "text-gray-500 hover:text-gray-900"} ${className}`}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, isSelected, ...props }, ref) => {
  if (!isSelected) return null
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state={isSelected ? "active" : "inactive"}
      className={`mt-2 ${className}`}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
