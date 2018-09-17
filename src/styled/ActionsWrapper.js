import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${props => props.fontSize};
`;

const ActionsWrapper = props => {
  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  innerMerge(
    merged,
    defaultTheme.DatePicker.DatePickerPanelWrap.Actions,
    (
      props.theme
      && props.theme.DatePicker
      && props.theme.DatePicker.DatePickerPanelWrap
      && props.theme.DatePicker.DatePickerPanelWrap.Actions
    ) || {}
  );

  const theme = getThemeAsPlainTextByKeys(
    merged,
    props.disabled ? "disabled" : props.isError ? "error" : "main"
  );

  return <Elem {...theme} {...props} />;
};

export default ActionsWrapper;
