import React from "react";
import styled from "styled-components";

import { getThemeAsPlainTextByKeys, innerMerge } from "../utils";
import defaultTheme from "../theme/defaultTheme";

const Elem = styled.label`
  js-display: ${props => (props.inline ? "inline-flex" : "flex")};
  display: ${props => (props.inline ? "inline-flex" : "flex")};
  width: calc(50% - 4px);
  margin-right: ${props => props.leftPanel ? '8px' : ''};
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

const HalfInputWrap = props => {
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

export default HalfInputWrap;
