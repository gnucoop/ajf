#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {readFileSync, unlinkSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {default as inquirer} from 'inquirer';
import {default as semver} from 'semver';
import {default as shell} from 'shelljs';

import {changelog} from './release/index.mjs';

// Turn the section just prepended to CHANGELOG.md into standalone release notes:
// drop the anchor, the version heading (the Release already carries it in its
// title) and the split marker.
const notesFromChangelog = content =>
  content
    .split('\n')
    .filter(
      line =>
        !line.startsWith('<a name=') &&
        !line.startsWith('# ') &&
        !line.includes('CHANGELOG SPLIT MARKER'),
    )
    .join('\n')
    .trim();

// After the push, optionally create a GitHub Release for the new tag, using the
// changelog section as its notes. Failures here are non-fatal: the tag and the
// push already succeeded.
const maybeCreateGitHubRelease = async (tag, title, notes) => {
  if (!notes) {
    shell.echo('No changelog entries for this version - skipping the GitHub Release.');
    return;
  }
  if (!shell.which('gh')) {
    shell.echo('gh CLI not found - skipping the GitHub Release. Create it later with:');
    shell.echo(`  gh release create ${tag} --title "${title}" --notes-file <notes.md>`);
    return;
  }
  const {create} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'create',
      default: true,
      message: `Create a GitHub Release for ${tag} with the changelog as notes?`,
    },
  ]);
  if (!create) {
    shell.echo(`Skipped. When ready:\n  gh release create ${tag} --title "${title}" --notes-file <notes.md>`);
    return;
  }
  // gh wants a file: the notes are multi-line Markdown, awkward to pass inline.
  const notesFile = join(tmpdir(), `ajf-relnotes-${tag.replace(/[^\w.-]/g, '_')}.md`);
  writeFileSync(notesFile, `${notes}\n`);
  const res = shell.exec(`gh release create ${tag} --title "${title}" --notes-file "${notesFile}"`);
  unlinkSync(notesFile);
  shell.echo(
    res.code === 0 ? 'GitHub Release created.' : 'gh release create failed - see the output above.',
  );
};

const prepareRelease = async () => {
  const packageFile = 'package.json';
  const content = JSON.parse(readFileSync(packageFile, 'utf8'));
  const currentVersion = content.version;
  shell.echo(`Current version: ${currentVersion}`);
  const choices = [];
  let newVersion;
  if (semver.prerelease(currentVersion) != null) {
    newVersion = semver.inc(currentVersion, 'prerelease');
    choices.push({name: `Next pre-release: ${newVersion}`, value: newVersion});
    newVersion = semver.inc(currentVersion, 'patch');
    choices.push({name: `Next stable: ${newVersion}`, value: newVersion});
  } else {
    newVersion = semver.inc(currentVersion, 'patch');
    choices.push({name: `Next patch: ${newVersion}`, value: newVersion});
    newVersion = semver.inc(currentVersion, 'minor');
    choices.push({name: `Next minor: ${newVersion}`, value: newVersion});
    newVersion = semver.inc(currentVersion, 'major');
    choices.push({name: `Next major: ${newVersion}`, value: newVersion});
  }
  choices.push({name: `Custom`, value: 'custom'});
  newVersion = (
    await inquirer.prompt([
      {
        type: 'list',
        name: 'newVersion',
        message: 'What version do you want to cut?',
        choices,
      },
    ])
  ).newVersion;
  if (newVersion === 'custom') {
    newVersion = (
      await inquirer.prompt([
        {
          type: 'input',
          name: 'newVersion',
          message: 'Please enter a new version:',
        },
      ])
    ).newVersion;
    if (semver.parse(newVersion) == null) {
      shell.echo('Invalid version');
      shell.exit(1);
    }
  }
  content.version = newVersion;
  writeFileSync(packageFile, JSON.stringify(content, null, 2));
  // changelog() returns {releaseName, content} once it has prepended the new
  // section, or a bare string when there was nothing to add.
  const changelogResult = await changelog();
  const hasEntries = changelogResult != null && typeof changelogResult === 'object';
  const releaseName = hasEntries ? changelogResult.releaseName : undefined;
  const releaseNotes = hasEntries ? notesFromChangelog(changelogResult.content) : '';
  const tag = `v${newVersion}`;
  const releaseTitle = releaseName != null ? `${tag} "${releaseName}"` : tag;
  let confirm = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Please review the staged changelog. Do you want to commit changes? (Y/N)',
      },
    ])
  ).confirm;
  if (confirm === false) {
    shell.exit(0);
  }
  shell.exec(`git add package.json CHANGELOG.md`);
  shell.exec(`git commit -m "release: cut the v${newVersion} release"`, {silent: true});
  shell.exec(`git tag ${tag}`, {silent: true});
  confirm = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to push this version? (Y/N)',
      },
    ])
  ).confirm;
  if (confirm === false) {
    shell.echo(`Please push with "git push --tags" when ready.`);
    shell.exit(0);
  }
  shell.exec(`git push --tags`);
  shell.exec(`git push`);
  await maybeCreateGitHubRelease(tag, releaseTitle, releaseNotes);
};

if (esMain(import.meta)) {
  prepareRelease();
}
