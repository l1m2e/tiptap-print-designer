import { unlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 删除复制的 README.md 和 LICENSE 文件
const packageDir = join(__dirname, '../')

try {
  unlinkSync(join(packageDir, 'README.md'))
  unlinkSync(join(packageDir, 'LICENSE'))
  console.log('✅ Successfully removed copied README.md and LICENSE files')
}
catch (error) {
  console.error('❌ Error removing files:', error)
  process.exit(1)
}
