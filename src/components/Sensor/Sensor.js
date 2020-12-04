import React, { useState, useEffect } from 'react';
import './Sensor.css';

import { ReactComponent as Measurement } from 'assets/measurement.svg';
import { ReactComponent as Microscope } from 'assets/microscope.svg';

const Sensor = function(params) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [status, setStatus] = useState(false);
    const [floor, setFloor] = useState(null);
    const [id, setID] = useState(null);
    const [install_date, setInstallDate] = useState(null);
    const [last_maintenance, seLastMaintenance] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [machine_type, setMachineType] = useState(null);
    const [timestamp, setTimeStamp] = useState(null);

    const Icon = () => {
        if(machine_type === "measurement") {
            return(
                <Measurement />
            )
        } else {
            return (
                <Microscope />
            )
        }
    }

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

    const loadSensorData = () => {
        setIsLoaded(false);
        if(id) {
            fetch(`/api/machines/${id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setData(result.data);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }

    useEffect(() => {
        setData(params.data)
    }, [params]);

    useEffect(() => {
        if(id) {
            fetch(`/api/machines/${id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setData(result.data);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [id])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"d-flex "+status}>
                <div className="icon"><Icon /></div>
                <div className="data">
                    <div><span>Floor:</span> {floor}</div>
                    <div><span>Machine Type:</span> {machine_type}</div>
                    <div><span>ID:</span> {id}</div>
                    <div><span>Status:</span> {status} (
                        {
                            timestamp ? 
                            new Intl.DateTimeFormat("de-DE", {
                                hour: 'numeric', minute: 'numeric', second: 'numeric',
                                hour12: true,
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                                }).format(new Date(timestamp))
                            
                            : ''
                        }
                    )</div>
                    <div><span>Install Date: </span>
                    {
                        new Intl.DateTimeFormat("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                            }).format(new Date(install_date))
                    }
                    </div>
                    <div><span>Last Maintenance: </span> 
                    {
                        new Intl.DateTimeFormat("de-DE", {
                            hour: 'numeric', minute: 'numeric', second: 'numeric',
                            hour12: true,
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                            }).format(new Date(last_maintenance))
                    }
                    </div>
                    <div><span>Latitude:</span> {latitude}</div>
                    <div><span>Longitude:</span> {longitude}</div>
                </div>
            </div>
        )
    }
}

export default Sensor;