import Async from "react-async";
import * as React from "react";
import {Loading} from "@shared/components/Loading/Loading";


export const AsyncComponentLoader = ({Component, asyncFn, componentProps, propFetched}) => {

    return (
        <Async promiseFn={asyncFn}>
            {({data, isLoading}) => {

                if (isLoading) {
                    //TODO change to loading component
                    return (<Loading />)
                }
                if (data) {
                    componentProps[propFetched] = data;
                    return (
                        <Component {...componentProps} />
                    )
                }
            }}
        </Async>
    )
}
