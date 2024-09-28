import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
    schemaFile: './api-yaml.yaml',
    apiFile: '../redux/services/api/ApiEiM3Slice.ts',
    apiImport: 'ApiEiM3Slice',
    outputFile: '../redux/services/api/endpoints/ApiEiM3.ts',
    exportName: 'ApiEiM3',
    hooks: true,
}

export default config