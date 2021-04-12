import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export function GlassDiv(props) {
  const { className, glassClassName } = props;
  return (
    <div className={`glass w-full h-full ${className}`}>
      <div className={`opacity-100 z-10 ${glassClassName}`}>
        {props.children}
      </div>
    </div>
  );
}

GlassDiv.propTypes = {};
