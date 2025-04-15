<template>
    <InputField
      ref="searchValue"
      :placeHolder="props.placeHolder"
      :is-auto-complete-disabled="props.isAutoCompleteDisabled!"
      :input-field-class="props.customClass?.inputFieldClass"
      :input-field-style="props.customStyle?.inputFieldStyle"
      :aria-input-field="props.aria?.ariaInputField"
      :aria-role="props.aria?.ariaRole"
      :aria-role-description="props.aria?.ariaRoleDescription"
      :on-focus="handleOnFocusEvent"
      :on-blur="handleOnBlurEvent"
      :clear-search="clearSearch"
      :handle-dropdown-click="handleDropdownClick"
      :showdrop-down-arrow="props.showdropDownArrow!"
      :show-clear-option="props.showClearOption!"
      :on-input="onSearch"
    />
    <div
      class="auto-complete-list"
      ref="listContainer"
      :aria-label="
        aria?.ariaListContainer ? aria.ariaListContainer : 'List container'
      "
      :class="[
        customClass && customClass.listContainerClass
          ? customClass.listContainerClass
          : '',
        isOnFocus ? 'showDropdown' : '',
      ]"
      :style="
        customStyle && customStyle.listContainerStyle
          ? customStyle.listContainerStyle
          : {}
      "
    >
      <div id="list-container">
        <ul
          v-if="isOnFocus"
          id="list-id"
          class="unorder-list"
          ref="unOrderedList"
          @scroll="listScrollEvent"
          :aria-label="aria?.ariaULList ? aria.ariaULList : 'Parent List'"
          :class="
            customClass && customClass.dropdownUnorderedListClass
              ? customClass.dropdownUnorderedListClass
              : ''
          "
          :style="
            customStyle && customStyle.dropdownUnorderedListStyle
              ? customStyle.dropdownUnorderedListStyle
              : {}
          "
        >
          <DropdownList
            ref="listElementsRef"
            :isOnFocus="isOnFocus"
            :customClass="customClass"
            :customStyle="customStyle"
            :filteredData="filteredData"
            :disableListFn="disableListFn"
            :onSelect="onSelect"
            :objectProperty="objectProperty"
            :disableProperty="disableProperty"
            :showLoadingSpinner="showLoadingSpinner"
            :noSearchResultMessage="noSearchResultMessage"
            :aria="aria"
            :isCustomSpinner="isCustomSpinner"
            :onViewMore="onViewMore"
            :viewMoreText="viewMoreText!"
            :isEventEmitted="isEventEmitted"
            :showSpinner="showSpinner"
            :isApiLoad="isApiLoad"
            :displayViewMoreButton="displayViewMoreButton"
            :viewMoreRef="viewMoreElement"
            :optViewMoreOnlyForApiCall="optViewMoreOnlyForApiCall"
          />
        </ul>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import InputField from './InputField.vue';
  import DropdownList from './DropdownList.vue';
  import { ref, onMounted, computed, watch, shallowRef, onUnmounted } from 'vue';
  
  interface Iprops {
    dropdownData: any;
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
  
  const props = defineProps<Iprops>();
  
  const autocompleteDropdownData = computed(() => props.dropdownData || []);
  
  const filteredData = shallowRef<any>([]);
  
  const searchedData = ref<any[]>([]);
  
  const scrollDownIndex = ref<number>(0);
  
  const isEventEmitted = ref(false);
  
  const displayViewMoreButton = ref(false);
  
  const isInputFieldDirty = ref(false);
  
  const listFocusIndex = ref(-1);
  
  const isViewMoreFocused = ref(false);
  
  const isOnFocus = ref(false);
  
  const showSpinner = ref(false);
  
  const searchValue = ref<any>('');
  const listContainer = ref<HTMLDivElement>();
  const unOrderedList = ref<HTMLUListElement>();
  const listElementsRef = ref<any>();
  const viewMoreElement = ref<any>();
  
  watch(
    () => autocompleteDropdownData.value,
    (_newList, _oldList) => {
      loadNextSetData();
      showSpinner.value = false;
      const listWidth = listContainer.value?.style;
      const inputFieldWidth = searchValue.value?.['searchValue']?.clientWidth;
      if (listWidth?.width !== inputFieldWidth + 'px') {
        setWidth();
      }
    },
    { deep: true }
  );
  
  const isDisplayViewButton = () => {
    if (
      typeof props.totalRecords !== 'undefined' &&
      autocompleteDropdownData.value.length >= props.totalRecords
    ) {
      displayViewMoreButton.value = false;
      return;
    }
    if (autocompleteDropdownData.value.length <= 0) {
      displayViewMoreButton.value = false;
      return;
    }
    if (
      searchValue.value?.['searchValue']?.value &&
      searchValue.value?.['searchValue']?.value !== '' &&
      props.triggerApiLoadEvent &&
      !isEventEmitted.value
    ) {
      displayViewMoreButton.value = true;
      return;
    }
    if (scrollDownIndex.value >= autocompleteDropdownData.value.length) {
      displayViewMoreButton.value = true;
      return;
    }
    displayViewMoreButton.value = false;
    return;
  };
  
  function loadNextSetData() {
    try {
      if (!isOnFocus.value) {
        return;
      }
      setTimeout(() => {
        nextSet();
      }, 100);
    } catch (err) {
      console.log(err);
    }
  }
  
  function autocompleteKeyboardEvent(event: any) {
    if (filteredData.value.length <= 0 && event?.keyCode !== 27) {
      return;
    }
    let id;
    let getIndex;
    switch (event?.keyCode) {
      case 27:
        if (isOnFocus.value) {
          isOnFocus.value = false;
          searchValue.value?.['searchValue']?.blur();
          resetListFocusOptions();
        }
        return;
      case 13:
        if (isViewMoreFocused.value) {
          onViewMore(null, true);
          isViewMoreFocused.value = false;
          return;
        }
        if (
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value
          ]?.classList.contains('disable-list-element')
        ) {
          return;
        }
        const getData = filteredData.value[listFocusIndex.value];
        if (getData !== undefined && getData !== null) {
          onSelect(listFocusIndex.value, getData, true);
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value
          ]?.classList.remove('autocomplete-keydown-background');
        }
        searchValue.value?.['searchValue']?.blur();
        return;
      case 40:
        if (
          listFocusIndex.value + 1 ===
          listElementsRef.value?.listElementsRef?.length
        ) {
          if (viewMoreElement.value) {
            viewMoreElement.value?.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
            });
            viewMoreElement.value?.classList.add('autocomplete-keydown-viewmore');
            listElementsRef.value?.listElementsRef?.[
              listFocusIndex.value
            ]?.classList.remove('autocomplete-keydown-background');
            isViewMoreFocused.value = true;
          }
          return;
        }
        listFocusIndex.value = listFocusIndex.value + 1;
        id = listElementsRef.value?.listElementsRef?.[listFocusIndex.value]?.id;
        if (id === undefined || id === null) {
          return;
        }
        if (!id.includes('autocomplete-li-element-')) {
          return;
        }
        getIndex = Number(id.substring(id.lastIndexOf('-') + 1));
        if (typeof getIndex !== 'number') {
          return;
        }
        setTimeout(() => {
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value
          ]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value
          ]?.classList.add('autocomplete-keydown-background');
          if (listFocusIndex.value > 0) {
            listElementsRef.value?.listElementsRef?.[
              listFocusIndex.value - 1
            ]?.classList.remove('autocomplete-keydown-background');
            if (
              listFocusIndex.value + 1 ===
                listElementsRef.value?.listElementsRef?.length &&
              displayViewMoreButton
            ) {
              unOrderedList.value?.scrollTo(
                0,
                unOrderedList.value?.scrollHeight + 10
              );
            }
          }
        }, 20);
        return;
      case 38:
        if (listFocusIndex.value <= 0) {
          return;
        }
        if (isViewMoreFocused.value) {
          viewMoreElement.value?.classList.remove(
            'autocomplete-keydown-viewmore'
          );
          isViewMoreFocused.value = false;
        } else {
          listFocusIndex.value = listFocusIndex.value - 1;
        }
        id = listElementsRef.value?.listElementsRef?.[listFocusIndex.value]?.id;
        if (id === undefined || id === null) {
          return;
        }
        if (!id.includes('autocomplete-li-element-')) {
          return;
        }
        getIndex = Number(id.substring(id.lastIndexOf('-') + 1));
        if (typeof getIndex !== 'number') {
          return;
        }
        setTimeout(() => {
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value
          ]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value
          ]?.classList.add('autocomplete-keydown-background');
          listElementsRef.value?.listElementsRef?.[
            listFocusIndex.value + 1
          ]?.classList.remove('autocomplete-keydown-background');
        }, 20);
        return;
      default:
        return;
    }
  }
  
  function autocompleteResizeListener() {
    setWidth();
  }
  
  function nextSet() {
    const dropdownData =
      searchedData.value.length > 0
        ? [...searchedData.value]
        : [...autocompleteDropdownData.value];
    if (
      autocompleteDropdownData.value.length === scrollDownIndex.value ||
      searchedData.value.length === scrollDownIndex.value
    ) {
      if (
        !isEventEmitted.value &&
        props.isApiLoad &&
        props.triggerApiLoadEvent &&
        typeof props.triggerApiLoadEvent === 'function'
      ) {
        if (props.optViewMoreOnlyForApiCall) {
          displayViewMoreButton.value = true;
          setTimeout(() => {
            unOrderedList.value?.scrollTo(
              0,
              unOrderedList.value.scrollHeight + 10
            );
          }, 75);
          return;
        }
        props.triggerApiLoadEvent({
          dataIndex: autocompleteDropdownData.value.length,
        });
        isEventEmitted.value = true;
        if (props.showLoadingSpinner) {
          showSpinner.value = true;
          setTimeout(() => {
            unOrderedList.value?.scrollTo(
              0,
              unOrderedList.value.scrollHeight + 10
            );
          }, 75);
        }
      }
      return;
    }
  
    if (dropdownData.length > filteredData.value.length) {
      if (props.loadAllDataAtOnce) {
        filteredData.value = [...dropdownData];
        return;
      }
      const getThresholdData = Math.ceil(
        filteredData.value.length / props.scrollThreshold!
      );
      let getNextDataSet: any;
      if (
        props.isScrollThresholdRequired &&
        getThresholdData >= props.initialVisibleData!
      ) {
        const temp = [...filteredData.value];
        temp.splice(0, props.initialVisibleData);
        getNextDataSet = dropdownData.slice(
          scrollDownIndex.value,
          scrollDownIndex.value + props.initialVisibleData!
        );
        if (getNextDataSet.length > 0) {
          scrollDownIndex.value = scrollDownIndex.value + getNextDataSet.length;
          if (
            isInputFieldDirty.value &&
            searchValue.value?.['searchValue']?.value &&
            searchValue.value?.['searchValue']?.value !== ''
          ) {
            if (props.objectProperty) {
              getNextDataSet = getNextDataSet.filter((dt: any) =>
                dt[props.objectProperty!]
                  ?.toString()
                  .toLowerCase()
                  .includes(props.defaultValue?.toString()?.toLowerCase().trim())
              );
            } else {
              getNextDataSet = getNextDataSet.filter((dt: any) =>
                dt
                  ?.toString()
                  .toLowerCase()
                  .includes(props.defaultValue?.toString()?.toLowerCase().trim())
              );
            }
          }
          filteredData.value = [...temp, ...getNextDataSet];
        }
      } else {
        getNextDataSet = dropdownData.slice(
          scrollDownIndex.value,
          scrollDownIndex.value + props.initialVisibleData!
        );
        if (getNextDataSet.length > 0) {
          scrollDownIndex.value = scrollDownIndex.value + getNextDataSet.length;
          if (
            isInputFieldDirty.value &&
            searchValue.value?.['searchValue']?.value &&
            searchValue.value?.['searchValue']?.value !== ''
          ) {
            if (props.objectProperty) {
              getNextDataSet = getNextDataSet.filter((dt: any) =>
                dt[props.objectProperty!]
                  ?.toString()
                  .toLowerCase()
                  .includes(
                    searchValue.value?.['searchValue']?.value
                      ?.toString()
                      ?.toLowerCase()
                      .trim()
                  )
              );
            } else {
              getNextDataSet = getNextDataSet.filter((dt: any) =>
                dt
                  ?.toString()
                  .toLowerCase()
                  .includes(
                    searchValue.value?.['searchValue']?.value
                      ?.toString()
                      ?.toLowerCase()
                      .trim()
                  )
              );
            }
          }
          filteredData.value = [...filteredData.value, ...getNextDataSet];
        }
      }
      setTimeout(() => {
        unOrderedList.value?.scrollTo(
          0,
          Math.ceil((unOrderedList.value!.scrollHeight * 50) / 100)
        );
      }, 75);
    }
  }
  
  function setData() {
    try {
      const data = [...autocompleteDropdownData.value];
      if (props.loadAllDataAtOnce) {
        filteredData.value = data;
        scrollDownIndex.value = data.length;
        isDisplayViewButton();
        return;
      }
      if (
        props.initialVisibleData !== undefined &&
        data.length <= props.initialVisibleData
      ) {
        filteredData.value = data;
        scrollDownIndex.value = data.length;
        isDisplayViewButton();
        return;
      }
      let getFirstSetData = data.slice(0, props.initialVisibleData);
      scrollDownIndex.value = getFirstSetData.length;
      if (
        isInputFieldDirty.value &&
        searchValue.value?.['searchValue']?.value &&
        searchValue.value?.['searchValue']?.value !== ''
      ) {
        if (props.objectProperty) {
          getFirstSetData = getFirstSetData.filter((dt) =>
            dt[props.objectProperty!]
              ?.toString()
              .toLowerCase()
              .includes(
                searchValue.value?.['searchValue']?.value
                  ?.toString()
                  ?.toLowerCase()
                  .trim()
              )
          );
        } else {
          getFirstSetData = getFirstSetData.filter((dt) =>
            dt
              ?.toString()
              .toLowerCase()
              .includes(
                searchValue.value?.['searchValue']?.value
                  ?.toString()
                  ?.toLowerCase()
                  .trim()
              )
          );
        }
      }
      filteredData.value = getFirstSetData;
      isDisplayViewButton();
      return;
    } catch (err) {
      console.log(err);
    }
  }
  
  const listScrollEvent = (event: any) => {
    if (filteredData.value.length <= 0) {
      return;
    }
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      if (props.totalRecords && scrollDownIndex.value >= props.totalRecords) {
        displayViewMoreButton.value = false;
        return;
      }
      loadNextSetData();
    } else if (
      props.isScrollThresholdRequired &&
      event.target.scrollTop < 10 &&
      filteredData.value.length > props.initialVisibleData!
    ) {
      initData();
    }
    if (event.target.scrollTop === 0) {
      if (listFocusIndex.value !== -1) {
        listElementsRef.value?.listElementsRef?.[
          listFocusIndex.value
        ]?.classList.remove('autocomplete-keydown-background');
      }
      if (isViewMoreFocused.value) {
        viewMoreElement.value?.classList.remove('autocomplete-keydown-viewmore');
      }
      listFocusIndex.value = -1;
      isViewMoreFocused.value = false;
    }
  };
  
  const onViewMore = (_event: any, isTriggredProgramatically: boolean) => {
    if (!isTriggredProgramatically) {
      return;
    }
    if (
      props.isApiLoad &&
      !isEventEmitted.value &&
      typeof props.triggerApiLoadEvent === 'function'
    ) {
      props.triggerApiLoadEvent({
        dataIndex: autocompleteDropdownData.value.length,
      });
      searchValue.value?.['searchValue']?.focus();
      isEventEmitted.value = true;
      if (props.showLoadingSpinner) {
        showSpinner.value = true;
      }
    }
  };
  
  const setWidth = () => {
    const listWidth = listContainer.value?.style;
    // TODO: Don't use document. use Ref.
    const inputFieldWidth = document.getElementById('searchInput')?.clientWidth;
    if (listWidth && inputFieldWidth) {
      listWidth.width = inputFieldWidth + 'px';
    }
    return;
  };
  
  const handleOnBlurEvent = (event: any) => {
    window.removeEventListener('keydown', autocompleteKeyboardEvent);
    if ((event?.relatedTarget as HTMLElement)?.classList?.contains('arrow')) {
      return;
    }
    if (
      (event?.relatedTarget as HTMLElement)?.classList?.contains('unorder-list')
    ) {
      searchValue.value?.['searchValue']?.focus();
      return;
    }
    if (
      (event?.relatedTarget as HTMLElement)?.classList?.contains(
        'disable-list-element'
      )
    ) {
      return;
    }
    if (
      (event?.relatedTarget as HTMLElement)?.classList?.contains(
        'autocomplete-data-list'
      )
    ) {
      return;
    }
    if (props.inspectAutoCompleteList) {
      console.warn(
        `You have turned off blur event in autocomplete module which will not close autocomplete list. Hope you know what you are doing. Update to false after inspect is complete.`
      );
      return;
    }
    isOnFocus.value = false;
    filteredData.value = [];
    resetListFocusOptions();
    unOrderedList.value?.scrollTo(0, 0);
    listFocusIndex.value = 0;
    if (props.triggerBlurEvent && typeof props.triggerBlurEvent === 'function') {
      props.triggerBlurEvent(event);
    }
  };
  
  const handleOnFocusEvent = (event: any) => {
    if (props.isAutoCompleteDisabled) {
      return;
    }
    isOnFocus.value = true;
    setWidth();
    // const getListId = listContainer.value?.style;
    // // TODO: Don't use document. use Ref.
    // const getInputId = document.getElementById('searchInput')?.clientWidth;
    // if (getListId && getInputId) {
    //         getListId.width = getInputId+'px';
    // }
    if (
      props.triggerOnFocusEvent &&
      typeof props.triggerOnFocusEvent === 'function'
    ) {
      props.triggerOnFocusEvent(event);
    }
    if (filteredData.value.length <= 0) {
      if (
        isInputFieldDirty.value &&
        searchValue.value?.['searchValue']?.value &&
        searchValue.value['searchValue']?.value !== ''
      ) {
        onSearch(null);
      } else {
        setData();
      }
    }
    window.addEventListener('keydown', autocompleteKeyboardEvent);
  };
  
  const clearSearch = (event: any) => {
    if (props.isAutoCompleteDisabled) {
      return;
    }
    searchValue.value['searchValue']!.value = '';
    if (
      props.triggerClearSelectionEvent &&
      typeof props.triggerClearSelectionEvent === 'function'
    ) {
      props.triggerClearSelectionEvent(event);
    }
  };
  
  const initData = () => {
    const data =
      isInputFieldDirty.value &&
      searchedData.value.length > 0 &&
      searchValue.value?.['searchValue']?.value
        ? searchedData.value.slice(0, props.initialVisibleData)
        : autocompleteDropdownData.value.slice(0, props.initialVisibleData);
    filteredData.value = data;
    scrollDownIndex.value = data.length;
    return;
  };
  
  function runCustomSearch(searchFunction: Function) {
    return new Promise((resolve, reject) => {
      const result = searchFunction(
        searchValue.value?.['searchValue']?.value,
        autocompleteDropdownData.value
      );
      if (result) {
        resolve(result);
      }
      reject([]);
    });
  }
  
  const onSearch = (_event: any) => {
    try {
      if (
        !searchValue.value?.['searchValue']?.value ||
        searchValue.value?.['searchValue']?.value.trim() === ''
      ) {
        searchedData.value = [];
        initData();
        isDisplayViewButton();
        unOrderedList.value?.scrollTo(0, 0);
        return;
      }
      if (!isInputFieldDirty.value) {
        isInputFieldDirty.value = true;
      }
      scrollDownIndex.value = 0; //reset
      if (!isOnFocus.value) {
        isOnFocus.value = true;
      }
      if (props.searchFn && typeof props.searchFn === 'function') {
        let promise = runCustomSearch(props.searchFn);
        promise.then((result: any) => {
          if (result && result.length > 0) {
            searchedData.value = result;
            const getFirstSetData = result.slice(0, props.initialVisibleData);
            scrollDownIndex.value =
              scrollDownIndex.value + getFirstSetData.length;
            filteredData.value = [...getFirstSetData];
            isDisplayViewButton();
            return;
          }
          filteredData.value = [];
          searchedData.value = [];
          scrollDownIndex.value = 0;
          isDisplayViewButton();
          return;
        });
        promise.catch((_result: any) => {
          filteredData.value = [];
          searchedData.value = [];
          scrollDownIndex.value = 0;
          isDisplayViewButton();
          return;
        });
        // const result = await props.searchFn(searchValue.value?.['searchValue']?.value, autocompleteDropdownData.value);
        // if (result && result.length > 0) {
        //     searchedData.value = result;
        //     const getFirstSetData = result.slice(0, props.initialVisibleData);
        //     scrollDownIndex.value = scrollDownIndex.value + getFirstSetData.length;
        //     filteredData.value = [...getFirstSetData];
        //     isDisplayViewButton();
        //     return;
        // }
        // filteredData.value = [];
        // searchedData.value = [];
        // scrollDownIndex.value = 0;
        // isDisplayViewButton();
        // return;
      }
      if (props.objectProperty) {
        let getSearchData;
        if (!isDeepSearch()) {
          getSearchData = autocompleteDropdownData.value.filter((dt: any) =>
          dt[props.objectProperty!]
            ?.toString()
            .toLowerCase()
            .includes(
              searchValue.value?.['searchValue']?.value.toLowerCase().trim()
            )
        );
        } else {
          getSearchData = deepSearch();
        }
        if (getSearchData && getSearchData.length > 0) {
          const getFirstSetData = getSearchData.slice(
            0,
            props.initialVisibleData
          );
          scrollDownIndex.value = scrollDownIndex.value + getFirstSetData.length;
          searchedData.value = getSearchData;
          filteredData.value = getFirstSetData;
          isDisplayViewButton();
          return;
        }
        filteredData.value = [];
        return;
      }
      const getSearchData = autocompleteDropdownData.value.filter((dt: any) =>
        dt
          ?.toString()
          .toLowerCase()
          .includes(
            searchValue.value?.['searchValue']?.value.toLowerCase().trim()
          )
      );
      if (getSearchData.length > 0) {
        const getFirstSetData = getSearchData.slice(0, props.initialVisibleData);
        scrollDownIndex.value = scrollDownIndex.value + getFirstSetData.length;
        searchedData.value = getSearchData;
        filteredData.value = getFirstSetData;
        isDisplayViewButton();
        return;
      }
      filteredData.value = [];
      return;
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleDropdownClick = (_event: any) => {
    if (props.isAutoCompleteDisabled) {
      return;
    }
    if (!isOnFocus.value) {
      searchValue.value?.['searchValue']?.focus();
    } else {
      isOnFocus.value = false;
    }
  };
  
  const resetListFocusOptions = () => {
    if (listFocusIndex.value !== -1) {
      listElementsRef.value?.listElementsRef?.[
        listFocusIndex.value
      ]?.classList.remove('autocomplete-keydown-background');
    }
    if (isViewMoreFocused.value) {
      viewMoreElement.value?.classList.remove('autocomplete-keydown-viewmore');
    }
    listFocusIndex.value = -1;
    isViewMoreFocused.value = false;
    listElementsRef.value.listElementsRef = [];
  };
  
  const onSelect = (
    index: number,
    selectedValue: any,
    isTriggredProgramatically: boolean
  ) => {
    if (!isTriggredProgramatically) {
      return false;
    }
    if (selectedValue === undefined || selectedValue === null) {
      return;
    }
    if (props.disableProperty && selectedValue[props.disableProperty]) {
      return;
    }
    if (
      props.disableListFn !== undefined &&
      props.disableListFn !== null &&
      props.disableListFn(index, selectedValue)
    ) {
      return;
    }
    if (props.objectProperty) {
      searchValue.value['searchValue'].value =
        selectedValue[props.objectProperty!];
    } else {
      searchValue.value['searchValue'].value = selectedValue;
    }
    isOnFocus.value = false;
    isInputFieldDirty.value = false;
    filteredData.value = [];
    searchedData.value = [];
    displayViewMoreButton.value = false;
    resetListFocusOptions();
    if (props.broadcastSelectedValue) {
      props.broadcastSelectedValue(selectedValue);
    }
  };
  
  onUnmounted(() => {
    window.removeEventListener('resize', autocompleteResizeListener);
  });

  function isDeepSearch(): boolean {
    return props.additionalData && props.additionalData.relativeSearch ? true : false;
  }

  function callCustomFunctionInDeepSearch() {
    const relativeSearch = props.additionalData?.relativeSearch;
    if (typeof relativeSearch === 'object' && Object.prototype.hasOwnProperty.call(relativeSearch, 'customFunction') && typeof relativeSearch.customFunction === 'function') {
      return new Promise((resolve, reject) => {
        const result: any[] = relativeSearch.customFunction!(searchValue.value?.['searchValue']?.value, autocompleteDropdownData.value);
        if (result) { resolve(result); }
        reject([]);
      });
    }
    return [];
  }

    /* isSetDefault & defaultValue are passed from onMounted lifecycle. */
    function deepSearch(isSetDefault?: boolean, defaultValue?: any) {
    const relativeSearch = props.additionalData?.relativeSearch;
    if (!relativeSearch) { return [] }
    let searchAttributes: string[] = [];
    let isCustomFunction = false;
    if (typeof relativeSearch === 'boolean' && relativeSearch === true) {
      for (const dObj in autocompleteDropdownData.value[0]) {
        searchAttributes.push(dObj);
      }
    } else if (typeof relativeSearch === 'object' && Object.keys(relativeSearch).length > 0) {
      if (Object.prototype.hasOwnProperty.call(relativeSearch, 'includeOnly') && relativeSearch.includeOnly!.length > 0) {
        searchAttributes = [...relativeSearch.includeOnly!];
      } else {
        for (const dObj in autocompleteDropdownData.value[0]) {
          searchAttributes.push(dObj);
        }
      }
      if (Object.prototype.hasOwnProperty.call(relativeSearch, 'customFunction') && typeof relativeSearch.customFunction === 'function') {
        isCustomFunction = true;
      }
    }
    if (searchAttributes.length > 0) {
      if (isSetDefault) {
        return runInitDeepSearch(defaultValue?.toString()?.toLowerCase().trim(), searchAttributes)
      }
      if (!isCustomFunction) {
        return runDeepSearch(searchValue.value?.['searchValue']?.value.toLowerCase().trim(), searchAttributes)
      }
      return callCustomFunctionInDeepSearch();
    }
    return [];
  }

  function runDeepSearch(searchKey: string, attributes: string[]) {
    if (!searchKey) { return [] };
    return autocompleteDropdownData.value.filter((item: any) => attributes.some((key) => {
      const value = item[key];
      return value.toString().toLowerCase().includes(searchKey)
    }));
  }

  /* Called only during onMounted lifecycle to set defaultValue */
  function runInitDeepSearch(searchKey: string, attributes: string[]) {
    if (!searchKey) { return [] };
    return autocompleteDropdownData.value.find((item: any) => attributes.some((key) => {
      const value = item[key];
      return value.toString().toLowerCase() === searchKey
    }));
  }
  
  
  onMounted(() => {
    // 1st useEffect
    setData();
  
    // 2nd useEffect
    if (props.defaultValue) {
      if (props.objectProperty) {
        let getValue;
        if (typeof props.defaultValue === 'object') {
          if (!isDeepSearch()) {
            getValue = autocompleteDropdownData.value.find(
            (dt: any) =>
              dt[props.objectProperty!].toString()?.toLowerCase()?.trim() === props.defaultValue[props.objectProperty!].toString()?.toLowerCase()?.trim());
            
          } else {
            getValue = deepSearch(true, props.defaultValue[props.objectProperty!]);
          }
        } else {
          if (!isDeepSearch()) {
            getValue = autocompleteDropdownData.value.find(
              (dt: any) => dt[props.objectProperty!].toString()?.toLowerCase()?.trim() === props.defaultValue.toString()?.toLowerCase()?.trim());
          } else {
            getValue = deepSearch(true, props.defaultValue);
          }
        }
        if (getValue) {
          searchValue.value!['searchValue']!.value = getValue[props.objectProperty];
        }
      } else {
        let getValue;
        if (typeof props.defaultValue === 'object') {
          getValue = autocompleteDropdownData.value.find(
            (dt: any) => dt?.toString()?.toLowerCase()?.trim() === props.defaultValue[props.objectProperty!].toString()?.toLowerCase()?.trim());
        } else {
          getValue = autocompleteDropdownData.value.find(
            (dt: any) => dt.toString()?.toLowerCase()?.trim() === props.defaultValue.toString()?.toLowerCase()?.trim());
        }
        if (getValue) {
          searchValue.value!['searchValue']!.value = getValue;
        }
      }
    }
  
    // 3rd useEffect
    window.addEventListener('resize', autocompleteResizeListener);
    setWidth();
  });
  </script>
  <style>
  .auto-complete-list {
    position: absolute;
    width: inherit;
    background-color: #ffffff;
    display: none;
  }
  .field-container {
    width: inherit;
  }
  
  .unorder-list {
    list-style: none;
    max-height: 20rem;
    overflow: auto;
    margin: 0;
    padding: 0;
    text-align: center;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
    color: #000000;
  }
  .showDropdown {
    display: block;
  }
  </style>
  