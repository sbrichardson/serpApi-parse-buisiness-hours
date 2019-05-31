Install with yarn

Start with `yarn dev`

Check the console for the sample output from `src/parseHours_dev.js`


### Example Output

```
Original String
 Open ⋅ Closes 12AM · See more hoursThursday6AM–12AMFriday6AM–2AMSaturday6AM–2AMSunday6AM–12AMMonday6AM–12AMTuesday6AM–12AMWednesday6AM–12AMSuggest an editUnable to add this file. Please check that it is a valid photo.

Status
 { todayHours: 'Closes 12AM', status: 'Open' }

Hours
 [
  {
    "day": "Thursday",
    "opens_at": "6:00 AM",
    "closes_at": "12:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "12:00",
      "to_type": "AM"
    }
  },
  {
    "day": "Friday",
    "opens_at": "6:00 AM",
    "closes_at": "2:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "2:00",
      "to_type": "AM"
    }
  },
  {
    "day": "Saturday",
    "opens_at": "6:00 AM",
    "closes_at": "2:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "2:00",
      "to_type": "AM"
    }
  },
  {
    "day": "Sunday",
    "opens_at": "6:00 AM",
    "closes_at": "12:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "12:00",
      "to_type": "AM"
    }
  },
  {
    "day": "Monday",
    "opens_at": "6:00 AM",
    "closes_at": "12:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "12:00",
      "to_type": "AM"
    }
  },
  {
    "day": "Tuesday",
    "opens_at": "6:00 AM",
    "closes_at": "12:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "12:00",
      "to_type": "AM"
    }
  },
  {
    "day": "Wednesday",
    "opens_at": "6:00 AM",
    "closes_at": "12:00 AM",
    "details": {
      "from": "6:00",
      "from_type": "AM",
      "to": "12:00",
      "to_type": "AM"
    }
  }
]
```
