import React, { useState, useContext } from 'react';
import { Tile } from 'carbon-components-react/lib/components/Tile';
import Restart16 from '@carbon/icons-react/lib/restart/16';
import Time16 from '@carbon/icons-react/lib/time/16';
import {
  getLocalTimeForTimezone,
  formatSummary,
  getTemperatureForScale,
} from '../../util/weeHelpers';
import { icons } from '../../assets';

// Import our context for temperature scale
import { TemperatureScaleContext } from '../../context/TemperatureScaleContext';
// Import our useWeatherApi hook to handle fetching logic
import useWeatherApi from '../../hooks/useWeatherApi';

const WeatherCard = ({ location }) => {
  // In case there's an error let's allow refetching
  const [refetch, setRefetch] = useState(false);
  // Grab the temperature scale context to convert F° to C° if need be
  const { scale } = useContext(TemperatureScaleContext);
  // Fetch weather data for this location
  const { data, loading, error } = useWeatherApi(location, refetch);

  const getTemperature = temp => {
    return getTemperatureForScale(temp, scale);
  };

  const renderIcon = () => {
    const Icon = icons[data.currently.icon];
    return <Icon />;
  };

  const renderError = () => (
    <div
      className="weather-center__card--error"
      onClick={() => setRefetch(!refetch)}
      role="button"
      tabIndex={0}>
      Whoops, an error has ocurred!
      <div className="error__retry">
        <Restart16 />
        Retry
      </div>
    </div>
  );

  const renderCard = ({ loading = true, error = false }) => {
    const loadingSkeleton = <div className="bx--skeleton__text"></div>;
    return (
      <div className="bx--col-sm-4 bx--col-md-4 bx--col-lg-4 bx--col-xl-2">
        {!error ? (
          <Tile className="weather-card-container" tabIndex={0}>
            <div className="weather-center__card">
              <h5 className="weather-center__card--title">{location.name}</h5>
              <div className="weather-center__card--currently">
                <div className="currently__time-icon-container">
                  <div className="currently__time">
                    <Time16 />
                    {loading
                      ? loadingSkeleton
                      : getLocalTimeForTimezone(data.timezone)}
                  </div>
                  {loading ? (
                    <div className="currently__icon">{loadingSkeleton}</div>
                  ) : (
                    <div className="currently__icon">{renderIcon()}</div>
                  )}
                </div>
                <div
                  className={`currently__next-hour ${
                    loading ? 'loading' : ''
                  }`}>
                  <div className="currently__next-hour--label">Next hour</div>
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
                      <div className="daily__info-group-item--label">Min</div>
                      <div className="daily__info-group-item--value">
                        {loading
                          ? loadingSkeleton
                          : `${getTemperature(
                              data.daily.data[0].temperatureMin
                            )}°`}
                      </div>
                    </div>
                    <div className="daily__info-group-item">
                      <div className="daily__info-group-item--label">Max</div>
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
                      <div className="daily__info-group-item--label">Prec.</div>
                      <div
                        className="daily__info-group-item--value"
                        id="precipitation">
                        {loading
                          ? loadingSkeleton
                          : [
                              (
                                data.daily.data[0].precipProbability * 100
                              ).toFixed(0),
                              <span key="%" className="small-percentage-symbol">
                                %
                              </span>,
                            ]}
                      </div>
                    </div>
                    <div className="daily__info-group-item">
                      <div className="daily__info-group-item--label">UV</div>
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
        )}
      </div>
    );
  };

  if (loading) return renderCard({ loading: true });

  if (error) return renderCard({ error: true });

  return renderCard({ loading: false });
};

export default WeatherCard;
