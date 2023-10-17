import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('should have Text', () => {
    render(<Home />);
    const text = screen.getByText(/홈페이지/i);
    expect(text).toBeInTheDocument();
  });
});
