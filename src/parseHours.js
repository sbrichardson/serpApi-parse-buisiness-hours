import { DAYS, DAYS_SHORT } from './_constants'
import splitHours from './splitHours'
import trim from 'lodash/trim'
import c from '@reactual/c'

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

      /* Split on DOT2 failed, look for first day */
      if (!restToday) {
        let res = getFirstDayInfo(openParts)
        restToday = openParts.slice(res.dayLocation)
        openParts = openParts.slice(0, res.dayLocation)
      }
    }
  }

  let todayHours
  let restHours

  if (isOpen) {
    todayHours = openParts
    restHours = restToday
  } else {
    let todayStr = _restToday.join('')
    let { dayLocation, dayName } = getFirstDayInfo(todayStr)
    todayHours = todayStr.slice(0, dayLocation + dayName.length)
    restHours = todayStr.slice(dayLocation + dayName.length)
  }

  let hourParts = restHours.split(SUGGEST_EDIT)

  return {
    status,
    todayHours,
    hours: hourParts.length ? splitHours(hourParts[0]) : null,
  }
}

export default parseHours

/**
 * Finds the lowest index (first day) in a string
 * out of a list of 7 days/abbrev day names.
 */
function getFirstDayInfo(str, len) {
  let dayLocation = len || str.length
  let dayName

  DAYS.forEach(x => {
    /* Check for full day name, then abbrev name if not found */
    let day = x
    let location = str.search(day)
    if (location === -1) {
      day = DAYS_SHORT[x]
      location = str.search(day)
    }
    if (location === -1) return
    if (location < dayLocation) {
      dayLocation = location
      dayName = day
    }
  })

  return { dayName, dayLocation }
}
