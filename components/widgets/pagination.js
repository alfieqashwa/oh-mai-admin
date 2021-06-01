import { useState, useEffect } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { useDispatch, useStore } from 'react-redux'
import { order } from 'tailwindcss/defaultTheme'

export const Pagination = ({ offset, total, onChangeInput }) => {
  console.log("Pagination total", total)
  const dispatch = useDispatch()
  const store = useStore()
  const [mTotal, setmTotal] = useState(0)
  const [maxRow, setMaxRow] = useState(2)
  const [currentPage, setCurrentPage] = useState(1) // one based
  const styleNumberHilight = 'px-2.5 text-sm font-medium bg-P700 hover:bg-P700 transition duration-200 ease-in-out'
  const styleNumberNormal = 'px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out'

  const loadData = () => {
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: 0
        }
      }
    })
  }

  useEffect(() => {
    setmTotal(total)
  }, [offset, total])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()
    console.log("loadData maxRow:" + maxRow)
  }, [maxRow])

  const handleClick = (page) => {
    setCurrentPage(page)
    console.log("handle click", page)
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: maxRow * page
        }
      }
    })
  }

  const handleChangeMaxRow = e => {
    onChangeInput(e)
    const { value } = e.target
    console.log("handleChangeMaxRow:" + value)
    setMaxRow(parseInt(value))
  }

  store.subscribe(async () => {
    const state = await store.getState()
    const totalRow = state.value?.totalRow || 0
    const orders = state.value.data
    setmTotal(totalRow)
    console.log("pagination/State change", state)
    console.log("pagination/totalRow", totalRow)
  });

  const gotoFirst = () => {
    setCurrentPage(0)
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: 0
        }
      }
    })
  }

  const gotoLast = () => {
    const lastPage = (mTotal/maxRow)
    console.log("last_page", lastPage)
    setCurrentPage(lastPage)
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: lastPage
        }
      }
    })
  }

  const gotoNext = () => {
    if (currentPage + 1 <= ((mTotal/maxRow) - 1)) {
      dispatch({
        type: 'order/list',
        payload: {
          paging: {
            limit: maxRow,
            offset: (currentPage + 1)
          }
        }
      })
      setCurrentPage(currentPage + 1)
    }

  }

  const gotoPrev = () => {
    if (currentPage - 1 >= 0) {
      dispatch({
        type: 'order/list',
        payload: {
          paging: {
            limit: maxRow,
            offset: (currentPage + 1)
          }
        }
      })
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="block pt-4 pb-8 md:items-center md:justify-end md:flex">
      <nav className="flex items-center justify-center space-x-6 text-N0">
        <ChevronDoubleLeftIcon className="w-5 h-5 cursor-pointer" onClick={gotoFirst} />
        <ChevronLeftIcon className="w-5 h-5 cursor-pointer" onClick={gotoPrev} />
        {Array.apply(0, Array(Math.ceil(mTotal / maxRow))).map(function (x, i) {
          if (i < 5) {
            return <button
              key={i}
              className={(i) === currentPage ? styleNumberHilight : styleNumberNormal}
              page={i}
              onClick={handleClick.bind(null, i)}
            >{i + 1}</button>
          } else if ((Math.ceil(mTotal / maxRow) - 1) >= 5) {
            if ((i === 5) && (Math.ceil(mTotal / maxRow) - 1) == 5) {
              return <button
                key={i}
                className={(i + 1) === currentPage ? styleNumberHilight : styleNumberNormal}
                page={i}
                onClick={handleClick.bind(null, i)}
              >{i + 1}</button>
            } else if ((Math.ceil(mTotal / maxRow) - 1) > 5) {
              if (i === ((Math.ceil(mTotal / maxRow) - 1))) {
                return <button
                  key={i}
                  className={(i + 1) === currentPage ? styleNumberHilight : styleNumberNormal}
                  page={i}
                  onClick={handleClick.bind(null, i)}
                >{i + 1}</button>
              } else if (i === 5) {
                return <a className="px-2.5 py-1 text-sm font-medium rounded bg-N800">...</a>
              }
            }
          }
        })}
        {/* <button className="px-2.5 text-sm font-medium bg-P700 hover:bg-P700 transition duration-200 ease-in-out">1</button>
        <button className="px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">2</button>
        <button className="px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out">3</button> */}
        {/* <a className="px-2.5 py-1 text-sm font-medium rounded bg-N800">...</a> */}
        {/* <button className="px-2 text-sm font-medium bg-N800 hover:bg-P700">12</button> */}
        <ChevronRightIcon className="w-5 h-5 cursor-pointer" onClick={gotoNext} />
        <ChevronDoubleRightIcon className="w-5 h-5 cursor-pointer" onClick={gotoLast} />
      </nav>

      <div className="mt-2 text-center lg:mt-0 lg:text-none lg:mx-6">
        <p className="w350 text-N300 whitespace-nowrap">Showing <span className="font-medium text-N0">1</span> to <span className="font-medium text-N0">5</span> of <span className="font-medium text-N0">60</span> products</p>
      </div>

      <div className="items-center hidden lg:flex whitespace-nowrap">
        <p className="w350 text-N200">Show</p>
        <select type="number" name="show" className="w-16 px-2 py-1 mx-2 rounded-md bg-N100"
          id="max_row" onChange={handleChangeMaxRow}>
          <option>2</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
          <option>60</option>
        </select>
        <p className="w350 text-N200">at a time {mTotal}</p>
      </div>
    </div>
  )
}