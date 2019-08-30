import React from 'react';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import branches from './data/ibm-fed-branches';
import TemperatureScaleProvider from './context/TemperatureScaleContext';
import Nav from './components/Nav';
import WeatherCard from './components/WeatherCard';

const App = () => {
  return (
    <div className="app theme--g90">
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
