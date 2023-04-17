#! /usr/bin/env node
import inquirer from 'inquirer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const run = async () => {
  console.log('test 2023-04-14')
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
        message: 'Are you sure?'
      }
    ])
    .then((answers) => {
      console.log('Answers:', answers)
      if (!answers.confirmed) return
      console.log('Copy files...')
      const PATH_TO_COPY = 'lga-tst'
      copyDir('src/config/common', PATH_TO_COPY)

      if (answers.project) {
        copyDir(`src/config/${answers.project}`, PATH_TO_COPY)
      }

      if (answers.husky) {
        createDir(`${PATH_TO_COPY}/.husky`)
        if (answers.husky.includes('husky-lint-format')) {
          copyDir(`.husky/pre-commit`, `${PATH_TO_COPY}/.husky`)
        }
        if (answers.husky.includes('husky-conventionnal-commit')) {
          copyDir(`.husky/commit-msg`, `${PATH_TO_COPY}./husky`)
          copyFile('.commitlintrc.json', `${PATH_TO_COPY}/.commitlintrc.json`)
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })

  // function to create a directory form the given path
  const createDir = async (path) => {
    await fs.mkdir(path, { recursive: true })
  }

  const copyFile = async (src, dest) => {
    await fs.copyFile(src, dest)
  }

  // function to copy a directory to a destination
  const copyDir = async (src, dest) => {
    src = path.join(__dirname, '..', src)
    dest = path.join(process.cwd(), dest)
    await createDir(dest)
    const entries = await fs.readdir(src, { withFileTypes: true })
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)
      await copyFile(srcPath, destPath)
    }
  }
}

run()
