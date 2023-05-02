#! /usr/bin/env node
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { FileManager } from './lib/fileManager.js'
import { updatePackage } from './lib/package.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const run = async () => {
<<<<<<< HEAD
  const fm = new FileManager(__dirname)
=======
  const fm = new FileManager(__dirname, 'lga-dev')
>>>>>>> 8574016 (feat/husky auto setup (#5))
  inquirer
    .prompt([
      {
        type: 'list',
<<<<<<< HEAD
        message: '💻 Select your project type:',
        name: 'project',
        choices: [
          {
            name: '💻 Node.js (prettier + eslint + *ignore)',
            value: 'node'
          },
          {
            name: '🚀 Node.js typescript - Coming soon',
=======
        message: 'Select your project type:',
        name: 'project',
        choices: [
          {
            name: 'Node.js (prettier + eslint + *ignore)',
            value: 'node'
          },
          {
            name: 'Node.js typescript',
>>>>>>> 8574016 (feat/husky auto setup (#5))
            value: 'node-ts',
            disabled: true
          }
        ]
      },
      {
        type: 'checkbox',
<<<<<<< HEAD
        message: '🐕 Setup husky:',
=======
        message: 'Setup husky:',
>>>>>>> 8574016 (feat/husky auto setup (#5))
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
<<<<<<< HEAD
          '💪 Would you like to update/override package.json (scripts/devDependencies) ?'
=======
          'Would you lile update/override package.json (scripts / devDependencies) ?'
>>>>>>> 8574016 (feat/husky auto setup (#5))
      },
      {
        type: 'confirm',
        name: 'confirmed',
<<<<<<< HEAD
        message: '❓ Apply the selected configuration ?'
      }
    ])
    .then(async (answers) => {
=======
        message: 'Apply change?'
      }
    ])
    .then(async (answers) => {
      console.log('Answers:', answers)
>>>>>>> 8574016 (feat/husky auto setup (#5))
      if (!answers.confirmed) return
      let packageJSON = {}
      if (answers.packageJSON) {
        packageJSON = await fm.readPackageJson()
      }
      await fm.copyDirAndContent('src/config/common', '.')
      if (answers.project)
        await fm.copyDirAndContent(`src/config/${answers.project}`, '.')
      const scripts = {
<<<<<<< HEAD
        lint: 'eslint  . --ext .js',
        'lint:fix': 'eslint . --ext .js --fix',
        'prettier-format': "prettier '**/*.{js,json}' --write"
=======
        lint: 'eslint --config src/config/node/.eslintrc  . --ext .js',
        'lint:fix':
          'eslint --config src/config/node/.eslintrc . --ext .js --fix',
        'prettier-format':
          "prettier --config src/config/common/.prettierrc 'src/**/*.js' --write"
>>>>>>> 8574016 (feat/husky auto setup (#5))
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
<<<<<<< HEAD
=======
        console.log('HUSKY!!!')
>>>>>>> 8574016 (feat/husky auto setup (#5))
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
<<<<<<< HEAD
=======
        console.log('updatePackage (Husky)')
>>>>>>> 8574016 (feat/husky auto setup (#5))
        packageJSON = updatePackage(packageJSON, scripts, devDependencies)
      }

      if (answers.packageJSON) {
<<<<<<< HEAD
        // console.log('Save updated package.json')
        await fm.writePackageJson(packageJSON)
      }
      console.log(" 🚀 Don't forget to run npm install or yarn install")
=======
        console.log('Save updated package.json')
        await fm.writePackageJson(packageJSON)
      }
>>>>>>> 8574016 (feat/husky auto setup (#5))
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

run()
