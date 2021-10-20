import { useState } from "react"
import { evaluate } from 'mathjs'
import { Field } from './field'
import { recognizedCommands } from '../constants'

interface TerminalProps {
  theme: any
  setTheme: any
}

export const Terminal = ({ theme, setTheme }: TerminalProps) => {
  const [maximized, setMaximized] = useState(false)
  const [title, setTitle] = useState('Profile Terminal')
  const [commandHistory, setCommandHistory] = useState<any>([])
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<any>(0)
  const [fieldHistory, setFieldHistory] = useState<any>([
    { text: 'Profile Terminal' },
    { text: 'Type HELP to see the full list of commands.', hasBuffer: true }
  ])
  const [userInput, setUserInput] = useState<any>('')
  const [isMobile, setIsMobile] = useState<any>(false)

  const handleClose = () => (window.location.href = 'https://codepen.io/HuntingHawk')

  const handleMinMax = () => {
    setMaximized(!maximized)
    const userElem: any = document.querySelector('#field')
    userElem?.focus()
  }

  const handleTyping = (e: any) => {
    e.preventDefault()

    const { key, ctrlKey, altKey } = e
    const forbidden = [
      ...Array.from({ length: 12 }, (x, y) => `F${y + 1}`),
      'ContextMenu', 'Meta', 'NumLock', 'Shift', 'Control', 'Alt',
      'CapsLock', 'Tab', 'ScrollLock', 'Pause', 'Insert', 'Home',
      'PageUp', 'Delete', 'End', 'PageDown'
    ]

    if (!forbidden.some(s => s === key) && !ctrlKey && !altKey) {
      if (key === 'Backspace') {
        setUserInput(userInput.slice(0, -1))
      } else if (key === 'Escape') {
        setUserInput('')
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        const upperLimit = commandHistoryIndex >= commandHistory.length

        if (!upperLimit) {
          setCommandHistoryIndex(commandHistoryIndex + 1)
          setUserInput(commandHistory[commandHistoryIndex - 1])
        }
      } else if (key === 'ArrowDown' || key === 'ArrowRight') {
        const lowerLimit = commandHistoryIndex === 0

        if (!lowerLimit) {
          setCommandHistoryIndex(commandHistoryIndex - 1)
          setUserInput(commandHistory[commandHistoryIndex - 1] || '')
        }
      } else if (key === 'Enter') {
        if (userInput.length) {
          setCommandHistory(userInput === '' ? commandHistory : [userInput, commandHistory])
          setCommandHistoryIndex(0)
          setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: userInput, isCommand: true }])
          setUserInput('')
          handleInputEvaluation(userInput)
        } else {
          setFieldHistory((fieldHistory: any) => [...fieldHistory, { isCommand: true }])
        }

      } else {
        setCommandHistoryIndex(0)
        setUserInput(userInput + key)
      }
    }
  }
  const handleInputEvaluation = (input: any) => {
    try {
      const evaluatedForArithmetic: any = evaluate(input)
      if (!isNaN(evaluatedForArithmetic)) {
        setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: evaluatedForArithmetic }])

      }

      throw Error
    } catch (err) {
      const cleanedInput = input.toLowerCase().trim()
      const dividedInput = cleanedInput.split(' ')
      const parsedCmd = dividedInput[0]
      const parsedParams = dividedInput.slice(1).filter((s: any) => s[0] !== '-')
      const parsedFlags = dividedInput.slice(1).filter((s: any) => s[0] === '-')
      const isError = !recognizedCommands.some((s: any) => s.command === parsedCmd)

      if (isError) {
        setFieldHistory((fieldHistory: any) => [...fieldHistory, giveError('nr', input)])

      }

      return handleInputExecution(parsedCmd, parsedParams, parsedFlags)
    }
  }
  const handleInputExecution = (cmd: any, params: any = [], flags: any = []) => {
    if (cmd === 'help') {
      if (params.length) {
        if (params.length > 1) {
          setFieldHistory((fieldHistory: any) => [...fieldHistory, giveError('bp', { cmd: 'HELP', noAccepted: 1 })])

        }

        const cmdsWithHelp = recognizedCommands.filter((s: any) => s.help)

        if (cmdsWithHelp.filter(s => s.command === params[0]).length) {
          setFieldHistory((fieldHistory: any) => [...fieldHistory, {
            text: cmdsWithHelp.filter(s => s.command === params[0])[0].help,
            hasBuffer: true
          }])

        } else if (recognizedCommands.filter((s: any) => s.command === params[0]).length) {
          setFieldHistory((fieldHistory: any) => [...fieldHistory, {
            text: [
              `No additional help needed for ${recognizedCommands.filter(s => s.command === params[0])[0].command.toUpperCase()}`,
              recognizedCommands.filter(s => s.command === params[0])[0].purpose
            ],
            hasBuffer: true
          }])

        }

        return setFieldHistory((fieldHistory: any) => [...fieldHistory, giveError('up', params[0]?.toUpperCase())])


      }
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'Main commands:',
          ...recognizedCommands
            .sort((a, b) => a.command.localeCompare(b.command))
            .filter(({ isMain }) => isMain)
            .map(({ command, purpose }) => `${command.toUpperCase()}${Array.from({ length: 15 - command.length }, x => '.').join('')}${purpose}`),
          '',
          'All commands:',
          ...recognizedCommands
            .sort((a, b) => a.command.localeCompare(b.command))
            .map(({ command, purpose }) => `${command.toUpperCase()}${Array.from({ length: 15 - command.length }, x => '.').join('')}${purpose}`),
          '',
          'For help about a specific command, type HELP <CMD>, e.g. HELP PROJECT.'
        ],
        hasBuffer: true
      }])


    } else if (cmd === 'cls') {
      return setFieldHistory([])

    } else if (cmd === 'start') {
      if (params.length === 1) {
        setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: `Launching ${params[0]}...`, hasBuffer: true }])
        window.open(/http/i.test(params[0]) ? params[0] : `https://${params[0]}`)
        return

      }
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, giveError('bp', { cmd: 'START', noAccepted: 1 })])

    } else if (cmd === 'date') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: `The current date is: ${new Date(Date.now()).toLocaleDateString()}`, hasBuffer: true }])

    } else if (cmd === 'ref') {
      setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: 'Reference source code', hasBuffer: true }])
      window.open('https://codepen.io/HuntingHawk/full/rNaEZxW')
      return

    } else if (cmd === 'theme') {

      if (flags.length === 1 && (['-d', '-dark', '-l', '-light'].some(s => s === flags[0]))) {
        const themeToSet = flags[0] === '-d' || flags[0] === '-dark' ? 'dark' : 'light'
        setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: `Set the theme to ${themeToSet.toUpperCase()} mode`, hasBuffer: true }])
        setTheme(themeToSet)
        return

      }

      return setFieldHistory((fieldHistory: any) => [...fieldHistory, giveError(!flags.length ? 'nf' : 'bf', 'THEME')])

    } else if (cmd === 'exit') {
      return window.location.href = 'https://github.com/L4zy-p'
    } else if (cmd === 'time') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: `The current time is: ${new Date(Date.now()).toLocaleTimeString()}`, hasBuffer: true }])

    } else if (cmd === 'about') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'Hey there!',
          `My name is Kwangnoi.`,
          `I'm a frontend developer.`,
          `My birthday is May 30th.`,
          `Type CONTACT if you'd like to get in touch - otherwise I hope you enjoy using the rest of the app!`
        ], hasBuffer: true
      }])

    } else if (cmd === 'experience') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'Experience:',
          'Open Source Technology',
          'Frontend Developer',
          'Jun 2018 - Present',
          '',
          'Tovho System',
          'PHP Web Developer',
          'Aug 2017 - Apr 2018',
          '',
          'Intelligent Millionaire',
          'Game Developer',
          'Aug 2016 - Dec 2016 (Internship)',
          '',
        ], hasBuffer: true
      }])
    } else if (cmd === 'skills') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'Tool & Languages',
          'Typescript',
          'JavaScript',
          '',
          'Next',
          'React',
          '',
        ], hasBuffer: true
      }])
    } else if (cmd === 'contact') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'Email: hemhongsa.p94@gmail.com',
          'Website: https://l4zy-p.github.io/terminal-profile/',
          'LinkedIn: -',
          'GitHub: @L4zy-p',

        ], hasBuffer: true
      }])

    } else if (cmd === 'projects') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'To view any of these projects live or their source files, type PROJECT <TITLE>, e.g. PROJECT terminal profile.',
          '',
          'terminal profile',
          'Built with React & Next',
          `How to create terminal with react`,
          '',
        ], hasBuffer: true
      }])

    } else if (cmd === 'project') {
      if (params.length === 1) {
        const projects = [{
          title: 'terminal profile',
          live: 'https://github.com/L4zy-p/terminal-profile'
        }]

        setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: `Launching ${params[0]}...`, hasBuffer: true }])
        window.open(projects.filter(s => s.title === params[0])?.[0]?.live)

        return

      }

      return setFieldHistory((fieldHistory: any) => [...fieldHistory, giveError('bp', { cmd: 'PROJECT', noAccepted: 1 })])

    } else if (cmd === 'title') {
      setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: `Set the React Terminal title to ${params.length > 0 ? params.join(' ') : '<BLANK>'}`,
        hasBuffer: true
      }])
      setTitle(params.length > 0 ? params.join(' ') : '')

      return

    }
  }
  const handleContextMenuPaste = (e: any) => {
    e.preventDefault()

    if ('clipboard' in navigator) {
      navigator.clipboard.readText().then(clipboard => {
        setUserInput(`${userInput}${clipboard}`)
      })

    }
  }
  const giveError = (type: any, extra: any) => {
    const err = { text: '', isError: true, hasBuffer: true }

    if (type === 'nr') {
      err.text = `${extra} : The term or expression '${extra}' is not recognized. Check the spelling and try again. If you don't know what commands are recognized, type HELP.`
    } else if (type === 'nf') {
      err.text = `The ${extra} command requires the use of flags. If you don't know what flags can be used, type HELP ${extra}.`
    } else if (type === 'bf') {
      err.text = `The flags you provided for ${extra} are not valid. If you don't know what flags can be used, type HELP ${extra}.`
    } else if (type === 'bp') {
      err.text = `The ${extra.cmd} command requires ${extra.noAccepted} parameter(s). If you don't know what parameters to use, type HELP ${extra.cmd}.`
    } else if (type === 'up') {
      err.text = `The command ${extra} is not supported by the HELP utility.`
    }

    return err
  }

  const handleClickCommand = (cmd: string) => {
    setCommandHistory(cmd === '' ? commandHistory : [cmd, commandHistory])
    setCommandHistoryIndex(0)
    setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: cmd, isCommand: true }])
    setUserInput('')
    handleInputEvaluation(cmd)
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
      <Field
        theme={theme}
        fieldHistory={fieldHistory}
        setFieldHistory={setFieldHistory}
        userInput={userInput}
        setIsMobile={setIsMobile}
        handleTyping={handleTyping}
        handleContextMenuPaste={handleContextMenuPaste} />
    </div>
    {
      !maximized && <>
        <div className='tags-title'>COMMAND LIST 🚀</div>
        <ul className='tags'>
          {
            recognizedCommands?.map((r, i) => <li key={i}>
              <span onClick={() => handleClickCommand(r?.command)}>{r?.command}</span>
            </li>)
          }
        </ul>
      </>
    }
  </>
}