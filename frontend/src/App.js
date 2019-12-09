import React, { Component } from 'react';
import './App.css';
import Main from './Main';
import {BrowserRouter} from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
});
//App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      {/* //Use Browser Router to route to different pages */}
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
      </ApolloProvider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;
