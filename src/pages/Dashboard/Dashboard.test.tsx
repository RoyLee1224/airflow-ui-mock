import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
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

    // Wait for and verify the logo image appears
    const logo = await waitFor(
      () => {
        const img = screen.getByAltText('Airflow Logo');
        expect(img).toBeDefined();
        return img;
      },
      { timeout: 10000 }
    );

    // Verify the image element exists
    expect(logo).toBeTruthy();
  });

  it('should capture full page screenshot', async () => {
    renderWithProvider(<App />);

    // Wait for the logo to appear
    await waitFor(
      () => {
        const logo = screen.getByAltText('Airflow Logo');
        expect(logo).toBeDefined();
      },
      { timeout: 10000 }
    );

    // Additional wait for any animations or lazy-loaded content
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Capture screenshot of the full app
    // Path is relative to the project root (where tests are run from)
    const screenshot = await page.screenshot({
      fullPage: true,
      path: '../../../screenshots/dashboard.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });
});
