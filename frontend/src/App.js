import logo from './logo.svg';
import './App.css';
import { Landing, Present, Future } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  return (


    <Router>

      <div className="App">
        <div className="content">

          <Routes>

            <Route
              exact
              path="/"
              element={
                <>
                  <Landing />
                </>
              }
            />

          <Route
              exact
              path="/present"
              element={
                <>
                  <Present />
                </>
              }
            />

          <Route
              exact
              path="/future"
              element={
                <>
                  <Future />
                </>
              }
            />


          </Routes>




        </div>

            
      </div>

    </Router>
    
  );
}

export default App;
