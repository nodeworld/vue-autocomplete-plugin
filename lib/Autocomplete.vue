<template>
    <div
      class="auto-complete-textfield-container"
      :class="
        customClass && customClass.parentContainerClass
          ? customClass.parentContainerClass
          : ''
      "
      :style="
        customStyle && customStyle.parentContainerStyle
          ? customStyle.parentContainerStyle
          : {}
      "
    >
      <InputLabel
        v-if="props.showInputlabel"
        :input-label="props.inputLabel"
        :input-label-container-style="props.customStyle?.inputLabelContainerStyle"
        :input-label-class="props.customClass?.inputLabelClass"
        :input-label-style="props.customStyle?.inputLabelStyle"
        :aria-input-label="props.aria?.ariaInputLabel"
      />
      <Core
        :dropdown-data="dropdownData"
        :placeHolder="props.placeHolder"
        :object-property="props.objectProperty"
        :default-value="props.defaultValue"
        :initial-visible-data="props.initialVisibleData"
        :scroll-threshold="props.scrollThreshold"
        :total-records="props.totalRecords"
        :disable-property="props.disableProperty"
        :no-search-result-message="props.noSearchResultMessage"
        :is-auto-complete-disabled="props.isAutoCompleteDisabled"
        :is-custom-spinner="props.isCustomSpinner"
        :show-loading-spinner="props.showLoadingSpinner"
        :showdrop-down-arrow="props.showdropDownArrow"
        :show-clear-option="props.showClearOption"
        :custom-class="props.customClass"
        :custom-style="props.customStyle"
        :search-fn="props.searchFn"
        :disable-list-fn="props.disableListFn"
        :is-scroll-threshold-required="props.isScrollThresholdRequired"
        :inspect-auto-complete-list="props.inspectAutoCompleteList"
        :view-more-text="props.viewMoreText"
        :opt-view-more-only-for-api-call="props.optViewMoreOnlyForApiCall"
        :aria="props.aria"
        :trigger-on-focus-event="props.triggerOnFocusEvent"
        :trigger-blur-event="props.triggerBlurEvent"
        :trigger-api-load-event="props.triggerApiLoadEvent"
        :trigger-clear-selection-event="props.triggerClearSelectionEvent"
        :broadcast-selected-value="props.broadcastSelectedValue"
        :isApiLoad="props.isApiLoad"
        :load-all-data-at-once="props.loadAllDataAtOnce"
        :additional-data="props.additionalData"
      />
    </div>
  </template>
  <script setup lang="ts">
  import InputLabel from './InputLabel.vue';
  import Core from './Core.vue';
  import { onBeforeMount } from 'vue';
  interface Iprops {
    dropdownData: any;
    inputLabel?: string;
    showInputlabel?: boolean;
    placeHolder?: string;
    objectProperty?: string;
    defaultValue?: any;
    initialVisibleData?: number;
    scrollThreshold?: number;
    totalRecords?: number;
    disableProperty?: string;
    noSearchResultMessage?: string;
    isAutoCompleteDisabled?: boolean;
    isCustomSpinner?: boolean;
    showLoadingSpinner?: boolean;
    showdropDownArrow?: boolean;
    showClearOption?: boolean;
    customClass?: CustomClassType;
    customStyle?: CustomStyleType;
    searchFn?: Function;
    disableListFn?: Function;
    isScrollThresholdRequired?: boolean;
    inspectAutoCompleteList?: boolean;
    viewMoreText?: string;
    optViewMoreOnlyForApiCall?: boolean;
    aria?: CustomAriaType;
    triggerOnFocusEvent?: Function;
    triggerBlurEvent?: Function;
    triggerApiLoadEvent?: Function;
    broadcastSelectedValue?: Function; // remove its a function
    triggerClearSelectionEvent?: Function;
    isApiLoad?: boolean;
    loadAllDataAtOnce?: boolean;
    additionalData?: AdditionalDataType;
  }
  
  type CustomClassType = {
    parentContainerClass?: string;
    inputFieldClass?: string;
    listContainerClass?: string;
    dropdownUnorderedListClass?: string;
    dropdownListClass?: string;
    noResultClass?: string;
    disableListClass?: string;
    inputLabelContainerClass?: string;
    inputLabelClass?: string;
    customSpinnerClass?: string;
    viewMoreClass?: string;
  };
  
  type CustomStyleType = {
    parentContainerStyle?: any;
    inputFieldStyle?: any;
    listContainerStyle?: any;
    dropdownUnorderedListStyle?: any;
    dropdownListStyle?: any;
    noResultStyle?: any;
    inputLabelContainerStyle?: any;
    inputLabelStyle?: any;
    viewMoreStyle?: any;
    customSpinnerStyle?: any;
  };
  
  type CustomAriaType = {
    ariaRole?: string;
    ariaRoleDescription?: string;
    ariaNoSearchResult?: string;
    ariaULList?: string;
    ariaListContainer?: string;
    ariaInputField?: string;
    ariaInputLabel?: string;
    ariaViewMore?: string;
  };

  type AdditionalDataType = {
    relativeSearch?: RelativeSearchType | boolean;
  }

  type RelativeSearchType = {
    includeOnly?: string[];
    customFunction?: Function;
    fullMatch?: boolean;
  }
  
  const props = withDefaults(defineProps<Iprops>(), {
    initialVisibleData: 1000,
    scrollThreshold: 3,
    placeholder: 'Select Value.',
    inputLabel: 'Enter or Search value',
    noSearchResultMessage: 'No results found.',
    showLoadingSpinner: true,
    showdropDownArrow: true,
    showClearOption: true,
    // searchFn: undefined,
    // disableListFn: undefined,
    isScrollThresholdRequired: true,
    viewMoreText: 'View more',
    optViewMoreOnlyForApiCall: false,
    isApiLoad: false,
    isCustomSpinner: false,
    loadAllDataAtOnce: false,
    showInputlabel: false,
    // objectProperty: undefined,
    isAutoCompleteDisabled: false,
    // defaultValue: undefined,
    // totalRecords: undefined,
    // disableProperty: undefined,
    // customClass: undefined,
    // customStyle: undefined,
    inspectAutoCompleteList: false,
    // aria: undefined,
    // triggerOnFocusEvent: undefined,
    // triggerBlurEvent: undefined,
    // triggerApiLoadEvent: undefined,
    // broadcastSelectedValue: undefined,
    // triggerClearSelectionEvent: undefined
  });
  
  onBeforeMount(() => {
    if (!Array.isArray(props.dropdownData) && props.dropdownData !== undefined) {
      throw Error('Expected dropdownData to be an array.');
    }
    if (props.disableProperty && !props.objectProperty) {
      throw Error(
        'Expected objectProperty to be available when disableProperty is set.'
      );
    }
  });
  </script>
  <style lang="css">
  .auto-complete-textfield-container {
    width: inherit;
    height: inherit;
  }
  </style>
  