import { DAYS, DAYS_SHORT } from './_constants'

/**
 * Gets day info object for today's date.
 */
function getDay() {
  let date = new Date()
  let dayNumber = date.getDay()
  let day = DAYS[dayNumber]

  return {
    day,
    dayShort: DAYS_SHORT[day],
    dayNumber,
  }
}

export default getDay
