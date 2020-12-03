import React from "react";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/router";
import { FaShareSquare } from "react-icons/fa";

export const AppTopbar = (props) => {
  const router = useRouter();
  return (
    <div className="layout-topbar clearfix p-grid">
      <div className="p-col">
        {router.pathname != "/login" && (
          <button
            type="button"
            className="p-link layout-menu-button"
            onClick={props.onToggleMenu}
          >
            <span className="pi pi-bars" />
          </button>
        )}
      </div>
      <div className="p-col-10 p-lg-4" style={{ textAlign: "center" }}>
        <div
          onClick={() => {
            window.open("https://th.buy2077.co", "_blank");
          }}
          style={{ cursor: "pointer" }}
        >
          Cyberpunk 2077 Thailand Pre-order{" "}
          <span>
            {" "}
            <FaShareSquare />{" "}
          </span>
        </div>
      </div>
      <div className="p-col mobileTop"></div>
      {/* <div className="layout-topbar-icons">
        <span className="layout-topbar-search">
          <InputText type="text" placeholder="Search" />
          <span className="layout-topbar-search-icon pi pi-search" />
        </span>
        <button type="button" className="p-link">
          <span className="layout-topbar-item-text">Events</span>
          <span className="layout-topbar-icon pi pi-calendar" />
          <span className="layout-topbar-badge">5</span>
        </button>
        <button type="button" className="p-link">
          <span className="layout-topbar-item-text">Settings</span>
          <span className="layout-topbar-icon pi pi-cog" />
        </button>
        <button type="button" className="p-link">
          <span className="layout-topbar-item-text">User</span>
          <span className="layout-topbar-icon pi pi-user" />
        </button>
      </div> */}
    </div>
  );
};
