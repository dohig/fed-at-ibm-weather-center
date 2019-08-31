import React, { Component } from 'react';

class WeatherApi extends Component {
  constructor(props) {
    super(props);
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.state = {
      data: null,
      loading: true,
      error: false,
    };
  }

  async fetchWeatherData() {
    this.setState({ loading: true });
    this.setState({ error: false });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_PROXY}https://api.darksky.net/forecast/db1d17eb3b798d4881121dee107183cc/${this.props.location.coords}`
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({ data });
      } else {
        this.setState({ error: true });
      }
    } catch (error) {
      this.setState({ error: true });
    }

    this.setState({ loading: true });
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.coords !== this.props.location.coords ||
      prevProps.refetch !== this.props.refetch
    ) {
      this.fetchWeatherData();
    }
  }

  render() {
    return <>{this.props.children(this.state)}</>;
  }
}
export default WeatherApi;
