import React, { Component } from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react/lib/components/UIShell';
import Temperature16 from '@carbon/icons-react/lib/temperature/16';
import packageJson from '../../../package.json';

/*
    We import our Context to access scale and dispatch variables which
    let us show the scale as an icon (e.g. F°) and toggle it when clicked (F° <=> C°)
*/
import { TemperatureScaleContext } from '../../context/TemperatureScaleContext';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggleTemperatureScale = this.toggleTemperatureScale.bind(this);
  }

  toggleTemperatureScale() {
    this.context.updateScale(this.context.scale === 'C' ? 'F' : 'C');
  }

  render() {
    return (
      <Header aria-label="FED@IBM Dublin">
        <HeaderName href="#" prefix="FED@IBM">
          Dublin
        </HeaderName>
        <HeaderNavigation aria-label="navigation">
          <HeaderMenuItem>
            React v{packageJson.dependencies.react}
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="toggle temperature scale from celsius to fahrenheit"
            onClick={() => this.toggleTemperatureScale()}>
            <span
              className={`toggle-temperature-scale scale-type__${this.context.scale}`}>
              <Temperature16 />
              {this.context.scale}°
            </span>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    );
  }
}

Nav.contextType = TemperatureScaleContext;

export default Nav;
