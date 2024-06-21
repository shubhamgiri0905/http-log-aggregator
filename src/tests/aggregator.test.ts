// src/aggregator.test.ts

import { aggregateLogs } from '../aggregator';
import { LogEntry } from '../types';

const logs: LogEntry[] = [
    { timestamp: 1623456000, url: '/gps', status_code: 200, bytes_sent: 1024 },
    { timestamp: 1623456300, url: '/tracker-recap', status_code: 200, bytes_sent: 2048 },
    { timestamp: 1623456600, url: '/rfid-scan', status_code: 201, bytes_sent: 512 },
];

describe('aggregateLogs', () => {
    it('should aggregate logs correctly for a 60-minute window', () => {
        const windowSize = 60; // 60 minutes
        const result = aggregateLogs(logs, windowSize);
        expect(result).toEqual([
            {
                time_window: '1623456000-1623459600',
                url: '/gps',
                total_requests: 1,
                avg_bytes_sent: 1024,
                status_code_counts: { 200: 1 },
            },
            {
                time_window: '1623456000-1623459600',
                url: '/tracker-recap',
                total_requests: 1,
                avg_bytes_sent: 2048,
                status_code_counts: { 200: 1 },
            },
            {
                time_window: '1623456000-1623459600',
                url: '/rfid-scan',
                total_requests: 1,
                avg_bytes_sent: 512,
                status_code_counts: { 201: 1 },
            },
        ]);
    });
});
