import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Components/HomePage";
import { MenuPage } from "./Components/MenuPage";
import { BookingPage } from "./Components/BookingPage";
import { ConfirmationPage } from "./Components/ConfirmationPage";
import { AdminPage } from "./Components/AdminPage";
import { PageNotFound } from "./Components/PageNotFound";

function App() {
  return (
    <div className="App">
      <h1>App works!</h1>
      <Router>
    
     <nav>
       {/* När navbar-komponenten är skapad, lägg in här: <Navbar/> */}
     </nav>

      <Switch>
        <Route exact path="/">
          <HomePage></HomePage>
        </Route>

        <Route path="/menu">
          <MenuPage></MenuPage>
        </Route>

        <Route path="/booking">
          <BookingPage></BookingPage>
        </Route>

        <Route path="/confirmation/:id">
          <ConfirmationPage></ConfirmationPage>
        </Route>

        <Route path="/admin">
          <AdminPage></AdminPage>
        </Route>

        <Route path="*">
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>]

      <footer>
        {/* När footer-komponenten är skapad, lägg in här: <Footer/> */}
      </footer>

    </Router>
    </div>
  );
}

export default App;
