import * as React from "react";
import {hydrate} from "react-dom";
import {Raids} from "../../components/Raids/Raids";

export default () => {
    console.log("hydrating page!!!");
// @ts-ignore
    hydrate(Raids, document.getElementById("content"));
}