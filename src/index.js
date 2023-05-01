#! /usr/bin/env node
import inquirer from 'inquirer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { FileManager } from './lib/fileManager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const run = async () => {
  const fm = new FileManager(__dirname, 'lga-dev')
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select your project type:',
        name: 'project',
        choices: [
          {
            name: 'Node.js (prettier + eslint + *ignore)',
            value: 'node'
          },
          {
            name: 'Node.js typescript',
            value: 'node-ts',
            disabled: true
          }
        ]
      },
      {
        type: 'checkbox',
        message: 'Setup husky:',
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
        name: 'confirmed',
        message: 'Apply change?'
      }
    ])
    .then(async (answers) => {
      console.log('Answers:', answers)
      if (!answers.confirmed) return
      await fm.copyDirAndContent('src/config/common', '.')
      if (answers.project) await fm.copyDirAndContent(`src/config/${answers.project}`, '.')

      if (answers.husky.lenght) {
        await fm.createDestDir('.husky')
        if (answers.husky.includes('husky-lint-format')) {
          await fm.copyFile('pre-commit', '.husky', '.husky')
        }
        if (answers.husky.includes('husky-conventionnal-commit')) {
          await fm.copyFile('commit-msg', '.husky', '.husky')
          await fm.copyFile('.commitlintrc.json', '.', '.')
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

run()
