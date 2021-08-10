const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
require('dotenv').config()
const mysql = require('mysql')
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.get("/", (req, res) => {
//     // const sqlInsert = "SELECT * FROM movie_reviews;"
//     // const inserQuery = "INSERT INTO movie_reviews (movie,review) VALUES ('F9', 'Outstanding movie');"
//     // db.query(inserQuery, (err, result) => {
//     //     if (err) console.log(err)
//     //     else res.send("Added Success")
//     // })
//     // // res.send("Hello Jyoti")
// })

app.get('/api/get', (req, res) => {
    const sqlSelectQuery = "SELECT * FROM movie_reviews;"

    db.query(sqlSelectQuery, (err, result) => {
        res.send(result)
    })

})

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const insertQuery = "INSERT INTO movie_reviews (movie,review) VALUES (?, ?);"
    db.query(insertQuery, [movieName, movieReview], (err, result) => {
        console.log(result)
    })
})

// API For Update data

app.put("/api/update", (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    console.log(movieName);
    const updateQuery = "UPDATE movie_reviews SET review=? WHERE movie=?;"
    db.query(updateQuery, [movieReview, movieName], (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
})

app.delete("/api/delete/:movieName", (req, res) => {
    const movieName = req.params.movieName;
    console.log(movieName);
    const deleteQuery = "DELETE FROM movie_reviews WHERE movie=?;"
    db.query(deleteQuery, movieName, (err, result) => {
        if (err) console.log(err)
        console.log(result)
    })
})

app.listen(3001, () => {
    console.log("Running at 3001")
})