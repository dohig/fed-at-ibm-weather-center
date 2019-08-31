import React, { createContext, Component } from 'react';

const TemperatureScaleContext = createContext();
class TemperatureScaleProvider extends Component {
  state = {
    scale: 'C',
    dispatch: action => this.setState({ scale: this.dispatch(action) }),
  };

  dispatch(action) {
    switch (action.type) {
      case 'C':
        return action.type;
      case 'F':
        return action.type;
      /*
        TODO: We could extend the app by adding a dropdown
        so that multiple temperature scales could be selected
        such as Kelvin
      case 'K':
        return action.type;
      */
      default:
        throw new Error();
    }
  }
  render() {
    return (
      <TemperatureScaleContext.Provider
        value={{ scale: this.state.scale, dispatch: this.state.dispatch }}>
        {this.props.children}
      </TemperatureScaleContext.Provider>
    );
  }
}

export { TemperatureScaleContext };
export default TemperatureScaleProvider;
