import { useCallback, useEffect, useState } from "react";

type CallbackFunctionVariadic = (...args: any[]) => any;

type Result<T> = {
    loading:boolean, error:any, value: T | any, execute:any
};

export const useAsync = (func:CallbackFunctionVariadic | any, dependencies:Array<any> = []) => {
    const {execute, ...state} = useAsyncInternal(func, dependencies, true);
    
    useEffect(() => {
        execute()
    }, [execute])

    return state;
}

export  function useAsyncFn ( func:CallbackFunctionVariadic | any, dependencies:Array<any> = [] ) {
    return useAsyncInternal(func, dependencies, false);
}

type Test = {
    loading:boolean;
    error:any;
    value:any;
}

function useAsyncInternal 
     ( func: CallbackFunctionVariadic, dependencies?: Array<any>, initailLoading:boolean = false ) {

    const [state,setState] = useState<Test>({
        loading:initailLoading,
        error:{},
        value:{}
    })
    const {loading, error,value} = state;
    
    // const [loading,setLoading] = useState<boolean>(initailLoading);
    // const [error,setError] = useState<any>();
    // const [value,setValue] = useState<any>();
    
    const execute:(...params: any[]) => any = useCallback(async(...params:any[]) => {
        setState(prev => ({...prev,loading:true}))
        // console.log(func(...params))
        return await func(...params).then((data:any) => {
            setState(prev => ({...prev,value:data, error:undefined}))
            return data;
            
        })
        .catch((err:any) => {
            setState(prev => ({...prev,value:undefined, error:err}))
            return Promise.reject(err);
        })
        .finally(() => {
            setState(prev => ({...prev,loading:false}))
        });
    }, dependencies || [])

    return {loading, error, value, execute};
}