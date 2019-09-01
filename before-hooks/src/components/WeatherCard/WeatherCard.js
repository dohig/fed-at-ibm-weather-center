import React, { Component } from 'react';
import { Tile } from 'carbon-components-react/lib/components/Tile';
import Restart16 from '@carbon/icons-react/lib/restart/16';
import Time16 from '@carbon/icons-react/lib/time/16';
import Cloud32 from '@carbon/icons-react/lib/cloud/32';
import {
  getLocalTimeForTimezone,
  formatSummary,
  getTemperatureForScale,
} from '../../util/weeHelpers';

// Our WeatherApi render prop component
import WeatherApi from '../WeatherApi';

// Our context for temperature scale
import { TemperatureScaleContext } from '../../context/TemperatureScaleContext';

class WeatherCard extends Component {
  state = {
    refetch: false,
  };

  render() {
    const getTemperature = temp => {
      return getTemperatureForScale(temp, this.context.scale);
    };

    const renderError = () => (
      <div
        className="weather-center__card--error"
        onClick={() => this.setState({ refetch: !this.state.refetch })}
        role="button"
        tabIndex={0}>
        Whoops, an error has ocurred!
        <div className="error__retry">
          <Restart16 />
          Retry
        </div>
      </div>
    );

    const renderCard = () => {
      const loadingSkeleton = <div className="bx--skeleton__text"></div>;
      return (
        <div className="bx--col-sm-4 bx--col-md-4 bx--col-lg-4 bx--col-xl-2">
          <WeatherApi
            location={this.props.location}
            refetch={this.state.refetch}>
            {({ data, loading, error }) =>
              !error ? (
                <Tile className="weather-card-container" tabIndex={0}>
                  <div className="weather-center__card">
                    <h5 className="weather-center__card--title">
                      {this.props.location.name}
                    </h5>
                    <div className="weather-center__card--currently">
                      <div className="currently__time-icon-container">
                        <div className="currently__time">
                          <Time16 />
                          {loading
                            ? loadingSkeleton
                            : getLocalTimeForTimezone(data.timezone)}
                        </div>
                        {loading ? (
                          <div className="currently__icon">
                            {loadingSkeleton}
                          </div>
                        ) : (
                          <div className="currently__icon">
                            <Cloud32 />
                          </div>
                        )}
                      </div>
                      <div
                        className={`currently__next-hour ${
                          loading ? 'loading' : ''
                        }`}>
                        <div className="currently__next-hour--label">
                          Next hour
                        </div>
                        <div className="currently__next-hour--temperature">
                          {loading
                            ? loadingSkeleton
                            : `${getTemperature(data.currently.temperature)}°`}
                        </div>
                        <div className="currently__next-hour--description">
                          {loading ? loadingSkeleton : data.currently.summary}
                        </div>
                      </div>
                    </div>
                    <div className="weather-center__card--daily">
                      <div>
                        <div className="daily__label">Today</div>
                        <div className="daily__summary">
                          {/* eslint-disable-next-line no-useless-escape */}
                          {loading
                            ? [loadingSkeleton, loadingSkeleton]
                            : formatSummary(data.daily.data[0].summary)}
                        </div>
                      </div>
                      <div className="daily__info">
                        <div className="daily__info-group">
                          <div className="daily__info-group-item">
                            <div className="daily__info-group-item--label">
                              Min
                            </div>
                            <div className="daily__info-group-item--value">
                              {loading
                                ? loadingSkeleton
                                : `${getTemperature(
                                    data.daily.data[0].temperatureMin
                                  )}°`}
                            </div>
                          </div>
                          <div className="daily__info-group-item">
                            <div className="daily__info-group-item--label">
                              Max
                            </div>
                            <div className="daily__info-group-item--value">
                              {loading
                                ? loadingSkeleton
                                : `${getTemperature(
                                    data.daily.data[0].temperatureMax
                                  )}°`}
                            </div>
                          </div>
                        </div>
                        <div className="daily__info-group">
                          <div className="daily__info-group-item">
                            <div className="daily__info-group-item--label">
                              Prec.
                            </div>
                            <div
                              className="daily__info-group-item--value"
                              id="precipitation">
                              {loading
                                ? loadingSkeleton
                                : [
                                    data.daily.data[0].precipProbability.toFixed(
                                      0
                                    ),
                                    <span
                                      key="%"
                                      className="small-percentage-symbol">
                                      %
                                    </span>,
                                  ]}
                            </div>
                          </div>
                          <div className="daily__info-group-item">
                            <div className="daily__info-group-item--label">
                              UV
                            </div>
                            <div className="daily__info-group-item--value">
                              {loading
                                ? loadingSkeleton
                                : data.daily.data[0].uvIndex.toFixed(0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              ) : (
                renderError()
              )
            }
          </WeatherApi>
        </div>
      );
    };

    return renderCard();
  }
}

WeatherCard.contextType = TemperatureScaleContext;

export default WeatherCard;
