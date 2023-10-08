import { defineConfig, presetAttributify, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#6874e8',
    },
  },
  shortcuts: {
    'input-number': 'text-left pl-10px pr-4px border-1px border-white rounded-4px shadow-sm bg-none bg-transparent shadow-none box-border border-solid',
    'read-only': 'border-op-30 outline-none focus:outline-none bg-transparent cursor-not-allowed',
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-none bg-none border-solid border-none bg-#6874e8 text-white hover:bg-#5465d6 active:bg-#3645a8 transition-colors duration-100',
  },
});
