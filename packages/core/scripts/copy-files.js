import { copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 复制根目录的 README.md 和 LICENSE 到当前包目录
const rootDir = join(__dirname, '../../../')
const packageDir = join(__dirname, '../')

try {
  copyFileSync(join(rootDir, 'README.md'), join(packageDir, 'README.md'))
  copyFileSync(join(rootDir, 'LICENSE'), join(packageDir, 'LICENSE'))
  console.log('✅ Successfully copied README.md and LICENSE files')
}
catch (error) {
  console.error('❌ Error copying files:', error)
  process.exit(1)
}
