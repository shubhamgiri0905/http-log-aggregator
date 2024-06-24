
```markdown
# HTTP Log Aggregator

## Overview

The HTTP Log Aggregator is a Node.js and Typescript based application designed to process HTTP log files, aggregate the data based on specified time windows, and output the aggregated results in JSON format. This application is optimized to handle very large log files efficiently.

## Features

- Aggregates log data by specified time windows
- Calculates total requests, average bytes sent, and status code counts for each URL within each time window
- Processes log files using streams to handle large files without excessive memory usage
- Performs on-the-fly aggregation to avoid sorting the entire dataset

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/shubhamgiri0905/http-log-aggregator.git
    ```

2. Navigate to the project directory:
    ```bash
    cd http-log-aggregator
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

Run the program using the following command:
```bash
ts-node src/index.ts -i <input_file_path> -o <output_file_path> -w <window_size>
```
- `-i <input_file_path>`: Path to the input CSV log file.
- `-o <output_file_path>`: Path to the output JSON file.
- `-w <window_size>`: Size of the aggregation window in minutes (default is 60 minutes).

## Example

```bash
ts-node src/index.ts -i logs.csv -o aggregated_output.json -w 60
```

## Scalability Improvements

### Issue 1: Reading the Entire File into Memory

**Problem**: Initially, the program read the entire log file into memory, which could cause memory issues for very large files.

**Solution**: The program now uses Node.js streams to read the log file. This allows the program to process the file line by line, significantly reducing memory usage.

### Issue 2: Sorting the File Based on Timestamp

**Problem**: Sorting the entire dataset based on timestamps was inefficient for large datasets.

**Solution**: The program now performs on-the-fly aggregation without requiring a full sort. It dynamically calculates the current time window and aggregates data as it reads each log entry. This approach scales better for large datasets as it avoids the overhead of sorting.

## Code Changes

### src/aggregator.ts

- Removed the sorting step.
- Updated the `aggregateLogs` function to aggregate data on-the-fly as log entries are processed.

### src/index.ts

- Updated to use the `parseLogFile` function, which reads the log file using streams.

### src/utils.ts

- Added the `parseLogFile` function to read the log file line by line using streams.

### src/types.ts

- No changes were made to this file, but it defines the TypeScript interfaces used in the project.

## Contribution

Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License.

```
