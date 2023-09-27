import React, {useState, Fragment, useEffect} from 'react';
import { LineChart } from '@carbon/charts-react';
import {
    Row, Column, Grid,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    Pagination
} from 'carbon-components-react';

import './graphAndData.scss'

const headers = [
    {
        key: 'id',
        header: 'ID',
    },
    {
        key: 'date',
        header: 'Dátum',
    },
    {
        key: 'time',
        header: 'Čas',
    },
    {
        key: 'value',
        header: 'Hodnota',
    },
    {
        key: 'unit',
        header: 'Jednotka'
    }
];

const GraphAndData = ({dataFromDb,sensorId,sensorList}) => {
    let options = {
        "title": "Priebeh rastu teploty",
        "axes": {
            "bottom": {
                "title": "Dátum/čas",
                "mapsTo": "date",
                "scaleType": "time"
            },
            "left": {
                "mapsTo": "value",
                "title": "°C",
                "scaleType": "linear"
            },
        },
        "curve": "curveMonotoneX",
        "height": "700px",
    }


    let graphData = [];
    let tableData = [];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

    const onPaginationChange = (target) => {
        processTableData(target.page,target.pageSize);
        setPage(target.page);
        setPageSize(target.pageSize);
    }
    const processTableData = (pg,pgSz) => {
        tableData = [];
        let from = (pgSz * (pg -1));
        let to = (pgSz * pg) - 1;
        let max = dataFromDb.length;
        if(max - 1 < to){
            to = max;
        }
        for(let i = from; i < to; i++){
            let time = new Date(dataFromDb[i].time).toLocaleTimeString();
            let formatted = dataFromDb[i].time.split("T");
            let recordTable = {
                id: dataFromDb[i].id.toString(),
                time: time,
                date: formatted[0],
                value: dataFromDb[i].value,
                unit: dataFromDb[i].unit
            }
            tableData.push(recordTable);
        }
    }

    const transformData = () => {
        let sensor = sensorList.find(x => x.id === Number(sensorId));
        options.title = sensor.description;
        options.axes.left.title = sensor.legend_left;
        dataFromDb.forEach( (element) => {
            let recordGraph = {
                date: element.time,
                value: element.value,
                group: 'Teplota'
            }
            graphData.push(recordGraph);
        });
        processTableData(page,pageSize);
    }
    transformData();
        return (
            <Fragment>
                {dataFromDb.length > 0 ?
                    <Fragment>
                        <Column>
                            <LineChart
                                data={graphData}
                                options={options}>
                            </LineChart>
                        </Column>
                        <Column>
                                <DataTable rows={tableData} headers={headers} isSortable>
                                    {({rows, headers, getTableProps, getHeaderProps, getRowProps}) => (
                                        <Table {...getTableProps()} size='sm'>
                                            <TableHead>
                                                <TableRow>
                                                    {headers.map((header) => (
                                                        <TableHeader {...getHeaderProps({header})}>
                                                            {header.header}
                                                        </TableHeader>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow {...getRowProps({row})}>
                                                        {row.cells.map((cell) => (
                                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </DataTable>
                                <Pagination
                                    backwardText="Predchádzajúca strana"
                                    id="pagination"
                                    forwardText="Ďalšia strana"
                                    itemsPerPageText="Dát na stranu:"
                                    page={1}
                                    pageNumberText="Strana"
                                    pageSize={20}
                                    onChange={e => onPaginationChange(e)}
                                    pageSizes={[
                                        10,
                                        20,
                                    ]}
                                    totalItems={dataFromDb.length}
                                />
                        </Column>
                    </Fragment> :
                    <div className="emptyData">
                        Tento senzor doposiaľ nemá žiadne dáta
                    </div>
                }
            </Fragment>
        )
}

export default GraphAndData;