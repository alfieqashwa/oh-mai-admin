import React from 'react'

export function GlassDiv(props) {
  const { className, glassClassName } = props
  return (
    <div className={`glass w-full h-full ${className}`}>
      <div className={`opacity-100 z-10 ${glassClassName}`}>
        {props.children}
      </div>
    </div>
  )
}

GlassDiv.propTypes = {}
