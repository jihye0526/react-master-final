import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetNetFlixResult } from "../api";
import { makeImagePath } from "../utils";
import PopUp from "./PopUp";

const Slider = styled.div`
  position: relative;
  top: -100px;
  height: 300px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 1;
  overflow-y: scroll;
`;

const SliderTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 15px 8px;
`;

const rowVariants = {
    hidden: {
      x: window.outerWidth + 5,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 5,
    },
};

const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.3,
      y: -80,
      zIndex: 2,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
};

const offset = 6;

const infoVariants = {
    hover: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duaration: 0.1,
        type: "tween",
      },
    },
};

const ChangeRowButton = styled.button<{direction: string}>`
    ${props => props.direction === "left" ? "left: 5px" : "right: 5px"};
    position: absolute;
    height: 100px;
    border: none;
    border-radius: 50px;
    background-color: rgba(0,0,0,0);
    z-index: 1;
    color: white;
    cursor: pointer;
    font-size: 50px;
    padding: 120px 0 0 10px;
    opacity: 0;
    &:hover {
    opacity: 1;
    }
`;

interface ISlideProps {
    title: string;
    cat: string;
    data : IGetNetFlixResult;
}

export default function Slide({title, cat, data} : ISlideProps){
    const navigate = useNavigate();
    const [idx, setIdx] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (movieId:number) => { navigate(`/${cat}/${title}/${movieId}`) }; 
    const onOverlayClick = () => {navigate(`/${cat}`);}
    const bigMovieMatch = useMatch("/:cat/:title/:movieId");
    //const bigMovieMatch = useMatch<{ cat:string, title:string, movieId: string }>("/:cat/:title/:movieId");
    const [reData, setReData] = useState(data.results);
    const {scrollY} = useScroll();
    const clickedMovie = bigMovieMatch?.params.title === title && bigMovieMatch?.params.movieId && data.results?.find(movie => movie.id+"" === bigMovieMatch.params.movieId);
    let totalMovies = data?.results.length;

    useEffect(() => {
        if(title.includes("한국")) {
            const sliceData = data?.results.slice(1); // 상영 중인 영화는 배너에서 사용함
            setReData(sliceData);
            totalMovies -= 1;
        }
    }, []);

    const changeIdx = (target: string) => {
        if(data){
            if(leaving) return;
            toggleLeaving();
            
            if(target === "desc"){
                const minIdx = 0;
                setIdx(prev => (prev === minIdx ? Math.floor(totalMovies / offset) - 1 : prev -1));
            }else if(target === "incr"){
                const maxIdx = Math.floor(totalMovies / offset) - 1;
                setIdx(prev => (prev === maxIdx ? 0 : prev + 1));
            }
            
        }
    }

    return (
        <>
            <Slider>
                <ChangeRowButton direction="left" onClick={() => changeIdx("desc")}>&lt;</ChangeRowButton>
                <ChangeRowButton direction="right" onClick={() => changeIdx("incr")}>&gt;</ChangeRowButton>
                <SliderTitle>{title}</SliderTitle>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row 
                            key={idx} 
                            variants={rowVariants} 
                            initial="hidden" 
                            animate="visible" 
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                        >
                            {reData
                                .slice(offset*idx, offset*idx+offset)
                                .map((movie) => (
                                    <Box 
                                        layoutId={`${cat}/${title}/${movie.id}`}
                                        onClick={() => onBoxClicked(movie.id)}
                                        key={movie.id} 
                                        variants={boxVariants}
                                        whileHover="hover"
                                        initial="normal"
                                        transition={{ type: "tween" }}
                                        bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                                    >
                                        <Info variants={infoVariants}>
                                            <h4>{movie.title? movie.title : movie.name}</h4>
                                        </Info>
                                    </Box>
                                ))
                            }
                        </Row>
                    </AnimatePresence>
            </Slider>
            <AnimatePresence>
                {bigMovieMatch && clickedMovie ? 
                <>
                    <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Overlay>
                    <BigMovie 
                        layoutId={`${cat}/${title}/${bigMovieMatch.params.movieId}`}
                        style={{ top: scrollY.get() + 100 }}
                    >
                        {clickedMovie && (
                            <>
                                <PopUp cat={cat} clickedMovie={clickedMovie}/>
                            </>
                        )}
                    </BigMovie>
                </> : null}
            </AnimatePresence>
        </>
    );
}