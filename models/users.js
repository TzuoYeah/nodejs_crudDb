const modelsCommonSql = require('../lib/modelsCommonSql')
const tableName = "Users"
const props = [
    "name",
    "email",
    "password",
    "available"
]

module.exports ={
    props:props,
    insert:async(pool,options)=>{
        const sql = modelsCommonSql.insert(tableName,props)
        const values = [
            options.name,
            options.email,
            options.password,
            true
        ]

        await pool.query(sql,values)
        .catch(e => console.error(e.stack))
        return `add - ${options.email} .` 
    },
    get:async(pool,options)=>{
        const condition = modelsCommonSql.and(options)
        const sql = Object.keys(options).length === 0?
        `SELECT * FROM ${tableName}`:`SELECT * FROM ${tableName} WHERE ${condition.sql}`

        const mes = await pool.query(sql,condition.values)
        .then(res => {return res.rows})
        .catch(e => console.error(e.stack))
        return mes
    },
    update:async(pool,options)=>{
        let primaryKey = "email", setAry = [], setSql = ``
        for(let opt in options)
            if(props.includes(opt) & opt!=primaryKey) setAry.push(`${opt}='${options[opt]}'`)
        for(let i=0;i<setAry.length;i++)
            if(i==setAry.length-1) setSql+=`${setAry[i]}`
            else setSql+=`${setAry[i]}, `
        const sql = `UPDATE ${tableName} SET ${setSql} WHERE email='${options.email}'`

        await pool.query(sql)
        .then(res => {return res.rows})
        .catch(e => console.error(e.stack))
        return `upset - ${setSql}`
    },
    delete:async(pool,options)=>{
        const condition = modelsCommonSql.and(options)
        const sql = `DELETE FROM ${tableName} WHERE ${condition.sql}`

        await pool.query(sql,condition.values)
        .catch(e => console.error(e.stack))
        return `susses`
    }
}