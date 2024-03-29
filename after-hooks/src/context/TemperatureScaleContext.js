import React, { createContext, useReducer } from 'react';

const TemperatureScaleContext = createContext();

function scaleReducer(state, action) {
  switch (action.type) {
    case 'C':
      return action.type;
    case 'F':
      return action.type;
    /*
      TODO: We could improve the app by adding a dropdown instead of a
      toggle button so that multiple temperature scales could be selected
    case 'K':
      return action.type;
    */
    default:
      throw new Error();
  }
}

const TemperatureScaleProvider = ({ children }) => {
  const [scale, dispatch] = useReducer(scaleReducer, 'C');

  return (
    <TemperatureScaleContext.Provider value={{ scale, dispatch }}>
      {children}
    </TemperatureScaleContext.Provider>
  );
};

export { TemperatureScaleContext };
export default TemperatureScaleProvider;
