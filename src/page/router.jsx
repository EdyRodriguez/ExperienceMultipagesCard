// src/page/router.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './Home';
import PokeApiPage from './Pokeapi';
import ServerlessApiPage from './ServerlessApi';

const RouterPage = (props) => {
  return (
    <Router basename={props.pageInfo?.basePath}>
      <Switch>
        {/* Keep Home exact so it doesn't swallow subroutes */}
        <Route exact path="/">
          <Home {...props} />
        </Route>

        <Route path="/pokeapi">
          <PokeApiPage />
        </Route>

        <Route path="/ethos">
          <div>Placeholder</div>
        </Route>

        {/* NEW: capture cardId in the path. Must be ABOVE the generic /serverless route */}
        <Route
          path="/serverless/card/:cardId"
          render={(routeProps) => (
            <ServerlessApiPage
              pageInfo={{ ...props.pageInfo, cardId: routeProps.match.params.cardId }}
            />
          )}
        />

        {/* Fallback /serverless without param (works with query or hook/pageInfo, too) */}
        <Route path="/serverless">
          <ServerlessApiPage pageInfo={props.pageInfo} />
        </Route>
      </Switch>
    </Router>
  );
};

RouterPage.propTypes = {
  pageInfo: PropTypes.object
};

export default RouterPage;
