import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { Flex } from "@deck/components/layout";
import style from "./Content.module.scss";

export function Content({ className, children }) {
  const classes = classNames(className, style.content);

  return <Flex className={classes}>{children}</Flex>;
}

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Content.defaultProps = {
  children: null,
  className: "",
};
