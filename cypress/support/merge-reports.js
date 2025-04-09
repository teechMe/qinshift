const fs = require('fs');
const path = require('path');
const { parseString, Builder } = require('xml2js');

// UNIVERSAL PATH SOLUTION (works locally and in CI)
const resultsDir = path.join(process.cwd(), 'cypress', 'results');
const outputFile = path.join(resultsDir, 'merged-results.xml');

console.log(`Looking for reports in: ${resultsDir}`);

// Get all XML files except the merged one
const files = fs.readdirSync(resultsDir)
  .filter(file => file.endsWith('.xml') && !file.includes('merged-results'))
  .map(file => path.join(resultsDir, file));

console.log(`Found ${files.length} files to merge`);

// Custom merger function (UNCHANGED FROM YOUR VERSION)
async function mergeJunitFiles(files, outputPath) {
  const merged = {
    testsuites: {
      $: { name: "Mocha Tests", time: "0", tests: "0", failures: "0" },
      testsuite: []
    }
  };

  let totalTests = 0;
  let totalTime = 0;
  let totalFailures = 0;

  for (const file of files) {
    const xml = fs.readFileSync(file, 'utf8');
    const result = await parseStringPromise(xml);
    
    if (result.testsuites && result.testsuites.testsuite) {
      result.testsuites.testsuite.forEach(suite => {
        merged.testsuites.testsuite.push(suite);
        
        if (suite.$) {
          totalTests += parseInt(suite.$.tests || '0');
          totalTime += parseFloat(suite.$.time || '0');
          totalFailures += parseInt(suite.$.failures || '0');
        }
      });
    }
  }

  merged.testsuites.$.tests = totalTests.toString();
  merged.testsuites.$.time = totalTime.toFixed(3);
  merged.testsuites.$.failures = totalFailures.toString();

  const builder = new Builder();
  const mergedXml = builder.buildObject(merged);
  fs.writeFileSync(outputPath, mergedXml);
}

// Helper function (UNCHANGED)
function parseStringPromise(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Run the merge (UNCHANGED)
mergeJunitFiles(files, outputFile)
  .then(() => {
    console.log(`✅ Successfully merged ${files.length} files into ${outputFile}`);
    const mergedContent = fs.readFileSync(outputFile, 'utf-8');
    console.log('\nMerged file starts with:\n', mergedContent.substring(0, 200));
  })
  .catch(err => {
    console.error('❌ Merge failed:', err);
    process.exit(1);
  });