# Climate Event Stream Aggregation

A monorepo for simulating, aggregating, and visualizing real-time climate data using Nx, TypeScript, and React.

## Packages

- **stream-simulator**: Simulates real-time weather events and streams them via WebSocket.
- **candlestick-http-api**: Aggregates weather events into candlestick data and exposes an HTTP API.
- **ui**: React web app for visualizing candlestick data per city.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Install dependencies

```bash
npm install
```

### Running the project

You can start all services in parallel:

```bash
npm run start:all
```

Or run each service individually:

- Simulator: `npm run start:sim`
- API: `npm run start:api`
- UI: `npm run start:ui`

## Project Structure

```
src/packages/
  stream-simulator/        # Weather event WebSocket server
  candlestick-http-api/    # Aggregation and HTTP API
  ui/                      # React frontend
```

## Development

This project uses [Nx](https://nx.dev/) for monorepo management. Each package has its own `project.json` for Nx integration.

## License

ISC

