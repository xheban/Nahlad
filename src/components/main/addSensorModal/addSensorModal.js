import React, {useState,useRef, Fragment} from 'react';
import {Button,Row, ModalWrapper, Select, SelectItem, Form, TextInput, ComposedModal, Modal, InlineLoading} from "carbon-components-react";
import GraphAndData from "../graphAndData/graphAndData";

const AddSensorModal = () => {

    const sensorNameInputElement = useRef("");
    const sensorDescriptionInputElement = useRef("");
    const sensorLegendInputElement = useRef("");

    const [open, setOpen] = useState(false);
    const [missingData, setMissingData] = useState(false);
    const [statusSaving, setStatusSaving] = useState('idle'); //1 idle 2 pending 3 success


    const handleSubmitForModal = () => {

        const data = {
            sensorName: sensorNameInputElement.current?.value,
            sensorDescription: sensorDescriptionInputElement.current?.value,
            sensorLegend: sensorLegendInputElement.current?.value,
            userId: localStorage.getItem("user_id")
        }
        const isEmpty = !Object.values(data).some(x => x === null || x === '');
        if(isEmpty){
            setStatusSaving('active')
            setMissingData(false);
            saveSensor(data).then();
        }else{
            setMissingData(true);
        }
    }

    const saveSensor = async (data) => {
        const name = data.sensorName;
        const description = data.sensorDescription
        const legend = data.sensorLegend;
        const userId = data.userId;
        const finalData = {name,description,legend,userId};
        try {
            const response = await fetch('http://localhost:3000/api/sensors', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(finalData)
            })
            const data = await response.json();
            if(data === 1){
                setStatusSaving('finished');
                triggerAction();
                setTimeout(setStatusSaving('idle'),1000);
                setTimeout(setOpen(false),1000);
            }else{
                setStatusSaving('error')
            }
        } catch (e) {
            return e;
        }
    }

    const triggerAction = () => {
        this.props.parentCallback(true);
    }

    return(
        <Fragment>
            <Button onClick={() => setOpen(true)}>
                Pridať senzor
            </Button>
            <Modal  open={open}  onClose={() => setOpen(false)}
                    primaryButtonText="Uložiť"
                    secondaryButtonText="Zavrieť"
                    modalHeading="Pridanie senzora"
                    onRequestSubmit={handleSubmitForModal}
                    onRequestClose={() => setOpen(false)}
            >
                <Row className="ml4 mr4">
                     <TextInput
                            ref={sensorNameInputElement}
                            helperText="Meno senzora, podľa ktorého sa bude senzor vyhľadávať"
                            id="modal-input-1"
                            invalidText="Invalid error message."
                            labelText="Meno senzora"
                            placeholder="Meno"
                        />
                    </Row>
                    <Row className="pt6 ml4 mr4">
                        <TextInput
                            ref={sensorDescriptionInputElement}
                            helperText="Popis senzora stručný pre zobrazenie ako nadpis pri grafe"
                            id="modal-input-2"
                            invalidText="Invalid error message."
                            labelText="Popis funkčnosti"
                            placeholder="Popis"
                        />
                    </Row>
                    <Row className="pt6 ml4 mr4">
                        <TextInput
                            ref={sensorLegendInputElement}
                            helperText="Meracia jednotka pre zobrazenie na grafe"
                            id="modal-input-3"
                            invalidText="Invalid error message."
                            labelText="Meracia jenotka"
                            placeholder="Jednotka"
                        />
                    </Row>
                    {missingData ? <Row className="pt4 ml4"><div className="colorError">Všetky dáta musia byť vyplnené</div></Row> : ''}
                    {statusSaving !== 'idle' ? <InlineLoading className="pt4 pl4" description="Ukladám nový senzor" status={statusSaving}/> : ''}
            </Modal>
        </Fragment>
    )
}

export default AddSensorModal;
