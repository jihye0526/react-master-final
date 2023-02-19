import styled from "styled-components";
import { INetFlix } from "../api";
import { makeImagePath } from "../utils";

const BannerComponent = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  line-height: 35px;
`;

export default function Banner(data : INetFlix){
    return(
        <BannerComponent bgPhoto={makeImagePath(data?.backdrop_path || "")}>
            <Title>{data?.title ? data?.title : data?.name}</Title>
            <Overview>{data?.overview}</Overview>
        </BannerComponent>
    );
}