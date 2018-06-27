import React from 'react';

const Buttons = (props) => {
    return (
         <div className="buttons">              
            <button id="seven"    value='7'onClick={props.numbers}>7</button>
            <button id="eight"    value='8' onClick={props.numbers}>8</button>
            <button id="nine"     value='9'onClick={props.numbers}>9</button>
            <button id="backspace"  onClick={props.backspace}>←</button>                        
            <button id="clear"    value='C' onClick={props.clear}>C</button>         
            <button id="four"     value='4' onClick={props.numbers}>4</button>
            <button id="five"     value='5' onClick={props.numbers}>5</button>
            <button id="six"      value='6' onClick={props.numbers}>6</button>
            <button id="divide"   value='/' onClick={props.applyOperator}>/</button>
            <button id="multiply" value='*' onClick={props.applyOperator}>x</button>              
            <button id="one"      value='1' onClick={props.numbers}>1</button>
            <button id="two"      value='2' onClick={props.numbers}>2</button>
            <button id="three"    value='3' onClick={props.numbers}>3</button>
            <button id="subtract" value='-' onClick={props.applyOperator}>-</button>        
            <button id="add"      value='+' onClick={props.applyOperator}>+</button>  
            <button id="zero"     value='0' onClick={props.numbers}>0</button>
            <button id="decimal"  value='.' onClick={props.decimals}>.</button>
            <button id="negative" onClick={props.negative} >±</button>
            <button id="sqrt"    onClick={props.sqrt}>√</button>   
            <button id="equals"   value='='onClick={props.evaluate}>=</button>              
        </div>
     );
}   

export default Buttons;