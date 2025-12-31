import mysql from 'mysql2/promise'
import chalk from 'chalk'

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
})

const testConnection = async () => {
  try {
    await db.query('SELECT 1')
    
    // Kotak dekoratif ala Nuxt
    const line = '+'.padEnd(40, '-') + '+'
    const msg = '|    DB CONNECTED SUCCESSFULLY!    |'
    
    console.log(chalk.green(line))
    console.log(chalk.green(msg))
    console.log(chalk.green(line))
  } catch (err) {
    console.error(chalk.red('❌ DB CONNECTION FAILED:'), err)
  }
}

// langsung panggil biar muncul saat npm run dev
testConnection()
