// src/utils.ts

import fs from 'fs';
import csv from 'csv-parser';
import { LogEntry } from './types';

export const parseLogFile = (filePath: string): Promise<LogEntry[]> => {
    return new Promise((resolve, reject) => {
        const results: LogEntry[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                results.push({
                    timestamp: parseInt(data.timestamp, 10),
                    url: data.url,
                    status_code: parseInt(data.status_code, 10),
                    bytes_sent: parseInt(data.bytes_sent, 10),
                });
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export const formatTimeWindow = (start: number, end: number): string => {
    return `${start}-${end}`;
};
