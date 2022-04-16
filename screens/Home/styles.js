import styled from "styled-components";

export const HomeView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

export const ImageItem = styled.Image`
  width: 50px;
  height: 50px;
`;
export const Item = styled.View`
  width: 50px;
  height: 50px;
  background-color: #000;
`;
export const ItemName = styled.Text`
  color: #000;
`;



export const Title = styled.Text`
    font-size: 20px;
`;

export const FormInput = styled.TextInput`
  background-color: #fff;
  width: 280px;
  height: 40px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px;
`;

export const SubmitBtn = styled.TouchableOpacity`
justify-content: center;
align-items: center;
margin-top: 10px;
width: 280px;
  height: 40px;
  border-radius: 5px;

background-color: orange;
`;
export const TxtBtn = styled.Text`
color: black;   
`;

export const CadastrarBtn = styled.TouchableOpacity`
justify-content: center;
align-items: center;
margin-top: 10px;
width: 280px;
  height: 40px;
  border-radius: 5px;
border:1px solid gray;
`;




export const ErrorText = styled.Text`
color: #870000;
`;
