<template>
    <div
      class="label-container"
      :class="
        props.inputLabelContainerClass ? props.inputLabelContainerClass : ''
      "
      :style="
        props.inputLabelContainerStyle ? props.inputLabelContainerStyle : {}
      "
    >
      <label
        class="label-value"
        :class="props.inputLabelClass ? props.inputLabelClass : ''"
        :style="props.inputLabelStyle ? props.inputLabelStyle : {}"
        for="searchInput"
        :aria-label="
          props?.ariaInputLabel ? props.ariaInputLabel : 'Autocomplete search'
        "
      >
        {{ props.inputLabel }}
      </label>
    </div>
  </template>
  <script lang="ts" setup>
  import type { CSSProperties } from 'vue';
  
  interface IProps {
    inputLabel: string;
    inputLabelContainerClass?: string;
    inputLabelContainerStyle?: CSSProperties;
    inputLabelClass?: string;
    inputLabelStyle?: CSSProperties;
    ariaInputLabel?: string;
  }
  
  const props = withDefaults(defineProps<IProps>(), {
    inputLabel: 'Enter or Search value',
  });
  </script>
  