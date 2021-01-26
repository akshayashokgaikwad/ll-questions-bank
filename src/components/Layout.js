import React from 'react';
import QuestionLayout from './QuestionLayout';
import Result from './Result';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { Route, Switch } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={QuestionLayout} />
          <Route exact path="/result" component={Result} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Provider>
    );
  };
}

export default Layout;