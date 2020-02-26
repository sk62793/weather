import {
    GET_INFO_REQUEST,
    GET_INFO_SUCCESS,
    GET_INFO_FAILURE
} from '../actions'

const initialState = {
    isFetching: false,
    data: [],
    showFrag: false
}

const getInfo = (result = initialState, action) => {
    switch (action.type) {
        case GET_INFO_REQUEST:
            return (
                //console.log('fetching...'),
                Object.assign({}, result, {
                isFetching: true,
                data: [],
                showFrag: false
            }));
        case GET_INFO_SUCCESS:
            return (
                //console.log('Success!'),
                Object.assign({}, result, {
                isFetching: false,
                data: action.data,
                showFrag: true
            }));
        case GET_INFO_FAILURE:
            const error_message = '正しい都市名を入力してください';
            return (
                //console.log('Failure!'),
                Object.assign({}, result, {
                isFetching: false,
                error: action.error,
                error_message,
                showFrag: false
            }));
        default:
            return result
    }
}

export default getInfo;