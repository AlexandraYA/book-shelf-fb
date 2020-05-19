import React from 'react';


function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = props => {

  const inputType = props.type || 'text';
  const labelClass = props.labelClass || '';
  const cls = ['form-group mb-4'];
  const clsInput = inputType === 'file' ? ['form-control-file form-control-lg'] : ['form-control form-control-lg'];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    clsInput.push('border border-danger');
  }

  return (
    <div className={cls.join(' ')}>
      <label
        htmlFor={htmlFor}
        className={labelClass}
      >
        {props.label}
      </label>
      <input
        type={inputType}
        id={htmlFor}
        className={clsInput}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.label}
      />

      {
        isInvalid(props)
          ? <span className="text-danger">{props.errorMessage || 'Введите верно значение'}</span>
          : null
      }

    </div>
  );
};

export default Input;