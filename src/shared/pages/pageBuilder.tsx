import React from "react";

export default {
    build(title, mainComponent) {
        return PageWrapper(title, mainComponent);
    }
}

const PageWrapper = (title, component) => {
    return (<>
        {title}
        {component}
    </>)
}
