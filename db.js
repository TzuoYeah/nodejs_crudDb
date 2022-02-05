const { Pool } = require('pg')
const { credentials } = require('./config')
const models = require('./models')
const pool = new Pool( credentials.postgres )

module.exports = {
    add: async(table, options)=>{
        switch (table){
            case 'users':
                const props = ["name","email","password"]
                for(let p in props)
                    if (!options.hasOwnProperty(props[p])) return {failed:"Data deficient."}
                const row = await models.users.get(pool, {email:options.email})
                if(row.length > 0)  return {failed:"Data exirt."}

                const mes = await models.users.insert(pool, options)
                return {success: mes }
            default:
                return {failed:"table not exit."}
        }
    },
    get: async(table, options)=>{
        switch (table){
            case 'users':
                for(let opt in options)
                    if(! models.users.props.includes(opt)) return {failed:"Property not exit.",status:1}
                
                const row = await models.users.get(pool, options)
                return row
            default:
                return {failed:"table not exit."}
        }
    },
    update: async(table, options)=>{
        switch (table){
            case 'users':
                if (!options.hasOwnProperty("email")) return {failed:"Data deficient."}
                
                const row = await models.users.update(pool, options)
                return row
            default:
                return {failed:"table not exit."}
        }
    },
    delete: async(table, options)=>{
        switch (table){
            case 'users':
                for(let opt in options)
                    if(! models.users.props.includes(opt)) return {failed:"Property not exit."}
                if (!Object.keys(options).length > 0) return {failed:"Data deficient."}
                
                const res = await models.users.delete(pool, options)
                return {success:res}
            default:
                return {failed:"table not exit."}
        }
    },
}