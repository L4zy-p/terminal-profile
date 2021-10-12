import { useState } from "react"
import { Field } from './field'

interface TerminalProps {
  theme: any
  setTheme: any
}

export const Terminal = ({ theme, setTheme }: TerminalProps) => {
  const [maximized, setMaximized] = useState(false)
  const [title, setTitle] = useState('React Terminal')
  const handleClose = () => (window.location.href = 'https://codepen.io/HuntingHawk')
  const handleMinMax = () => {
    setMaximized(!maximized)
    const userElem: any = document.querySelector('#field')
    userElem?.focus()
  }

  return <>
    {
      !maximized && <div className='text-header-title'>Welcome to My Profile</div>
    }
    <div id="terminal" style={maximized ? { height: '100vh', width: '100vw', maxWidth: '100vw' } : theme.terminal}>
      <div id="window" style={theme.window}>
        <button className="btn red" onClick={handleClose} />
        <button id="useless-btn" className="btn yellow" />
        <button className="btn green" onClick={handleMinMax} />
        <span id="title" style={{ color: theme.window.color }}>{title}</span>
      </div>
      <Field theme={theme} setTheme={setTheme} setTitle={setTitle} />
    </div>
  </>
}