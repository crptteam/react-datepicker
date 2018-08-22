import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.div`
  font-family: ${props => props.fontFamily};
  position: absolute;
  z-index: 9999;
  border-radius: 2px;
  padding: 30px;
  padding-right: 40px;
  padding-bottom: 25px;
  ${props => (props.positionX && props.positionX === 'left'
    ? 'right: -1px'
    : 'left: -1px')};
  ${props => (props.positionY && props.positionY === 'top'
  ? 'bottom: 62px'
  : 'top: 62px')};
  
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

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(
    merged,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default DatePickerPanelWrap;
