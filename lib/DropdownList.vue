<template>
    <template v-if="isOnFocus">
      <li
        v-for="(data, i) in filteredData"
        :key="i"
        :id="'autocomplete-li-element-' + i"
        tabindex="0"
        class="autocomplete-data-list"
        :aria-label="data + ''"
        @click="onSelect(i, data, true)"
        :ref="(el: any) => functionRef(el, i)"
        :aria-disabled="
          disableListFn
            ? disableListFn(i, data)
            : disableProperty
            ? data[disableProperty]
            : false
        "
        :class="[
          customClass && customClass.dropdownListClass
            ? customClass.dropdownListClass
            : '',
          (!customClass || !customClass.disableListClass) &&
          ((disableListFn && disableListFn(i, data)) ||
            (disableProperty && data[disableProperty]))
            ? 'disable-list-element'
            : '',
          customClass &&
          customClass.disableListClass &&
          ((disableListFn && disableListFn(i, data)) ||
            (disableProperty && data[disableProperty]))
            ? customClass.disableListClass
            : '',
        ]"
        :style="
          customStyle && customStyle.dropdownListStyle
            ? customStyle.dropdownListStyle
            : {}
        "
      >
        {{ !objectProperty ? data : data[objectProperty] }}
      </li>
      <li
        v-if="showLoadingSpinner && showSpinner && !isCustomSpinner"
        class="auto-complete-list-spinner"
      >
        <span class="autocomplete-plugin-loader"></span>
      </li>
      <li
        v-if="showLoadingSpinner && showSpinner && isCustomSpinner"
        class="auto-complete-list-spinner"
        :class="customClass && customClass.customSpinnerClass"
      ></li>
      <li
        v-if="filteredData.length <= 0 && isOnFocus"
        class="autocomplete-data-list noSearchResult"
        :aria-label="
          aria?.ariaNoSearchResult ? aria.ariaNoSearchResult : 'No results found.'
        "
        :class="
          customClass && customClass.noResultClass
            ? customClass.noResultClass
            : ''
        "
        :style="
          customStyle && customStyle.noResultStyle
            ? customStyle.noResultStyle
            : {}
        "
      >
        {{ noSearchResultMessage }}
      </li>
      <li
        v-if="
          showViewMore &&
          !isEventEmitted &&
          !showSpinner &&
          isApiLoad &&
          displayViewMoreButton
        "
        class="autocomplete-data-list view-more"
        :class="
          customClass && customClass.viewMoreClass
            ? customClass.viewMoreClass
            : ''
        "
        :style="
          customStyle && customStyle.viewMoreStyle
            ? customStyle.viewMoreStyle
            : {}
        "
        :aria-label="aria?.ariaViewMore ? aria.ariaViewMore : 'View more results'"
        tabIndex="0"
        @click="(event: any) => onViewMore(event, true)"
        ref="viewMoreRef"
      >
        {{ viewMoreText }}
      </li>
    </template>
  </template>
  <script lang="ts" setup>
  import { ref, onBeforeUpdate } from 'vue';
  
  interface Iprops {
    objectProperty?: string;
    filteredData: any;
    onSelect: Function;
    disableListFn?: Function;
    disableProperty?: string;
    customClass?: CustomClassType;
    customStyle?: CustomStyleType;
    isOnFocus: boolean;
    showLoadingSpinner?: boolean;
    noSearchResultMessage?: string;
    aria?: CustomAriaType;
    isCustomSpinner?: boolean;
    onViewMore: Function;
    viewMoreText: string;
    showViewMore?: boolean;
    isEventEmitted?: boolean;
    showSpinner?: boolean;
    isApiLoad?: boolean;
    displayViewMoreButton?: boolean;
    viewMoreRef: any;
  }
  
  export type CustomClassType = {
    parentContainerClass?: string;
    inputFieldContainerClass?: string;
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
  
  export type CustomStyleType = {
    parentContainerStyle?: any;
    inputFieldContainerStyle?: any;
    inputFieldStyle?: any;
    listContainerStyle?: any;
    dropdownUnorderedListStyle?: any;
    dropdownListStyle?: any;
    noResultStyle?: any;
    inputLabelContainerStyle?: any;
    inputLabelStyle?: any;
    viewMoreStyle?: any;
  };
  
  export type CustomAriaType = {
    ariaRole?: string;
    ariaRoleDescription?: string;
    ariaNoSearchResult?: string;
    ariaULList?: string;
    ariaListContainer?: string;
    ariaInputField?: string;
    ariaInputLabel?: string;
    ariaViewMore?: string;
  };
  
  const listElementsRef = ref<any[]>([]);
  
  const viewMoreRef = ref<any>();
  
  const functionRef = (el: any, index: number) => {
    listElementsRef.value[index] = el;
  };
  
  withDefaults(defineProps<Iprops>(), {
    filteredData: [],
    onSelect: () => {},
    disableListFn: () => {},
    noSearchResultMessage: 'No results found.',
    isCustomSpinner: false,
  });
  
  onBeforeUpdate(() => {
    listElementsRef.value = [];
  });
  
  defineExpose({
    listElementsRef,
  });
  </script>
  <style>
  .autocomplete-data-list {
    padding: 1rem;
  }
  
  .autocomplete-data-list:hover {
    background-color: #eeeded;
    cursor: pointer;
  }
  
  .autocomplete-plugin-loader {
    width: 2rem;
    height: 2rem;
    border: 3px solid #d4d3d3;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  
  .auto-complete-list-spinner {
    padding: 1rem;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  
  .disable-list-element {
    cursor: context-menu !important;
    opacity: 0.5;
    background-color: #e5e5e5;
  }
  
  .view-more {
    cursor: pointer;
    background-color: #f6f5f5;
    letter-spacing: 0.5px;
  }
  
  .autocomplete-keydown-background {
    background-color: #f4f4f4;
  }
  
  .autocomplete-keydown-viewmore {
    background-color: #c8c8c8;
  }
  </style>
  