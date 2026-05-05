#!/usr/bin/env node

/**
 * Database Setup Script
 * This script helps set up the database for the Liquid Home Backend API
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 Liquid Home Database Setup')
console.log('==============================\n')

// Check if .env exists
const envPath = path.join(__dirname, '.env')
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found. Please copy .env.example to .env and configure your DATABASE_URL')
  process.exit(1)
}

// Check if DATABASE_URL is set
const envContent = fs.readFileSync(envPath, 'utf-8')
if (!envContent.includes('DATABASE_URL=') || envContent.includes('DATABASE_URL="postgresql://username:password@localhost:5432/liquidhome_db?schema=public"')) {
  console.log('❌ DATABASE_URL not configured in .env file')
  console.log('Please update your .env file with a valid PostgreSQL connection string')
  process.exit(1)
}

console.log('✅ Environment configured')

try {
  console.log('📦 Installing dependencies...')
  execSync('npm install', { stdio: 'inherit' })

  console.log('🔧 Generating Prisma client...')
  execSync('npm run db:generate', { stdio: 'inherit' })

  console.log('🗄️  Pushing database schema...')
  execSync('npm run db:push', { stdio: 'inherit' })

  console.log('✅ Database setup complete!')
  console.log('\n🎉 You can now start the development server with: npm run dev')
  console.log('🛠️  To view your database, run: npm run db:studio')

} catch (error) {
  console.error('❌ Database setup failed:', error.message)
  console.log('\n🔍 Troubleshooting:')
  console.log('1. Make sure PostgreSQL is running')
  console.log('2. Check your DATABASE_URL in .env')
  console.log('3. Ensure you have database creation permissions')
  process.exit(1)
}