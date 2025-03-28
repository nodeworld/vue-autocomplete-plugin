<template>
    <input
      tabindex="0"
      ref="searchValue"
      id="searchInput"
      name="searchValue"
      type="text"
      class="auto-complete-textfield"
      autocomplete="off"
      :placeholder="props.placeHolder"
      :disabled="props.isAutoCompleteDisabled"
      :class="props.inputFieldClass ? props.inputFieldClass : ''"
      :style="props.inputFieldStyle ? props.inputFieldStyle : {}"
      :aria-label="
        props?.ariaInputField
          ? props.ariaInputField
          : 'Enter text to search autocomplete.'
      "
      :role="props?.ariaRole ? props.ariaRole : 'autocomplete'"
      :aria-roledescription="
        props?.ariaRoleDescription
          ? props.ariaRoleDescription
          : 'Autocomplete search'
      "
      v-on:focus="focusEvent"
      v-on:blur="blurEvent"
      v-on:input="inputEvent"
    />
    <span
      tabindex="0"
      v-if="showdropDownArrow"
      class="arrow down"
      @click="handleDropdownClick($event)"
    ></span>
    <span
      @click="clearSearch($event)"
      v-if="showClearOption"
      class="auto-complete-remove-selection"
      >&times;</span
    >
  </template>
  <script lang="ts" setup>
  import { type CSSProperties, ref } from 'vue';
  interface IProps {
    // searchValueRef: any;
    placeHolder?: string;
    isAutoCompleteDisabled: boolean;
    showdropDownArrow: boolean;
    showClearOption: boolean;
    onFocus: Function;
    onBlur: Function;
    onInput: Function;
    clearSearch: Function;
    handleDropdownClick: Function;
    inputFieldClass?: string;
    inputFieldStyle?: CSSProperties;
    ariaInputField?: string;
    ariaRole?: string;
    ariaRoleDescription?: string;
  }
  const searchValue = ref<any>('');
  
  const props = withDefaults(defineProps<IProps>(), {
    placeHolder: 'Select Value.',
  });
  
  function focusEvent(event: any) {
    props.onFocus?.(event);
  }
  
  function blurEvent(event: any) {
    console.log('Blur event trigger');
    console.log(event);
    props.onBlur?.(event);
  }
  
  function inputEvent(event: any) {
    props.onInput?.(event);
  }
  
  defineExpose({
    searchValue,
  });
  // const searchValue = useTemplateRef<HTMLInputElement>('searchValue');
  </script>
  <style>
  .auto-complete-remove-selection {
    display: inline-block;
    margin-top: 5px;
    margin-left: -25px;
    cursor: pointer;
  }
  
  .auto-complete-textfield {
    width: 100%;
    height: 2rem;
    outline: none;
    border: 1px solid grey;
    border-radius: 5px;
    cursor: text;
  }
  
  .auto-complete-textfield:disabled {
    background-color: #e7e7e7;
    border: 1px solid #d5d5d5;
    cursor: default;
  }
  
  .arrow {
    height: 0;
    width: 0;
    border: 4px solid transparent;
    display: inline-block;
    margin-top: 5px;
    margin-left: -20px;
    cursor: pointer;
  }
  
  .arrow.down {
    border-top-color: #000;
  }
  
  ::-webkit-input-placeholder {
    text-transform: capitalize;
  }
  
  ::-moz-placeholder {
    text-transform: capitalize;
  }
  
  ::-ms-placeholder {
    text-transform: capitalize;
  }
  </style>
  