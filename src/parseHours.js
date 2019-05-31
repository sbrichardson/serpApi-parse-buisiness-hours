import { DAYS, DAYS_SHORT } from './_constants'
import splitHours from './splitHours'
import trim from 'lodash/trim'

/**
 * NOTE
 * Google knowledge graph business info parsing. (serpApi)
 *
 * TODO
 * 1. Check if consistent
 * 2. Review, the dot characters appear the same, but are different
 * 3. Not using getDay() fn.
 */
const DOT1 = ' ⋅ '
const DOT2 = ' · See more hours'
const SUGGEST_EDIT = 'Suggest an edit'

/**
 * Accepts a Google knowledge graph (raw) hours string, scraped from serpApi
 * Returns the hours, status, details, as an object.
 */
function parseHours(str) {
  let parts = str.split(DOT1)
  let todayHours
  let hours

  if (parts.length < 2) return {}

  let [status, ..._restToday] = parts

  let restToday
  let openParts
  let isOpen = trim(status.toLowerCase()) === 'open'

  if (isOpen) {
    if (parts.length > 2) {
      openParts = parts[1]
      restToday = parts[2]
    } else {
      let [_openParts, ..._openRest] = parts[1].split(DOT2)
      openParts = _openParts
      restToday = _openRest.join('')
    }
  }

  let todayStr = _restToday.join('')
  let firstDayLocation = todayStr.length
  let firstDayFound

  DAYS.forEach(x => {
    let short = DAYS_SHORT[x]
    let location = todayStr.search(short)
    
    if (location !== -1 && location < firstDayLocation) {
      firstDayLocation = location
      firstDayFound = short
    }
  })

  todayHours = isOpen
    ? openParts
    : todayStr.slice(0, firstDayLocation + firstDayFound.length)

  let restHours = isOpen
    ? restToday
    : todayStr.slice(firstDayLocation + firstDayFound.length)

  let hourParts = restHours.split(SUGGEST_EDIT)

  if (hourParts.length) {
    hours = splitHours(hourParts[0])
  }

  return { hours, status, todayHours }
}

export default parseHours
