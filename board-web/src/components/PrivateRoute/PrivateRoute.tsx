import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
export const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
  
  return (
    <Route {...rest} render={props => {
      console.log(props);
      return (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect push to={{ pathname: '/login', state: { from: props.location } }} />
    )}} />
)}