import React, { useEffect, useState } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import styles from './Details.module.css';

const dateFormat = require("dateformat");

const Details = () => {
    let { machineID } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        setIsLoaded(false);
        if(machineID) {
            fetch(`/api/machines/${machineID}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setData(result.data);
                        setIsLoaded(true);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [machineID])

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className={styles.container}>
                <NavLink to='/dashboard'>&lt; Back to Dashboard</NavLink>
                <div className={styles.details}>
                    <div className={styles.sensorDetails}>
                        <h2>Sensor Details</h2>
                        <div><span>ID: </span>{data.id}</div>
                        <div><span>Floor:</span> {data.floor}</div>
                        <div><span>Machine Type:</span> {data.machine_type}</div>
                        <div><span>Last Status:</span> {data.status}</div>
                        <div><span>Install Date: </span>
                            {
                                (data && data.install_date) ?
                                    dateFormat(new Date(data.install_date.toString()), "dddd, mmmm dS, yyyy")
                                    : ''
                            }
                        </div>
                        <div><span>Last Maintenance: </span>
                            {
                                (data && data.last_maintenance) ?
                                    dateFormat(new Date(data.last_maintenance.toString()), "dddd, mmmm dS, yyyy, hh:MM:ss TT")
                                    : ''
                            }
                        </div>
                        <div><span>Latitude:</span> {data.latitude}</div>
                        <div><span>Longitude:</span> {data.longitude}</div>
                    </div>
                    <div>
                        <h2>Event Details</h2>
                        { data.events.map((event) => (
                            <div className={styles.sensorEventsDetails + ' ' + styles[event.status]} key={event.timestamp}>
                                <div>
                                    {
                                        (event.timestamp) ?
                                            dateFormat(new Date(event.timestamp.toString()), "dddd, mmmm dS, yyyy, hh:MM:ss TT")
                                            : ''
                                    }
                                </div>
                                <div>{event.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Details;