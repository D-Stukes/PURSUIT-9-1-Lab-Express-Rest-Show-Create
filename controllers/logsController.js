//DEPENDENCIES
const express = require("express")
const logs = express.Router()
const logsData = require('../models/log.js')
const { validateURL } = require('../models/validations.js')

//ROUTES

//GET ROUTE FOR /logs (app.use (middleware  in app.js that has acccess to req.body helps handle to access to the logsData)
logs.get('/',(req, res) => {
    res.json(logsData)
}) 

//SHOW ROUTE Endpoint - display one log based on index param in the url
logs.get('/:index', (req, res) => {
    const {index} = req.params
    if(logsData[index]){
        res.status(200).json(logsData[index])
    } else {
        // res.status(404).json({error: "Not Found"})
        res.redirect("/*") 
    }
})

//POST ROUTE Endpoint (create a new log and add it to the array of data - logsData)
logs.post("/", validateURL,(req, res)=> {
  logsData.push(req.body)
  res.json(logsData.at(-1))
}) //the method .at(-1) is used in lieu of array.length-1
    


//PUT ROUTE endpoint - update one log based on the index param inputtted in the url using this path.
//  For the HTTP Put verb,  the entire req body must be included, else whatever is missing will be replace the existing data, causing it to be deleted.  PATCH allows partial updates
logs.put("/:index", (req,res) => {
    const {index} = req.params
    if(logsData[index]){
        logsData[index] = req.body
        res.status(200).json(logsData[req.params.index])
    } else {
        res.status(404).json({message: "Not Found"})
    }
})

//DELETE ROUTE endpoint - remove one log from the array of data - logsData, based on index param inputted in the url using this path
logs.delete("/:index", (req, res) => {
  const { index } = req.params // deconstructs req.params to pull index value out of it, otherwise, would have to use req.params.index
  const deletedLog = logsData.splice(index,1)
  res.status(200).json(deletedLog)
})
    
module.exports = logs 