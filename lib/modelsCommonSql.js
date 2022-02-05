module.exports={
    insert:(tableName,props)=>{
        let sql =`INSERT INTO ${tableName}(`
        let sql2 =`VALUES(`
        for(let i=0;i<props.length;i++){
            if(i==props.length-1) sql+=`${props[i]})`
            else sql+=`${props[i]},`
            if(i==props.length-1) sql2+=`$${i+1})`
            else sql2+=`$${i+1},`
        }
        sql += sql2
        return sql
    },
    and:options=>{
        const names = Object.getOwnPropertyNames(options)
        let sql =``
        let values =[]
        for(let i=0;i<names.length;i++){
            if(i==0) sql=`${names[i]} = $${i+1}`
            else sql +=` AND ${names[i]} = $${i+1}`
            values.push(options[names[i]])
        }
        return {sql:sql,values:values}
    }
}