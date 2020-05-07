import {writeFileSync} from 'fs';
import {Config, createGenerator} from 'ts-json-schema-generator';

if (require.main === module) {
  const [tsconfig, path, type, output, name, baseUrl, version] = process.argv.slice(2);

  const config = {
    tsconfig,
    path,
    type,
    expose: 'export',
    jsDoc: 'extended',
    topRef: true,
  } as Config;

  const schema = createGenerator(config).createSchema(config.type);
  schema.$id = `${baseUrl}${name}-v${version}.json`;
  const schemaString = JSON.stringify(schema, null, 2);
  writeFileSync(output, schemaString);
}
