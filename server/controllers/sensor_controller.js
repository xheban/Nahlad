const pool = require("../dbSettings");
const {helpers} = require("../Utils/helpers");

const getSensors = (async(req, res) => {
    let userId = req.query.userId;
    const client = await pool.connect();
    const sensor_ids = await client.query('SELECT sensor_id FROM "users_sensors"  WHERE "user_id" = $1', [userId]);
    if (helpers.isEmpty(sensor_ids.rows)) {
        client.release();
        res.send("no sensors")
    } else {
        let numIds = sensor_ids.rows.map(({ sensor_id }) => sensor_id)
        const sensors = await client.query('SELECT * from "sensors" WHERE "id" = ANY($1)', [numIds]);
        client.release();
        res.send(sensors.rows)
    }
})


const saveSensors = (async(req,res) => {
    try {
        const obj = req.body;
        const userId = obj['userId'];
        const client = await pool.connect();
        const result = await client.query("INSERT INTO sensors(sensor_name,description,legend_left) VALUES ($1, $2, $3);",
            [obj['name'], obj['description'], obj['legend']]);
        const newSensorId = await client.query('SELECT id FROM "sensors" WHERE "sensor_name" = $1',[obj['name']]);
        const addSensorUser = await client.query("INSERT INTO users_sensors(sensor_id, user_id) VALUES ($1, $2);",
            [newSensorId.rows[0].id, userId]);
        res.send("1");
        client.release();
    }catch(err){
        console.error(err);
        res.send("Error " + err);
    }
})

module.exports = {getSensors,saveSensors};