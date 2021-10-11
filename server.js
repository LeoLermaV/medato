const express = require('express')
const app = express()
var cors = require('cors')
const port = 3030
app.use(cors())
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "mxomhurmgagatr",
  host: "ec2-52-207-47-210.compute-1.amazonaws.com",
  database: "dbikmoqika4vmf",
  password: "bb777038b9eb02f0d7144f868eb7ade52b62693cbe936d8186f1ac613a4ec14d",
  port: 5432,
  onnectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})


app.use(express.json())

app.get('/', (req, res) => {
  pool.query(
    "select cataratas from pages;", (err, res) => {
      if (err){
        console.log(err.stack)
      }else {
        console.log(res.rows[0]);
      }
    }
  )
  res.send('Hello World! lol')
})

app.get( "/content", (req, res) => {
  pool.query(
    "SELECT * FROM pages", (error, result) => {
      if (error){
        console.log(error.stack)
      }else {
        res.send(result.rows[0])
        console.log(result.rows[0]);
      }
    }
  )
}

)




app.post("/edit", (req, res)  => {
  const pageToedit = req.body.pageToedit;
  const editedtext = req.body.editedtext;

  pool.query(
    `UPDATE public.pages SET ${pageToedit}='${editedtext}'`, (error, result) => {
      if(error){
        console.log(error.stack)
      }else {
        console.log(`this is the ${result}`)
        res.send('cool')
      }
    }
  )
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



