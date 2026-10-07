/*
CLI validation and SVG compilation script

TODO: Implement a Node.js script that takes an input Mermaid file (docs/architecture/schema.mmd) and compiles it to 
an SVG file (docs/architecture/erd.svg) using the pre-installed @mermaid-js/mermaid-cli binary (npx mmdc)

Compiles the SVG to docs/architecture/erd.svg, prints SUCCESS, and exits with code 0

Catches compilation errors, prints SYNTAX_ERROR: followed by the stderr trace, and exits with non-zero code 1
*/

import { spawnSync } from 'child_process'; // Import spawnSync function from child_process module
import path from 'path';   // Import path module
import { fileURLToPath } from 'url';   // Import fileURLToPath function from url module

const __filename = fileURLToPath(import.meta.url);   // Get current file path
const __dirname = path.dirname(__filename);   // Get current directory path

const projectRoot = path.resolve(__dirname, '../../../..');   // Get absolute path of project root directory

const inputArgument = process.argv[2] || "docs/architecture/schema.mmd";   // Get input argument from command line

const inputFilePath = path.resolve(projectRoot, inputArgument);   // Define the input file path to Mermaid file
const outputFilePath = path.resolve(projectRoot, 'docs/architecture/erd.svg'); // Define output file path for SVG file
const result = spawnSync('npx', ['mmdc', '-i', inputFilePath, '-o', outputFilePath], {
  cwd: projectRoot,
  encoding: 'utf-8'
});    // Execute the Mermaid CLI command

if (result.error) { // If there is an error
  console.error(`SYNTAX_ERROR: ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {  // If the Mermaid CLI command fails
  console.error(`SYNTAX_ERROR: ${result.stderr}`);
  process.exit(1);
}

console.log('SUCCESS'); // If no errors, print SUCCESS and exit with code 0
process.exit(0);