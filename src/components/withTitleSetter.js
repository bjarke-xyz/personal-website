import React from "react";

const baseTitle = "| Bjarke Tobiesen";

const setTitle = title => {
  document.title = `${title} ${baseTitle}`;
};

export const withTitleSetter = (WrappedComponent, title) => {
  return props => {
    setTitle(title);
    return <WrappedComponent {...props} />;
  };
};
