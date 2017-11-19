import React from 'react';
import { inject, observer } from 'mobx-react/native';

import { createRootNavigator } from '@/router';
import { isSignedIn } from '@/auth';

@inject('UserStore')
@observer
export default class App extends React.Component {
  state = {
    signedIn: false,
  }

  async componentWillMount() {
    const { UserStore } = this.props;
    const { isAuthenticated, userKey } = await isSignedIn();

    this.setState({ signedIn: isAuthenticated });
    UserStore.setUserKey(userKey);
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
