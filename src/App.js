import { Component, Suspense, lazy } from 'react';

import Page1 from './Components/Page1';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
      component: null
    }
  }
  onRouteChange = (route) => {
    if (route === 'page1') {
      this.setState({ route: route })
    } else if (route === 'page2') {
      const Page2 = lazy(() => import('./Components/Page2'))

      this.setState({ route: route, component: <Page2 onRouteChange={this.onRouteChange} /> })
    } else {
      const Page3 = lazy(() => import('./Components/Page3'))

      this.setState({ route: route, component: <Page3 onRouteChange={this.onRouteChange} /> })
    }
  }

  render() {
    if (this.state.route === 'page1') {
      return <Page1 onRouteChange={this.onRouteChange} />
    } else {
      return <Suspense fallback={<div>Loading...</div>}>{this.state.component}</Suspense>;
    }

  }
}

export default App;
