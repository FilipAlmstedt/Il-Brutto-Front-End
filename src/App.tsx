import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./SCSS/App.scss";
import { HomePage } from "./Components/Pages/HomePage";
import { MenuPage } from "./Components/Pages/MenuPage";
import { BookingPage } from "./Components/Pages/BookingPage";
import { ConfirmationPage } from "./Components/Pages/ConfirmationPage";
import { AdminPage } from "./Components/Pages/AdminPage";
import { PageNotFound } from "./Components/Pages/PageNotFound";
import { Navbar } from "./Components/Layout/Navbar";
import { Footer } from "./Components/Layout/Footer" 

function App() {
  return (
    <div className="App">
      <Router>
    
      <Navbar></Navbar>

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
      </Switch>

      <Footer></Footer>

    </Router>
    </div>
  );
}

export default App;
