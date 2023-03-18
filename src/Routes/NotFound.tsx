import styled from "styled-components";

const ErrorPageMsg = styled.div`
    font-size: 40px;
    text-align: center;
    margin-top: 25%;
`;

export default function NotFound(){
    return(
        <ErrorPageMsg>페이지를 찾지 못했습니다🥲</ErrorPageMsg>
    )
}