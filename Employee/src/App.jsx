<<<<<<< HEAD
import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRoutes from "./routes";
=======
import React from 'react'
import HomePage from './pages/HomePage'
>>>>>>> 630f512709503bbb4fadb43231e2f17fe9211662

function App() {
  return (
<<<<<<< HEAD
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
=======
    <>
     {/* <h1 className="text-4xl font-bold">Hello Tech Titans</h1> */}
     <HomePage/>
    </>
  )
>>>>>>> 630f512709503bbb4fadb43231e2f17fe9211662
}

export default App;
