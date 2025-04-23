import CodeSamplesConstant from '../constants/CodeSamplesConstant';

const initialState = {
  // Data pagecodeSamples
  codeSamplePage: {},
  error: {},
  //codeSamples constants
  codeSamples: [],
  filteredCodeSamples: [],
  filters: [],
  errorCodeSamples: {},
  loading: false,
  //codeSample constant
  codeSample: {},
  errorCodeSample: {},
  loadingCodeSample: false,

};

// eslint-disable-next-line default-param-last
export default function codeSampleReducer(state = initialState, action) {
  switch (action.type) {

    case CodeSamplesConstant.GET_ALL_CODE_SAMPLE_SUCCESS:
      return {
        ...state,
        codeSamples: action.payload,
        filteredCodeSamples: action.payload,
        errorCodeSamples: {},
      };
    case CodeSamplesConstant.GET_ALL_CODE_SAMPLE_FAILURE:
      return {
        ...state,
        codeSamples: [],
        errorCodeSamples: action.payload,
      };
    case CodeSamplesConstant.FILTER_CODE_SAMPLES:
      return {
        ...state,
        filteredCodeSamples: action.filteredCodeSamples,
      };
    // Assignment of the load value of codeSample
    case CodeSamplesConstant.GET_CODE_SAMPLE_SUCCESS:
      return {
        ...state,
        codeSample: action.payload,
        errorCodeSample: {},
      };
    case CodeSamplesConstant.GET_CODE_SAMPLE_FAILURE:
      return {
        ...state,
        codeSample: {},
        errorCodeSample: action.payload,
      };
    // Assignment of the load codeSamplePage to page codeSample
    case CodeSamplesConstant.GET_CODE_SAMPLE_DATA_ALL_SUCCESS:
      return {
        ...state,
        codeSamplePage: action.payload,
        error: {},
      };
    case CodeSamplesConstant.GET_CODE_SAMPLE_DATA_ALL_FAILURE:
      return {
        ...state,
        codeSamplePage: {},
        error: action.payload,
      };
    // Reset codeSamplePage of the codeSample
    case CodeSamplesConstant.RESET_CODE_SAMPLE:
      return {
        ...state,
        codeSample: {},
        errorCodeSamples: {},
      };
    default:
      return state;
  }
}
