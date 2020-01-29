import React from "react";
import { useTheme } from "./ThemeContext";
import styled from "@emotion/styled-base";

const ClickArea = styled("div")`
  cursor: pointer;
`;

export const ThemeSwitcherEmoji = props => {
  const themeState = useTheme();

  const lightningLabel = themeState.dark
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
  return (
    <ClickArea onClick={() => themeState.toggle()}>
      <span role="img" title={lightningLabel} aria-label={lightningLabel}>
        {props.emoji}
      </span>
    </ClickArea>
  );
};
