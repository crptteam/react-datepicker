import styled from 'styled-components';
import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';
import React from 'react';


const Elem = styled.div`
  position: absolute;
  right: 20px;
  width: 20px;
  height: 20px;
  transform: rotate(58deg) skew(30deg);
  border-top-left-radius: 25%;
  background: ${props => props.background};
  top: calc(100% + 7px);
  box-shadow: ${props => props.boxShadow};
`;

const SelectOptionsPointer = props => {
  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  innerMerge(merged, defaultTheme.DatePicker.DatePickerPanelWrap, (props.theme && props.theme.DatePicker && props.theme.DatePicker.DatePickerPanelWrap) || {});

  const theme = getThemeAsPlainTextByKeys(
    merged,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default SelectOptionsPointer;
