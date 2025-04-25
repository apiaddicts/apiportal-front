import CodeSamplesConstant from '../constants/CodeSamplesConstant';
import CodeSampleService from '../../services/CodeSamples';



export const getCodeSample = (id) => (dispatch) => {
  CodeSampleService.getcodeSample(id).then(
    (response) => {
      dispatch({
        type: CodeSamplesConstant.GET_CODE_SAMPLE_SUCCESS,
        payload: response,
      });
    },
    (error) => {
      dispatch({
        type: CodeSamplesConstant.GET_CODE_SAMPLE_FAILURE,
        payload: error,
      });
    },
  );
};
