import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'

import { getInfo } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error }, ...other } = field
    return (
      <div>
        <input {...input} placeholder={label} type={type} { ...other } />
        {touched && error && <span className="form-error">{error}</span>}
      </div>
    );
  }

  async onSubmit(value) {
    //console.log(value.city) //都市名が取得できているかの確認
    await this.props.getInfo(value.city)
  }

  renderMainWeather() {
    const weather_info = this.props.result.data
    return _.map(weather_info.weather, data => (
      <div key={data.id}>
        <div>現在の{weather_info.name}の天気は{data.main}</div>
      </div>
      ))
  }

  renderTemp() {
    const weather_info = this.props.result.data
    //console.log(weather_info) //mainが取得できているか確認
    const temp_info = _.filter (weather_info.main, {});
    //console.log(temp_info[0]) //気温が取得できているか確認
    const temp_c = temp_info[0] -273.15 //ケルビン温度を摂氏に変換
    const new_temp_c = temp_c.toFixed(2) //小数点第２位以下を四捨五入
    //console.log(new_temp_c)
    const showFrag = this.props.result.showFrag;
    const temp_text = showFrag ? <div>現在の{weather_info.name}の気温は{new_temp_c}℃</div> : '';
    // ↑showFragのstateに応じて表示と非表示を切り替える
    return (<div>{temp_text}</div>)
  }

  renderHumidity() { //基本的に気温の取得と同じ、データの変換がないだけ
    const weather_info = this.props.result.data
    const humidity_info = _.filter (weather_info.main, {});
    const new_humidity_info = humidity_info[5]
    //console.log(new_humidity_info) //湿度が取得できているかの確認
    const showFrag = this.props.result.showFrag;
    const humidity_text = showFrag ? <div>現在の{weather_info.name}の湿度は{new_humidity_info}％</div> : '';
    return (<div>{humidity_text}</div>)
  }

  renderWindSpeed() {
    const weather_info = this.props.result.data
    const wind_speed_info = _.filter (weather_info.wind, {});
    const new_wind_speed_info = wind_speed_info[0]
    //console.log(new_wind_speed_info) //風速が取得できているかの確認
    const showFrag = this.props.result.showFrag;
    const wind_speed_text = showFrag ? <div>現在の{weather_info.name}の風速は{new_wind_speed_info}m/s</div> : '';
    return (<div>{wind_speed_text}</div>)
  }

  renderError() {
    const showFrag = this.props.result.showFrag;
    const e_msg = showFrag ? '' : this.props.result.error_message;
    //↑showFragがfalseのときにerror_messageをe_messageに代入
    //console.log(e_msg) //erros_messageを受け取れているかの確認
    return (<div>{e_msg}</div>)
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props //redux-formからpropsを受け取る
    return (
      <React.Fragment>
        <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="input-form">
            <Field
              label="都市名を入力してください"
              name="city"
              type="text"
              component={this.renderField}className="input-inner"
            />
            </div>
          <div>
            <input
              className="submit-btn"
              type="submit"
              value="Submit"
              disabled={pristine || submitting}
            />
          </div>
        </form>
        <div className="container">
          <div>{this.renderMainWeather()}</div>
          <div>{this.renderTemp()}</div>
          <div>{this.renderHumidity()}</div>
          <div>{this.renderWindSpeed()}</div>
          <div>{this.renderError()}</div>
        </div>
      </React.Fragment>
    );
  }
}

const validate = values => {
  const errors = {}

  if (!values.city) errors.city = "なんか打ってね"
  return errors
}

const mapStateToProps = state => ({result: state.result })
const mapDispatchToProps = ({ getInfo })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'WeatherForm' })(App)
)

