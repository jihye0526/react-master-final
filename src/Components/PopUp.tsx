import { useQuery } from "react-query";
import YouTube from "react-youtube";
import styled from "styled-components";
import { getGenreMovies, getGenreTvs, getVideo, IGenreResult, INetFlix } from "../api";
import { makeImagePath } from "../utils";
import StarRatings from "react-star-ratings";

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 450px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 32px;
  position: relative;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  line-height: 30px;
  color: ${(props) => props.theme.white.lighter};
`;

const Genre = styled.span`
  font-weight: 500;
  font-size: 15px;
  position: absolute;
  right: 20px;
`;

interface IPopUp {
    cat: string;
    clickedMovie : INetFlix;
}

export default function PopUp(data : IPopUp){
    const {data:videoData} = useQuery(["video"], () => getVideo(data.cat, data.clickedMovie.id));
    const {data:movieGData} = useQuery<IGenreResult>(["movieGenre"], getGenreMovies);
    const grade = data.clickedMovie.vote_average/2;

    return(
            <>
                {videoData?.results.length === 0? 
                    <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(data.clickedMovie.backdrop_path)})` }}/> :
                    <BigCover>
                    <YouTube
                        videoId={videoData?.results[0].key}
                        opts={{
                            width: "100%",
                            height: "450",
                            playerVars: {
                                autoplay: 1, 
                                rel: 0, 
                                modestbranding: 1, 
                            }
                        }}
                        onEnd={(e)=>{e.target.stopVideo(0);}}      
                        />
                </BigCover>
                }
                <BigTitle>
                  <span style={{ display: "inline-block", marginBottom: "20px" }}>
                    <span style={{display: "flex"}}>{data.clickedMovie.title? data.clickedMovie.title : data.clickedMovie.name}</span>
                    <span style={{ position:"absolute", right: "20px", fontSize: "23px" }}>
                      <StarRatings
                        rating={grade}
                        starRatedColor="#F4CD1E"
                        starDimension="30px"
                        starSpacing="1px"
                      /> / {grade}점</span>
                  </span>
                  
                </BigTitle>
                <BigOverview>
                    {data.clickedMovie.overview ? data.clickedMovie.overview :
                      <>
                        <Genre>장르 : 
                          {data.clickedMovie.genre_ids.map((id) => 
                            <span key={id}>
                              {movieGData?.genres.map((genre) => id === genre.id ? 
                                <span key={genre.name}> {genre.name} </span> : 
                                null)} 
                            </span>
                          )}
                        </Genre>
                      </>
                    }
                </BigOverview>
            </>
    );
}