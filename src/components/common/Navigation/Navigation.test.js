import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter as Router } from "react-router-dom";


test('renders learn react link', () => {
    render(
        <Router>
            <Navigation />
        </Router>
    );
    const linkElement = screen.getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
});
