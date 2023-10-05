import { defineConfig, presetAttributify, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#1ea54c',
    },
  },
  shortcuts: {
    'input-number': 'text-left pl-10px pr-4px border-1px border-white rounded-4px shadow-sm bg-none bg-transparent shadow-none box-border border-solid',
    'read-only': 'border-op-30 outline-none focus:outline-none bg-transparent cursor-not-allowed',
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
  },
});
