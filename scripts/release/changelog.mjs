import {default as conventionalChangelog} from 'conventional-changelog';
import {default as esMain} from 'es-main';
import {readFileSync, writeFileSync} from 'fs';
import {
  adjectives, animals, colors, countries, languages, names, starWars,
  uniqueNamesGenerator
} from 'unique-names-generator';

const versionRe = /\[([0-9]+\.[0-9]+\.[0-9]+(-[a-z]+\.[0-9]+)?)\]/;
const dateRe = /\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/;
const changelogPath = 'CHANGELOG.md';
const dictionaries = [adjectives, animals, colors, countries, languages, names, starWars];

const baseContent = () => {
  return new Promise(resolve => {
    const res = conventionalChangelog({preset: 'angular'});
    let content = '';
    res.setEncoding('utf8');
    res.on('data', data => content = `${content}${data}`);
    res.on('close', () => resolve(content));
  });
};

export const changelog = async () => {
  let content = await baseContent();
  const lines = content.split('\n');
  if (lines.length === 0) {
    return content;
  }
  const firstLine = lines[0];
  let matches = dateRe.exec(firstLine);
  let date;
  if (matches != null && matches.length === 2) {
    date = matches[1];
  }
  if (date == null) {
    return content;
  }
  matches = versionRe.exec(firstLine);
  let version;
  if (matches != null && matches.length >= 2) {
    version = matches[1];
  }
  if (version == null) {
    return content;
  }
  const releaseName = uniqueNamesGenerator({dictionaries, length: 2, separator: '-'});
  content = [
    `<a name="${version}"></a>`,
    `# ${version} "${releaseName}" (${date})`,
    ...lines.slice(1).filter(line => line.length > 0),
    '',
    '<!-- CHANGELOG SPLIT MARKER -->',
    '',
    '',
  ].join('\n');
  const current = readFileSync(changelogPath, 'utf-8');
  writeFileSync(changelogPath, `${content}${current}`);
  return {
    releaseName,
    content,
  };
};

if (esMain(import.meta)) {
  changelog();
}
