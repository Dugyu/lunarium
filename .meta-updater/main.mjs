// @ts-check

import { createUpdateOptions } from '@pnpm/meta-updater';
import { sortPackageJson } from 'sort-package-json';

const main = () => {
  return createUpdateOptions({
    'package.json': (manifest) => {
      return sortPackageJson({
        ...manifest,
        author: 'The Lynx Authors',
        license: 'Apache-2.0',
      });
    },
  });
};

export default main;
