export const timeFilterFormatter = (filter) => {
  if (!filter) {
    return
  }

  let startDate, endDate

  switch (filter.mode) {
    case '24h':
      startDate = null
      endDate = null
      break
    case '7d':
      startDate = null
      endDate = null
      break
    case 'days':
      startDate = filter.dayStart
      endDate = filter.dayEnd
      break
    case 'weeks':
      startDate = filter.weekStart
      endDate = filter.weekEnd
      break
    case 'months':
      startDate = filter.monthStart
      endDate = filter.monthEnd
      break
    case 'years':
      startDate = filter.yearStart
      endDate = filter.yearEnd
      break
    default:
      console.log('Invalid mode: ' + filter.mode)
      break
  }

  return {
    startDate: startDate,
    endDate: endDate
  }
}
