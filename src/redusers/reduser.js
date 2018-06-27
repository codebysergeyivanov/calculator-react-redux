
const defaultState = {
    currVal: "0",
    formula: '',
    prevVal: "0",
}

export default (state = defaultState, action) => {

  switch(action.type) {
    
    case "NUMBER":

    if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
      return state;
    }

    if(state.evaluated) {
      
      if(state.formula.includes("sqrt") && !/[-+\/\*]$/.test(state.formula)) {

        return Object.assign({}, state, {
          currVal: action.number,
          evaluated: false,
          formula: state.formula.replace(/sqrt\(\d+\.?\d+\)$/, ' ')
        }); 

      } else {
        
        if(/^0\.$/.test(state.currVal)) {

          return Object.assign({}, state, {
            currVal: state.currVal + action.number,
            evaluated: false      
          });    

        } else {

          return Object.assign({}, state, {
            currVal: action.number,
            evaluated: false
          });

        }
      }
     
    } else if(state.currVal === "0") {

      return Object.assign({}, state, {
        currVal: action.number 
    });

    } else {
      
      if(state.currVal.length > 16) {
        return state;
      } else {

        return Object.assign({}, state, {
          currVal: state.currVal + action.number 
      });

      }
    }
    
    case "OPERATOR":
    if(state.evaluated) {
      if(state.currVal === "0.") {
        return Object.assign({}, state, { 

          prevVal: Math.round(1000000000000 * 
            eval(state.prevVal + state.formula.slice(-1) + 
            state.currVal) ) / 1000000000000 + "",

          currVal: Math.round(1000000000000 * 
            eval(state.prevVal + state.formula.slice(-1) + 
            state.currVal) ) / 1000000000000 + "",   

          formula: state.formula +" "+ state.currVal.slice(0,-1) +
          " "+ action.sign,

          evaluated: true

       });
      }
      
      if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
        return state;
      }

      return Object.assign({}, state, {

        formula: /\)$/.test(state.formula) ? 
        state.formula +" "+ action.sign : 
        /[-+\/\*]$/.test(state.formula) ? 
        state.formula.replace(/[-+\/\*]$/, action.sign) : 
        state.formula + +state.currVal +" "+ action.sign,

        prevVal: /\)$/.test(state.formula) ?
        Math.round(1000000000000 * 
          eval(state.prevVal + action.sign + 
            state.currVal) ) / 1000000000000 + "" : 
        state.currVal,

        currVal:/\)$/.test(state.formula) ?
        Math.round(1000000000000 * 
          eval(state.prevVal + action.sign + 
            state.currVal) ) / 1000000000000 + "" :      
         +state.currVal + "",

        evaluated: true      
      });

    } else if(state.prevVal === "0" && state.formula === "" ) {

        return Object.assign({}, state, {

          prevVal: state.currVal,

          currVal: /^-0\.(0+)?$/.test(state.currVal) ? 
          state.currVal.slice(1, 2) :
          /-?\d+\.(0+)?$/.test(state.currVal) ? 
          state.currVal.replace(/\.(0+)?/, "") :
          state.currVal,

          formula: /^-0\.(0+)?$/.test(state.currVal) ?
          state.formula + state.currVal.slice(1, 2) +
          " "+ action.sign :
          /-?\d+\.(0+)?$/.test(state.currVal) ? 
          state.formula + state.currVal.replace(/\.(0+)?$/, "") +
          " "+ action.sign :
          state.formula + state.currVal +" "+ action.sign,

          evaluated: true
       });

    } else {

      if( isNaN( eval(state.prevVal + state.formula.slice(-1) +
      " "+ state.currVal) ) ) {

        return Object.assign({}, state, {
          currVal: "Infinite",
          evaluated: true
        });

      }

        return Object.assign({}, state, {

          prevVal: Math.round(1000000000000 * 
            eval(state.prevVal + state.formula.slice(-1) +
            state.currVal) ) / 1000000000000 + "",

          currVal: Math.round(1000000000000 * 
            eval(state.prevVal + state.formula.slice(-1) +
            state.currVal) ) / 1000000000000 + "",

          formula: /^-0\.(0+)?$/.test(state.currVal) ?
          state.formula +" "+ state.currVal.slice(1, 2) +
          " "+ action.sign :
          /-?\d+\.(0+)?$/.test(state.currVal) ?
          state.formula +" "+ state.currVal.replace(/\.(0+)?$/, "") +
          " "+ action.sign :
          state.formula +" "+ state.currVal +
          " "+ action.sign,

          evaluated: true

       });

    }
    
    case "EVALUATE":
    
    if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
      return state;
    }

    if(state.formula === "") {

      return Object.assign({}, state, {
        currVal: /\d+\.0+$/.test(state.currVal) ? state.currVal.replace(/\.0+$/, "") :
        /\d+\.$/.test(state.currVal) ? state.currVal.slice(0, -1):
        state.currVal
      });

    }

    if( state.formula.includes("sqrt") ) {

      if( /^ sqrt\(\d+(\.\d+)?\)$/.test(state.formula) ) {
        return Object.assign({}, state, {
          formula: "",
          evaluated: true,
          currVal: state.currVal
        });
      }

      if( /[-+\/\*]$/.test(state.formula) ) {

        return Object.assign({}, state, {
          formula: "",
          evaluated: true,
          currVal: Math.round(1000000000000 * 
            eval(state.prevVal + state.formula.slice(-1) 
            + state.currVal) ) / 1000000000000 + "",
        });

      } else {

        return Object.assign({}, state, {
          formula: "",
          evaluated: true,
          currVal: Math.round(1000000000000 * 
            eval(state.prevVal + 
            state.formula.match(/[-+\/\*] sqrt\(\d+\.?\d+\)$/)[0].slice(0,1) + 
            state.currVal) ) / 1000000000000 + "",
        });

      }
    }
  
    if( isNaN( eval(state.prevVal + 
      state.formula.slice(-1) + state.currVal) ) ) { 

      return Object.assign({}, state, {
        currVal: "Infinite",
        evaluated: true
      });

    }
 
    return Object.assign({}, state, {
      prevVal: "0",
      currVal: Math.round(1000000000000 * 
        eval(state.prevVal + state.formula.slice(-1) + 
        state.currVal) ) / 1000000000000 + "",
      formula: "",
      evaluated: true
    });

    case "DECIMAL":
    if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
      return state;
    }

    if(state.currVal === "0" && state.formula === "" || state.evaluated) {

      return Object.assign({}, state, {
        currVal: "0.",
      });

    } 
    
    return Object.assign({}, state, {
      currVal: !state.currVal.includes(".") ?
      state.currVal + "." :
      state.currVal
    });

    case "SQRT":
    if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
      return state;
    }

    if(state.currVal < 0) {
      return Object.assign({}, state, {
        currVal: "Invalid output",
        evaluated: true
      });
    }

    if(/^ sqrt\(\d+(\.\d+)?\)$/.test(state.formula)) {

      return Object.assign({}, state, {

      currVal:  Math.round(1000000000000 * 
        eval( Math.sqrt(state.currVal) ) ) / 1000000000000 + "",

      formula: " sqrt("+ eval(state.currVal) +")",

      evaluated: true
      });
    } 

    if( / sqrt\(\d+(\.\d+)?\) [-+\/\*]$/.test(state.formula)) {

      return Object.assign({}, state, {

        currVal:  Math.round(1000000000000 * 
          eval( Math.sqrt(state.currVal) ) ) / 1000000000000 + "",

        formula: state.formula + " sqrt("+ eval(state.currVal) +")",

        evaluated: true
      });

    } 

    if(/ sqrt\(\d+(\.\d+)?\)$/.test(state.formula)) {

      return Object.assign({}, state, {

        currVal:  Math.round(1000000000000 * 
          eval( Math.sqrt(state.currVal) ) ) / 1000000000000 + "",

        formula: state.formula.replace(/ sqrt\(\d+(\.\d+)?\)$/, 
        " sqrt("+ eval(state.currVal) +")"),

        evaluated: true
       });

    }
    
    return Object.assign({}, state, {
        currVal:  Math.round(1000000000000 * 
          eval( Math.sqrt(state.currVal) ) ) / 1000000000000 + "",
        formula: state.formula + " sqrt("+ eval(state.currVal) +")",
        evaluated: true
    });

    case "NEGATIVE":

    if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
      return state;
    }
    
    return Object.assign({}, state, {
      currVal: state.currVal === "0" ? 
      state.currVal : 
      state.currVal.includes("-") ? state.currVal.slice(1) : 
      "-" + state.currVal
    });

    case "BACKSPACE":

    if(state.currVal === "Infinite" || state.currVal === "Invalid output") {
      return state;
    }
  
    return Object.assign({}, state, {
        currVal: /^-?\d\.?$/.test(state.currVal) ? "0" :
        state.currVal.slice(0,-1)
    });

    case "CLEAR":
    return defaultState;
    
    default:
    return state;
  }
}