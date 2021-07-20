import styled, { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing:0;
    font-family: 'Roboto', sans-serif;
    color: #fff;
}
body{
    background: ${(props) => props.theme.MainBg};
    // overflow-x: hidden;
}
`;

export const Container = styled.div`
  width: 80%;
  margin-left: 30rem;
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
