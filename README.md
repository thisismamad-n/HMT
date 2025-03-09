# HMT (Health Monitoring Tool)

This repository contains a Next.js application with a dashboard for health monitoring. The application is built with React, Next.js 15.2.1, and includes various UI components from Shadcn UI, Radix UI, and other libraries.

## Prerequisites

Before you begin, ensure your development environment meets the following requirements:

- [Node.js](https://nodejs.org/) (recommended: Latest LTS version, at least v18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- Git (for version control)

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/thisismamad-n/HMT.git
   cd HMT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   (or if you prefer yarn or pnpm):
   ```bash
   yarn install
   # or
   pnpm install
   ```

3. Set up fonts:
   The application uses Vazirmatn font. You need to create a `fonts` directory in the `public` folder and add the Vazirmatn font files (especially Vazirmatn-Regular.woff2):
   ```bash
   mkdir -p public/fonts
   ```
   
   Then download the Vazirmatn font files from [the official source](https://github.com/rastikerdar/vazirmatn/releases) and place them in the `public/fonts` directory.

## Development

To start the development server:

```bash
npm run dev
```

This will start the Next.js development server, and the application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Project Structure

- `src/app`: Contains the pages and routes of the application
  - `dashboard/`: Dashboard-related pages and components
  - `page.tsx`: Main landing page
  - `globals.css`: Global CSS styles
  - `layout.tsx`: Root layout component

- `src/components`: Reusable UI components
- `src/lib`: Utility functions and libraries
- `src/context`: React context providers for state management
- `public`: Static assets (images, fonts, etc.)

## Features

- Next.js 15.2.1 app router
- Modern UI with Shadcn UI and Radix UI components
- Health monitoring dashboard
- Responsive design
- Persian (Farsi) language support with Vazirmatn font
- Charts and data visualization with Recharts and Chart.js

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts the production server
- `npm run lint`: Runs the linter (ESLint)
- `npm run install-components`: Installs Shadcn UI components

## Dependencies

The project uses several key dependencies:

- **Next.js and React**: Core framework and library
- **UI Components**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form, Zod
- **Data Visualization**: Recharts, Chart.js
- **Date Handling**: date-fns, date-fns-jalali
- **Animations**: Framer Motion

## Browser Support

The application supports modern browsers, including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

If you encounter the error `GET /fonts/Vazirmatn-Regular.woff2 404`, make sure you've added the font files to the `public/fonts` directory as described in the installation section.

For other issues, please check that your Node.js version is compatible with Next.js 15.2.1.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Developed by [@thisismamad-n](https://github.com/thisismamad-n) 