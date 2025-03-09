#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// List of all available shadcn/ui components
const availableComponents = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'collapsible',
  'command',
  'context-menu',
  'dialog',
  'drawer',
  'dropdown-menu',
  'form',
  'hover-card',
  'input',
  'label',
  'menubar',
  'navigation-menu',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'resizable',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'slider',
  'sonner',
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'toggle-group',
  'tooltip',
];

// Function to check if a component is already installed
function isComponentInstalled(componentName) {
  const componentPath = path.join(__dirname, 'src', 'components', 'ui', `${componentName}.tsx`);
  return fs.existsSync(componentPath);
}

// Function to install a component using shadcn
function installComponent(componentName) {
  try {
    console.log(`Installing ${componentName}...`);
    execSync(`npx shadcn@latest add ${componentName} --yes`, { stdio: 'inherit' });
    console.log(`✅ ${componentName} installed successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to install ${componentName}: ${error.message}`);
    return false;
  }
}

// Main function to install missing components
function installMissingComponents() {
  console.log('Checking for missing shadcn/ui components...');
  
  const missingComponents = availableComponents.filter(component => !isComponentInstalled(component));
  
  if (missingComponents.length === 0) {
    console.log('✅ All shadcn/ui components are already installed!');
    return;
  }
  
  console.log(`Found ${missingComponents.length} missing components: ${missingComponents.join(', ')}`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const component of missingComponents) {
    const success = installComponent(component);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log('\n--- Installation Summary ---');
  console.log(`✅ ${successCount} components installed successfully`);
  if (failCount > 0) {
    console.log(`❌ ${failCount} components failed to install`);
  }
}

// Execute the main function
installMissingComponents(); 