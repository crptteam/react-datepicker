import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.label`
  js-display: ${props => (props.inline ? "inline-flex" : "flex")};
  display: ${props => (props.inline ? "inline-flex" : "flex")};
  width: ${props => (props.inline ? props.width : "100%")};
  min-width: ${props => (props.inline ? props.width : "100%")};
  height: ${props => props.height};
  box-sizing: border-box;
  background: ${props => props.background};
  border: ${props => props.border};
  box-sizing: border-box;
  border-radius: ${props => props.borderRadius};
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  position: relative;
  cursor: ${props => props.cursor};
`;

const InputWrap = props => {
  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(merged);

  const mergedInputWrap = innerMerge(
    {},
    (defaultTheme.DatePicker && defaultTheme.DatePicker.InputWrap) || {},
    (props.theme &&
      props.theme.DatePicker &&
      props.theme.DatePicker.InputWrap) ||
      {}
  );

  Object.assign(
    theme,
    getThemeAsPlainTextByKeys(
      mergedInputWrap,
      props.disabled ? "disabled" : props.isError ? "error" : "main"
    )
  );

  return <Elem {...theme} {...props} />;
};

export default InputWrap;
