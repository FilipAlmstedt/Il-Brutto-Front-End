import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// Create asyncronic test

/* import axios from 'axios'; */
// jest.mock("axios");
// const mockAxios = axios as jest.Mocked<typeof axios>;

// const mockData: IMovie[] = [{...}, {...}];
/*test('async testing', () => {
  mockAxios.get.mockResolvedValues({data: mockData}); // När axios gör en get, skicka tillbaka mockdata
  
  render(<Movies />);
  await waitFor(() => {
    const movies = screen.getAllByRole("heading"); // Hämta alla headings
    expect(movies.length).toBe(mockData.length);
  })
}) */