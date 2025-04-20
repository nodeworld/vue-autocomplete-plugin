![Module JS](https://modulejs.org/img/banner.png?raw=true)

# Vue Autocomplete 

A simple, powerful, lightweight and customizable autocomplete tool programmed for Vue projects!

# Requirements

Recommended vue version - `3.2.25` or higher. This module was completely tested from the version `3.2.5`.

It would also work from the version `3.2.13` in which `@vue/compiler-sfc` was merged with `vue` package. We recommend you to check if the package is getting installed if your vue version is between `3.2.13` and `3.2.24`.

## Package information

- Lightweight module with complete customization
- Supports both JS and TS projects
- No 3rd party packages installed in this module
- Supports lazy loading and large dataset
- Advanced and customizable scroll functionality
- Supports custom events
- Keyboard navigation events to scroll through dropdown list
- Virtual scrolling for large data sets
- Supports custom classes and custom css styles at various DOM levels
- Ability to integrate 3rd party styling packages like bootstrap, tailwind or other CSS libraries.
- Complete test case coverage using vitest

## Web documentation

Documentation is now available on [modulejs.org](https://modulejs.org)

## Package version

| Package version | Description | 
| :-------- | :-----------|
| 1.0.2   | Recommended. Relative Search feature has been introduced to search the entire object. Refer API usage for details. Upgrading from lower version to 1.0.2 is safe without any configuration change. |
| 1.0.1   | Updated `vite`  & `@vitejs/plugin-vue` versions with `^` in devDependencies as they continuously address vulnerabilties in their package. Upgrading from lower version to 1.0.1 is safe without any configuration change. |
| 1.0.0   | Vue autocomplete search package |

## Other information

 Adjust the width of the autocomplete list based on the project requirement. This module will inherit the width of parent container by default. But it can be customized as per the project need. It is very easy to control the UX design of this module with CSS, styles, bootstrap, tailwind and so on. Take the control of this module as per your requirement. Checkout below documenttaion for complete details.

## Installation

Install `vue-autocomplete-plugin` with npm

```bash
  npm install vue-autocomplete-plugin --save
```

or

```bash
  npm i vue-autocomplete-plugin
```

## Running Tests

vue-autocomplete-plugin has solid test cases to make sure components executes without any issues.

To run tests, clone the repository, install the packages and run the following command. If you are facing any issues, you may need to check your node version which may require v18+ version.

```bash
  npm run test
```

To run tests with Vitest UI for viewing test results in the screen, run below command.

```bash
  npm run test:ui
```

## Demo & Examples

| Demo Description | Stackblitz Example | 
| :-------- | :-----------|
| Vue Autocomplete Basic Example   | [ Vue Autocomplete basic - Stackblitz](https://stackblitz.com/edit/vue-autocomplete-basic-example) |
| Vue Autocomplete Basic with Dropdown as object      | [Vue Autocomplete -  Stackblitz](https://stackblitz.com/edit/vue-autocomplete-dropdown-object-property) |
| Vue Autocomplete With Huge Dataset    | [Vue Autocomplete with Large Dataset](https://stackblitz.com/edit/vue-autocomplete-large-data-with-virtual-scroll)|
| Vue Autocomplete With Bootstrap    | [Vue Autocomplete with bootstrap](https://stackblitz.com/edit/vue-autocomplete-bootstrap)|
| Vue Autocomplete With Tailwind    | [Vue Autocomplete with Tailwind](https://stackblitz.com/edit/vue-autocomplete-tailwind)|
| Vue Autocomplete Disabled Example    | [Vue Autocomplete Disabled Example](https://stackblitz.com/edit/vue-autocomplete-disabled-v1)|
| Vue Autocomplete With API Lazyload    | [Vue Autocomplete with API Lazyload](https://stackblitz.com/edit/vue-autocomplete-api-call-lazy-load)|
| Vue Autocomplete Disable list with a custom function    | [Vue Autocomplete Disable list with a custom function](https://stackblitz.com/edit/vue-autocomplete-disabled-v2)|
| Vue Autocomplete View More feature Example    | [Vue Autocomplete View More feature Example    ](https://stackblitz.com/edit/vue-autocomplete-large-data-with-view-more)|
| Vue Autocomplete Relative Search | [Vue Autocomplete Relative Search](https://stackblitz.com/edit/vue-autocomplete-relative-search) |
| Vue Autocomplete Relative Search  with conditions | [Vue Autocomplete Relative Search with conditions](https://stackblitz.com/edit/vue-autocomplete-relative-search-with-conditions) |

## API Usage

| Props | Type  | Required | Description |
| -------- | ------- | ------- | ------- |
| `dropdownData` | `string[], number[], object[] or any[]`  | **Yes**. | Accepts array of strings, numbers or array of objects. |  |
| `objectProperty` | `string` |**_Yes_** | Required only if `dropdownData` is object[]. `objectProperty` will determine the value to be displayed in dropdown. |
|`initialVisibleData`| `number` | `No` | `initialVisibleData` denotes the number of records that will be displayed in dropdown list. Default value is 1000. It can be customized as per project requirement or can be left untouched. |
|`broadcastSelectedValue`|`Function` |**Yes** | Custom function to broadcast the selected value when dropdown value is selected from list. Accepts one parameter which will give the selected value. |
| `placeHolder` | `string` | `No` | Custom placeholder for auto-complete input field. |
| `scrollThreshold` | `number` | `No` | 3 by default. Helps to boost performance. It controls the scroll data and removes top or botton records during user scroll based on the scrollThreshold & scrollData configured. Check below for more details. |
|`defaultValue`| `string` or `object` | `No` | `defaultValue` pre-populates the value in input textfield by matching the value from dropdown data. It can be a simple value or simple json object. For simple json object, `objectProperty` value should be available. |
|`totalRecords` | `number` | `No` | If total number of records is known, totalRecords can be provided which will avoid extra condtions that will be executed in the package.
|`disableProperty` | `string` | `No` | To disable specific dropdown list in dropdown from being selected. This property can be used when dropdownData is an object[] and the `disableProperty` should be a property name from the object which can determine whether the specific list should be disabled from selection. Eg: If an object conatins a property `disabled`, then this property name can be passed to `disableProperty` props to disable the list from selection when condition matches. |
|`disableListFn` |`Function` |`No` | If disable should be calculated dynamically using a function and custom code, assign customized function to `disableListFn`. disableListFn accepts two parameters (index, data)|
|`searchFn` |`Function` |`No` | Customized search function. Customized search function accepts one parameter, `event`. On keyUp, the customized search function will be called to perform custom execution.|
|`noSearchResultMessage` |`string` |`No` | By default **No results found** message will be displayed when search result is 0  |
|`isAutoCompleteDisabled` |`boolean` |`No` | By default value is false. If updated as true, the input fields gets disabled. |
|`customClass` | `object` |`No` | Allows custom class styling at various dom levels. Check below for more information|
|`customStyle` | `object` |`No` | Allows custom css style. Check below for more information |
|`showdropDownArrow` | `boolean` |`No` | Show or hide dropdown icon in autocomplete field. Default is `true`.  |
|`showClearOption` |`boolean` |`No` | Shows clear option to allow user to clear the selected value. Default is `true`. |
|`triggerOnFocusEvent`| `Function` |`No`|Triggers on-focus event when input field is focussed.`triggerOnFocusEvent` accepts a function as props. The function can have one event parameter (Eg: triggerOnFocusEvent(event)) and the parameter will be a focus event. By default, `triggerOnFocusEvent` will be undefined and will not be triggered until a function is assigned to it.|
| `triggerBlurEvent`|`Function` |`No` | Triggers blur event when input field is out of focus. `triggerBlurEvent` accepts a function as props. The function can have one event parameter (Eg: triggerBlurEvent(event)) and the parameter will be a blur event. By default, `triggerBlurEvent` will be undefined and will not be triggered until function is assigned to it.|
|`triggerApiLoadEvent` |`Function` |`No` | A custom function for lazy loading the dropdown data. `triggerApiLoadEvent` accepts a function as props. It triggers a custom function to call the API when the end of scroll is reached. Depends on `props.isApiLoad`. Pass `isApiLoad` as true if `triggerApiLoadEvent` function needs to be triggered. The custom function can have one parameter which would return an object with length of the dropdown data. This object can be used to calculate next paginated data, and using this param is optional. When lazy loading of the API is complete or all the dropdown data has been loaded, set `isApiLoad` as false, so that `triggerApiLoadEvent` will not be called. Alternatively instead of setting `isApiLoad` to `false`, you can also set `totalRecords`, so that the module does not trigger `triggerApiLoadEvent` event further|
| `isApiLoad` | `boolean` | `No` | Default value is false. This props is required if the dropdown data is being lazy-loaded. To trigger `triggerApiLoadEvent`, `isApiLoad` must be set to true. Once lazy loading or API calls are complete, set `isApiLoad` to false or set the total records so that the module does not trigger the lazy-load calls further. |
|`optViewMoreOnlyForApiCall`|`boolean`|`No`|Default is `false`. When set to `true`, API Call will not be executed automatically on reaching the end of the scroll, instead `View More` list item will be displayed at the end of scroll and the list has to be clicked to call the API or any custom function to load further data. Please note that `isApiLoad` should be `true` as well to load further data.|
|`triggerClearSelectionEvent` |`Function` |`No` | Triggers custom function `triggerClearSelectionEvent(event)` input field is cleared.  |
|`isScrollThresholdRequired`|`boolean`|`No` | Default is true. If scrollData and scrollThreshold is performance calculation is not required, set it to false. See below for more information.|
|`inspectAutoCompleteList`|`boolean`|`No`|Default value is false. When set to true, it will not allow hiding the dropdown list on blur. This is helpful to inspect the dropdown list in dom and is recommended only for development.|
|`showInputlabel`|`boolean`|`No`|Default value is false. making it true will show the input text label.|
|`inputLabel`|`string`|`No`|Default value is `Select a value` and can be customized. `inputLabel` will be shown when `showInputlabel` is set to true.|
|`showLoadingSpinner` | `boolean`|`No` | Shows the spinner at the botton of the list if lazy loaded. Default is `true` |
|`isCustomSpinner`|`boolean`|`No`|Set as `true` to set customize spinner during lazy load or paginated API calls. Set your own class properties in `customClass.customSpinnerClass`. `showLoadingSpinner` must be set to `true` to show the spinner.|
|`aria`|`object`|`No`|Helps to set aria roles at various levels of DOM to provide Accessible Rich Internet Application. Check below for more details.|
|`viewMoreText`|`string`|`No`|Default text is `View More`. It can be updated through `viewMoreText` as per requirement|
|`loadAllDataAtOnce`|`boolean`|`No`|Default value is `false`. If set to true, all the dropdown list will be loaded at once without lazy loading. May not be recommended for large data set to avoid performance issues.|
| `additionalData` | `object` | `No` | `Undefined` by default. Has `relativeSearch` as one of the property.|
| `relativeSearch` | `boolean` or `object` | `No` | Not enabled by default. `relativeSearch` is available under `additionalData` props. If `relativeSearch` is set as `true`, entire object will be searched during input search. `relativeSearch` can also be set as an object to set more custom options during search. More details found in below sections. |

# Useful Tips

Incase the Autocomplete component is mounted on a nested or multiple nested child components and if the dropdownData is rendered or fetched only during onMounted life-cycle, consider initializing the module with v-if condition to make sure Autocomplete component loads as expected.

```js
<Autocomplete v-if="data.length > 0" :dropdownData="data"/>
```

Adding v-if condition is solely based on the application's business logic and is just optional.

# Relative Search

Relative search is breaking feature introduced in `1.0.2` version which allows to search the whole object. `relativeSearch` is available under `additionalData` props. 

`dropdownData` should be an object and `objectProperty` should be available to make `relativeSearch` feature work.

If `relativeSearch` is set to `true`, entire object will be searched during the input search.

```js
const dropdownData = `[{ sku: 12345, name: 'Apple'}, { sku: 67890, name: 'Samsung'}]`
```

```html
<Autocomplete
    :dropdownData="dropdownData"
    objectProperty="name"
    :broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    :additionalData="{ relativeSearch: true }">
</Autocomplete>
```

In the above example, when searched with the inputs 12345 or Apple, first object will be filtered and produced as result.

`relativeSearch` also supports custom settings apart from boolean. Below attributes are supported in `relativeSearch` object.

| Property | Type  | Required | Description |
| -------- | ------- | ------- | ------- |
| `includeOnly` | `string[]` | `optional` | Searches only the value of mentioned keys or attributes available in the object.|
| `customRelativeSearchFunction` | `Function` | `optional` | Implementing your own custom function for relative search. This is helpful when the object has nested objects. Custom function will accept one parameter 'searchValue' in which typed input value will be passed. Use the dropdown data available in yoor component for custom filtering. Example: `[{ sku: 12345, name: 'Apple', country: [{ name: 'USA'}, { name: 'China'}]}, { sku: 67890, name: 'Samsung', country: [{ name: 'USA'}, { name: 'China'}] }]`. The module will not search the country array as they are nested and the module would not predict the nested objects or arrays as they are based on project requirements. In this case you can write your own `customRelativeSearchFunction`.|
| `setDefaultValueWithACustomFunction`| `Function` | `optional` | If `relativeSearch` is enabled, the setting up default value using `defaultValue` props will not work. Implement your own  `setDefaultValueWithACustomFunction` and return the object (not array of objects). The returned object should be available in `dropdownData` and should contain the `objectProperty` to allow the module to set default value.|

Please note that `searchFn` in the props and `additionalData`.`relativeSearch`.`customRelativeSearchFunction` has minor difference. While you can use `searchFn` to completely customize the onSearch function, `customRelativeSearchFunction` can be used to search nested objects with a custom function. Based on the requirements, any of the both custom functions can be used based on how it suits the application.

```js
const dropdownData = `[{ sku: 12345, name: 'Apple'}, { sku: 67890, name: 'Samsung'}]`
```

```html
<Autocomplete
    :dropdownData="dropdownData"
    :broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    :additionalData="{ relativeSearch: { includeOnly: ['sku'] } }">
</Autocomplete>
```

In the above example, only the sku attribute in the object will be searched.

Checkout the stackblitz example to know how it works.

It's your responsibility to check the performance impact when using the relative search for large data.

# Using the module

import Autocomplete Module into your component.

```js
import { Autocomplete } from 'vue-autocomplete-plugin';
```
In your HTML template

For dropdown string array,Eg: ["Apple", "Banana", "Kiwi"], do as below.

```html
<Autocomplete
    :dropdownData="YOUR_DROPDOWN_DATA"
    :broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)">
</Autocomplete>
```

For dropdown object array, Eg: [{"name": "Alex"}, {"name": "John"}], do as below.

```html
<Autocomplete
    :dropdownData="YOUR_DROPDOWN_DATA"
    :broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    :objectProperty="'name'">
</Autocomplete>
```

## Setting `scrollThreshold` & `initialVisibleData` for maximizing performance

By default, `initialVisibleData` is set to 1000 and `scrollThreshold` is set to 3. It can be customized as per requirement.

#### What is `scrollThreshold` & `initialVisibleData`?

Both `scrollThreshold` & `initialVisibleData` helps to improve virtual scrolling for better performance.

`initialVisibleData` is the number of records / data that will be loaded virtually during initial load.

Consider, there are 5000 records to be shown. `initialVisibleData` is 1000 and `scrollThreshold` is 3.

During initial load, dropdown list will show 1000 records. When user reaches the end of scroll, the formula will be calculated based on `initialVisibleData` & `scrollThreshold` and number of filteredData records.

```js
Math.ceil(filteredData.length /scrollThreshold);

Math.ceil(1000/3);
```
If calculated result does not exceed `initialVisibleData`, next set of data will be loaded. And now the dropdown list(filteredData) will hold 2000 records.

Similary same calculation will be performed during the end of scroll and when the result exceeds `initialVisibleData`, first set of records will be removed from the dropdown list and next set of records will be loaded everytime, to improve performance.

When `scrollThreshold` is set to 1, the virtual dropdown list will hold the records based on `initialVisibleData` configuration. When end of scroll is reached, the current set will be replaced by next set.

`initialVisibleData` & `scrollThreshold` does not affect or mutate original data and will update only the virtually filtered data.

`initialVisibleData` & `scrollThreshold` is customizable based on project needs. If this performance calculation is not required, set `isScrollThresholdRequired` to `false`.

## Adding Custom CSS Class to autocomplete

#### Import CustomClassType from the module (Optional).

```js
import { type CustomClassType } from 'vue-autocomplete-plugin';
```

| CustomClassTypes              | Required    | Description |
| :--------                     | :-----------| :-----------|
| `parentContainerClass`        | `No` | Adds class to parent `div` surrounding the input field and dropdown list. |
| `inputFieldClass`             | `No` | Adds class to `input textfield`|
| `listContainerClass`          | `No` | Adds class to `div` that surrounds `ul` of dropdown list. |
| `dropdownUnorderedListClass`  | `No` | Adds class to `ul` of dropdown list. |
| `dropdownListClass`           | `No` | Adds class to each `li` items|
| `disableListClass `           | `No` | Add class to disabled `li` items |
| `noResultClass`               | `No` | Adds class to separate `li` item to show no result message. |
| `inputLabelClass`             | `No` | Adds class to `<label>` field |
| `inputLabelContainerClass`    | `No` | Adds class to surrounding `div` of input label.|
| `customSpinnerClass`          | `No` | Adds class to `span` to show customized spinner.|
| `viewMoreClass`               | `No` | Adds class to View More `li` item |

```ts
customClassType: CustomClassType = {
    inputFieldClass: 'class1',
    dropdownListClass: 'class1 class2'
}
```

```html
<Autocomplete
    :dropdownData="YOUR_DROPDOWN_DATA"
    :broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    :objectProperty="'name'"
    :customClassType="customClassType">
</Autocomplete>
```

## Adding Custom CSS styles to autocomplete

#### Import CustomStyleType from the module (Optional).

```js
import { type CustomStyleType } from 'vue-autocomplete-plugin';
```

| CustomStyleTypes | Required | Description |
| :-------- | :-----------| :-----------|
| `parentContainerStyle`      | `No` | Adds style to `div` surrounding the input field and dropdown list. |
| `inputFieldStyle`      | `No` | Adds style to `input textfield`|
| `listContainerStyle`      | `No` | Adds style to `div` that surrounds `ul` of dropdown list. |
| `dropdownUnorderedListStyle`      | `No` | Adds style to `ul` of dropdown list. |
| `dropdownListStyle`      | `No` | Adds style to each `li` items|
| `noResultStyle`      | `No` | Adds style to separate `li` item to show no result message. |
| `inputLabelStyle`      | `No` | Adds style to `<label>` field |
| `inputLabelContainerStyle`    | `No` | Adds style to surrounding `div` of input label.|
| `customSpinnerStyle`          | `No` | Adds style to `span` to style the customized spinner.|
| `viewMoreStyle`      | `No` | Adds style to View More `li` item. |

```ts
customStyle: CustomStyleType = {
    inputFieldStyle: {color: '#FFFFFF' },
    dropdownListStyle: {padding: 2px }
}
```

```html
<Autocomplete
    :dropdownData="YOUR_DROPDOWN_DATA"
    :broadcastSelectedValue="YOUR_CUSTOM_FUNTION($event)"
    :objectProperty="'name'"
    :customStyle="customStyle">
</Autocomplete>
```
## Debugging Autocomplete list during development

For inspecting the classes or styles during develeopment, pass `inspectAutoCompleteList` as `true` so that the dropdown list will not close which will help to inspect the list. But don't forget to remove or make it `false` during production deployment

## Adding Accessible Rich Internet Applications (ARIA)

#### ARIA provides easy access to the content for people with disabilities with help of screen reader.

#### Import CustomAriaType from the module (Optional).

```js
import { type CustomAriaType } from 'vue-autocomplete-plugin';
```

| Attributes | Required | Description |
| :-------- | :-----------| :-----------|
| `ariaRole`            | `No` | Adds ARIA role  to `input textfield`. Default value is `textbox`. |
| `ariaRoleDescription` | `No` | Adds ARIA role description to `input textfield`. Default value is `Autocomplete input field`. |
| `ariaInputField`      | `No` | Adds ARIA label  to `input textfield`|
| `ariaNoSearchResult`  | `No` | Adds ARIA label to no result found `li` item|
| `ariaULList`          | `No` | Adds ARIA label to `ul` list item |
| `ariaListContainer`   | `No` | Adds ARIA label to list container `div`. |
| `ariaInputLabel`      | `No` | Adds ARIA label to `label field`. |
| `ariaViewMore`        | `No` | Adds ARIA label to `View More` li item. |

## Running the github code locally to test autocomplete module in local vue-app.

- Download the [vue-autocomplete-plugin](https://github.com/nodeworld/vue-autocomplete-plugin) code locally through github.

- Execute `npm install`.

- Create App.vue and main.ts (to mount the app) in the src folder and execute `npm run dev`.

- Or alternatively you can skip the above step and use `npm link` to test the feature locally with a vue web application.

- In `vue-autocomplete-plugin` module, run `npm link`. This will add the `vue-autocomplete-plugin` in node_modules locally.

- From the vue web application run `npm link vue-autocomplete-plugin`.

- Import the Autocomplete module from `vue-autocomplete-plugin` like usual npm package and start using the module.

## Change Logs and version history

Refer the change history by viewing this link - [CHANGELOG](https://github.com/nodeworld/vue-autocomplete-plugin/blob/release/CHANGELOG.md)


## Github link

Github Link - [vue-autocomplete-plugin](https://github.com/nodeworld/vue-autocomplete-plugin)

## Roadmap

- Multi select dropdown feature

## Other plugins

Checkout similar Autocomplete plugin in Angular Framework [ng-autocomplete-plugin](https://www.npmjs.com/package/ng-autocomplete-plugin) with same features

Checkout similar Autocomplete plugin in React Framework [react-autocomplete-plugin](https://www.npmjs.com/package/react-autocomplete-plugin) with same features

## Support

Please raise an issue in github repository

Github Link - [Raise an issue](https://github.com/nodeworld/vue-autocomplete-plugin/issues)

Happy Autocompleting!