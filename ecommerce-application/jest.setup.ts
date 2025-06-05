import '@testing-library/jest-dom';

// Silence Next.js Image warnings in tests
jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (typeof message === 'string' && message.includes('Using <img> could result in slower LCP')) {
      return;
    }
    console.warn(message);
  });