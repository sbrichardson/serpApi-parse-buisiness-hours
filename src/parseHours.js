import { DAYS, DAYS_SHORT } from './_constants'
import splitHours from './splitHours'
import trim from 'lodash/trim'
import getDay from './getDay'

/**
 * NOTE
 * Google knowledge graph business info parsing. (serpApi)
 *
 * TODO
 * 1. Check if consistent
 * 2. Review, the dot characters appear the same, but are different
 */
const DOT1 = ' ⋅ '
const DOT2 = ' · See more hours'
const SUGGEST_EDIT = 'Suggest an edit'

/**
 * Accepts a Google knowledge graph (raw) hours string, scraped from serApi
 * Returns the hours, status, details, as an object.
 */
function parseHours(str) {
  let parts = str.split(DOT1)
  let status
  let todayHours
  let hourStr
  let hourResult
  let dayObj = getDay()

  if (parts.length > 1) {
    let [_status, ..._restToday] = parts

    status = _status

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
    let firstDayFound
    let firstDayLocation = todayStr.length

    DAYS.forEach(x => {
      let short = DAYS_SHORT[x]
      let location = todayStr.search(short)

      if (location < firstDayLocation) {
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
      let [_hourStr, ...details] = hourParts

      hourStr = _hourStr
      hourResult = splitHours(hourStr)
    }
  }

  return { hours: hourResult, status, todayHours }
}

export default parseHours
