import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { EditableText } from "@deck/components/ui";
import style from "./Header.module.scss";

export function Header({ className, isPrep, isCompany, children }) {
  const classes = classNames(className, style.header);

  return (
    <EditableText className={classes} id="header" isPrep={isPrep} isCompany={isCompany}>
      <h1>{children}</h1>
    </EditableText>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isPrep: PropTypes.bool,
  isCompany: PropTypes.bool,
  children: PropTypes.string,
};

Header.defaultProps = {
  className: "",
  isPrep: false,
  isCompany: true,
  children: "",
};
