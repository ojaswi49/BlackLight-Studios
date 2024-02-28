const express = require("express");
const cors = require('cors');

const {sql} = require('./db');

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 8000;
  

app.get('/get-leaderboard', async (req, res) => {
    // Get the current week's leaderboard (Top 200)
    try
    {
      const results = await sql({
        query : "SELECT * FROM `project` WHERE YEAR(timestamp) = YEAR(CURDATE()) AND WEEK(timestamp) = WEEK(CURDATE()) ORDER BY score DESC LIMIT 200"
        });
      const leaderboard = results.map(row => ({
        UID: row.UID,
          Name: row.name,
          Score: row.score,
          Country: row.country,
          TimeStamp: row.timestamp
        }));
      res.status(201).json({result: leaderboard});
            }
    catch(e){
        console.log(e);
        res.status(500).json({message : "Server Error"});
    }
});

app.get('/leaderboard-by-country', async (req, res) => {
  try
  {
      const country = req.query.country;
      console.log(country);
      if (!country) {
      res.status(400).json({ error: 'Country parameter is required' });
      return;
      }
      const results = await sql({
        query : `
          SELECT *
          FROM project
          WHERE YEAR(timestamp) = YEAR(CURDATE() - INTERVAL 1 WEEK)
          AND WEEK(timestamp) = WEEK(CURDATE() - INTERVAL 1 WEEK)
          AND country = ?
          ORDER BY score DESC
          LIMIT 200`,
          values : [country]
        });
        const leaderboard = results.map(row => ({
          Name: row.name,
          Score: row.score,
          Country: row.country,
          TimeStamp: row.timestamp
        }));
      res.status(201).json({leaderboard: leaderboard});
      }
  catch(e){
      console.log(e);
      res.status(500).json({message: "Server Error"});
  }
});
app.get('/user-rank', async (req, res) => {
  try {
    const userId  = req.query.userId;
    const result = await sql({
      query : `SELECT name, 
              (SELECT COUNT(DISTINCT score) 
              FROM project AS p2 
              WHERE p2.score > p1.score) AS rank
              FROM project AS p1
              WHERE name = ? OR uid = ?`,
      values : [userId,userId]
    });
    
    const rankRow = result.find(row => row.name === userId);
    const rank = rankRow?rankRow.rank:null;
    res.status(200).json({ rank });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
