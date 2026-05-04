const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const newProductsPath = path.join(__dirname, 'new_products.txt');

let productsContent = fs.readFileSync(productsFilePath, 'utf8');
let newProductsContent = fs.readFileSync(newProductsPath, 'utf16le'); // Assuming UTF-16 if it was created with > in PS

// Clean up newProductsContent if it has weird encoding or BOM
if (newProductsContent.charCodeAt(0) === 0xFEFF) {
    newProductsContent = newProductsContent.slice(1);
}

// Find the last ];
const lastBracketIndex = productsContent.lastIndexOf('];');

if (lastBracketIndex !== -1) {
    const updatedContent = productsContent.slice(0, lastBracketIndex) + newProductsContent + '\n];\n';
    fs.writeFileSync(productsFilePath, updatedContent);
    console.log('Successfully updated products.ts');
} else {
    console.error('Could not find closing bracket ]; in products.ts');
}
