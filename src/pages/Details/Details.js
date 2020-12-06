import React, { useEffect, useState } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import styles from './Details.module.scss';

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
                        <div><span>ID: </span>{data.id}</div>
                        <div><span>Floor:</span> {data.floor}</div>
                        <div><span>Machine Type:</span> {data.machine_type}</div>
                        <div><span>Status:</span> {data.status}</div>
                        <div><span>Install Date: </span>
                            {
                                new Intl.DateTimeFormat("en-GB", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(data.install_date))
                            }
                        </div>
                        <div><span>Last Maintenance: </span>
                            {
                                new Intl.DateTimeFormat("en-GB", {
                                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                                    hour12: true,
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(data.last_maintenance))
                            }
                        </div>
                        <div><span>Latitude:</span> {data.latitude}</div>
                        <div><span>Longitude:</span> {data.longitude}</div>
                    </div>
                    <div>
                        { data.events.map((event) => (
                            <div className={styles.sensorEventsDetails} key={event.timestamp}>
                                <div>
                                    {
                                        new Intl.DateTimeFormat("en-GB", {
                                            hour: 'numeric', minute: 'numeric', second: 'numeric',
                                            hour12: true,
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        }).format(new Date(event.timestamp))
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