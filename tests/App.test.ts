import { expect, describe, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Autocomplete from '../lib/Autocomplete.vue';
import Core from '../lib//Core.vue';
import InputField from '../lib/InputField.vue';

/* Test suite for Autocomplete component */
/* Vue internal instance "vm" is not used in test cases as it is not recommended.
    Will test only the output of the testcases. */

describe('Autocomplete wrapper testing', () => {
  /* Basic test to validate wrapper component */
  it('Check if component is truthy or mounted.', () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper).toBeTruthy();
  });
});

describe('Label testing', () => {
  it('Test if input label is displayed in autocomplete module', () => {
    const label = 'Enter test text..';
    const wrapper = mount(Autocomplete, {
      props: {
        dropdownData: [],
        inputLabel: label,
        showInputlabel: true,
      },
    });
    expect(wrapper.text()).contain(label);
  });

  it('Test if input label is not displayed when showInputlabel is false or undefined.', () => {
    const label = 'Enter test text..';
    const wrapper = mount(Autocomplete, {
      props: {
        dropdownData: [],
        inputLabel: label,
      },
    });
    expect(wrapper.text()).not.contain(label);
  });
});

describe('Default value testing', () => {
  /* The value passed in defaultValue should be present in dropdownData and inputField should be updated.  */
  it('Test if default value is displayed and ref is updated in input text field if defaultValue is passed in props', async () => {
    const FRUIT = 'Apple';
    const wrapper = mount(Core, {
      props: {
        dropdownData: ['Apple', 'Orange', 'Banana'],
        defaultValue: FRUIT,
      },
    });
    const component = await wrapper.findComponent(InputField);
    expect(component.find('input').element.value).toContain(FRUIT);
  });

  /* The value passed in defaultValue is NOT present in dropdownData and hence inputField should NOT be updated.  */
  it('Test if default value is displayed and ref is updated in input text field if defaultValue is passed in props', async () => {
    const FRUIT = 'Kiwi';
    const wrapper = mount(Core, {
      props: {
        dropdownData: ['Apple', 'Orange', 'Banana'],
        defaultValue: FRUIT,
      },
    });
    const component = await wrapper.findComponent(InputField);
    expect(component.find('input').element.value).not.toContain(FRUIT);
  });
});

describe('Dropdown list testing.', () => {
  /* If dropdownData is empty dropdown data should not be displayed during input focus */
  it('Check if dropdownData is empty.', async () => {
    const wrapper = mount(Core, {
      props: {
        dropdownData: [],
      },
    });
    const component = wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    expect(wrapper.html()).not.toContain('autocomplete-li-element');
  });

  it('Test if dropdown list is present when input field is focused.', async () => {
    const wrapper = mount(Core, {
      props: {
        dropdownData: ['test'],
      },
    });
    const component = await wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    /* Dropdown list has the ID selector autocomplete-li-element */
    expect(wrapper.html()).toContain('autocomplete-li-element');
  });

  it('Test if dropdown list is not present when input field is focused with empty dropdowndata.', async () => {
    const wrapper = mount(Core, {
      props: {
        dropdownData: [],
      },
    });
    const component = await wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    /* Dropdown list has the ID selector autocomplete-li-element */
    expect(wrapper.html()).not.toContain('autocomplete-li-element');
  });

  it('Test if all dropdown values are displayed in list', async () => {
    const FRUIT = 'Apple';
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        defaultValue: FRUIT,
      },
    });
    const component = await wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    expect(wrapper.html()).toContain('autocomplete-li-element');
    const length = await wrapper.findAll('li').length;
    expect(DROPDOWN_DATA.length).toBe(length);
  });

  it('Test if selected dropdown value from list is displayed in autocomplete field', async () => {
    const FRUIT = 'Apple';
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        defaultValue: FRUIT,
      },
    });
    const component = await wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    expect(wrapper.html()).toContain('autocomplete-li-element');
    const length = await wrapper.findAll('li').length;
    expect(DROPDOWN_DATA.length).toBe(length);
    await wrapper.find('#autocomplete-li-element-0').trigger('click');
    expect(component.find('input').element.value).toContain(FRUIT);
  });
});

