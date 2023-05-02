#! /usr/bin/env node
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { FileManager } from './lib/fileManager.js'
import { updatePackage } from './lib/package.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const run = async () => {
  const fm = new FileManager(__dirname)
  inquirer
    .prompt([
      {
        type: 'list',
        message: '💻 Select your project type:',
        name: 'project',
        choices: [
          {
            name: 'Node.js (prettier + eslint + *ignore)',
            value: 'node'
          },
          {
            name: 'Node.js typescript - Coming soon',
            value: 'node-ts',
            disabled: true
          }
        ]
      },
      {
        type: 'checkbox',
        message: '🐕 Setup husky:',
        name: 'husky',
        choices: [
          {
            name: 'pre-commit lint and format your code',
            value: 'husky-lint-format'
          },
          {
            name: 'commit-msg check yout commit with conventionnal commit',
            value: 'husky-conventionnal-commit'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'packageJSON',
        message:
          '💪 Would you like to update/override package.json (scripts/devDependencies) ?'
      },
      {
        type: 'confirm',
        name: 'confirmed',
        message: '❓ Apply the selected configuration ?'
      }
    ])
    .then(async (answers) => {
      if (!answers.confirmed) return
      let packageJSON = {}
      if (answers.packageJSON) {
        packageJSON = await fm.readPackageJson()
      }
      await fm.copyDirAndContent('src/config/common', '.')
      if (answers.project)
        await fm.copyDirAndContent(`src/config/${answers.project}`, '.')
      const scripts = {
        lint: 'eslint  . --ext .js',
        'lint:fix': 'eslint . --ext .js --fix',
        'prettier-format': "prettier '**/*.{js,json}' --write"
      }
      const devDependencies = {
        eslint: '^8.33.0',
        'eslint-config-prettier': '^8.6.0',
        'eslint-plugin-prettier': '^4.2.1',
        prettier: '^2.8.3',
        standard: '^17.0.0'
      }
      packageJSON = updatePackage(packageJSON, scripts, devDependencies)
      if (answers.husky.length) {
        await fm.createDestDir('.husky')
        const scripts = {
          prepare: 'husky install'
        }
        let devDependencies = {
          husky: '^8.0.3'
        }
        if (answers.husky.includes('husky-lint-format')) {
          await fm.copyFile('pre-commit', '.husky', '.husky')
        }
        if (answers.husky.includes('husky-conventionnal-commit')) {
          devDependencies = {
            ...devDependencies,
            '@commitlint/cli': '^17.6.0',
            '@commitlint/config-conventional': '^17.6.0'
          }
          await fm.copyFile('commit-msg', '.husky', '.husky')
          await fm.copyFile('.commitlintrc.json', '.', '.')
        }
        console.log('updatePackage (Husky)')
        packageJSON = updatePackage(packageJSON, scripts, devDependencies)
      }

      if (answers.packageJSON) {
        // console.log('Save updated package.json')
        await fm.writePackageJson(packageJSON)
      }
      console.log(" 🚀 Don't forget to run npm install or yarn install")
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

run()
