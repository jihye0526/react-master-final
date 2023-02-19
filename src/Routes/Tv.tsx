import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTvs, getKoreaTvs, getPopularTvs, getTopTvs, IGetNetFlixResult } from "../api";
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

function Tv(){
    const {data:koreaData, isLoading:koreaLoading} = useQuery<IGetNetFlixResult>(["tvs", "korea"], getKoreaTvs);
    const {data:popData, isLoading:popLoading} = useQuery<IGetNetFlixResult>(["tvs", "popular"], getPopularTvs);
    const {data:airingData, isLoading:airingLoading} = useQuery<IGetNetFlixResult>(["tvs", "airingToday,"], getAiringTvs);
    const {data:topData, isLoading:topLoading} = useQuery<IGetNetFlixResult>(["tvs", "topRated"], getTopTvs);
    const isLoading = koreaLoading || popLoading || airingLoading || topLoading;
    
    return (
        <Wrapper>
            {isLoading? 
                <Loader>Loading...</Loader> : 
                <>
                    {koreaData ? <Banner {...koreaData?.results[0]} /> : null}
                    {koreaData ? <Slide title="한국 방영 프로그램" cat="tv" data={koreaData}></Slide> : null}
                    {popData ? <Slide title="인기 프로그램" cat="tv" data={popData}></Slide> : null}
                    {airingData ? <Slide title="오늘 방영 프로그램" cat="tv" data={airingData}></Slide> : null}
                    {topData ? <Slide title="평점 높은 그로그램" cat="tv" data={topData}></Slide> : null}
                </>
            }
        </Wrapper>
    );
}

export default Tv;