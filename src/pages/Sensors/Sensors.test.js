import { render, screen } from '@testing-library/react';
import Sensors from './Sensors';

test('renders learn react link', () => {
    render(<Sensors />);
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();
});
