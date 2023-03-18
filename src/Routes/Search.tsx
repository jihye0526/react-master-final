import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, getSearchTvs, IGetNetFlixResult } from "../api";
import { makeImagePath } from "../utils";

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-itmes: center;
`;

const SearchResult = styled.div`
    height: 40vh;
    display: flex;
    justify-content: center;
    padding-top: 150px;
    font-size: 30px;
    font-weight: 600;
`;

const NetFlixResult = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 0 calc(8% + 5px);
`;

const NetFlix = styled.div`
    width: 200px;
    min-height: 350px;
    margin: 20px;
    justify-content: center;
`;

const Img = styled.div`
    width: 200px;
    height: 300px;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-top: 10px;
`;

const Section = styled.div`
    margin-bottom: 30px;
    min-height: 300px;
`;

const ResultCnt = styled.div`
    font-size: 24px;
    font-weight: 600;
    padding: 0 calc(10% - 15px);
`;

function Search(){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    
    const useMultipleQuery = () => {
        console.log("keyword", keyword)
        const movies = useQuery<IGetNetFlixResult>(["search", "searchMovie"], () => getSearchMovies(keyword || ""));
        const tvs = useQuery<IGetNetFlixResult>(["search", "searchTv"], () => getSearchTvs(keyword || ""));
      
        return [movies, tvs];
    };

    const [
        {data:srchMovieData, isLoading:movieLoading},
        {data:srchTvData, isLoading:tvLoading},
    ] = useMultipleQuery();
    
    const isLoading = movieLoading || tvLoading;
    let totalResult = (!srchMovieData?.total_results ? 0 : srchMovieData?.total_results) + (!srchTvData?.total_results ? 0 : srchTvData?.total_results);

    useEffect(() => {
        if(srchMovieData !== undefined && srchTvData !== undefined){
            totalResult = srchMovieData?.total_results + srchMovieData?.total_results;
        }
        
    }, [keyword]);

    return (
        <div>
            {isLoading ?
                <SearchResult>잠시만 기다려주세요...</SearchResult> : 
                <div>
                    <SearchResult>'{keyword}'를 포함하는 결과가 {totalResult}개 검색 되었습니다</SearchResult>

                    <Section>
                        <ResultCnt>영화({srchMovieData?.total_results}건)</ResultCnt>
                        <NetFlixResult>
                            {srchMovieData?.results.map((movie) => 
                                <NetFlix key={movie.id}>
                                    <Img>
                                        <img src={makeImagePath(movie.poster_path, "w200")} alt={`${movie.title} 영화 포스터 이미지`} style={{ width:"200px", height:"300px" }}/>
                                    </Img>
                                    <Title>{movie.title}</Title>
                                </NetFlix>
                                
                            )}
                        </NetFlixResult>
                    </Section>
                    
                    <Section>
                        <ResultCnt>TV 프로그램({srchTvData?.total_results}건)</ResultCnt>
                        <NetFlixResult>
                            {srchTvData?.results.map((movie) => 
                                <NetFlix key={movie.id}>
                                    <Img>
                                        <img src={makeImagePath(movie.poster_path, "w200")} alt={`${movie.name} TV 프로그램 이미지`} style={{ width:"200px", height:"300px" }}/>
                                    </Img>
                                    <Title>{movie.name}</Title>
                                </NetFlix>
                                
                            )}
                        </NetFlixResult>
                    </Section>
                </div>
            }
        </div>
    );
}

export default Search;