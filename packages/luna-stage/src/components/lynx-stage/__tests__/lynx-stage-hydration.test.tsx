// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { LunaLynxStage } from '../luna-lynx-stage';
import { LynxStage } from '../lynx-stage';

// Mock the web-core runtime to avoid actual loading and network requests in tests
vi.mock('@lynx-js/web-core/client', () => ({
  default: {},
}));

describe('LynxStage Hydration Behavior', () => {
  it('should mount correctly on the client side after hydration', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Hydrate the server-rendered markup
    let root: Root | undefined;

    // We need to wait for the effects to run after hydration
    act(() => {
      root = hydrateRoot(
        container,
        <LynxStage entry='test-entry' bundleBaseUrl='/' />,
      );
    });

    // After hydration and effects run, the component should mount the lynx-view
    const lynxView = container.querySelector('lynx-view');
    expect(lynxView).not.toBeNull();

    // Verify that the wrapper div has the ref and container styles
    const wrapperDiv = container.firstElementChild as HTMLElement;
    expect(wrapperDiv.tagName.toLowerCase()).toBe('div');
    expect(wrapperDiv.style.position).toBe('relative');
    expect(wrapperDiv.style.width).toBe('100%');
    expect(wrapperDiv.style.height).toBe('100%');

    // Cleanup
    if (root) {
      root.unmount();
    }
    document.body.removeChild(container);
  });
});

describe('LunaLynxStage Hydration Behavior', () => {
  it('should mount correctly on the client side after hydration', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Hydrate the server-rendered markup
    let root: Root | undefined;
    act(() => {
      root = hydrateRoot(
        container,
        <LunaLynxStage
          entry='test-entry'
          bundleBaseUrl='/'
          lunaTheme='lunaris-dark'
        />,
      );
    });

    // After hydration and effects run, the component should mount the lynx-view
    const lynxView = container.querySelector('lynx-view');
    expect(lynxView).not.toBeNull();

    // Cleanup
    if (root) {
      root.unmount();
    }
    document.body.removeChild(container);
  });
});
