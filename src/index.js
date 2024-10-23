import react, { useEffect } from 'react';
import dom from "react-dom/client"
import Movie from "./movies"
import "./index.css";

function Main() 
{
    const key = ""; // Your API key here

    const [search, setSearch] = react.useState("");
    const [movies, setMovies] = react.useState([]);
    const [movie, setMovie] = react.useState({});

    const searchMovies = async () => 
    {
        document.getElementById('movies').style.display = '';
        document.getElementById('details').style.display = 'none';
        const url = `http://www.omdbapi.com/?apikey=${key}&s=${search}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); 
        if(data.Response == "True"){setMovies(data.Search)}
        else{alert("Movie not found!")}
    }

    const getMovie = async (id) =>
    {
        document.getElementById('movies').style.display = 'none';
        document.getElementById('details').style.display = '';
        const url = `http://www.omdbapi.com/?apikey=${key}&i=${id}&plot=full`;
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
    }

    return (
        <main className='bg-gray-900 h-screen'>
            <div className="flex h-1/4 justify-center items-center">
                <input onKeyDown={i =>{if(i.key == "Enter"){searchMovies()}}} type="text" placeholder="Search movies..." onInput={e =>setSearch(e.target.value)} className="h-20 p-4 focus:outline-0 text-4xl" />
                <button className="bg-yellow-500 text-4xl w-48 h-20" onClick={searchMovies}>Search</button>
            </div>
            <div id='movies' className='flex flex-row gap-5 h-3/4 px-5 w-full flex-wrap box-border justify-center'>
                {movies.map(i =>{return <img src={i.Poster} alt={i.Title} onClick={() =>{getMovie(i.imdbID)}} className='h-img border-yellow-500 cursor-pointer hover:border-8 object-cover box-content text-black bg-yellow-500 text-center text-1xl'/>})}
            </div>
            <div id='details' className='flex gap-5 flex-row p-5 h-3/4' style={{display: 'none'}}>
                <img className='h-full' src={movie.Poster} />
                <div className='flex flex-col gap-y-2 flex-grow'>
                    <h1 className='text-yellow-500 text-5xl'>{movie.Title}</h1>
                    <h5 className='text-gray-500 text-2xl'>{movie.Type} · {movie.Year} · {movie.Rated} · {movie.Runtime}</h5>
                    <hr className='border-yellow-500 w-full'/>
                    <h3 className='text-xl text-white'>{movie.Plot}</h3>
                    <p className='text-white'><span className='text-yellow-500'>Genres: </span>{movie.Genre}</p>
                    <p className='text-white'><span className='text-yellow-500'>Released: </span>{movie.Released}</p>
                    <p className='text-white'><span className='text-yellow-500'>Actors: </span>{movie.Actors}</p>
                    <p className='text-white'><span className='text-yellow-500'>Director: </span>{movie.Director}</p>
                    <p className='text-white'><span className='text-yellow-500'>Writer: </span>{movie.Writer}</p>
                    <p className='text-white'><span className='text-yellow-500'>Languages: </span>{movie.Language}</p>
                    <p className='text-white'><span className='text-yellow-500'>Country of origin: </span>{movie.Language}</p>
                    <p className='text-white'><span className='text-yellow-500'>Awards: </span>{movie.Awards}</p>
                    <p className='text-white'><span className='text-yellow-500'>Metascore: </span>{movie.Metascore}</p>
                    <p className='text-white'><span className='text-yellow-500'>imdbRating: </span>{movie.imdbRating}</p>
                    <p className='text-white'><span className='text-yellow-500'>imdbVotes: </span>{movie.imdbVotes}</p>
                    <p className='text-white'><span className='text-yellow-500'>Number of seasons: </span>{movie.totalSeasons}</p>
                </div>
            </div>
        </main>
    );
}

const root = dom.createRoot(document.getElementById("root"));
root.render(<Main/>);

// 183822ac