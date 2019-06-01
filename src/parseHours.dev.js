import parseHours from './parseHours'

/**
 * NOTE Samples are from serpApi /search knowledge graph
 * json results.
 */
const SAMPLES = [
  'Closed ⋅ Opens 8 - 30AM FriThursday8 - 30AM–8PMFriday8 - 30AM–8PMSaturday9AM–6PMSunday11AM–5PMMonday8 - 30AM–8PMTuesday8 - 30AM–8PMWednesday8 - 30AM–8PMSuggest an editUnable to add this file. Please check that it is a valid photo.',

  'Open ⋅ Closes 12AM · See more hoursThursday6AM–12AMFriday6AM–2AMSaturday6AM–2AMSunday6AM–12AMMonday6AM–12AMTuesday6AM–12AMWednesday6AM–12AMSuggest an editUnable to add this file. Please check that it is a valid photo.',

  'Open ⋅ Closes 11PMFriday11AM–11PMSaturday10AM–11PMSunday10AM–10PMMondayClosedTuesdayClosedWednesday11AM–10PMThursday11AM–10PMSuggest an editUnable to add this file. Please check that it is a valid photo.',

  'Open ⋅ Closes 12AMFriday9AM–12AMSaturday9AM–12AMSunday9AM–12AMMonday9AM–12AMTuesday9AM–12AMWednesday9AM–12AMThursday9AM–12AMSuggest an editUnable to add this file. Please check that it is a valid photo.',

  'Open ⋅ Closes 11PM · See more hoursFriday6AM–11PMSaturday6AM–11PMSunday6AM–11PMMonday6AM–11PMTuesday6AM–11PMWednesday6AM–11PMThursday6AM–11PMSuggest an editUnable to add this file. Please check that it is a valid photo.',
]

SAMPLES.forEach(x => {
  let { status, hours, todayHours } = parseHours(x) || {}

  console.log('\nOriginal String\n', x)
  console.log('\nStatus\n', { todayHours, status })
  console.log('\nHours\n', JSON.stringify(hours, null, 2))
})
