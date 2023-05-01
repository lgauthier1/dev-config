import fs from 'fs/promises'
import path from 'path'

export class FileManager {
  constructor(dirname = '.', rootDest = null) {
    this.dirname = path.join(dirname, '..')
    this.rootDest = rootDest || process.cwd()
    this.createDestDir()
  }

  async createDestDir(pathToDir) {
    let realPath = path.join(this.rootDest)
    if (pathToDir) {
      realPath = path.join(this.rootDest, pathToDir)
    }
    await fs.mkdir(realPath, { recursive: true })
  }

  async readSrcDir(srcPath) {
    const realSrcPath = path.join(this.dirname, srcPath)
    const entries = await fs.readdir(realSrcPath, { withFileTypes: true })
    return entries
  }

  async copyFile(file, srcDir, destDir) {
    await this.createDestDir(destDir)
    const realSrcPath = path.join(this.dirname, srcDir, file)
    const realDestPath = path.join(this.rootDest, destDir, file)
    console.log(`Copy ${realSrcPath} => ${realDestPath}`)
    await fs.copyFile(realSrcPath, realDestPath)
  }

  // Copy a folder
  async copyDirAndContent(src, destDir) {
    const dest = destDir || src
    await this.createDestDir(dest)
    const entries = await this.readSrcDir(src)
    entries.forEach(async (entry) => {
      await this.copyFile(entry.name, src, dest)
    })
  }
}
