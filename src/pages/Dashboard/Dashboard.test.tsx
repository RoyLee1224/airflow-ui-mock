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

  it('should render Airflow logo in Sidebar', async () => {
    renderWithProvider(<App />);

    // Wait for and verify the logo image loads
    const logo = await page.waitForSelector('img[alt="Airflow Logo"]', { timeout: 10000 });
    expect(logo).toBeDefined();

    // Verify the image has loaded (naturalWidth > 0 means image loaded successfully)
    const isLoaded = await page.evaluate(() => {
      const img = document.querySelector('img[alt="Airflow Logo"]') as HTMLImageElement;
      return img && img.complete && img.naturalWidth > 0;
    });

    expect(isLoaded).toBe(true);
  });

  it('should capture full page screenshot', async () => {
    renderWithProvider(<App />);

    // Wait for images to load (especially the logo)
    await page.waitForSelector('img[alt="Airflow Logo"]', { timeout: 10000 });

    // Additional wait for any animations or lazy-loaded content
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
