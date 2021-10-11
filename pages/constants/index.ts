export const recognizedCommands = [{
  command: 'help',
  purpose: 'Provides help information for React Terminal commands.'
}, {
  command: 'date',
  purpose: 'Displays the current date.'
}, {
  command: 'start',
  purpose: 'Launches a specified URL in a new tab or separate window.',
  help: [
    'START <URL>',
    'Launches a specified URL in a new tab or separate window.',
    '',
    'URL......................The website you want to open.'
  ]
}, {
  command: 'cls',
  purpose: 'Clears the screen.'
}, {
  command: 'cmd',
  purpose: 'Starts a new instance of the React Terminal.'
}, {
  command: 'theme',
  purpose: 'Sets the color scheme of the React Terminal.',
  help: [
    'THEME [-l, -light, -d, -dark]',
    'Sets the color scheme of the React Terminal.',
    '',
    '-l, -light...............Sets the color scheme to light mode.',
    '-d, -dark................Sets the color scheme to dark mode.'
  ]
}, {
  command: 'exit',
  purpose: 'Quits the React Terminal and returns to Jacob\'s portfolio page.'
}, {
  command: 'time',
  purpose: 'Displays the current time.'
}, {
  command: 'about',
  isMain: true,
  purpose: 'Displays basic information about Jacob.'
}, {
  command: 'experience',
  isMain: true,
  purpose: 'Displays information about Jacob\'s experience.'
}, {
  command: 'skills',
  isMain: true,
  purpose: 'Displays information about Jacob\'s skills as a developer.'
}, {
  command: 'contact',
  isMain: true,
  purpose: 'Displays contact information for Jacob.'
}, {
  command: 'projects',
  isMain: true,
  purpose: 'Displays information about what projects Jacob has done in the past.'
}, {
  command: 'project',
  isMain: true,
  purpose: 'Launches a specified project in a new tab or separate window.',
  help: [
    'PROJECT <TITLE>',
    'Launches a specified project in a new tab or separate window.',
    'List of projects currently include:',
    'Minesweeper',
    'PuniUrl',
    'Taggen',
    'Forum',
    'Simon',
    '',
    'TITLE....................The title of the project you want to view.'
  ]
}, {
  command: 'title',
  purpose: 'Sets the window title for the React Terminal.',
  help: [
    'TITLE <INPUT>',
    'Sets the window title for the React Terminal.',
    '',
    'INPUT....................The title you want to use for the React Terminal window.'
  ]
}]