import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Dashboard } from './Dashboard';
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

  it('should render the Dashboard page', async () => {
    renderWithProvider(<Dashboard />);

    // Verify the page renders
    const dashboard = screen.getByTestId ? screen.getByTestId('dashboard') : document.body;
    expect(dashboard).toBeDefined();
  });

  it('should display Welcome heading', async () => {
    renderWithProvider(<Dashboard />);

    // Check for welcome heading
    const heading = screen.getByText(/Welcome to Airflow/i);
    expect(heading).toBeDefined();
  });

  it('should capture full page screenshot', async () => {
    renderWithProvider(<Dashboard />);

    // Wait for the page to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capture screenshot
    const screenshot = await page.screenshot({
      fullPage: true,
      path: 'screenshots/dashboard-full.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });
});
