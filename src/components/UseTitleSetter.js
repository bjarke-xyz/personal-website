import React, { useEffect } from "react";

const baseTitle = "| Bjarke Tobiesen";

export const UseTitleSetter = props => {
  useEffect(() => {
    document.title = `${props.title} ${baseTitle}`;
  });

  return props.component;
};
