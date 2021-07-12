import React, {createContext,useContext} from "react";

import { useGlobalReducer } from "./reducers";

const GlobalContext=  createContext();
const {Provider} = GlobalContext;

const GlobalProvider  = ({value = [],...props})=>{
    const [state,dispatch] = useGlobalReducer({
        skeetStations: [[false,false,false,false],[false,false,false,false],[false,false],[false,false],[false,false],[false,false,false,false],[false,false,false,false],[false,false],[false]],
        trapStations:[[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false]]
    })
    return <Provider value={[state,dispatch]}{...props}/>;
}


const useGlobalContext = () => useContext(GlobalContext);

export {GlobalProvider,useGlobalContext};