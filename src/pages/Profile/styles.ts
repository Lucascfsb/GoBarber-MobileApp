import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150: 40}px;
  position: relative;
  
`
export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`

export const BackButton = styled.TouchableOpacity`
  top: 72px;
  margin-top: 20px;
  width: 35px;
  height: 35px;
  margin-bottom: 26px;
  justify-content: center;
`

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 50px;  
  align-self: center;
`

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  margin-top: 20px;
  border-radius: 98px;
  align-self: center;
`