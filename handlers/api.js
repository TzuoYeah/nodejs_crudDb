const db = require('../db')

exports.get = async(req,res)=>{
    const mes = await db.get(req.params.table,req.body)
    return res.json(mes)
}
exports.add = async(req,res)=>{
    const mes = await db.add(req.params.table,req.body)
    return res.json(mes)
}
exports.update = async(req,res)=>{
    const mes = await db.update(req.params.table,req.body)
    return res.json(mes)
}
exports.del = async(req,res)=>{
    const mes = await db.delete(req.params.table,req.body)
    return res.json(mes)
}