# react-datepicker

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# DatePicker

Components for date picking (DatePicker) and date range picking (RangePicker).

## Usage

```javascript

import { DatePicker, RangePicker } from  "@crpt/react-datepicker";


<DatePicker onChange={newVal => alert("newVal:", newVal)}  date="12.12.2012" />

```

### DatePicker

| PropName | Description | Example |
|---|---|---|
| date: String | Selected date in ISO 8601 format. |  `<DatePicker date="2014/01/02" />` |
| format: string | Date input format | `<DatePicker date="10.09.2014" format="DD.MM.YYYY">` |
| onChange: Function | Called, when DatePicker input value changed. |  `<DatePicker onChange={val => alert(val)} />` |
| onUpdate: Function | Вызывается, когда DatePicker теряет фокус или пользователь нажимает Enter. |  `<DatePicker onUpdate={val => alert(val)} />` |
| placeholder: String | Set placeholder | `<DatePicker placeholder="Order date" />` |
| savePlaceholder: Boolean | Don't hide placeholder | `<DatePicker savePlaceholder />` |
| positionX: string | if value is "left" calendar is showed at the left, otherwise - right | | 
| positionY: string | if value is "top" calendar is showed at the top, otherwise - bottom | | 
| monthView: bool | Switches to month view | |
| acceptText: string | Accept control text. Default: 'Accept' | |
| resetText: string | Reset control text. Default: 'Reset' | |
| onTogglePanel: Function | Callback on toggle OptionsPanel visibility | |
| showPointer: bool | show dialogue pointer | |
| minDate: string | Minimal date | |
| maxDate: string | Maximal date | |
| rightIconReplacer: element | JSX to replace both icons at once | |



### RangePicker

| PropName | Description | Example |
|---|---|---|
| from: String  | Стартовая дата диапазона в формате ISO 8601. |  `<RangePicker from="2012-12-12" />` |
| to: String | Конечная дата диапазона в формате ISO 8601. |  `<RangePicker to="2014/01/02" />` |
| format: string | Date input format | `<RangePicker from="10.09.2014" to="20.09.2014" format="DD.MM.YYYY">` |
| onChange: Function | Вызывается, когда меняется значение в DatePicker, параметром принимает объект с полями to и from. |  `<RangePicker onChange={val => alert(val)} />` |
| onUpdate: Function | Вызывается, когда RangePicker теряет фокус или пользователь нажимает Enter. |  `<RangePicker onUpdate={val => alert(val)} />` |
| leftPlaceholder: String | Set placeholder for left input | `<RangePicker leftPlaceholder="Order date" />` |
| rightPlaceholder: String | Set placeholder for right input | `<RangePicker rightPlaceholder="Order date" />` |
| savePlaceholder: Boolean | Don't hide placeholder | `<RangePicker savePlaceholder />` |
| positionX: string | if value is "left" calendar is showed at the left, otherwise - right | | 
| positionY: string | if value is "top" calendar is showed at the top, otherwise - bottom | | 
| acceptText: string | Accept control text. Default: 'Accept' | |
| resetText: string | Reset control text. Default: 'Reset' | |
| onTogglePanel: Function | Callback on toggle OptionsPanel visibility | |
| showPointer: bool | show dialogue pointer | |
| minDate: string | Minimal date | |
| maxDate: string | Maximal date | |
| noActions: bool | Remove buttons accept/clear | |



[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
