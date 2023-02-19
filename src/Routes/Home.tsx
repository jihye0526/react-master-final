import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getKoreaMoviess, getMovies, getTopMovies, getUpCommingMovies, IGetNetFlixResult } from "../api";
import Banner from "../Components/Banner";
import Slide from "../Components/Slide";

const Wrapper = styled.div`
    background: black;
    padding-bottom: 50px;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Home(){
    const useMultipleQuery = () => {
        const korea = useQuery<IGetNetFlixResult>(["korea"], getKoreaMoviess);
        const now = useQuery<IGetNetFlixResult>(["nowPlaying"], getMovies);
        const topRated = useQuery<IGetNetFlixResult>(["topRated"], getTopMovies);
        const upComming = useQuery<IGetNetFlixResult>(["upComming"], getUpCommingMovies);
      
        return [korea, now, topRated, upComming];
    };

    const [
        {data:koreaData, isLoading:koreaLoading},
        {data:nowData, isLoading:nowLoading},
        {data:topData, isLoading:topLoading},
        {data:upcomingData, isLoading:upCommingLoading}
    ] = useMultipleQuery();
    
    const isLoading = koreaLoading || nowLoading || topLoading || upCommingLoading;

    return (
        <Wrapper>
             <Helmet>
                <title>React-master-final</title>
            </Helmet>
            {isLoading? 
                <Loader>Loading...</Loader> : 
                <>
                    {koreaData ? <Banner {...koreaData?.results[0]} /> : null}
                    {koreaData ? <Slide title="한국 상영 영화" cat="movie" data={koreaData}></Slide> : null}
                    {nowData ? <Slide title="상영 중인 영화" cat="movie" data={nowData}></Slide> : null}
                    {topData ? <Slide title="무비 차트" cat="movie" data={topData}></Slide> : null}
                    {upcomingData ? <Slide title="상영 예정작" cat="movie" data={upcomingData}></Slide> : null}
                </>
            }
        </Wrapper>
    );
}

export default Home;