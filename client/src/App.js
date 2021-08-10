import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
function App() {
  const [movieName, setMovieName] = useState('')
  const [movieReview, setMovieReview] = useState('')
  const [movieLists, setMovieLists] = useState([])


  const [newReview, setNewReview] = useState("");
  const submitReview = () => {
    axios.post('http://localhost:3001/api/insert',
      {
        movieName: movieName,
        movieReview: movieReview
      }).then((e) => {
        setMovieName("");
        setMovieReview("")
        console.log("Data inserted")
        setMovieLists([...movieLists, { movieName: movieName, movieReview: movieReview }])
      });
    // console.log(insertData)
    // if (insertData) {
    console.log("Successfully Inserted!!")
    // }

  }

  // Delete Review
  const deleteReview = (movie) => {
    console.log(movieName)
    axios.delete(`http://localhost:3001/api/delete/${movie}`)
      .then((e) => {
        console.log("Data Deleted!!")
      })
  }
  const updateReview = (movie) => {
    axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview
    })
    setNewReview("");
  }

  // Update review


  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieLists(response.data)
    }).then(() => {
      console.log("Data fetched")
    })
  }, [])
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Movie Name: </label>
        <input value={movieName} type="text" name="movieName" onChange={(e) => {
          setMovieName(e.target.value)
        }} />
        <label>Movie Review: </label>
        <input value={movieReview} type="text" name="review" onChange={(e) => {
          setMovieReview(e.target.value)
        }} />
        <button onClick={submitReview}>Submit</button>
      </div>
      {
        movieLists.map((value, index) => {
          return (
            <div key={index} className="card" >
              <h1>{value.movie}</h1>
              <p>{value.review}</p>
              <button className="delete" onClick={() => deleteReview(value.movie)}>Delete</button>
              <input type="text" className="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              }} />
              <button className="update" onClick={() => updateReview(value.movie)}>Update</button>
            </div>
          )
        })
      }
    </div>

  );
}

export default App;
