import { useReducer } from "react";
import { TOGGLE_SKEET_HIT,TOGGLE_TRAP_HIT,RESET_TRAP,RESET_SKEET } from "./actions";
import { newStationScore } from "./helper";
export default function reducer(state,action){
    switch(action.type){
        case TOGGLE_SKEET_HIT:
            return{
                ...state,
                skeetStations: newStationScore(state.skeetStations,action.payload.station,action.payload.target)
            }

        case TOGGLE_TRAP_HIT:
            return{
                ...state,
                trapStations: newStationScore(state.trapStations,action.payload.station,action.payload.target)
            }
        case RESET_TRAP:
            return {
                ...state,
                trapStations:[[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]]
            } 
        case RESET_SKEET:
            return {
                ...state,
                skeetStations:[[false,false,false,false],[false,false,false,false],[false,false],[false,false],[false,false],[false,false,false,false],[false,false,false,false],[false,false],[false]]
            } 
    }
}


export function useGlobalReducer(initialState){
    return useReducer(reducer,initialState);
}