// src/aggregator.ts

import { LogEntry, AggregatedData } from './types';
import { formatTimeWindow } from './utils';

export const aggregateLogs = (logs: LogEntry[], windowSize: number): AggregatedData[] => {
    logs.sort((a, b) => a.timestamp - b.timestamp);

    const aggregatedData: AggregatedData[] = [];
    const windowSizeInSeconds = windowSize * 60;

    let currentWindowStart = logs[0].timestamp;
    let currentWindowEnd = currentWindowStart + windowSizeInSeconds;

    let windowData: { [key: string]: AggregatedData } = {};

    logs.forEach((log) => {
        if (log.timestamp >= currentWindowEnd) {
            // Push the aggregated data for the current window
            aggregatedData.push(...Object.values(windowData));
            // Reset the window
            windowData = {};
            currentWindowStart = currentWindowEnd;
            currentWindowEnd = currentWindowStart + windowSizeInSeconds;
        }

        if (!windowData[log.url]) {
            windowData[log.url] = {
                time_window: formatTimeWindow(currentWindowStart, currentWindowEnd),
                url: log.url,
                total_requests: 0,
                avg_bytes_sent: 0,
                status_code_counts: {},
            };
        }

        const entry = windowData[log.url];
        entry.total_requests++;
        entry.avg_bytes_sent += log.bytes_sent;
        entry.status_code_counts[log.status_code] = (entry.status_code_counts[log.status_code] || 0) + 1;
    });

    // Handle the last window
    if (Object.keys(windowData).length > 0) {
        aggregatedData.push(...Object.values(windowData));
    }

    // Calculate average bytes sent
    aggregatedData.forEach((entry) => {
        entry.avg_bytes_sent = Math.round(entry.avg_bytes_sent / entry.total_requests);
    });

    return aggregatedData;
};
