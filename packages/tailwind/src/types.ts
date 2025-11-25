import type { Config } from 'tailwindcss';

type LunaTailwindPlugin = NonNullable<NonNullable<Config['plugins']>[number]>;

export type { LunaTailwindPlugin };