describe('No search results found testing.', () => {
  it('Show No results found message when invalid value is typed in input field.', async () => {
    const FRUIT = 'Some invalid value typed';
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const NO_SEARCH_RESULT_MESSAGE = 'No search result found.';
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        noSearchResultMessage: NO_SEARCH_RESULT_MESSAGE,
      },
    });
    const component = await wrapper.findComponent(InputField);
    const input = wrapper.find('input');
    input.setValue(FRUIT);
    await component.find('input').trigger('focus');
    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.findAll('li')[0].text()).toBe(NO_SEARCH_RESULT_MESSAGE);
  });
});

describe('Custom CSS class testing.', () => {
  /* Test if custom class is applied to input text field. */
  it('Test if custom class is applied to input text field.', async () => {
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const CUSTOM_CLASS = 'test-input-field-class';
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        customClass: {
          inputFieldClass: CUSTOM_CLASS,
        },
      },
    });
    const component = await wrapper.findComponent(InputField);
    const inputComponent = component.find('input');
    expect(inputComponent.element.classList).toContain(CUSTOM_CLASS);
  });

  /* Test if custom class is applied to dropdown list. */
  it('Test if custom class is applied to dropdown list.', async () => {
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const CUSTOM_CLASS = 'test-dropdown-list-class';
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        customClass: {
          dropdownListClass: CUSTOM_CLASS,
        },
      },
    });
    const component = await wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    expect(wrapper.html()).toContain('autocomplete-li-element');
    const length = await wrapper.findAll('li').length;
    expect(DROPDOWN_DATA.length).toBe(length);
    expect(wrapper.findAll('li')[0].element.classList).toContain(CUSTOM_CLASS);
  });

  it('Test if custom class is applied to No search result found list.', async () => {
    const FRUIT = 'Some invalid value typed';
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const NO_SEARCH_RESULT_MESSAGE = 'No search result found.';
    const CUSTOM_CLASS = 'test-no-search-list-class';
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        noSearchResultMessage: NO_SEARCH_RESULT_MESSAGE,
        customClass: {
          noResultClass: CUSTOM_CLASS,
        },
      },
    });
    const component = await wrapper.findComponent(InputField);
    const input = wrapper.find('input');
    input.setValue(FRUIT);
    await component.find('input').trigger('focus');
    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.findAll('li')[0].element.classList).toContain(CUSTOM_CLASS);
  });
});

describe('ARIA Testing', () => {
  it('Check if ARIA is updated in the input field', async () => {
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const CUSTOM_ARIA_LABEL = 'test-aria-label';
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
        aria: {
          ariaInputField: CUSTOM_ARIA_LABEL,
          ariaRoleDescription: 'ttt',
        },
      },
    });
    const component = await wrapper.findComponent(InputField);
    const inputComponent = component.find('input');
    expect(inputComponent.html()).toContain(CUSTOM_ARIA_LABEL);
  });

  it('Check if ARIA is available in the autocomplete dropdown list', async () => {
    const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
    const wrapper = mount(Core, {
      props: {
        dropdownData: DROPDOWN_DATA,
      },
    });
    const component = await wrapper.findComponent(InputField);
    await component.find('input').trigger('focus');
    expect(wrapper.html()).toContain('autocomplete-li-element');
    const length = await wrapper.findAll('li').length;
    expect(DROPDOWN_DATA.length).toBe(length);
    console.log(wrapper.findAll('li')[0].html());
    // First dropdown list value is Apple as per dropdownData.
    expect(wrapper.findAll('li')[0].html()).toContain(`aria-label=\"Apple\"`);
  });

  describe('InputField Testing', () => {
    it('Check if autocomplete input field is disabled if isAutoCompleteDisabled props set as true', async () => {
      const DROPDOWN_DATA = ['Apple', 'Orange', 'Banana'];
      const wrapper = mount(Core, {
        props: {
          dropdownData: DROPDOWN_DATA,
          isAutoCompleteDisabled: true,
        },
      });
      const component = await wrapper.find('input');
      expect(component.element.disabled).toBe(true);
    });
  });
});
