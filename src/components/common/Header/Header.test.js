import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import Header from './Header';
import { BrowserRouter as Router } from "react-router-dom";


test('renders learn react link', () => {
    render(
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Header />
            </Router>
        </Suspense>
    );
    const linkElement = screen.getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
});
