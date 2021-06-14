import { useState, useEffect } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { useDispatch, useStore } from 'react-redux'
import { order } from 'tailwindcss/defaultTheme'
import ReactPaginate from 'react-paginate';

export const Pagination = ({ offset, total, onChangeInput }) => {
  console.log("Pagination total", total)
  const dispatch = useDispatch()
  const store = useStore()
  const [mTotal, setmTotal] = useState(0)
  const [maxRow, setMaxRow] = useState(10)
  const [pages, setPages] = useState([])
  const [totalDisplayedOrder, setTotalDisplayedOrder] = useState(0)
  const [currentPage, setCurrentPage] = useState(0) // index based
  const styleNumberHilight = 'px-2.5 text-sm font-medium bg-P700 hover:bg-P700 transition duration-200 ease-in-out'
  const styleNumberNormal = 'px-2.5 text-sm font-medium bg-N800 hover:bg-P700 transition duration-200 ease-in-out'
  const LEFT_PAGE = 'LEFT';
  const RIGHT_PAGE = 'RIGHT';

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

  const handleClick = (props) => {
    const _currentPage = props.selected
    console.log("handle click page", _currentPage)
    setCurrentPage(_currentPage)

    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: _currentPage * maxRow
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

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  }

  const generatePageNumber = () => {
    const totalPage = Math.ceil(mTotal / maxRow)
    let newPages = []
    const leftPages = []
    const rightPages = []
    const pageNeighbor = 2
    const iCurrentPage = currentPage + 1

    for (let i = 0; i < totalPage; i++) {
      if (i < iCurrentPage) {
        if ((iCurrentPage - i) >= (iCurrentPage - pageNeighbor))
          leftPages.push(i)
      }

      if (i > iCurrentPage) {
        if (((iCurrentPage + i) <= (pageNeighbor + iCurrentPage))) {
          console.log("pg leftPage", leftPages)
          rightPages.push(i)
        }
      }
    }

    newPages = newPages.concat(leftPages)
    newPages.push(iCurrentPage)
    newPages = newPages.concat(rightPages)

    console.log("pg leftPage", leftPages)
    console.log("pg rightPages", rightPages)
    console.log("pg all", newPages)
    console.log("pg iCurrentPage", iCurrentPage)

    return newPages
  }

  store.subscribe(async () => {
    const state = await store.getState()
    const totalRow = state.value?.totalRow || 0
    const orders = state.value.data
    setmTotal(totalRow)
    setTotalDisplayedOrder(orders.length)
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
    const lastPage = (mTotal / maxRow)
    console.log("last_page", lastPage)
    setCurrentPage(lastPage)
    dispatch({
      type: 'order/list',
      payload: {
        paging: {
          limit: maxRow,
          offset: lastPage * maxRow
        }
      }
    })
  }

  const gotoNext = () => {
    if (currentPage + 1 <= ((mTotal / maxRow) - 1)) {
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
            offset: (currentPage + 1) * maxRow
          }
        }
      })
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    const newPages = generatePageNumber()
    // const newPages = fetchPageNumbers()
    // console.log("newPages", newPages)
    console.log("newPages", newPages)
    setPages(newPages)
  }, [mTotal, maxRow, currentPage])

  return (
    <div className="block pt-4 pb-8 md:items-center md:justify-end md:flex">
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(mTotal / maxRow)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleClick}
        containerClassName={"pagination"}
        pageClassName={"pagination-page"}
        nextClassName={"pagination-navigate"}
        previousClassName={"pagination-navigate"}
        activeClassName={"active"} />
      <div className="block pt-4 pb-8 md:items-center md:justify-end md:flex">
        <div className="mt-2 text-center lg:mt-0 lg:text-none lg:mx-6">
          <p className="w350 text-N300 whitespace-nowrap">
            Showing <span className="font-medium text-N0">{totalDisplayedOrder}</span> of <span className="font-medium text-N0">{mTotal}</span> products</p>
        </div>
        <div className="items-center hidden lg:flex whitespace-nowrap">
          <p className="w350 text-N200">Show</p>
          <select type="number" name="show" className="w-16 px-2 py-1 mx-2 rounded-md bg-N100"
            id="max_row" onChange={handleChangeMaxRow}>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
            <option>60</option>
          </select>
          <p className="w350 text-N200">at a time</p>
        </div>
      </div>
    </div>
  )
}