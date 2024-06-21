# HTTP Log Aggregation Console Program

## Overview
This console program reads a CSV file containing HTTP log data, performs aggregation and computation based on a configurable time window, and outputs the results to a file.

## Requirements
- Node.js
- TypeScript

## Setup
1. Clone the repository:
    ```bash
   git clone https://github.com/shubhamgiri0905/http-log-aggregator.git
   cd http-log-aggregator

2. Install dependencies:
    ```sh
    npm install
    ```

## Running the Program
```sh
npx ts-node src/index.ts -i <input_file_path> -o <output_file_path> -w <window_size_in_minutes>
