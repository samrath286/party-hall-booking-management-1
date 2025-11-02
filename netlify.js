// This file is used by Netlify to build the project
console.log('Starting Netlify build process...');

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Cleaning npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });

  console.log('Removing node_modules if it exists...');
  try {
    if (fs.existsSync('node_modules')) {
      execSync('rm -rf node_modules', { stdio: 'inherit' });
    }
  } catch (e) {
    console.log('Error removing node_modules:', e.message);
  }

  console.log('Trying to install dependencies with main package.json...');
  try {
    execSync('npm install --legacy-peer-deps --no-fund --no-audit --force', { stdio: 'inherit' });
  } catch (e) {
    console.log('Main package.json install failed, trying with fallback package.json...');
    
    // Backup original package.json
    if (fs.existsSync('package.json')) {
      fs.copyFileSync('package.json', 'package.json.backup');
    }
    
    // Use the fallback package.json
    if (fs.existsSync('netlify-package.json')) {
      fs.copyFileSync('netlify-package.json', 'package.json');
      console.log('Using fallback package.json');
      
      // Try installing with the fallback package.json
      execSync('npm install --no-fund --no-audit', { stdio: 'inherit' });
    } else {
      console.error('Fallback package.json not found!');
      throw new Error('Both main and fallback package.json installs failed');
    }
  }

  console.log('Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
