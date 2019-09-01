import React, { useContext } from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react/lib/components/UIShell';
import Temperature16 from '@carbon/icons-react/lib/temperature/16';
import { TemperatureScaleContext } from '../../context/TemperatureScaleContext';
import packageJson from '../../../package.json';

const Nav = () => {
  const { scale, dispatch } = useContext(TemperatureScaleContext);

  const toggleTemperatureScale = () =>
    dispatch({ type: scale === 'C' ? 'F' : 'C' });

  return (
    <Header aria-label="FED@IBM Dublin">
      <HeaderName href="#" prefix="FED@IBM">
        Dublin
      </HeaderName>
      <HeaderNavigation aria-label="navigation">
        <HeaderMenuItem>React v{packageJson.dependencies.react}</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="toggle temperature scale from celsius to fahrenheit"
          onClick={() => toggleTemperatureScale()}>
          <span className={`toggle-temperature-scale scale-type__${scale}`}>
            <Temperature16 />
            {scale}°
          </span>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};

export default Nav;
