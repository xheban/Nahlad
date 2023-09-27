import React, {useEffect, useState} from 'react';
import {Button, Column, DatePicker, DatePickerInput, Row, Select, SelectItem, ModalWrapper} from 'carbon-components-react';
import GraphAndData from "../../components/main/graphAndData/graphAndData";
import './mainPage.scss'
import AddSensorModal from "../../components/main/addSensorModal/addSensorModal";


const MainPage = () => {
    const [uriDateFrom, setUriDateFrom] = useState ("1977-01-01")
    const [uriDateTo, setUriDateTo] = useState("2222-05-05")
    const [sensorList, setSensorList] = useState([]);
    const [sensor, setSensor] = useState(0);
    const [data, setData] = useState([]);
    const [intervalRun, setIntervalRun] = useState(false);

    const getNewData = () => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/data?sensorId=${encodeURIComponent(document.getElementById('select-1').value)}&from=${encodeURIComponent(uriDateFrom)}&to=${encodeURIComponent(uriDateTo)}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            const result = await response.json();
            setData(result);
        }
        fetchData().catch(console.error);
    }

    const setIntervalToGetNewData = () => {
         let interval = (setInterval(getNewData, 5000));
         localStorage.setItem("intervalId", interval);
    }

    const onSensorChange = () => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/data?sensorId=${encodeURIComponent(document.getElementById('select-1').value)}&from=${encodeURIComponent(uriDateFrom)}&to=${encodeURIComponent(uriDateTo)}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            const result = await response.json();
            setData(result);
            setSensor(document.getElementById('select-1').value);
        }
        fetchData().catch(console.error);
        if(!intervalRun){
            setIntervalRun(true);
            setIntervalToGetNewData();
        }
    }

    const createDate = (dateObjectForm) => {
        let day = dateObjectForm.getDate();
        let month = (dateObjectForm.getMonth() + 1);
        let year = dateObjectForm.getFullYear();
        if(day < 10){
            let stringDay = day.toString();
            day = "0"+stringDay
        }
        if(month < 10){
            let stringMonth = month.toString();
            month = "0"+stringMonth
        }
        return year + "-" + month + "-" + day;

    }

    useEffect( () => {
        if(sensor !== 0){
            clearInterval(localStorage.getItem("intervalId"));
            localStorage.removeItem("intervalId");
            getNewData();
            setIntervalToGetNewData();
        }
    },[uriDateFrom,uriDateTo])

    const onFromChange = (e) =>{
        setUriDateFrom(createDate(e[0]));
    }

    const onToChange = (e) =>{
        setUriDateTo(createDate(e[0]))
    }

    useEffect(  () => {
        let userId = localStorage.getItem("user_id")
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3000/api/sensors?userId=${encodeURIComponent(userId)}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            const data = await response.json();
            setSensorList(data);
        }
        fetchData().catch(console.error)
    },[]);

    return(
        <div className="bx--grid bx--grid--full-width">
            <Row>
                <Column className="maxWidth180">
                    <h1>Senzor: </h1>
                </Column>
                <Column>
                    <Select
                        defaultValue="placeholder-item"
                        id="select-1"
                        invalidText="This is an invalid error message."
                        labelText=""
                        onChange={onSensorChange}
                    >
                        <SelectItem
                            disabled
                            hidden
                            value="placeholder-item"
                            text="Zvoľte si senzor"
                        />
                        {
                            sensorList.map((item,index) =>{
                                return <SelectItem key={index} text={item.sensor_name} value={item.id} />
                            })
                        }
                    </Select>
                </Column>
                <Column>
                   <AddSensorModal/>
                </Column>
                <Column className="maxWidth55">
                    <div className="fs25 pt5"> Od: </div>
                </Column>
                <Column>
                    <DatePicker dateFormat="m/d/Y" datePickerType="single" className="pt4"
                                onClose={e => onFromChange(e)}
                                id="date-start">
                        <DatePickerInput
                            id="date-picker-range-start"
                            placeholder="mm/dd/yyyy"
                            labelText=""
                            type="text"
                        />
                    </DatePicker>
                </Column>
                <Column className="maxWidth55">
                    <div className="fs25 pt5"> Do: </div>
                </Column>
                <Column>
                    <DatePicker dateFormat="m/d/Y" datePickerType="single" className="pt4"
                                onClose={e => onToChange(e)}
                                id="date-end">
                        <DatePickerInput
                            id="date-picker-range-end"
                            placeholder="mm/dd/yyyy"
                            labelText=""
                            type="text"
                        />
                    </DatePicker>
                 </Column>
                <Column xlg={6} lg={5} md={1}>
                </Column>
            </Row>
            <Row className="pt6">
                {sensor !== 0 ? <GraphAndData dataFromDb={data} sensorId={sensor} sensorList={sensorList}/> : ''}
            </Row>
        </div>
    )
}

export default MainPage;