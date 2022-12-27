import React, { useEffect, useState } from 'react'
import { useAsync } from './useAsync';
import { api, makeRequest } from './MakeRequest';


type params = {
    number:number
}
const getPost = async(id:number) => {
    return fetch('http://localhost:5000/test')
}
interface Test extends params {
    loading:boolean;
    error:any;
    value:any;

}

export const SimpleUseCase: React.FC = ({}) => {
    let id:number = 1;
    const [state,setState] = useState<Test>({
        number:0,
        error:{},
        value:{},
        loading:false
    })
    // const { loading, error, value:post } = useAsync(() => getPost(state.number), [state.number])

    const load = async() => {
        const data = await makeRequest<string>("/test", {
            method:"GET"
        });
        console.log(data)
    }

    useEffect(() => {
        // console.log(load())
        load()
    },[])

    // useEffect(() => {
        
    //     setState(prev => ({...prev, loading:true}))
    //     getPost(state.number)
    //     .then(res => {
    //         setState(prev => ({...prev, value:res, error:null}))
    //     })
    //     .catch(err => {
    //         setState(prev => ({...prev, value:null, error:err}))
    //     })
    //     // .finally(() => {
    //     //     setState(prev => ({...prev, loading:false}))
    //     // })
        


    // }, [state.number])
    
    // console.log(`THIS IS VALUE =>`,post);
    // console.log(`THIS IS Error => ${error}`);
    // console.log(`THIS IS Loading => ${loading}`);
    // console.log("hello")
    return (
    <>
    <button
    onClick={() => setState(prev => ({...prev, number:prev.number+1}))}
    >
        hello
    </button>
    </>
);
}