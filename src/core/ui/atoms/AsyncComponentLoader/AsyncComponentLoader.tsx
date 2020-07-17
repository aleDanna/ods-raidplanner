import Async from 'react-async';
import * as React from 'react';
import { Loading } from '../Loading/Loading';

export const AsyncComponentLoader = ({ Component, asyncFn, componentProps, propFetched }) => {
  return (
    <Async promiseFn={asyncFn}>
      {({ data, isLoading }) => {
        if (isLoading) {
          return <Loading />;
        }
        if (data) {
          componentProps[propFetched] = data;
          return <Component {...componentProps} />;
        }
        return;
      }}
    </Async>
  );
};
