import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Sensors from './Sensor';

const testData = {
    floor: 5,
    id: "68015cc1-3119-42d2-9d4e-3e824723fe03",
    install_date: "2015-04-18",
    last_maintenance: "2017-04-01T15:00:00.000000Z",
    latitude: 11.523880271993598,
    longitude: 48.09540056785246,
    machine_type: "microscope",
    status: "running"
};

test('renders learn react link', () => {
    render(
        <Router>
            <Sensors data={testData} />
        </Router>
    );
    const linkElement = screen.getByText(/Floor/i);
    expect(linkElement).toBeInTheDocument();
});
