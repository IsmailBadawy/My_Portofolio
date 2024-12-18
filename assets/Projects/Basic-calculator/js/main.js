var inp1 = document.getElementById("inp1");
var inp2 = document.getElementById("inp2");
var result = document.getElementById("result");

function Plus() {
    var value1 = +inp1.value;
    var value2 = +inp2.value;
    if(isNaN(value1) || isNaN(value2))
        {
            result.innerHTML ="<span style='color: red;'>Please insert Only Numbers</span>"
            return result;
        }

    var resultValue = value1 + value2;
    result.innerHTML = resultValue;
    inp1.value="";
    inp2.value="";
    return ;
}
function Minus(){
    var value1 = +inp1.value;
    var value2 = +inp2.value;
    if(isNaN(value1) || isNaN(value2))
        {
            result.innerHTML ="<span style='color: red;'>Please insert Only Numbers</span>"
            return result;
        }

    var resultValue = value1 - value2;
    result.innerHTML = resultValue;
    inp1.value=null;
    inp2.value=null;
    return ;
}
function Multiplication(){
    var value1 = +inp1.value;
    var value2 = +inp2.value;
    if(isNaN(value1) || isNaN(value2))
        {
            result.innerHTML ="<span style='color: red;'>Please insert Only Numbers</span>"
            return result;
        }

    var resultValue =  value1 * value2;
    result.innerHTML = resultValue;
    inp1.value=null;
    inp2.value=null;
    return ;
}
function Obelus(){
    var value1 = +inp1.value;
    var value2 = +inp2.value;
    if(isNaN(value1) || isNaN(value2))
        {
            result.innerHTML ="<span style='color: red;'>Please insert Only Numbers</span>"
            return result;
        }

    var resultValue = value1 / value2;
    result.innerHTML = resultValue;
    inp1.value=null;
    inp2.value=null;
    return ;
}