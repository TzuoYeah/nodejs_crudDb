const api = require('./handlers/api')

module.exports = function(app){
    app.post('/:table/add', api.add)
    app.post('/:table/get', api.get)
    app.post('/:table/update', api.update)
    app.post('/:table/del', api.del)

    app.use( (req,res)=> res.status(404).send('Not Found'))
    app.use( (err,req,res,next)=>  res.status(500).send('Internal Server Error'))
}