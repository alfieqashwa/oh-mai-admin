import React from "react";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/router";
import { FaShareSquare } from "react-icons/fa";
import { Button } from "primereact/button";

import { LOGOUT } from "graphql/login";

import Cookies from "js-cookie";

import useUser from "lib/useUser";

import { getClient } from "lib/graphqlclient";
import PuffLoader from "react-spinners/PuffLoader";

export const AppTopbar = (props) => {
  const { loggedOut, user } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (loggedOut) {
      router.replace("/login");
      return <PuffLoader color={"#8A3EFF"} size={150} />;
    }
  }, [loggedOut]);

  async function logout() {
    await getClient().request(LOGOUT);

    router.push("/login");
  }

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
      <div className="p-col-4 p-lg-4" style={{ textAlign: "center" }}>
        <div
          onClick={() => {
            window.open("https://th.buy2077.co", "_blank");
          }}
          style={{ cursor: "pointer" }}
        >
          Project V{" "}
          <span>
            {" "}
            <FaShareSquare />{" "}
          </span>
        </div>
      </div>
      <div className="p-col p-d-flex p-jc-end">
        {router.pathname != "/login" && (
          <button
            type="button"
            className="p-link layout-menu-button"
            onClick={() => {
              Cookies.remove("token");
              logout();
            }}
            style={{
              border: "1px solid white",
              padding: "0px 10px 2px 10px",
            }}
          >
            Logout
          </button>
        )}
      </div>
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
