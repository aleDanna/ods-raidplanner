import Async from "react-async";
import * as React from "react";


export const AsyncComponentLoader = ({Component, asyncFn, componentProps, propFetched}) => {

    return (
        <Async promiseFn={asyncFn}>
            {({data, isLoading}) => {

                if (isLoading) {
                    //TODO change to loading component
                    return "Loading..."
                }
                if (data) {
                    console.log(data)
                    componentProps[propFetched] = data;
                    return (
                        <Component {...componentProps} />
                    )
                }
            }}
        </Async>
    )
}
