import React from 'react';
import styled from 'styled-components';
import defaultTheme from '../theme/defaultTheme';
import {getThemeAsPlainTextByKeys, innerMerge} from '../utils';


const Elem = styled.div`
    js-display: flex; 
    display: flex;
    align-items: center;
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: ${props => props.width};
  `;

const InputContentWrap = props => {

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const mergedInputContentWrap = innerMerge(
    merged,
    (props.theme &&
      props.theme.DatePicker &&
      props.theme.DatePicker.InputContentWrap) ||
    {}
  );

  const theme = getThemeAsPlainTextByKeys(
    mergedInputContentWrap,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default InputContentWrap;
