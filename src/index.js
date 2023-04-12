#! /usr/bin/env node
import inquirer from 'inquirer'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const run = async () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select your project type:',
        name: 'selection',
        choices: [
          {
            name: 'Node.js (prettier + eslint + *ignore)',
            value: 'nodejs'
          },
          {
            name: 'Node.js typescript',
            value: 'nodets',
            disabled: true
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
      copyDir('src/config/node', 'dev-config')
      copyDir('src/config/common', 'dev-config')
    })
    .catch((error) => {
      console.error('Error:', error)
    })

  // function to copy a directory to a destination
  const copyDir = async (src, dest) => {
    src = path.join(__dirname, '..', src)
    dest = path.join(process.cwd(), dest)
    await fs.mkdir(dest, { recursive: true })
    let entries = await fs.readdir(src, { withFileTypes: true })
    for (let entry of entries) {
      let srcPath = path.join(src, entry.name)
      let destPath = path.join(dest, entry.name)
      await fs.copyFile(srcPath, destPath)
    }
  }
}

run()
