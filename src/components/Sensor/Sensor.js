import React, { useState, useEffect } from 'react';
import styles from './Sensor.module.css';
import { NavLink } from "react-router-dom";
import infoIcon from 'assets/info.png'

const dateFormat = require("dateformat");

const Sensor = function(params) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(false);
    const [floor, setFloor] = useState(null);
    const [id, setID] = useState(null);
    const [installDate, setInstallDate] = useState(null);
    const [lastMaintenance, seLastMaintenance] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [machineType, setMachineType] = useState(null);
    const [timestamp, setTimeStamp] = useState('');

    /***
     *
     * @param data
     * Sets the states with values in data
     */
    const setData = (data) => {
        setStatus(data.status);
        setFloor(data.floor);
        setID(data.id);
        setInstallDate(data.install_date);
        seLastMaintenance(data.last_maintenance);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setMachineType(data.machine_type);

        if(data.timestamp) {
            setTimeStamp(data.timestamp);
        }

        setError(false);
        setIsLoaded(true);
    }

    /***
     * effect will be called whenever parameters are changes and accordingly states will be updated
     */
    useEffect(() => {
        setData(params.data)
    }, [params]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div>
                <div className={styles.sensorDiv + ' ' + styles[status]}>
                    <div className={styles.title}>
                        <span>{id}</span>
                    </div>
                    <div className={styles.dFlex}>
                        <div className={styles.icon}>
                            <i className={styles[machineType]} />
                        </div>
                        <div className={styles.data}>
                            <div><span>Floor:</span> {floor}</div>
                            <div><span>Machine Type:</span> {machineType}</div>
                            <div><span>Status:</span> {status}</div>
                            <div><span>Updated: </span>
                                {
                                    timestamp ?
                                        dateFormat(new Date(timestamp.toString()), "ddd, mmm dS, yyyy, hh:MM:ss TT")
                                        : ''
                                }
                            </div>
                            <div>
                                <div className={styles.tooltip}><NavLink to={"/details/"+id}><img src={infoIcon} alt="Information" /></NavLink></div>
                                <div>
                                    <div><span>Install Date: </span>
                                    {
                                        dateFormat(new Date(installDate.toString()), "ddd, mmm dS, yyyy")
                                    }
                                    </div>
                                    <div><span>Last Maintenance: </span>
                                    {
                                        dateFormat(new Date(lastMaintenance.toString()), "ddd, mmm dS, yyyy, hh:MM:ss TT")
                                    }
                                    </div>
                                    <div><span>Latitude:</span> {latitude}</div>
                                    <div><span>Longitude:</span> {longitude}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Sensor;