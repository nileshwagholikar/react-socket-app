import { render, screen } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import Details from './Details';

test('renders learn react link', () => {
    render(
        <MemoryRouter initialEntries={['details/68015cc1-3119-42d2-9d4e-3e824723fe03']}>
            <Route path='details/:machineID'>
                <Details />
            </Route>
        </MemoryRouter>
    );
    const linkElement = screen.getByText(/Loading/i);
    expect(linkElement).toBeInTheDocument();
});
