import React from 'react';
import $ from 'jquery';
import fx from 'money';
import Results from './results';
import SYM from './symbols';

$.getJSON(
  'http://api.fixer.io/latest',
  function(data) {
    if ( typeof fx !== "undefined" && fx.rates ) {
      fx.rates = data.rates;
      fx.base = data.base;
      fx.settings = {
      	from : "EUR",
      	to : "USD"
      };
    } else {
      var fxSetup = {
          rates : data.rates,
          base : data.base
      }
    }
  }
);

export default class Convert extends React.Component {
  constructor(){
    super();
    this.changeAmount = this.changeAmount.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.state = {tosym: '€', fromsym:'$'};
  }

  changeCurrency(e) {
    let from, to, value;
    if(e.target.name === 'from'){
      this.setState({fromsym: SYM[e.target.value]});
      value = parseInt($('#from_amount')[0].value);
      from = $('#from_amount')[0];
      to = $('#to_amount')[0];
    }else {
      this.setState({tosym: SYM[e.target.value]});
      value = parseInt($('#to_amount')[0].value);
      from = $('#to_amount')[0];
      to = $('#from_amount')[0];
    }
    this._runConversion(from, to, value);
  }

  changeAmount(e) {
    let from, to;
    [to, from] = e.target === $('#from_amount')[0] ? [$('#to_amount')[0],$('#from_amount')[0]] : [$('#from_amount')[0],$('#to_amount')[0]];
    let value = parseInt(e.target.value);
    this._runConversion(from, to, value);
  }

  _runConversion(from, to, value){
    let from_sym, to_sym;
    [from_sym, to_sym] = from.id === "from_amount" ? [$('#from')[0].value, $('#to')[0].value] : [$('#to')[0].value, $('#from')[0].value];
    let converted = fx.convert(value, {from: from_sym, to: to_sym});
    to.value = isNaN(converted) ? "" : Math.round(converted * 1000) / 1000;
  }

  render() {
    return (
      <div className="input_container">
        <div className="amount_container">
          <input className="amount" type="number" id="from_amount" placeholder={`${this.state.fromsym}100`} onInput={this.changeAmount}/>
          <input className="amount" type="number" id="to_amount" placeholder={`${this.state.tosym}100`} onInput={this.changeAmount}/>
        </div>

        <div className="currency_container">
          <div className="currency_border">
            <select className="currency" id="from" name="from" onChange={this.changeCurrency}>
              <option value="USD">&#36; USD</option>
              <option value="EUR">&#8364; EUR</option>
              <option value="GBP">&#8356; GBP</option>
              <option value="CAD">&#36; CAD</option>
              <option value="BGN">&#1074; BGN</option>
              <option value="KRW">&#8361; KRW</option>
              <option value="JPY">&#165; JPY</option>
              <option value="RUB">&#1088; RUB</option>
              <option value="PHP">&#8369; PHP</option>
              <option value="ILS">&#8362; ILS</option>
              <option value="CNY">&#165; CNY</option>
            </select>
            <div className="ccw_selector_bg"></div>
            <div className="ccw_selector_arrows"></div>
          </div>

          <div className="currency_border">
            <select className="currency" id="to" name="to" onChange={this.changeCurrency}>
              <option value="EUR">&#8364; EUR</option>
              <option value="USD">&#36; USD</option>
              <option value="GBP">&#8356; GBP</option>
              <option value="CAD">&#36; CAD</option>
              <option value="BGN">&#1074; BGN</option>
              <option value="KRW">&#8361; KRW</option>
              <option value="JPY">&#165; JPY</option>
              <option value="RUB">&#1088; RUB</option>
              <option value="PHP">&#8369; PHP</option>
              <option value="ILS">&#8362; ILS</option>
              <option value="CNY">&#165; CNY</option>
            </select>
            <div className="ccw_selector_bg"></div>
            <div className="ccw_selector_arrows"></div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Convert;
