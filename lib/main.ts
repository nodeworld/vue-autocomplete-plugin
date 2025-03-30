import Autocomplete from './Autocomplete.vue'
// import '..src/style.css';

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

export { Autocomplete, type CustomClassType, type CustomStyleType, type CustomAriaType }
