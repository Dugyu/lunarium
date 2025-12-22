import { createRequire } from 'node:module';
import path from 'node:path';

import type { TemplateHooks } from '@lynx-js/template-webpack-plugin';
import type { Rspack } from '@rsbuild/core';

const require = createRequire(import.meta.url);
const rsbuildPluginDir = path.dirname(
  require.resolve('@lynx-js/react-rsbuild-plugin/package.json'),
);

const templatePluginDir = path.dirname(
  require.resolve('@lynx-js/template-webpack-plugin/package.json', {
    paths: [rsbuildPluginDir],
  }),
);

type LynxTemplatePluginStatic = {
  getLynxTemplatePluginHooks(
    compilation: Rspack.Compilation,
  ): TemplateHooks;
};

export const LynxConfigPlugin: Rspack.RspackPluginInstance = {
  name: 'test',
  apply(compiler: Rspack.Compiler) {
    compiler.hooks.thisCompilation.tap(
      'test',
      (compilation: Rspack.Compilation) => {
        void (async () => {
          const { LynxTemplatePlugin } = (await import(
            path.join(templatePluginDir, 'lib/index.js')
          )) as { LynxTemplatePlugin: LynxTemplatePluginStatic };

          const hooks = LynxTemplatePlugin.getLynxTemplatePluginHooks(
            compilation,
          );

          hooks.beforeEncode.tapPromise('test', (data) => {
            /*
            console.log('beforeEncode', data.encodeData.sourceContent.config);
            if (data.encodeData.compilerOptions) {
              data.encodeData.compilerOptions.enableParallelElement = true;
            }
            if (data.encodeData.sourceContent.config) {
              data.encodeData.sourceContent.config.pipelineSchedulerConfig =
                65535;
            } */

            if (data.encodeData.sourceContent.config) {
              data.encodeData.sourceContent.config.enableCSSInlineVariables =
                true;
            }

            return Promise.resolve(data);
          });
        })();
      },
    );
  },
};
