import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import App from '../../App';
import { page } from 'vitest/browser';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      {component}
    </ChakraProvider>
  );
};

describe('Dashboard', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the full app with Dashboard page', async () => {
    renderWithProvider(<App />);

    // Verify the page renders - check for Stats section
    const statsHeading = screen.getByText('Stats');
    expect(statsHeading).toBeDefined();
  });

  it('should display Welcome heading', async () => {
    renderWithProvider(<App />);

    // Check for welcome heading - exact text is "Welcome"
    const heading = screen.getByText(/Welcome/i);
    expect(heading).toBeDefined();
  });

  it('should capture full page screenshot', async () => {
    renderWithProvider(<App />);

    // Wait for the page to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Capture screenshot of the full app
    const screenshot = await page.screenshot({
      fullPage: true,
      path: 'screenshots/airflow-dashboard-full.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });
});
