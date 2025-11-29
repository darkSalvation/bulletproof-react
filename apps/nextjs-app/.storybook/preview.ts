import type { Preview } from '@storybook/vue3';
import '../src/assets/css/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export default preview;
