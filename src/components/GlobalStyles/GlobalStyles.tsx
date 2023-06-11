import React from 'react'
import './GlobalStyles.scss'
import './Grid.scss'

function GlobalStyles({ children }: { children: JSX.Element }) {
  return React.Children.only(children)
}

export default GlobalStyles
