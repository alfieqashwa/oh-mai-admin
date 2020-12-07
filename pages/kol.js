import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import useSWR from "swr";
import { kols, DELETE_KOL, KOL_USER_INFO } from "../graphql/kol";
import { fetcher, fetcherargs, mutate } from "../lib/useSWR";
import Link from "next/link";
import useUser from "lib/useUser";

export default function KOL() {
  const person = useUser({ redirectTo: "/login" });

  const [selectedKols, setSelectedKols] = useState(null);
  const [selectedSingle, setSelectedSingle] = useState(null);

  const [deleteKolDialog, setDeleteKolDialog] = useState(false);
  const [deleteKolsDialog, setDeleteKolsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [kolsList, setKolsList] = useState([]);

  const toast = useRef(null);
  const dt = useRef(null);

  const { data: prod, error: prodErr } = useSWR(kols, fetcher);
  if (prodErr) console.log(prodErr);

  React.useEffect(() => {
    console.log(prod);

    if (prod) {
      let emptyKol = {
        first_name: "",
        last_name: "",
        display_name: "",
        email: "",
        contact_number: null,
        slug: "",
        bank_details: {
          bank: "",
          bank_account_number: 0,
          bank_code: 0,
          bank_branch_code: 0,
          swift_code: 0,
        },
        approved: false,
        banner_image: "",
        profile_image: "",
        description: "",
        social_medias: {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
        },
        featured: false,
        products: [],
      };

      let newList = [];
      (async () => {
        for (var i = 0; i < prod.kols.length; i++) {
          var kol = prod.kols[i];
          emptyKol = kol;

          let a = await fetcherargs(KOL_USER_INFO, { id: kol.user_id });
          console.log(a);
          emptyKol.first_name = a.user.first_name;
          emptyKol.last_name = a.user.last_name;
          emptyKol.email = a.user.email;
          emptyKol.contact_number = a.user.contact_number;

          console.log(emptyKol);
          newList.push(emptyKol);
        }
        setKolsList(newList);
        console.log("done");
      })();
    }
  }, [prod]);

  if (!prod) return <></>;

  const hideDeleteKolDialog = () => {
    setDeleteKolDialog(false);
  };

  const hideDeleteKolsDialog = () => {
    setDeleteKolsDialog(false);
  };

  const confirmDeleteKol = (Kol) => {
    setSelectedSingle(Kol);
    setDeleteKolDialog(true);
  };

  async function deleteKolMutation(id) {
    await mutate(DELETE_KOL, { id: id });
  }
  async function deleteKolsMutation(id) {
    for (var i = 0; i < id.length; i++) {
      await mutate(DELETE_KOL, { id: id[i] });
    }
  }

  const deleteKol = () => {
    deleteKolMutation(selectedSingle.id);
    setDeleteKolDialog(false);
    setSelectedSingle(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Kol Deleted",
      life: 3000,
    });
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteKolsDialog(true);
  };

  const deleteSelectedKols = () => {
    var ids = [];

    selectedKols.forEach((element) => {
      ids.push(element.id);
    });

    deleteKolsMutation(ids);

    setDeleteKolsDialog(false);
    setSelectedKols(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Kols Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link href="/addkol">
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-button-success p-mr-2"
          />
        </Link>
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedKols || !selectedKols.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
        /> */}
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Kols</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.featured_image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="Kol-image"
      />
    );
  };

  const categoryTemplate = (rowData) => {
    return (
      <div>
        {rowData.categories.map((eaCat) => (
          <p>{eaCat}</p>
        ))}
      </div>
    );
  };

  const tagsTemplate = (rowData) => {
    return (
      <div>
        {rowData.tags.map((eaCat) => (
          <p>{eaCat}</p>
        ))}
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    var formatter = new Intl.NumberFormat("en-SG", {
      style: "currency",
      currency: "SGD",
    });
    return formatter.format(rowData.current_price);
  };

  const onsaleTemplate = (rowData) => {
    return rowData.approved ? "Yes" : "No";
  };
  const featuredTemplate = (rowData) => {
    return rowData.featured ? "Yes" : "No";
  };

  const bankDetailsTemplate = (rowData) => {
    return (
      <div>
        <p>{rowData.bank_details?.bank}</p>
        <p>{rowData.bank_details?.bank_account_number}</p>
        <p>{rowData.bank_details?.bank_code}</p>
        <p>{rowData.bank_details?.bank_branch_code}</p>
        <p>{rowData.bank_details?.swift_code}</p>
      </div>
    );
  };

  const productsTemplate = (rowData) => {
    return (
      <div>
        {rowData?.products?.map((eaCat) => (
          <p>{eaCat.product_name}</p>
        ))}
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link href={{ pathname: "/editkol", query: { slug: rowData.slug } }}>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteKol(rowData)}
        />
      </React.Fragment>
    );
  };

  const deleteKolDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteKolDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteKol}
      />
    </React.Fragment>
  );
  const deleteKolsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteKolsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedKols}
      />
    </React.Fragment>
  );

  if (person) {
    return (
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="p-mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={kolsList}
            selection={selectedKols}
            onSelectionChange={(e) => setSelectedKols(e.value)}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Kols"
            globalFilter={globalFilter}
            header={header}
            scrollable
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="first_name"
              header="First Name"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="last_name"
              header="Last Name"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="contact_number"
              header="Contact Number"
              sortable
              headerStyle={{ width: "200px" }}
            ></Column>
            <Column
              field="display_name"
              header="Display Name"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="slug"
              header="Slug"
              sortable
              headerStyle={{ width: "150px" }}
            ></Column>
            <Column
              field="approved"
              header="Is KOL approved?"
              body={onsaleTemplate}
              headerStyle={{ width: "200px" }}
              sortable
            ></Column>
            <Column
              field="featured"
              header="Is KOL featured?"
              body={featuredTemplate}
              headerStyle={{ width: "200px" }}
              sortable
            ></Column>
            <Column
              header="Bank Details"
              body={bankDetailsTemplate}
              headerStyle={{ width: "200px" }}
              sortable
            ></Column>
            <Column
              header="Products"
              body={productsTemplate}
              headerStyle={{ width: "200px" }}
              sortable
            ></Column>
            <Column
              body={actionBodyTemplate}
              headerStyle={{ width: "150px" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={deleteKolDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteKolDialogFooter}
          onHide={hideDeleteKolDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {selectedSingle && (
              <span>
                Are you sure you want to delete <b>{selectedSingle.Kol_name}</b>
                ?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteKolsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteKolsDialogFooter}
          onHide={hideDeleteKolsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: "2rem" }}
            />
            {selectedKols && (
              <span>Are you sure you want to delete the selected Kols?</span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }

  return <></>;
}
