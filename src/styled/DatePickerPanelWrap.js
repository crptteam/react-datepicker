import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  font-family: ${props => props.fontFamily};
  position: absolute;
  z-index: 2;
  border-radius: 2px;
  padding: 30px;
  padding-right: 40px;
  padding-bottom: 25px;
  top: 62px;
  left: -1px;
  display: ${props => (props.visible ? "block" : "none")};
  font-size: 0px;
  white-space: nowrap;
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  background: ${props => props.background};
  border: ${props => props.border};
`;

const DatePickerPanelWrap = props => {
  const theme = getThemeAsPlainTextByKeys(
    props.theme || defaultTheme,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default DatePickerPanelWrap;
