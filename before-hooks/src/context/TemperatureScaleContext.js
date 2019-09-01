import React, { createContext, Component } from 'react';

const TemperatureScaleContext = createContext();

class TemperatureScaleProvider extends Component {
  state = {
    scale: 'C',
  };

  render() {
    const value = {
      scale: this.state.scale,
      updateScale: scale => this.setState({ scale }),
    };

    return (
      <TemperatureScaleContext.Provider value={value}>
        {this.props.children}
      </TemperatureScaleContext.Provider>
    );
  }
}

export { TemperatureScaleContext };
export default TemperatureScaleProvider;
