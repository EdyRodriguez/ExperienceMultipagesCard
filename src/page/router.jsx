import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './Home';
import PokeApiPage from './Pokeapi';

const RouterPage = (props) => {
    return (
        <Router basename={props.pageInfo?.basePath}>
            <Switch>
                {/* IMPORTANTE: exact, para que no capture /pokeapi, /ethos, etc. */}
                <Route exact path="/">
                    <Home {...props} />
                </Route>

                <Route path="/pokeapi">
                    <PokeApiPage/>
                </Route>

                <Route path="/ethos">
                    <div style={{ padding: 16 }}>
                        <h2>Ethos JWT</h2>
                        <p>Placeholder: aquí haremos getExtensionJwt() y console.log.</p>
                    </div>
                </Route>

                <Route path="/placeholder">
                    <div style={{ padding: 16 }}>
                        <h2>Placeholder</h2>
                        <p>Contenido pendiente de implementar.</p>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;
