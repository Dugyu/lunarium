// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { LunaLynxStage } from '../luna-lynx-stage';
import { LynxStage } from '../lynx-stage';

// Mock the web-core runtime to avoid actual loading and network requests in tests
vi.mock('@lynx-js/web-core/client', () => ({
  default: {},
}));

describe('LynxStage SSR & Mount Behavior', () => {
  it('should render null on the server side (SSR) without throwing', () => {
    // We simulate SSR using react-dom/server's renderToString.
    // In SSR, effects don't run, so `mounted` stays false.
    let html = '';
    expect(() => {
      html = renderToString(
        <LynxStage entry='test-entry' bundleBaseUrl='/' />,
      );
    }).not.toThrow();

    // The SSR guard should return null (empty string in HTML)
    expect(html).toBe('');
  });

  it('should mount correctly on the client side after hydration', () => {
    // Using Testing Library's render to simulate a client-side environment
    const { container } = render(
      <LynxStage entry='test-entry' bundleBaseUrl='/' />,
    );

    // After the initial render, `useMounted` (via useLayoutEffect) triggers a state update
    // to set `mounted` to true, which will render the actual LynxStageImpl.

    // We should be able to find the lynx-view element in the DOM
    const lynxView = container.querySelector('lynx-view');
    expect(lynxView).not.toBeNull();

    // Verify that the wrapper div has the ref and container styles
    const wrapperDiv = container.firstElementChild;
    expect(wrapperDiv?.tagName.toLowerCase()).toBe('div');
    expect(wrapperDiv).toHaveStyle({
      position: 'relative',
      width: '100%',
      height: '100%',
    });
  });
});

describe('LunaLynxStage SSR & Mount Behavior', () => {
  it('should render null on the server side (SSR) without throwing', () => {
    let html = '';
    expect(() => {
      html = renderToString(
        <LunaLynxStage
          entry='test-entry'
          bundleBaseUrl='/'
          lunaTheme='luna-light'
        />,
      );
    }).not.toThrow();

    expect(html).toBe('');
  });

  it('should mount correctly on the client side after hydration', () => {
    const { container } = render(
      <LunaLynxStage
        entry='test-entry'
        bundleBaseUrl='/'
        lunaTheme='lunaris-dark'
      />,
    );

    const lynxView = container.querySelector('lynx-view');
    expect(lynxView).not.toBeNull();
  });
});
