import {createContext, useState} from 'react'

export let CounterContext = createContext(0);

export default function CounterContextProvider(props){
    const [counter,setCounter] = useState(0)
    const [userName,setUserName] = useState("yousef")

    function Increment(){
        setCounter(counter+1)
    }
    function Decrement(){
        setCounter(counter-1)
    }


    return <>
    
    <CounterContext.Provider value={{counter,userName,Increment,Decrement}}>
    {props.children}
    </CounterContext.Provider>
    </>
}