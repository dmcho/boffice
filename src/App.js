import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ListPage, PostPage, EditorPage, NotFoundPage } from "pages";
import routes from "routes";
import { race } from "any-promise";

class App extends Component {
  routesList = routes => {
    return routes.map((route, i) => {
      return (
        <Route
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      );
    });
  };

  render() {
    const rotuerJSX = this.routesList(routes);

    return (
      <div>
        <Switch>{rotuerJSX}</Switch>
      </div>
    );
  }
}

export default App;
