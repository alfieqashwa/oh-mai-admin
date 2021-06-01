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
  const [maxRow, setMaxRow] = useState(2)
  const [pages, setPages] = useState([])
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
          offset: _currentPage
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

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {

    const totalPages = mTotal / maxRow;
    const currentPage = currentPage;
    const pageNeighbours = 1;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 1;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return range(1, totalPages);

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

    // Array.apply(0, Array(Math.ceil(mTotal / maxRow)))
    const pagesTotal = totalRow / maxRow
    const _pages = []

    // for (let i = 0; i < pagesTotal; i++) {
    //   if (i + )
    //     _pages.push()
    // }

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
          offset: lastPage
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
            offset: (currentPage + 1)
          }
        }
      })
      setCurrentPage(currentPage - 1)
    }
  }


  // i=0+1=1
  // i=1+1 = 2
  // i=2+1 = 3
  // currentPage=3

  // if (currentPage - i > 0 && currentPage  )

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
        {/* <nav className="flex items-center justify-center space-x-6 text-N0">
          <ChevronDoubleLeftIcon className="w-5 h-5 cursor-pointer" onClick={gotoFirst} />
          <ChevronLeftIcon className="w-5 h-5 cursor-pointer" onClick={gotoPrev} />
          {pages.map(function (x, i) {
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
          <ChevronRightIcon className="w-5 h-5 cursor-pointer" onClick={gotoNext} />
          <ChevronDoubleRightIcon className="w-5 h-5 cursor-pointer" onClick={gotoLast} />
        </nav> */}

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
    </div>
  )
}