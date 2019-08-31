import React from 'react';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import branches from './data/ibm-fed-branches';
import Nav from './components/Nav';
import WeatherCard from './components/WeatherCard';

/*
    We import our Context.Provider and wrap it around
    our app so child components have access to global 
    temperature scale (celsius or fahrenheit)
*/
import TemperatureScaleProvider from './context/TemperatureScaleContext';

const App = () => {
  return (
    <div className="app">
      <TemperatureScaleProvider>
        <Nav />
        <Content>
          <div className="bx--grid bx--grid--no-gutter">
            <div className="bx--row">
              <h1 className="bx--col-sm-4 bx--col-md-8 bx--col-lg-16">
                FED@IBM Weather Center
              </h1>
            </div>
            <div className="bx--row">
              {branches.map((branch, index) => (
                <WeatherCard key={branch.name} location={branch} />
              ))}
            </div>
          </div>
        </Content>
      </TemperatureScaleProvider>
    </div>
  );
};

export default App;
