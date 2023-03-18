import styled from "styled-components";

const ErrorComponentMsg = styled.div`
    font-size: 40px;
    text-align: center;
    margin-top: 25%;
`;

export default function ErrorComponent(){
    return(
        <ErrorComponentMsg>❌에러가 발생했습니다❌</ErrorComponentMsg>
    );
}