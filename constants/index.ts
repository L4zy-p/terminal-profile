export const recognizedCommands = [{
  command: 'help',
  purpose: 'Provides help information for Profile Terminal commands.'
}, 
// {
//   command: 'date',
//   purpose: 'Displays the current date.'
// }, 
{
  command: 'start',
  purpose: 'Launches a specified URL in a new tab or separate window.',
  help: [
    'START <URL>',
    'Launches a specified URL in a new tab or separate window.',
    '',
    'URL......................The website you want to open.'
  ]
}, 
{
  command: 'cls',
  purpose: 'Clears the screen.'
}, 
{
  command: 'ref',
  purpose: 'Reference source code'
},
//  {
//   command: 'theme',
//   purpose: 'Sets the color scheme of the Profile Terminal.',
//   help: [
//     'THEME [-l, -light, -d, -dark]',
//     'Sets the color scheme of the Profile Terminal.',
//     '',
//     '-l, -light...............Sets the color scheme to light mode.',
//     '-d, -dark................Sets the color scheme to dark mode.'
//   ]
// },
 {
  command: 'exit',
  purpose: 'Quits the Profile Terminal and returns to L4zy-p\'s portfolio page.'
}, 
// {
//   command: 'time',
//   purpose: 'Displays the current time.'
// }, 
{
  command: 'about',
  isMain: true,
  purpose: 'Displays basic information about L4zy-p.'
}, 
{
  command: 'experience',
  isMain: true,
  purpose: 'Displays information about L4zy-p\'s experience.'
},
 {
  command: 'skills',
  isMain: true,
  purpose: 'Displays information about L4zy-p\'s skills as a developer.'
}, 
{
  command: 'contact',
  isMain: true,
  purpose: 'Displays contact information for L4zy-p.'
}, 
// {
//   command: 'projects',
//   isMain: true,
//   purpose: 'Displays information about what projects L4zy-p has done in the past.'
// }, 
// {
//   command: 'project',
//   isMain: true,
//   purpose: 'Launches a specified project in a new tab or separate window.',
//   help: [
//     'PROJECT <TITLE>',
//     'Launches a specified project in a new tab or separate window.',
//     'List of projects currently include:',
//     'Minesweeper',
//     'PuniUrl',
//     'Taggen',
//     'Forum',
//     'Simon',
//     '',
//     'TITLE....................The title of the project you want to view.'
//   ]
// }, 
// {
//   command: 'title',
//   purpose: 'Sets the window title for the Profile Terminal.',
//   help: [
//     'TITLE <INPUT>',
//     'Sets the window title for the Profile Terminal.',
//     '',
//     'INPUT....................The title you want to use for the Profile Terminal window.'
//   ]
// }
]