// src/index.ts

import { parseCSV } from './utils';
import { aggregateLogs } from './aggregator';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const inputFilePath = args[args.indexOf('-i') + 1];
const outputFilePath = args[args.indexOf('-o') + 1];
const windowSize = args.includes('-w') ? parseInt(args[args.indexOf('-w') + 1], 10) : 60;

if (!inputFilePath || !outputFilePath) {
    console.error('Input and output file paths are required.');
    process.exit(1);
}

parseCSV(inputFilePath)
    .then((logs) => {
        const aggregatedData = aggregateLogs(logs, windowSize);
        fs.writeFileSync(outputFilePath, JSON.stringify(aggregatedData, null, 2));
        console.log('Aggregation complete. Output written to', outputFilePath);
    })
    .catch((error) => {
        console.error('Error processing CSV file:', error);
        process.exit(1);
    });
