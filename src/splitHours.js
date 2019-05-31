import { DAYS } from './_constants'
import trim from 'lodash/trim'
import c from '@reactual/c'

/**
 * After hours are reduced to a single string group,
 * this function splits them correctly by days/ranges,
 * into formatted object with day/hour info
 */
function splitHours(hourStr) {
  let firstDay
  let firstDayLocation = hourStr.length
  let locations = []

  DAYS.forEach(x => {
    let location = hourStr.search(x)

    if (location === -1) return

    locations.push({ day: x, location, endLocation: location + x.length })

    if (location < firstDayLocation) {
      firstDayLocation = location
      firstDay = x
    }
  })

  let sortedLocations = [...locations].sort((a, b) =>
    a.location < b.location ? -1 : a.location > b.location ? 1 : 0
  )

  let sections = []
  let lastIndex = sortedLocations.length - 1

  /* TODO Check/Handle case if multiple ranges/shifts in single day, dupe day names */

  sortedLocations.forEach((o, i) => {
    let details = {}

    let next = sortedLocations[i + 1]
    let start = o.location
    let dayEnd = o.endLocation
    let end = i === lastIndex || !next ? hourStr.length : next.location

    let day = hourStr.slice(start, dayEnd)
    let hours = hourStr.slice(dayEnd, end)

    let [from, to] = hours.split('M–')

    if (trim(hours).toLowerCase() === 'closed') {
      from = 'Closed'
      to = 'Closed'
      details.from = null
      details.from_type = null
      details.to = null
      details.to_type = null
    } else {
      /* Add M back from split */
      from += 'M'

      /* Pattern when minutes are present (8 - 30AM-2PM) */
      let dash = ' - '
      let dashLen = dash.length

      let fromHasMins = false
      let toHasMins = false

      let fromDashStart = from.search(dash)
      let toDashStart = to.search(dash)

      /* If minutes found replace dash with : */
      if (fromDashStart !== -1) {
        let fromStart = from.slice(0, fromDashStart)
        let fromEnd = from.slice(fromDashStart + dashLen)
        from = `${fromStart}:${fromEnd}`
        fromHasMins = true
      }

      if (toDashStart !== -1) {
        let toStart = to.slice(0, toDashStart)
        let toEnd = to.slice(toDashStart + dashLen)
        to = `${toStart}:${toEnd}`
        toHasMins = true
      }

      /* Separating AM/PM info */
      let fromType = from.slice(-2)
      let fromTime = from.slice(0, -2)

      let toType = to.slice(-2)
      let toTime = to.slice(0, -2)

      /* Addin :00 minutes if needed, 8PM -> 8:00 */
      if (!fromHasMins) fromTime = `${fromTime}:00`
      if (!toHasMins) toTime = `${toTime}:00`

      /* Clean formatted time with type, 8PM -> 8:00 PM */
      from = `${fromTime} ${fromType}`
      to = `${toTime} ${toType}`

      details.from = fromTime
      details.from_type = fromType
      details.to = toTime
      details.to_type = toType
    }

    sections.push({
      day: day,
      opens_at: from,
      closes_at: to,
      /* Save separated info in case needed, to avoid parsing again */
      details,
    })
  })

  return sections
}

export default splitHours
