import { Tracker } from 'meteor/tracker';
import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

export const GraphQLContext = React.createContext();
export const GraphQLProvider = ({ client, children }) => (
  <GraphQLContext.Provider value={client}>
    {children}
  </GraphQLContext.Provider>
);
GraphQLProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  client: PropTypes.object.isRequired,
  children: PropTypes.node,
};
GraphQLProvider.defaultProps = {
  children: null,
};

export const useQuery = (query, { variables } = {}) => {
  const client = useContext(GraphQLContext);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      client.query(query, variables)
        .then(({ errors, data }) => setState({ loading: false, error: errors, data }));
      // TODO: handle errors
    });

    return () => computation.stop();
  }, []);

  return state;
};

export const useSubscription = (query, { variables } = {}) => {
  const client = useContext(GraphQLContext);
  const [state, setState] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      const subscription = client.subscribe(query, variables);
      const loading = !subscription.ready();
      const { errors, data } = subscription.result() || { errors: null, data: null };

      setState({ loading, error: errors, data });
    });

    return () => computation.stop();
  }, []);

  return state;
};

export const useMutation = (mutation) => {
  const client = useContext(GraphQLContext);
  const [state, setState] = useState({ loading: true, error: null, data: null });
  const mutate = ({ variables }) => {
    setState({ ...state, loading: true });
    client.query(mutation, variables)
      .then(({ errors, data }) => setState({ loading: false, error: errors, data }));
    // TODO: handle errors
  };

  return [mutate, state];
};
