import moment from 'moment'
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

export const createBarChart = (currData, filter, setData, version) => {
  const chartLabels = []

  const keys = Object.keys(currData[0])

  const pcKeys = []
  const psKeys = []
  const xboxKeys = []
  keys.forEach((key) => {
    if (key.includes('pc')) pcKeys.push(key)
    if (key.includes('ps4')) psKeys.push(key)
    if (key.includes('xbox')) xboxKeys.push(key)
  })

  // console.log(pcKeys);
  const pcData = []
  const psData = []
  const xboxData = []

  if (filter === 'ALL') {
    currData.forEach((element) => {
      chartLabels.push(moment(element.date).format('DD-MM-YYYY'))

      let currPC = 0
      pcKeys.forEach((key) => {
        if (version === 1) {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPC += parseInt(element[key]) * priceSGSpecialPC } else if (key.includes('sg')) { currPC += parseInt(element[key]) * priceSGPC }
          if (key.includes('my')) currPC += parseInt(element[key]) * priceMYPC
          if (key.includes('tw')) currPC += parseInt(element[key]) * priceTWPC
          if (key.includes('hk')) currPC += parseInt(element[key]) * priceHKPC
        } else currPC += parseInt(element[key])
      })
      pcData.push(currPC)

      let currPS = 0
      psKeys.forEach((key) => {
        if (version === 1) {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPC += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currPS += parseInt(element[key]) * priceSGConsole }
          if (key.includes('my')) { currPS += parseInt(element[key]) * priceMYConsole }
          if (key.includes('tw')) { currPS += parseInt(element[key]) * priceTWConsole }
          if (key.includes('hk')) { currPS += parseInt(element[key]) * priceHKConsole }
        } else currPS += parseInt(element[key])
      })
      psData.push(currPS)

      let currXBOX = 0
      xboxKeys.forEach((key) => {
        if (version === 1) {
          if (
            key.includes('jianhao') ||
            key.includes('debbie') ||
            key.includes('titangamers')
          ) { currPC += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currXBOX += parseInt(element[key]) * priceSGConsole }
          if (key.includes('my')) { currXBOX += parseInt(element[key]) * priceMYConsole }
          if (key.includes('tw')) { currXBOX += parseInt(element[key]) * priceTWConsole }
          if (key.includes('hk')) { currXBOX += parseInt(element[key]) * priceHKConsole }
        } else currXBOX += parseInt(element[key])
      })
      xboxData.push(currXBOX)
    })

    // set the labels for the chart
    setData({
      labels: chartLabels,
      datasets: [
        {
          label: 'PC Sales',
          backgroundColor: '#42A5F5',
          data: pcData
        },
        {
          label: 'PS Sales',
          backgroundColor: '#66BB6A',
          data: psData
        },
        {
          label: 'Xbox Sales',
          backgroundColor: '#FFA726',
          data: xboxData
        }
      ]
    })
  } else if (
    filter === 'SG' ||
    filter === 'MY' ||
    filter === 'TW' ||
    filter === 'HK'
  ) {
    currData.forEach((element) => {
      chartLabels.push(moment(element.date).format('DD-MM-YYYY'))

      let currPC = 0
      let currPS = 0
      let currXBOX = 0

      pcKeys.forEach((key) => {
        if (key.includes(filter.toLowerCase())) {
          // currPC += parseInt(element[key]);

          if (version === 1) {
            if (
              key.includes('jianhao') ||
              key.includes('debbie') ||
              key.includes('titangamers')
            ) { currPC += parseInt(element[key]) * priceSGSpecialPC } else if (key.includes('sg')) { currPC += parseInt(element[key]) * priceSGPC } else if (key.includes('my')) { currPC += parseInt(element[key]) * priceMYPC } else if (key.includes('tw')) { currPC += parseInt(element[key]) * priceTWPC } else if (key.includes('hk')) { currPC += parseInt(element[key]) * priceHKPC }
          } else currPC += parseInt(element[key])
        }
      })
      psKeys.forEach((key) => {
        if (key.includes(filter.toLowerCase())) {
          if (version === 1) {
          // currPS += parseInt(element[key]);

            if (
              key.includes('jianhao') ||
              key.includes('debbie') ||
              key.includes('titangamers')
            ) { currPS += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currPS += parseInt(element[key]) * priceSGConsole } else if (key.includes('my')) { currPS += parseInt(element[key]) * priceMYConsole } else if (key.includes('tw')) { currPS += parseInt(element[key]) * priceTWConsole } else if (key.includes('hk')) { currPS += parseInt(element[key]) * priceHKConsole }
          } else currPS += parseInt(element[key])
        }
      })
      xboxKeys.forEach((key) => {
        if (key.includes(filter.toLowerCase())) {
          if (version === 1) {
          // currXBOX += parseInt(element[key]);

            if (
              key.includes('jianhao') ||
              key.includes('debbie') ||
              key.includes('titangamers')
            ) { currXBOX += parseInt(element[key]) * priceSGSpecialConsole } else if (key.includes('sg')) { currXBOX += parseInt(element[key]) * priceSGConsole } else if (key.includes('my')) { currXBOX += parseInt(element[key]) * priceMYConsole } else if (key.includes('tw')) { currXBOX += parseInt(element[key]) * priceTWConsole } else if (key.includes('hk')) { currXBOX += parseInt(element[key]) * priceHKConsole }
          } else currXBOX += parseInt(element[key])
        }
      })

      pcData.push(currPC)
      psData.push(currPS)
      xboxData.push(currXBOX)
    })

    // set the labels for the chart
    setData({
      labels: chartLabels,
      datasets: [
        {
          label: 'PC Sales',
          backgroundColor: '#42A5F5',
          data: pcData
        },
        {
          label: 'PS Sales',
          backgroundColor: '#66BB6A',
          data: psData
        },
        {
          label: 'Xbox Sales',
          backgroundColor: '#FFA726',
          data: xboxData
        }
      ]
    })
  } else {
    currData.forEach((element) => {
      chartLabels.push(moment(element.date).format('DD-MM-YYYY'))

      const pcKeysIndex = pcKeys.findIndex((element) => element.includes(filter))

      let currPC = 0

      if (pcKeysIndex !== -1) {
        currPC = element[pcKeys[pcKeysIndex]]
        if (version === 1) {
          if (
            pcKeys[pcKeysIndex].includes('jianhao') ||
            pcKeys[pcKeysIndex].includes('debbie') ||
            pcKeys[pcKeysIndex].includes('titangamers')
          ) { currPC *= priceSGSpecialPC } else if (pcKeys[pcKeysIndex].includes('sg')) currPC *= priceSGPC
          else if (pcKeys[pcKeysIndex].includes('my')) currPC *= priceMYPC
          else if (pcKeys[pcKeysIndex].includes('tw')) currPC *= priceTWPC
          else if (pcKeys[pcKeysIndex].includes('hk')) currPC *= priceHKPC
        }
      }

      const psKeysIndex = psKeys.findIndex((element) => element.includes(filter))

      let currPS = 0

      if (psKeysIndex !== -1) {
        currPS = element[psKeys[psKeysIndex]]
        if (version === 1) {
          if (
            psKeys[psKeysIndex].includes('jianhao') ||
            psKeys[psKeysIndex].includes('debbie') ||
            psKeys[psKeysIndex].includes('titangamers')
          ) { currPS *= priceSGSpecialConsole } else if (psKeys[psKeysIndex].includes('sg')) currPS *= priceSGConsole
          else if (psKeys[psKeysIndex].includes('my')) currPS *= priceMYConsole
          else if (psKeys[psKeysIndex].includes('tw')) currPS *= priceTWConsole
          else if (psKeys[psKeysIndex].includes('hk')) currPS *= priceHKConsole
        }
      }

      const xboxKeysIndex = psKeys.findIndex((element) =>
        element.includes(filter)
      )

      let currXBOX = 0

      if (xboxKeysIndex !== -1) {
        currXBOX = element[xboxKeys[xboxKeysIndex]]
        if (version === 1) {
          if (
            xboxKeys[xboxKeysIndex].includes('jianhao') ||
            xboxKeys[xboxKeysIndex].includes('debbie') ||
            xboxKeys[xboxKeysIndex].includes('titangamers')
          ) { currXBOX *= priceSGSpecialConsole } else if (xboxKeys[xboxKeysIndex].includes('sg')) { currXBOX *= priceSGConsole } else if (xboxKeys[xboxKeysIndex].includes('my')) { currXBOX *= priceMYConsole } else if (xboxKeys[xboxKeysIndex].includes('tw')) { currXBOX *= priceTWConsole } else if (xboxKeys[xboxKeysIndex].includes('hk')) { currXBOX *= priceHKConsole }
        }
      }

      pcData.push(currPC)
      psData.push(currPS)
      xboxData.push(currXBOX)
    })

    // set the labels for the chart
    setData({
      labels: chartLabels,
      datasets: [
        {
          label: 'PC Sales',
          backgroundColor: '#42A5F5',
          data: pcData
        },
        {
          label: 'PS Sales',
          backgroundColor: '#66BB6A',
          data: psData
        },
        {
          label: 'Xbox Sales',
          backgroundColor: '#FFA726',
          data: xboxData
        }
      ]
    })
  }
}

export const stackedOptions = {
  tooltips: {
    mode: 'index',
    intersect: false
  },
  responsive: true,
  scales: {
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#495057'
        },
        gridLines: {
          color: '#ebedef'
        }
      }
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#495057'
        },
        gridLines: {
          color: '#ebedef'
        }
      }
    ]
  },
  legend: {
    labels: {
      fontColor: '#495057'
    }
  }
}
