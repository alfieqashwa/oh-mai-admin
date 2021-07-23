import React, { useState, useRef } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'

// import { Toolbar } from 'primereact/toolbar'
import { Column } from 'primereact/column'
import useSWR from 'swr'
import { products } from 'graphql/product'
// import { client } from 'lib/graphqlclient'
import { InputNumber } from 'primereact/inputnumber'

export const DeleteProductDialog = (props) => {
  const {
    deleteProductDialog,
    setDeleteProductDialog,
    toDelete,
    removeProduct
  } = props

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteProductDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          removeProduct()
          setDeleteProductDialog(false)
        }}
      />
    </React.Fragment>
  )

  return (
    <Dialog
      visible={deleteProductDialog}
      style={{ width: '450px' }}
      header="Confirm"
      modal
      footer={deleteProductDialogFooter}
      onHide={() => setDeleteProductDialog(false)}
    >
      <div className="confirmation-content" style={{ padding: '20px 0px' }}>
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: '2rem' }}
        />
        <span>
          Are you sure you want to delete <b>{toDelete?.product_name}</b>?
        </span>
      </div>
    </Dialog>
  )
}

export const AddProductDialog = (props) => {
  const { data: prod } = useSWR(products)

  const { addProductDialog, setAddProductDialog, addProduct } = props

  const [selectedProducts, setSelectedProducts] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const dt = useRef(null)

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  )

  const addProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          setAddProductDialog(false)
          setSelectedProducts(null)
        }}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          addProduct(selectedProducts)
          setAddProductDialog(false)
          setSelectedProducts(null)
        }}
      />
    </React.Fragment>
  )

  const priceBodyTemplate = (rowData) => {
    const formatter = new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })
    return formatter.format(rowData.current_price)
  }

  return (
    <Dialog
      visible={addProductDialog}
      style={{ width: '850px' }}
      header="Add Products"
      modal
      footer={addProductDialogFooter}
      onHide={() => {
        setAddProductDialog(false)
        setSelectedProducts(null)
      }}
    >
      <DataTable
        ref={dt}
        value={prod?.products}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        globalFilter={globalFilter}
        header={header}
        scrollable
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
        ></Column>
        <Column
          field="product_name"
          header="Name"
          sortable
          headerStyle={{ width: '150px' }}
        ></Column>
        <Column
          field="current_price"
          header="Current Price"
          body={priceBodyTemplate}
          sortable
          headerStyle={{ width: '150px' }}
        ></Column>
        <Column
          field="stock_status"
          header="Stock Status"
          sortable
          headerStyle={{ width: '150px' }}
        ></Column>
      </DataTable>
    </Dialog>
  )
}

export const EditProductDialog = (props) => {
  const { editProfitDialog, setEditProfitDialog, toEdit, editProfit } = props

  const [value, setValue] = useState(0)

  React.useEffect(() => {
    if (toEdit) {
      setValue(toEdit.kol_profit)
    }
  }, [toEdit])

  const editProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setEditProfitDialog(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          editProfit(value)
          setEditProfitDialog(false)
        }}
      />
    </React.Fragment>
  )

  return (
    <Dialog
      visible={editProfitDialog}
      style={{ width: '450px' }}
      header="Confirm"
      modal
      footer={editProductDialogFooter}
      onHide={() => setEditProfitDialog(false)}
    >
      <div className="confirmation-content" style={{ padding: '20px 0px' }}>
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: '2rem' }}
        />
        <span>
          <InputNumber
            value={value}
            onValueChange={(e) => setValue(e.value)}
            mode="decimal"
            minFractionDigits={2}
            maxFracionDigits={2}
          />
        </span>
      </div>
    </Dialog>
  )
}
