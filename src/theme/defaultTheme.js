import chroma from 'chroma-js';

export default {
  height: '64px',
  main: {
    background: '#FFFFFF',
    border: '1px solid #ABADB5',
    color: '#212C42',
    placeholder: '#ACADB5',
  },
  disabled: {
    background: '#FFFFFF',
    border: '1px solid #ABADB5',
    color: '#212C42',
    placeholder: '#ACADB5',
  },
  error: {
    background: '#FFEBEB',
    border: '1px solid #FF3C21',
    color: '#212C42',
    placeholder: '#ACADB5',
  },
  borderRadius: '2px',
  fontSize: '16px',
  fontWeight: 200,
  Day: {
    width: '24px',
    height: '24px',
    borderRadius: '2px',
    hoverBackground: '#1A99F4',
    hoverColor: '#FFFFFF',
    hovered: {
      background: chroma('#1A99F4')
        .brighten(0.8)
        .css(),
      color: '#FFFFFF',
    },
    selected: {
      background: '#1A99F4',
      color: '#FFFFFF',
    },
    main: {
      color: '#212C42',
      background: 'rgba(0,0,0,0)'
    },
  },
  InputWrap: {
    main: {
      background: '#FFFFFF',
      border: '1px solid #ABADB5',
      cursor: 'normal',
    },
    disabled: {
      background: '#FFFFFF',
      border: '1px solid #ABADB5',
      cursor: 'not-allowed'
    },
    error: {
      background: '#FFEBEB',
      border: '1px solid #FF3C21',
      cursor: 'normal'
    },
    height: '64px',
    borderRadius: '2px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  InputElem: {
    main: {
      color: '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'text',
      background: 'rgba(0,0,0,0)'
    },
    disabled: {
      color:  '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'not-allowed',
      background: 'rgba(0,0,0,0)'
    },
    error: {
      color:  '#212C42',
      placeholderColor: '#ACADB5',
      cursor: 'text',
      background: 'rgba(0,0,0,0)'
    },
  },
};
