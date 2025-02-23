import fs from 'fs';  

// Function to count single quotes in a line  
function countSingleQuotes(line) {  
    return (line.match(/'/g) || []).length; // Count single quotes using regex  
}  

// Function to count commas in a line  
function countCommas(line) {  
    return (line.match(/,/g) || []).length; // Count commas using regex  
}  

// Function to count the number of values in an SQL INSERT line  
function countSqlValues(line) {  
    const values = line.replace(/[()]/g, '').split(',').map(value => value.trim());  
    return values.length; // Return the count of values  
}  

// Read the file  
fs.readFile('testData.txt', 'utf8', (err, data) => {  
    if (err) {  
        console.error('Error reading the file:', err);  
        return;  
    }  

    // Split the data into lines  
    const lines = data.split('\n');  

    // Loop through each line and process it  
    lines.forEach((line, index) => {  
        const singleQuoteCount = countSingleQuotes(line);  
        const commaCount = countCommas(line); // Count commas in the line  
        
        // Log the line if it has more than 6 single quotes  
        if (commaCount != 9) {  
            // console.log(`Line ${index + 1}: ${singleQuoteCount} single quotes - ${line}`);  
            console.log(`Line ${index + 1} has ${commaCount} commas.`);  
        }  

        // Log the number of commas in the line  

        // Get the count of SQL values in the line  
        // const sqlValuesCount = countSqlValues(line);  
        // console.log(`Line ${index + 1} has ${sqlValuesCount} SQL values.`);  
    });  
});