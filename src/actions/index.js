import axios from 'axios'
import appKey from '.../sample/sample.txt'

export const GET_INFO_REQUEST = 'GET_INFO_REQUEST'
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS'
export const GET_INFO_FAILURE = 'GET_INFO_FAILURE'

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?APPID='

export const getInfoRequest = () => {
    return {
        type: GET_INFO_REQUEST
    }
}

export const getInfoSuccess = (data) => {
    return {
        type: GET_INFO_SUCCESS,
        data
    }
}

export const getInfoFailure = (error) => {
    return {
        type: GET_INFO_FAILURE,
        error
    }
}

export const getInfo = (value) => {
    return async (dispatch) => {
        dispatch(getInfoRequest(value))
        return await axios.get(`${weatherUrl}${appKey}&q=${value}`)
            .then(response =>
                dispatch(getInfoSuccess(response.data))
            ).catch(error =>
                dispatch(getInfoFailure(error))
            )
    }
}