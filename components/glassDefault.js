import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

export function GlassDefault(props) {
  const { className, glassClassName } = props;
  return (
    <div className={`glass ${className}`}>
      <div className={`opacity-100 z-10 ${glassClassName}`}>
        {props.children}
      </div>
    </div>
  );
}

GlassDefault.propTypes = {};
