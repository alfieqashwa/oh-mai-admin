import {
  priceSGPC,
  priceSGConsole,
  priceMYPC,
  priceMYConsole,
  priceTWPC,
  priceTWConsole,
  priceHKPC,
  priceHKConsole,
  priceSGSpecialPC,
  priceSGSpecialConsole
} from './values'

export const createDouChart = (currData, filter, setData, version) => {
  let chartLabels = ['SG', 'MY', 'TW', 'HK']

  const keys = Object.keys(currData[0])

  let finalData = []

  if (version === 0) {
    chartLabels = ['SG', 'MY', 'TW', 'HK']

    const newKeys = []
    keys.forEach((key) => {
      if (key.includes('pc') || key.includes('ps4') || key.includes('xbox')) { newKeys.push(key) }
    })

    let currSG = 0
    let currMY = 0
    let currTW = 0
    let currHK = 0

    currData.forEach((element) => {
      newKeys.forEach((key) => {
        if (key.includes('sg')) currSG += parseInt(element[key])
        if (key.includes('my')) currMY += parseInt(element[key])
        if (key.includes('tw')) currTW += parseInt(element[key])
        if (key.includes('hk')) currHK += parseInt(element[key])
      })
    })

    finalData = [currSG, currMY, currTW, currHK]
  } else if (version === 1) {
    chartLabels = ['SG', 'MY', 'TW', 'HK']

    const newKeys = []
    keys.forEach((key) => {
      if (key.includes('pc') || key.includes('ps4') || key.includes('xbox')) { newKeys.push(key) }
    })

    let currSG = 0
    let currMY = 0
    let currTW = 0
    let currHK = 0
    currData.forEach((element) => {
      newKeys.forEach((key) => {
        if (
          key.includes('jianhao') ||
          key.includes('debbie') ||
          key.includes('titangamers')
        ) {
          if (key.includes('pc')) { currSG += parseInt(element[key]) * priceSGSpecialPC } else currSG += parseInt(element[key]) * priceSGSpecialConsole
        } else if (key.includes('sg')) {
          if (key.includes('pc')) currSG += parseInt(element[key]) * priceSGPC
          else currSG += parseInt(element[key]) * priceSGConsole
        } else if (key.includes('my')) {
          if (key.includes('pc')) currMY += parseInt(element[key]) * priceMYPC
          else currMY += parseInt(element[key]) * priceMYConsole
        } else if (key.includes('tw')) {
          if (key.includes('pc')) currTW += parseInt(element[key]) * priceTWPC
          else currTW += parseInt(element[key]) * priceTWConsole
        } else if (key.includes('hk')) {
          if (key.includes('pc')) currHK += parseInt(element[key]) * priceHKPC
          else currHK += parseInt(element[key]) * priceHKConsole
        }
      })
    })

    finalData = [currSG, currMY, currTW, currHK]
  } else if (version === 2) {
    chartLabels = ['PC', 'PS', 'XBOX']

    const pcKeys = []
    const psKeys = []
    const xboxKeys = []
    keys.forEach((key) => {
      if (key.includes('pc')) pcKeys.push(key)
      if (key.includes('ps4')) psKeys.push(key)
      if (key.includes('xbox')) xboxKeys.push(key)
    })

    let currPC = 0
    let currPS = 0
    let currXBOX = 0

    currData.forEach((element) => {
      pcKeys.forEach((key, index) => {
        if (filter === 'ALL') {
          currPC += parseInt(element[key])
        } else {
          if (key.includes(filter.toLowerCase())) { currPC += parseInt(element[key]) }
        }
      })
      psKeys.forEach((key, index) => {
        if (filter === 'ALL') {
          currPS += parseInt(element[key])
        } else {
          if (key.includes(filter.toLowerCase())) { currPS += parseInt(element[key]) }
        }
      })

      xboxKeys.forEach((key, index) => {
        if (filter === 'ALL') {
          currXBOX += parseInt(element[key])
        } else {
          if (key.includes(filter.toLowerCase())) { currXBOX += parseInt(element[key]) }
        }
      })
    })
    finalData = [currPC, currPS, currXBOX]
  } else if (version === 3) {
    chartLabels = ['PC', 'PS', 'XBOX']

    const pcKeys = []
    const psKeys = []
    const xboxKeys = []
    keys.forEach((key) => {
      if (key.includes('pc')) pcKeys.push(key)
      if (key.includes('ps4')) psKeys.push(key)
      if (key.includes('xbox')) xboxKeys.push(key)
    })

    let currPC = 0
    let currPS = 0
    let currXBOX = 0

    currData.forEach((element) => {
      pcKeys.forEach((key, index) => {
        if (filter === 'ALL') {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPC += parseInt(element[key]) * priceSGSpecialPC } else if (key.includes('sg')) { currPC += parseInt(element[key]) * priceSGPC } else if (key.includes('my')) { currPC += parseInt(element[key]) * priceMYPC } else if (key.includes('tw')) { currPC += parseInt(element[key]) * priceTWPC } else if (key.includes('hk')) { currPC += parseInt(element[key]) * priceHKPC }
        } else if (filter === 'SG') {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPC += parseInt(element[key]) * priceSGSpecialPC } else if (key.includes('sg')) { currPC += parseInt(element[key]) * priceSGPC }
        } else if (filter === 'MY') {
          if (key.includes('my')) currPC += parseInt(element[key]) * priceMYPC
        } else if (filter === 'TW') {
          if (key.includes('tw')) currPC += parseInt(element[key]) * priceTWPC
        } else if (filter === 'HK') {
          if (key.includes('hk')) currPC += parseInt(element[key]) * priceHKPC
        } else {
          if (key.includes(filter)) {
            if (
              key.includes('jianhao') ||
              key.includes('debbie') ||
              key.includes('titangamers')
            ) {
              currPC += parseInt(element[key]) * priceSGSpecialPC
            } else if (key.includes('sg')) { currPC += parseInt(element[key]) * priceSGPC } else if (key.includes('my')) { currPC += parseInt(element[key]) * priceMYPC } else if (key.includes('tw')) { currPC += parseInt(element[key]) * priceTWPC } else if (key.includes('hk')) { currPC += parseInt(element[key]) * priceHKPC }
          }
        }
      })
      psKeys.forEach((key, index) => {
        if (filter === 'ALL') {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPS += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currPS += parseInt(element[key]) * priceSGConsole } else if (key.includes('my')) { currPS += parseInt(element[key]) * priceMYConsole } else if (key.includes('tw')) { currPS += parseInt(element[key]) * priceTWConsole } else if (key.includes('hk')) { currPS += parseInt(element[key]) * priceHKConsole }
        } else if (filter === 'SG') {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPS += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currPS += parseInt(element[key]) * priceSGConsole }
        } else if (filter === 'MY') {
          if (key.includes('my')) { currPS += parseInt(element[key]) * priceMYConsole }
        } else if (filter === 'TW') {
          if (key.includes('tw')) { currPS += parseInt(element[key]) * priceTWConsole }
        } else if (filter === 'HK') {
          if (key.includes('hk')) { currPS += parseInt(element[key]) * priceHKConsole }
        } else {
          if (key.includes(filter)) {
            if (
              key.includes('jianhao') ||
              key.includes('debbie') ||
              key.includes('titangamers')
            ) { currPS += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currPS += parseInt(element[key]) * priceSGConsole } else if (key.includes('my')) { currPS += parseInt(element[key]) * priceMYConsole } else if (key.includes('tw')) { currPS += parseInt(element[key]) * priceTWConsole } else if (key.includes('hk')) { currPS += parseInt(element[key]) * priceHKConsole }
          }
        }
      })

      xboxKeys.forEach((key, index) => {
        if (filter === 'ALL') {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currXBOX += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) {
            currXBOX += parseInt(element[key]) * priceSGConsole
          } else if (key.includes('my')) { currXBOX += parseInt(element[key]) * priceMYConsole } else if (key.includes('tw')) { currXBOX += parseInt(element[key]) * priceTWConsole } else if (key.includes('hk')) { currXBOX += parseInt(element[key]) * priceHKConsole }
        } else if (filter === 'SG') {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currXBOX += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currXBOX += parseInt(element[key]) * priceSGConsole }
        } else if (filter === 'MY') {
          if (key.includes('my')) { currXBOX += parseInt(element[key]) * priceMYConsole }
        } else if (filter === 'TW') {
          if (key.includes('tw')) { currXBOX += parseInt(element[key]) * priceTWConsole }
        } else if (filter === 'HK') {
          if (key.includes('hk')) { currXBOX += parseInt(element[key]) * priceHKConsole }
        } else {
          if (key.includes(filter)) {
            if (
              key.includes('jianhao') ||
              key.includes('debbie') ||
              key.includes('titangamers')
            ) { currXBOX += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currXBOX += parseInt(element[key]) * priceSGConsole } else if (key.includes('my')) { currXBOX += parseInt(element[key]) * priceMYConsole } else if (key.includes('tw')) { currXBOX += parseInt(element[key]) * priceTWConsole } else if (key.includes('hk')) { currXBOX += parseInt(element[key]) * priceHKConsole }
          }
        }
      })
    })
    finalData = [currPC, currPS, currXBOX]
  }

  setData({
    labels: chartLabels,
    datasets: [
      {
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', 'black'],
        data: finalData
      }
    ]
  })
}

export const douOptions = {
  legend: {
    labels: {
      fontColor: '#495057'
    }
  }
}
