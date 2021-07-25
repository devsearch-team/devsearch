import styled, { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`
*{
  overflow-X: hidden;
    padding: 0;
    margin: 0;
    box-sizing:0;
    font-family: 'Roboto', sans-serif;
    color: #fff;
}
body{
    background: ${(props) => props.theme.MainBg};
}
`;

export const Container = styled.div`
  width: 100vw;
  display:grid;
  grid-template-columns"0.5fr 3.5fr";
  grid-areas:
  "navbar navbar"
  "sidebar content";
`;
export const MiddleContainer = styled.div`
  display: flex;
  height: 90vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap-reverse;
`;

export const theme = {
  // Background Colors
  NavBg: "#242E38",
  MainBg: "#424B53",
  accentBg: "#74808C",
  // Tab's & Selected Button Colors
  PrimaryBtnBg: "#F7B13E",
  SecondaryBtnBg: "#E4E4E4",
  // TextColors
  PrimaryTxt: "#FFFFFF",
  SecondaryTxt: "#000000",
  FadedTxt: "#AEAEAE",
  // Accents
  Accent: "#A1DED3",
};
