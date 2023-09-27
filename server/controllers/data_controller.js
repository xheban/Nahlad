const pool = require("../dbSettings");

const getData = (async(req, res) => {
   let sensorId = req.query.sensorId;
   let from = req.query.from;
   let to = req.query.to;
   const client = await pool.connect();
   const data = await client.query('SELECT * FROM "data" WHERE "sensor_id" = $1 AND "time" > $2 AND "time" < $3 ORDER BY "time" ASC', [sensorId,from,to]);
   client.release();
   res.send(data.rows)
})

const receiveData = (async(req, res) =>{
    const client = await pool.connect();
    const result = await client.query("INSERT INTO data(time,value,sensor_id,unit) VALUES ($1, $2, $3, $4 );",
        [new Date(),req.body.value,req.body.sensor_id,req.body.unit]);
    client.release();
})

module.exports = {getData,receiveData};