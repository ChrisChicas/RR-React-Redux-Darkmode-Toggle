import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectId: 34,
    apiData: {}
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            return {objectId: state.objectId, apiData: action.payload}
        },
        clearData: () => {
            return initialState
        },
        incrementData: state => {
            return {objectId: state.objectId + 1, apiData: state.apiData}
        },
        decrementData: state => {
            return {objectId: state.objectId - 1, apiData: state.apiData}
        },
        inputData: (state, action) => {
            return {objectId: action.payload, apiData: state.apiData}
        }
        

    }
})

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const jsonData = await response.json()
        dispatch(setData(jsonData))
    }
    return fetchDataThunk
}

export const {setData, clearData, incrementData, decrementData, inputData} = dataSlice.actions

export default dataSlice.reducer