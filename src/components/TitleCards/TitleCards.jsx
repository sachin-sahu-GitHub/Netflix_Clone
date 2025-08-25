import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom';



const TitleCards = ({title,category}) => {
  // if scroll of mouse does not work then place it 
  const cardsRef = useRef();
  const [apiData,setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGY0OTI2Zjg0OTJhZjZiMmFiNTIwZjk0NDg3MmUyMyIsIm5iZiI6MTc1NjA5NDI0My40ODYsInN1YiI6IjY4YWJkZjIzNDFhMDFjZjU5ZThkMjM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6nYfpo8Jb2IlKnZ8yBSTBdLg3q0ncbGInlFFJqmzYLk'
    }
  };



  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    
    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list"  ref={cardsRef} >
        {
          apiData.map((card,index)=>{
              return <Link to={`/player/${card.id}`} className="card">
                <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
              </Link>
          })
        }
      </div>
    </div>
  )
}

export default TitleCards
