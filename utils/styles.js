import styled from "styled-components";

export const Colors = {
  black: "#000",
  white: "#ffffff",
  gold: "#C6C3A2",
  pink: "#F9E8FF",
  gray: "#707070",
  lighterGray: "#f5f7f9",
  lightBorder: "#e2e2e2",
  blackishBlue: "#353765",
  lightBlue: "#1e86ff",
  pinkishRed: "#f23e75",
  bg: "#f5f7f9",
};

export const StyledSemiButton = styled.TouchableOpacity`
  border: 1px;
  width: 100px;
  border-radius: 30px;
  height: 50px;
  width :150px;
  justify-content:center
  border-color: ${Colors.gray}
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: ${Colors.black};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  height: 42px;
  width: 80%;
  align-self: center;
`;

export const StyledButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-family: Regular;
`;

export const StyledTextInput = styled.TextInput`
  padding: 15px;
  padding-left: 50px;
  border-radius: 5px;
  font-size: 16px;
  height: 49px;
  width: 80%;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 17px;
  color: ${Colors.black};
  background-color: ${Colors.lighterGray};
  font-family: Medium;
`;

export const LeftIcon = styled.TouchableOpacity`
  left: 55px;
  top: 43px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 55px;
  top: 45px;
  position: absolute;
  z-index: 1;
`;
