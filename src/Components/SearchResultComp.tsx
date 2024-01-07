import { motion } from "framer-motion";
import styled from "styled-components";
import { INetFlix } from "../api";
import { makeImagePath } from "../utils";

const NetFlix = styled.div`
    width: 200px;
    min-height: 350px;
    margin: 20px;
    justify-content: center;
`;

const Img = styled(motion.div)`
    width: 200px;
    height: 300px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-top: 10px;
`;

interface ISearchResult {
    result: INetFlix;
}

export default function SearchResultComp({result} : ISearchResult){
    return(
        <NetFlix key={result.id}>
            <Img
                whileHover={{
                    scale:1.1,
                    y: -10,
                    type: "tween",
                }}
            >
                <img src={makeImagePath(result.poster_path, "w200")} alt={`${result.title || result.title} 이미지`} style={{ width:"200px", height:"300px" }}/>
            </Img>
            <Title>{result.title || result.name}</Title>
        </NetFlix>
    );
}