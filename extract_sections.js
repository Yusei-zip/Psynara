const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'css', 'style.css');
const testsPath = path.join(__dirname, 'css', 'tests.css');
const responsivePath = path.join(__dirname, 'css', 'responsive.css');
const sectionsPath = path.join(__dirname, 'css', 'sections.css');

let styleContent = fs.readFileSync(stylePath, 'utf8');
let testsContent = fs.readFileSync(testsPath, 'utf8');

// We will extract everything between /* Hero Section */ and /* Animations */ from style.css
// Note: /* Contact */ ends right before /* Footer */
const sectionsStart = styleContent.indexOf('/* Hero Section */');
const footerStart = styleContent.indexOf('/* Footer */');

let sectionsCSS = styleContent.substring(sectionsStart, footerStart);

// Now append tests content
sectionsCSS += `\n/* =========================================\n   Tests Section\n   ========================================= */\n`;
sectionsCSS += testsContent;

fs.writeFileSync(sectionsPath, sectionsCSS);

// Now handle responsive.css by appending the remaining media queries from style.css
let responsiveContent = fs.readFileSync(responsivePath, 'utf8');
const mediaQueriesStart = styleContent.indexOf('/* Responsive */');
if (mediaQueriesStart !== -1) {
    const mediaQueriesCSS = styleContent.substring(mediaQueriesStart);
    // Append to the end of responsive.css
    responsiveContent += `\n\n/* Migrated from style.css */\n` + mediaQueriesCSS;
    fs.writeFileSync(responsivePath, responsiveContent);
}

console.log("sections.css created and responsive.css updated.");
