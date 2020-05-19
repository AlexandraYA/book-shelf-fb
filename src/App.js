import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import BookDetail from './pages/BookDetail'
import ManageBooks from './pages/ManageBooks'
import ManagePlaces from './pages/ManagePlaces'
import Auth from './pages/Auth'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/create" component={CreateBook} />
        <Route path="/edit" component={EditBook} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/books" exact component={ManageBooks} />
        <Route path="/places" exact component={ManagePlaces} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
