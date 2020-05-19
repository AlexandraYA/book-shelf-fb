import React from 'react'
import { IconCaretUp, IconCaretDown } from './icons'


export const ButtonDown = props => (
  <button
    type="button"
    onClick={() => props.onClick()}
    className="btn btn-light btn-sm mr-1"
  >
    <IconCaretDown />
  </button>
)

export const ButtonUp = props => (
  <button
    type="button"
    onClick={() => props.onClick()}
    className="btn btn-light btn-sm mr-1"
  >
    <IconCaretUp />
  </button>
)