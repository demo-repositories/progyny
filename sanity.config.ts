import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {PortableTextEditorPlugins} from './plugins/portable-text'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Progyny',

  projectId: 'jutxppon',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  form: {
    components: {
      portableText: {
        plugins: PortableTextEditorPlugins,
      },
    },
  },
})
