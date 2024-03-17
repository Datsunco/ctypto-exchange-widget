import { combineReducers, configureStore } from "@reduxjs/toolkit"
import exchangeSlicer from "./Slicers/exchangeSlicer"

const rootReducer = combineReducers({
    exchangeSlicer
})

export const setUpStore = () =>{
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setUpStore>
export type AppDispatch = AppStore['dispatch']