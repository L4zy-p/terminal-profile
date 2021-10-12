import { useEffect, useState } from 'react'
import { MultiText } from './mutitext'
import { UserText } from './usertext'
import { Text } from './text'
import { recognizedCommands } from '../constants'
import math from 'mathjs'

interface FieldProps {
  theme: any
  setTheme: any
  setTitle: any
}

export const Field = ({ theme, setTheme, setTitle }: FieldProps) => {
  const [commandHistory, setCommandHistory] = useState<any>([])
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<any>(0)
  const [fieldHistory, setFieldHistory] = useState<any>([
    { text: 'React Terminal' },
    { text: 'Type HELP to see the full list of commands.', hasBuffer: true }
  ])
  const [userInput, setUserInput] = useState<any>('')
  const [isMobile, setIsMobile] = useState<any>(false)

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
    const x: any = math?.evaluate(input)

    try {
      const evaluatedForArithmetic: any = math?.evaluate(input)
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

    } else if (cmd === 'cmd') {
      setFieldHistory((fieldHistory: any) => [...fieldHistory, { text: 'Launching new instance of the React Terminal...', hasBuffer: true }])
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
      return window.location.href = 'https://codepen.io/HuntingHawk'
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
          'Languages:',
          'HTML',
          'CSS',
          'JavaScript',
          '',
          'Libraries/Frameworks:',
          'Node',
          'Express',
          'React',
          'Next',
          'React Native',
          'Redux',
          'jQuery',
          '',
          'Other:',
          'Git',
          'GitHub',
          'Heroku',
          'CodePen',
          'CodeSandBox',
          'Firebase',
          'NeDB'
        ], hasBuffer: true
      }])
    } else if (cmd === 'contact') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'Email: hemhongsa.p94@gmail.com',
          'Website: jacoblockett.com',
          'LinkedIn: -',
          'GitHub: @fern1994',

        ], hasBuffer: true
      }])

    } else if (cmd === 'projects') {
      return setFieldHistory((fieldHistory: any) => [...fieldHistory, {
        text: [
          'To view any of these projects live or their source files, type PROJECT <TITLE>, e.g. PROJECT Minesweeper.',
          '',
          'Minesweeper',
          'Built with React',
          `Some time ago I because increasingly addicted to minesweeper, specifically the version offered by Google. In fact, I was so addicted that I decided to build the damn thing.`,
          '',
          'PuniUrl',
          'Built with Express, Firebase',
          'Ever heard of TinyUrl? Ever been to their website? Atrocious. So I made my own version of it.',
          '',
          'Taggen',
          'Built with Node',
          `I was building a MS Excel spreadsheet parser (haven't finished it, imagine my stove has 10 rows of backburners) and needed a way to generate non-opinionated XML files. There were projects out there that came close, but I decided it would be fun to build it on my own.`,
          '',
          'Forum',
          'Built with React, Redux, Bootstrap',
          `This was a project I had to build for my final while taking Udacity's React Nanodegree certification course. It's an app that tracks posts and comments, likes, etc. Nothing too complicated, except for Redux... God I hate Redux.`,
          '',
          'Simon',
          'Built with vanilla ice cream',
          'The classic Simon memory game. I originally built this for the freeCodeCamp legacy certification, but later came back to it because I hated how bad I was with JavaScript at the time. I also wanted to see how well I could build it during a speed-coding session. Just over an hour.',
        ], hasBuffer: true
      }])

    } else if (cmd === 'project') {
      if (params.length === 1) {
        const projects = [{
          title: 'minesweeper',
          live: 'https://codepen.io/HuntingHawk/full/GRgLWKV'
        }, {
          title: 'puniurl',
          live: 'http://www.puniurl.com/'
        }, {
          title: 'taggen',
          live: 'https://github.com/huntinghawk1415/Taggen'
        }, {
          title: 'forum',
          live: 'https://github.com/huntinghawk1415/ReactND-Readable'
        }, {
          title: 'simon',
          live: 'https://codepen.io/HuntingHawk/full/mNPVgj'
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
    <div className='tags-title'>{`>_COMMAND LIST`} (You can click it if you're lazy to type a message. 😁)</div>
    <ul className='tags'>
      {
        recognizedCommands?.map((r, i) => <li key={i}>
          <span onClick={() => handleClickCommand(r?.command)}>{r?.command}</span>
        </li>)
      }
    </ul>
  </>
}