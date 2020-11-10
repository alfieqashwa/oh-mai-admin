import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { AppTopbar } from "../components/apptopbar";

import { AppProfile } from "../components/appprofile";
import { AppMenu } from "../components/appmenu";

import { CSSTransition } from "react-transition-group";
import "../styles/globals.css";

import PrimeReact from "primereact/utils";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../layout/flags/flags.css";
import "../layout/layout.scss";

function MyApp({ Component, pageProps }) {
  const [layoutMode, setLayoutMode] = useState("overlay");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [inputStyle, setInputStyle] = useState("outlined");
  const [ripple, setRipple] = useState(false);

  const [isDesktop, setIsDesktop] = useState(true);
  const sidebar = useRef();
  let menuClick = false;

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }

    if (window.innerWidth < 1024) setIsDesktop(false);
  }, []);

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    menuClick = false;
  };

  const menu = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      to: "/",
    },
    // {
    //   label: "Products",
    //   icon: "pi pi-fw pi-circle-off",
    //   to: "/products",
    // },
    {
      label: "th.buy2077.co",
      icon: "pi pi-fw pi-list",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-chart-bar",
          to: "/thbuy2077/dashboard",
        },
        {
          label: "Order List",
          icon: "pi pi-fw pi-file-excel",
          to: "/thbuy2077/orders",
        },
      ],
    },
    {
      label: "sg.buy2077.co",
      icon: "pi pi-fw pi-list",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-chart-bar",
          to: "/sgbuy2077/dashboard",
        },
        {
          label: "Order List",
          icon: "pi pi-fw pi-file-excel",
          to: "/sgbuy2077/orders",
        },
      ],
    },
  ];

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "p-input-filled": inputStyle === "filled",
    "p-ripple-disabled": ripple === false,
  });

  const onToggleMenu = (event) => {
    menuClick = true;

    if (isDesktop) {
      if (layoutMode === "overlay") {
        setOverlayMenuActive((prevState) => !prevState);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }
    event.preventDefault();
  };

  const isSidebarVisible = () => {
    if (isDesktop) {
      if (layoutMode === "static") return !staticMenuInactive;
      else if (layoutMode === "overlay") return overlayMenuActive;
      else return true;
    }

    return true;
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar onToggleMenu={onToggleMenu} />
      <CSSTransition
        classNames="layout-sidebar"
        timeout={{ enter: 200, exit: 200 }}
        in={isSidebarVisible()}
        unmountOnExit
      >
        <div
          ref={sidebar}
          className={classNames("layout-sidebar", "layout-sidebar-dark")}
          onClick={onSidebarClick}
        >
          <div className="layout-logo">
            {/* <img alt="Logo" src={"/layout/images/logo-white.png"} /> */}
          </div>
          <AppProfile />
          <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
        </div>
      </CSSTransition>
      <div className="layout-main">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
