import React from 'react'


const Select = props => {
  const htmlFor = `${props.label}-${Math.random()}`
  const labelClass = props.isLabel ? '' : 'sr-only'

  return (
    <div className='form-group mb-4'>

      { props.isLabel
        ? <label class={labelClass} htmlFor={htmlFor}>{props.label}</label>
        : null
      }

      <select
        id={htmlFor}
        className='form-control form-control-lg'
        value={props.value}
        onChange={props.onChange}
      >
        { props.options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={option.value + index}
            >
              {option.text}
            </option>
          );
        })
        }
      </select>
    </div>
  )
}

export default Select