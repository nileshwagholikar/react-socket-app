import React, { useState, useEffect } from "react";
import { Socket } from "phoenix";
import styles from './Sensors.module.scss';

const Sensor = React.lazy(() => import("components/Sensor/Sensor.js"));

const Sensors = function () {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [sensors, setSensors] = useState([]);

	useEffect(() => {
		if(!sensors.length) {
			fetch("/api/machines")
				.then((res) => res.json())
				.then(
					(result) => {
						setIsLoaded(true);
						setSensors(result.data);
					},
					(error) => {
						setIsLoaded(true);
						setError(error);
					}
				);
		}

		// Open Socket connection
		const socket = new Socket("ws://machinestream.herokuapp.com/api/v1/events");
		socket.connect();

		// Join correct channel and log events
		const channel = socket.channel("events", {});
		channel.join();
		channel.on("new", (data) => {
			const updatedSensors = sensors.map(sensor => {
				if (sensor.id === data.machine_id) {
					sensor.status = data.status;
					sensor.timestamp = data.timestamp;
				}
				return sensor;
			})
			setSensors(updatedSensors);
		});

		return () => {
			channel.off("new");
			socket.disconnect();
		};

	}, [sensors])

	if (!isLoaded) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
		<div className={styles.sensorList}>
			{sensors.map((sensor) => (
				<Sensor data={sensor} key={sensor.id} />
			))}
		</div>
		);
	}
};

export default Sensors;
