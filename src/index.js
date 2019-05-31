export { default } from './parseHours'

process.env.NODE_ENV === 'development' && require('./parseHours_dev')
