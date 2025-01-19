# dua-server

A Prisma-based server for managing data with SQLite.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) (Package Manager)
  - If `pnpm` is not installed, install it using:
    ```bash
    npm i -g pnpm
    ```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/euhansarkar/dua-server
   ```

2. **Navigate to the project directory:**
   ```bash
   cd dua-server
   ```

3. **Install dependencies:**
   ```bash
   pnpm i
   ```

### Configuration

1. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="file:./dua_main.sqlite"
   ```

2. **Generate Prisma client:**
   ```bash
   pnpm prisma generate
   ```

### Running the Server

1. **Start the development server:**
   ```bash
   pnpm dev
   ```

The server will run on `http://localhost:5000` by default.

## Additional Notes

- Ensure your `DATABASE_URL` in the `.env` file points to the correct SQLite file.
- Use `pnpm prisma generate` whenever you make changes to the Prisma schema.

## Scripts

- `pnpm i`: Installs dependencies.
- `pnpm prisma generate`: Generates the Prisma client.
- `pnpm dev`: Starts the development server.
