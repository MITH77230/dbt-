# DBT Awareness Portal - Run Guide

This guide provides step-by-step instructions to run the DBT Awareness Portal application locally.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Git** (optional, for cloning the repository)
   - Download from: https://git-scm.com/

## Installation Steps

### Step 1: Clone or Download the Project

If you have Git installed:
```bash
git clone <repository-url>
cd "DBT Awareness Portal Design (1)"
```

Alternatively, download the ZIP file from the repository and extract it to your desired location.

### Step 2: Install Dependencies

Open a terminal/command prompt and navigate to the project directory:

```bash
cd "DBT Awareness Portal Design (1)"
npm install
```

This command will install all required dependencies listed in `package.json`.

## Running the Application

### Step 3: Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

You should see output similar to:
```
VITE v6.3.5  ready in 313 ms

➜  Local:   http://localhost:3001/
➜  Network: use --host to expose
```

### Step 4: Access the Application

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Navigate to: `http://localhost:3001/`
3. The DBT Awareness Portal landing page should load

## Testing the Application

### Step 5: Test Login Functionality

1. From the landing page, click on any login card (Student, Institution, Panchayat, or Admin)
2. Verify the login form is centered on the page
3. Check that the "Back" button is present and functional (should return to landing page)
4. For Student login:
   - Test the OTP input field (accepts text input)
   - Try entering CAPTCHA and submitting the form

### Step 6: Test Navigation

1. Navigate between different login pages
2. Use the "Back" buttons to return to the landing page
3. Verify responsive design on different screen sizes (resize browser window)

## Troubleshooting

### Common Issues

1. **Port 3000 already in use:**
   - The application will automatically use port 3001
   - If needed, you can specify a different port: `npm run dev -- --port 3002`

2. **Dependencies installation fails:**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

3. **Application doesn't load:**
   - Check that the development server is running
   - Verify the URL in the browser
   - Check browser console for errors (F12 → Console tab)

### Stopping the Server

To stop the development server, press `Ctrl + C` in the terminal where it's running.

## Development Notes

- The application uses Vite as the build tool
- Hot module replacement is enabled for development
- Changes to source files will automatically reload in the browser
- The application is built with React and TypeScript

## Next Steps

After successfully running the application:

1. Explore the different login pages
2. Test form validation and submission
3. Review the UI/UX for any improvements
4. Consider implementing actual authentication logic for production use
