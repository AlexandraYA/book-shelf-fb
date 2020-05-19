import React from 'react'


export const Alert = props => {

  let text = props.text || 'Hello'
  let className = props.className ? "alert alert-" + props.className : "alert alert-primary"

  return (
    <div className={className} role="alert">
      { text }
    </div>
  )
}
