import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Formula from '../components/Formula';
import Output from '../components/Output';
import Buttons from '../components/Buttons';

import { setNumber, 
         clear, 
         applyOperator, 
         evaluate, 
         setDecimal, 
         applySqrt, 
         setNegative, 
         deleteNumber } from '../actions/mathActions';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleSqrt = this.handleSqrt.bind(this);
    this.handleNegative = this.handleNegative.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);     
  }

  handleClick(e) {
    this.props.setNumber(e.target.value);
  }

  clear() {
    this.props.clear();
  }

  handleOperator(e) {
    this.props.applyOperator(e.target.value);
  }
  handleEvaluate() {
    this.props.evaluate();
  }

  handleDecimal() {
    this.props.setDecimal();
  }

  handleSqrt() {
    this.props.applySqrt();
  }

  handleNegative() {
    this.props.setNegative();
  }

  handleBackspace() {
    this.props.deleteNumber()
  }
 
  render() {
    return (
      <div>
        <div className="calculator">
          <Formula formula={this.props.formula}/>
          <Output currVal={this.props.currVal} />
          <Buttons numbers={this.handleClick}
                  clear={this.clear}
                  applyOperator={this.handleOperator}
                  evaluate={this.handleEvaluate}
                  decimals={this.handleDecimal}
                  sqrt={this.handleSqrt}
                  negative={this.handleNegative}
                  backspace={this.handleBackspace}
          />
        </div>
        <div className="author">This project have made using the React and Redux <br />
          <a target="_blank" href="https://github.com/codebysergeyivanov/calculator-react-redux"> 
            Link to GitHub
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currVal: state.currVal,
    formula: state.formula
  }
}

function mapDispatchToProps(dispatch) {

  return {

    setNumber: function(value) {
      dispatch(setNumber(value));
    },

    clear: function() {
      dispatch(clear());
    },

    applyOperator: function(sign) {
      dispatch(applyOperator(sign));
    },

    evaluate: function() {
      dispatch(evaluate());
    },

    setDecimal: function() {
      dispatch(setDecimal());
    },

    applySqrt: function() {
      dispatch(applySqrt());
    },

    setNegative: function() {
      dispatch(setNegative());
    },

    deleteNumber: function() {
      dispatch(deleteNumber());     
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
