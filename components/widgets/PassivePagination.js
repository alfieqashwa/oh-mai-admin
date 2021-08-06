import React from 'react'
import ReactPaginate from 'react-paginate'

export const PassivePagination = ({ onMaxRowChange, maxRow, total, onPageChange, totalRowOnPage }) => {
  const _onMaxRowChange = (e) => {
    onMaxRowChange(e.target.value)
  }

  const _onPageChange = (props) => {
    onPageChange(props.selected)
  }

  return (
    <div className="block pt-4 pb-8 md:items-center md:justify-end md:flex">
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(total / maxRow)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={_onPageChange}
        containerClassName={'pagination'}
        pageClassName={'pagination-page'}
        nextClassName={'pagination-navigate'}
        previousClassName={'pagination-navigate'}
        activeClassName={'active'} />
      <div className="block pt-4 pb-8 md:items-center md:justify-end md:flex">
        <div className="mt-2 text-center lg:mt-0 lg:text-none lg:mx-6">
          <p className="w350 text-N300 whitespace-nowrap">
            Showing <span className="font-medium text-N0 mx-1">{totalRowOnPage}</span> of <span className="font-medium text-N0 mx-1">{total}</span> products</p>
        </div>
        <div className="items-center hidden lg:flex whitespace-nowrap">
          <p className="w350 text-N200">Show</p>
          <select type="number" name="show" className="w-16 px-2 py-1 mx-2 rounded-md bg-N100"
            id="max_row" onChange={_onMaxRowChange} value={maxRow}>
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
