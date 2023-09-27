const pool = require("../dbSettings");
const md5 = require("md5");
const {helpers} = require("../Utils/helpers");

const loginUser = (async(req, res) => {
    try{
        const obj = req.body;
        if( obj.hasOwnProperty("email") &&
            obj.hasOwnProperty("password") &&
            obj['password'] && obj['email']
        ){
            const hashedPassword = md5(obj['password']);
            const client = await pool.connect();
            const { rows } = await client.query('SELECT id FROM "users" WHERE "email" = $1 AND "password" = $2', [obj['email'], hashedPassword]);
            res.send(rows)
            client.release()
        }else{
            res.send("Invalid data");
        }
    }catch(err){
        console.error(err);
        res.send("Error " + err);
    }
})

const registerUser = (async(req, res) => {
    try{
        const obj = req.body;
        if( obj.hasOwnProperty("firstName") &&
            obj.hasOwnProperty("email") &&
            obj.hasOwnProperty("password") &&
            obj.hasOwnProperty("lastName") &&
            obj['password'] && obj['firstName'] && obj['email'] && obj['lastName']
        ){
            const client = await pool.connect();
            const { rows } = await client.query('SELECT * FROM "users" WHERE "email" = $1', [obj['email']]);
            if(helpers.isEmpty(rows)){
                const hashedPassword = md5(obj['password']);
                const result = await client.query("INSERT INTO users(first_name,email,password,last_name) VALUES ($1, $2, $3, $4 );",
                    [ obj['firstName'], obj['email'], hashedPassword, obj['lastName']]);
                res.send("1");
            }else{
                res.send("2")
            }
            client.release()
        }else{
            res.send("3");
        }
    }catch(err){
        console.error(err);
        res.send("Error " + err);
    }
})

module.exports = {loginUser, registerUser};