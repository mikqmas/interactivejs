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
    this.changeSelector = this.changeSelector.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {tosym: '€', fromsym:'$'};
    this.selector = 'from';
    $(document).ready(this.mapInteraction);
  }

  componentDidMount() {
    setTimeout(() => {
      var svgDoc = document.getElementById('circle-svg').contentDocument;
      var circle = svgDoc.getElementById("my-circle");
      circle.addEventListener('click', this.handleClick);
    }, 100);
  }

  _selectDropdown(country){
    let from, to, value;
    const dropdown = this.selector === 'from' ? document.getElementById("from") : document.getElementById("to");
    for(var i = 0;i < dropdown.length;i++){
       if(dropdown.options[i].value === country){
           dropdown.selectedIndex = i;
       }
     }
     if(this.selector === 'from'){
       this.setState({fromsym: SYM[country]});
       value = parseInt($('#from_amount')[0].value);
       from = $('#from_amount')[0];
       to = $('#to_amount')[0];
     }else {
       this.setState({tosym: SYM[country]});
       value = parseInt($('#to_amount')[0].value);
       from = $('#to_amount')[0];
       to = $('#from_amount')[0];
     }
     this._runConversion(from, to, value);
  }

  changeSelector(e){
    if(e.target.value === "from"){
      this.selector = "from";
      document.getElementById('from_picker').style.backgroundColor = '#aaa';
      document.getElementById('to_picker').style.backgroundColor = 'whitesmoke';
    }else {
      this.selector = "to";
      document.getElementById('to_picker').style.backgroundColor = '#aaa';
      document.getElementById('from_picker').style.backgroundColor = 'whitesmoke';
    }
  }

  handleClick(e) {
    switch(e.target.id){
      case 'RU':
        this._selectDropdown('RUB');
        break;
      case 'CN':
        this._selectDropdown('CNY');
        break;
      case 'JP':
        this._selectDropdown('JPY');
        break;
      case 'KR':
        this._selectDropdown('KRW');
        break;
      case 'FI':
        this._selectDropdown('RUB');
        break;
      case 'CA':
        this._selectDropdown('CAD');
        break;
      case 'US':
        this._selectDropdown('USD');
        break;
      case 'GB':
        this._selectDropdown('GBP');
        break;
      case 'PH':
        this._selectDropdown('PHP');
        break;
      case 'BG':
        this._selectDropdown('GBN');
        break;
      case 'IL':
        this._selectDropdown('ILS');
        break;
      case 'BG':
        this._selectDropdown('BGN');
        break;
      case 'AT':
      case 'BE':
      case 'DE':
      case 'CY':
      case 'EE':
      case 'ES':
      case 'FR':
      case 'GR':
      case 'IE':
      case 'DE':
      case 'IT':
      case 'LT':
      case 'LU':
      case 'LV':
      case 'NL':
      case 'PT':
      case 'SI':
      case 'SK':
        this._selectDropdown('EUR');
        break;
    }
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

  interact(e) {
    debugger;
	  // var svgDoc = e.target.contentDocument;
    // var circle = svgDoc.getElementById("my-circle");
  }

  render() {
    return (
      <div>
        <div className="input_container">
          <div className="amount_container">
            <div id="fromsym">{this.state.fromsym}</div>
            <input className="amount" type="number" id="from_amount" placeholder={`${this.state.fromsym}100`} onInput={this.changeAmount}/>
            <div id="tosym">{this.state.tosym}</div>
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
          <div className="picker_container">
            <button id="from_picker" className="picker" value="from" onClick={this.changeSelector}>FROM</button>
            <button id="to_picker" className="picker" value="to" onClick={this.changeSelector}>TO</button>
          </div>
        </div>

        <div id="map">
          <object width="800" height="640" id="circle-svg" type="image/svg+xml" data="./imgs/worldLow.svg"></object>
        </div>
      </div>
    );
  }
}


// export default Convert;
