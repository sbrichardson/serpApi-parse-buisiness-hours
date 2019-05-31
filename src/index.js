export { default } from './parseHours'

process.env.NODE_ENV === 'development' && require('./parseHours.dev.js')
