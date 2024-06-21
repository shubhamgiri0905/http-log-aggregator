// src/types.ts

export interface LogEntry {
    timestamp: number;
    url: string;
    status_code: number;
    bytes_sent: number;
}

export interface AggregatedData {
    time_window: string;
    url: string;
    total_requests: number;
    avg_bytes_sent: number;
    status_code_counts: Record<number, number>;
}
