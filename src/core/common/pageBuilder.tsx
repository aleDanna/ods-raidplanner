import React from 'react';

export default {
  build(title: any, mainComponent: any) {
    return PageWrapper(title, mainComponent);
  }
};

const PageWrapper = (title: any, component: any) => {
  return (
    <>
      {title}
      {component}
    </>
  );
};
