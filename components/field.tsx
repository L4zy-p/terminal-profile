import { useEffect, useState } from 'react'
import { MultiText } from './mutitext'
import { UserText } from './usertext'
import { Text } from './text'
import { recognizedCommands } from '../constants'
import { evaluate } from 'mathjs'

interface FieldProps {
  theme: any
  fieldHistory: any
  setFieldHistory: any
  userInput: any
  setIsMobile: any
  handleTyping: any
  handleContextMenuPaste: any
}

export const Field = ({
  theme,
  fieldHistory,
  setFieldHistory,
  userInput,
  setIsMobile,
  handleTyping,
  handleContextMenuPaste,
}: FieldProps) => {

  useEffect(() => {
    if (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1) {
      setIsMobile(true)
      setFieldHistory((fieldHistory: any) => [...fieldHistory, { isCommand: true }, {
        text: `Unfortunately due to this application being an 'input-less' environment, mobile is not supported. I'm working on figuring out how to get around this, so please bear with me! In the meantime, come on back if you're ever on a desktop.`,
        isError: true,
        hasBuffer: true
      }])
    }

    document?.querySelector('#useless-btn')?.addEventListener('click', () => {
      setFieldHistory((fieldHistory: any) => [...fieldHistory, { isCommand: true }, { text: 'SYS >> That button doesn\'t do anything.', hasBuffer: true }])
    })
  }, [])

  useEffect(() => {
    const userElem: any = document.querySelector('#field')
    userElem.scrollTop = userElem.scrollHeight
  }, [fieldHistory])

  return <>
    <div
      id="field"
      className={theme.app.backgroundColor === '#333444' ? 'dark' : 'light'}
      style={theme.field}
      onKeyDown={e => handleTyping(e)}
      tabIndex={0}
      onContextMenu={e => handleContextMenuPaste(e)}
    >
      {fieldHistory.map(({ text, isCommand, isError, hasBuffer }: any, i: any) => {
        if (Array.isArray(text)) {
          return <MultiText key={i} input={text} isError={isError} hasBuffer={hasBuffer} />
        }

        return <Text key={i} input={text} isCommand={isCommand} isError={isError} hasBuffer={hasBuffer} />
      })}
      <UserText input={userInput} theme={theme.cursor} />
    </div>
  </>
}