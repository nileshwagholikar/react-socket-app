import React, { useState, useEffect } from "react";
import { Socket } from "phoenix";
import styles from './Sensors.module.css';

const Sensor = React.lazy(() => import("../Sensor/Sensor"));

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
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
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
			channel.off("STOP_SOCKET_EVENTS");
			socket.disconnect();
		};

	})

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
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
