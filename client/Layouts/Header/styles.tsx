import styled from "@emotion/styled";
import { desktop, mobile, tablet, tablet_landscape } from "Utils/styles";

export const HeaderWrapper = styled.div`
  z-index: 100;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  height: 80px;
  background: white;
  border-bottom: 1px solid #d6d6d6;
  padding: 0 10%;
  ${mobile} {
    height: 60px;
    padding: 0 5%;
  }
`;

export const HeaderTitle = styled.span`
  font-size: 25px;
  font-weight: 600;
  background: linear-gradient(to right top, #c16171, #fc96a5);
  color: transparent;
  -webkit-background-clip: text;
  cursor: pointer;
`;

export const DesktopItems = styled.div`
  display: none;
  ${desktop} {
    display: flex;
  }
`;

export const OtherItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  border-radius: 4px;
  &:hover {
    background: #f5f5f5;
    /* color: #fc96a5; */
  }
	${desktop} {
		padding: 10px 15px;
	}
`;

export const RequestLength = styled.span`
	background : #fc96a5;
	color : white;
	border-radius : 100%;
	width : 20px;
	height : 20px;
	font-size : 12px;
	margin-left : 5px;
	display : flex;
	justify-content : center;
	align-items : center;
`

export const MessageItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 4px;
  &:hover {
    background: #f5f5f5;
    /* color: #fc96a5; */
  }
`;

export const MobileMenu = styled.div`
  ${desktop} {
    display: none;
  }
  button {
    border: none;
    background: none;
  }
`;
