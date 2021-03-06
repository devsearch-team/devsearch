import styled, { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`
*{
  // overflow-x: hidden !important;
    padding: 0;
    margin: 0;
    box-sizing:border-box;
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
export const Label = styled.label`
  font-size: 24px;
  width: 106px;
  margin: 0.5rem;
  @media only screen and (max-width: 800px) {
    width: 62px;
    font-size: 14px;
  }
`;
export const ErrorMessage = styled.div`
  color: red;
  @media only screen and (max-width: 800px) {
    font-size: 12px;
  }
`;
export const theme = {
  // Background Colors
  NavBg: "#242E38",
  MainBg: "#424B53",
  accentBg: "#74808C",
  // Tab's & Selected Button Colors
  PrimaryBtnBg: "rgb(247, 177, 62)",
  DisabledPrimaryBtnBg: "rgba(247, 177, 62, 0.85)",
  SecondaryBtnBg: "#E4E4E4",
  TransparentBtnBg: "transparent",
  // TextColors
  PrimaryTxt: "#FFFFFF",
  SecondaryTxt: "#000000",
  FadedTxt: "#AEAEAE",
  SecondaryFadedTxt: " #ececec",
  // Accents
  Accent: "#A1DED3",
};
