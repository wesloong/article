// 契约自校验（提供方侧，BR-099 的镜像）：产物必须符合 schema/ 下的 JSON Schema，否则构建失败
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ROOT = dirname(new URL(import.meta.url).pathname);
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

let failed = false;
for (const [schemaFile, dataFile] of [
  ['schema/manifest.schema.json', 'docs-html/manifest.json'],
  ['schema/search-index.schema.json', 'docs-html/search-index.json'],
]) {
  const schema = JSON.parse(await readFile(join(ROOT, schemaFile), 'utf8'));
  const data = JSON.parse(await readFile(join(ROOT, dataFile), 'utf8'));
  const validate = ajv.compile(schema);
  if (validate(data)) {
    console.log(`✓ ${dataFile} 符合 ${schemaFile}`);
  } else {
    failed = true;
    console.error(`✗ ${dataFile} 不符合 ${schemaFile}：`);
    for (const err of validate.errors) console.error(`  - ${err.instancePath || '/'} ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);
