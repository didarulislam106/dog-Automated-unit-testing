import { test, expect } from '@playwright/test';

test.describe('Dog Image Viewer E2E Tests', () => {
  // Test 3: Positive E2E test - Image loaded on page load
  test('Test 3: Page loads and retrieves dog image successfully', async ({ page }) => {
    // Goto the page
    await page.goto('/');

    // Wait for image element to have a src attribute with https content
    await page.waitForFunction(() => {
      const img = document.getElementById('dogImage') as HTMLImageElement;
      return img && img.src && img.src.startsWith('https://');
    }, { timeout: 15000 });

    // Get the image element
    const dogImage = page.locator('#dogImage');

    // Expect that Image has source value
    const imageSrc = await dogImage.getAttribute('src');
    expect(imageSrc).toBeDefined();
    expect(imageSrc).not.toBe('');
    expect(imageSrc).not.toBeNull();

    // Source value starts with https://
    expect(imageSrc).toMatch(/^https:\/\//);
  });

  // Test 4: Positive E2E test - Image loaded on button click
  test('Test 4: Dog image is retrieved when button is clicked', async ({ page }) => {
    // Goto the page
    await page.goto('/');

    // Wait for initial image to load
    await page.waitForFunction(() => {
      const img = document.getElementById('dogImage') as HTMLImageElement;
      return img && img.src && img.src.startsWith('https://');
    }, { timeout: 15000 });

    // Get the button element
    const loadButton = page.locator('#loadDogButton');

    // Store initial src to verify it changes or is reloaded
    const initialSrc = await page.locator('#dogImage').getAttribute('src');

    // Click the button
    await loadButton.click();

    // Wait for image to be updated (src will still have a value with https)
    await page.waitForFunction(() => {
      const img = document.getElementById('dogImage') as HTMLImageElement;
      return img && img.src && img.src.startsWith('https://');
    }, { timeout: 15000 });

    // Get the image element
    const dogImage = page.locator('#dogImage');

    // Expect that Image has source value
    const imageSrc = await dogImage.getAttribute('src');
    expect(imageSrc).toBeDefined();
    expect(imageSrc).not.toBe('');
    expect(imageSrc).not.toBeNull();

    // Source value starts with https://
    expect(imageSrc).toMatch(/^https:\/\//);
  });

  // Test 5: Negative E2E test - API call fails and error is displayed
  test('Test 5: Error is displayed when API call fails', async ({ page }) => {
    // Abort the API call
    await page.route('/api/dogs/random', route => {
      route.abort();
    });

    // Go to the page
    await page.goto('/');

    // Wait for error message to appear
    await page.waitForFunction(() => {
      const errorDiv = document.getElementById('errorMessage');
      return errorDiv && errorDiv.style.display !== 'none' && errorDiv.textContent && errorDiv.textContent.length > 0;
    }, { timeout: 10000 });

    // Check that page has an element containing word error (use regular expression)
    const errorElement = page.locator('#errorMessage');

    // Element with error text is visible
    await expect(errorElement).toBeVisible();

    // Verify the error text contains "error" (case-insensitive)
    const errorText = await errorElement.textContent();
    expect(errorText).toMatch(/error/i);
  });
});
