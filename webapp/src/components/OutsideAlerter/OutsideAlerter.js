/* 
  OutsideAlerter is a component that wraps another component. 
  If the user clicks outside of the wrapped component, this component fires. 
*/
import React, { useRef, useEffect } from "react";

const useOutsideAlerter = (ref, props) => {
  //if clicked on outside of element
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (props.removeResults !== undefined && props.showResult) {
        return props.removeResults(false) //remove the results in the dropdown
      }
      if (props.show) //dropdown is showing
        return props.setShowDropDown(false);//hide dropdown
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {//on clean up, unbind the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

//Component that activates if you click outside of it
const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);

  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideAlerter;