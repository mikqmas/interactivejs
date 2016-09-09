import React from 'react';
import COL from './costofliving';
import $ from 'jquery';


export default class Results extends React.Component {
  constructor(props){
    super(props);
    this.state = {amount: ""};
    this.info = "";
  }

  componentWillReceiveProps(nextProps){
    this.setState({amount: nextProps.amount},
      this._setAllInfo);
    this.info = COL[nextProps.info];
  }

  _setAllInfo(){
    this._setCoffee();
    this._setMcd();
    this._setNike();
    this._setRent();
    this._setSalary();
  }

  _setCoffee(){
    $('#coffee'+ this.info.city).empty();
    let coffeeCount = Math.round(this.state.amount / this.info.coffee);
    $('#coffeelabel'+ this.info.city).html(`Coffee: ${coffeeCount}`);
    let width = "100px";
    if(coffeeCount > 500) {
      $('#coffee'+ this.info.city).append(`<h3>A lot of coffee...</h3><img width="200px" class="icon coffee" src="../imgs/coffee.png"/>`);
      return;
    }else if(coffeeCount > 100) {
      width = "30px";
    }else if(coffeeCount > 50) {
      width = "50px";
    }else if(coffeeCount > 25){
      width = "70px";
    }else if(coffeeCount > 10){
      width = "90px";
    }

    for(let i = 0; i < coffeeCount; i++){
      $('#coffee'+ this.info.city).append(`<img width="${width}" class="icon coffee" src="../imgs/coffee.png"/>`);
    }
  }

  _setMcd(){
    $('#mcdonalds'+ this.info.city).empty();
    let mcdonaldsCount = Math.round(this.state.amount / this.info.mcdonalds);
    $('#mcdlabel'+ this.info.city).html(`Mcdonalds: ${mcdonaldsCount}`);
    let width = "100px";
    if(mcdonaldsCount > 500) {
      $('#mcdonalds'+ this.info.city).append(`<h3>A lot of burgers...</h3><img width="200px" class="icon mcdonalds" src="../imgs/burger.png"/>`);
      return;
    }else if(mcdonaldsCount > 100) {
      width = "30px";
    }else if(mcdonaldsCount > 50) {
      width = "50px";
    }else if(mcdonaldsCount > 25){
      width = "70px";
    }else if(mcdonaldsCount > 10){
      width = "90px";
    }
    for(let i = 0; i < mcdonaldsCount; i++){
      $('#mcdonalds'+ this.info.city).append(`<img width="${width}" class="icon mcdonalds" src="../imgs/burger.png"/>`);
    }
  }

  _setNike(){
    $('#nike'+ this.info.city).empty();
    let nikeCount = Math.round(this.state.amount / this.info.nikes * 10) / 10;
    if(nikeCount > 1){
      nikeCount = Math.round(this.state.amount / this.info.nikes);
    }
    $('#nikelabel'+ this.info.city).html(`Nike: ${nikeCount}`);
    let width = "100px";
    if(nikeCount > 100) {
      $('#nike'+ this.info.city).append(`<h3>A lot of Nikes...</h3><img width="200px" class="icon nike" src="../imgs/nike.png"/>`);
      return
    }else if(nikeCount > 50) {
      width = "50px";
    }else if(nikeCount > 25){
      width = "70px";
    }else if(nikeCount > 10){
      width = "90px";
    }
    for(let i = 0; i < nikeCount; i++){
      $('#nike'+ this.info.city).append(`<img width="${width}" class="icon nike" src="../imgs/nike.png"/>`);
    }
  }

  _setRent(){
    let rentCount = Math.round(this.state.amount / this.info.rent * 100) / 100;
    let width = rentCount < 1 ? rentCount * 200 : 200;
    $('#rentImg' + this.info.city).css("width", `${width}px`);
    $('#rentlabel'+ this.info.city).html(`Monthly Rent: ${rentCount}`);
  }

  _setSalary(){
    let salaryCount = Math.round(this.state.amount / this.info.salary * 100) / 100;
    let width = salaryCount < 1 ? salaryCount * 200 : 200;
    $('#salaryImg' + this.info.city).css("width", `${width}px`);
    $('#salarylabel'+ this.info.city).html(`Monthly Salary: ${salaryCount}`);
  }

  render(){
    return(
      <div id="results">
        <h1>{this.info.city}</h1>
        <h2 id={"coffeelabel" + this.info.city}>Coffee: </h2>
        <div id={'coffee' + this.info.city}></div>
        <h2 id={"mcdlabel" + this.info.city}>McDonalds: </h2>
        <div id={"mcdonalds" + this.info.city}></div>
        <h2 id={"nikelabel" + this.info.city}>Nike: </h2>
        <div id={"nike" + this.info.city}></div>
        <h2 id={"rentlabel" + this.info.city}>Monthly Rent: </h2>
        <div id={"rent" + this.info.city}><img id={"rentImg"+ this.info.city} className="icon rent" src="../imgs/rent.png"/></div>
        <h2 id={"salarylabel" + this.info.city}>Monthly Salary: </h2>
        <div id={"salary" + this.info.city}><img id={"salaryImg"+ this.info.city} className="icon salary" src="../imgs/pay.png"/></div>
      </div>
    )
  }
}
