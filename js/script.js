//var mainColor = document.getElementById("mainColor").value;
//var secColor = document.getElementById("secColor").value;
//var formula = document.getElementById("formula").value;
var _mainColor = "";
var _secColor = "";

function init(){
    var mainColor = localStorage.getItem("mainColor");
    var secColor = localStorage.getItem("secColor");
    if(mainColor == null){
        mainColor = "#c91414";
    }
    if(secColor == null){
        secColor = "#407716";
    }

    var container = document.getElementById("container");
    var alto = document.getElementById("alto").value;
    var ancho = document.getElementById("ancho").value;
    var mainColorInput = document.getElementById("mainColor");
    var secColorInput = document.getElementById("secColor");
    mainColorInput.value = mainColor;
    secColorInput.value = secColor;
    container.style.width = (50 * ancho) + "px";
    container.style.height = (50 * alto) + "px";
    
    for(var i = 0; i < ancho * alto; i++){
        var node = document.createElement("div");
        node.className = "square";
        node.textContent = (i + 1);
        node.style.backgroundColor = mainColor;
        container.appendChild(node);
    }
    initAutoComplete();
    _mainColor = mainColor;
    _secColor = secColor;
}

function resize(){
    deleteChilds();
    init();
    calculate();
}

function deleteChilds(){
    var myNode = document.getElementById("container");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function calculate(){
    var mainColor = document.getElementById("mainColor").value;
    var secColor = document.getElementById("secColor").value;
    var formula = document.getElementById("formula").value;
    var allSquares = document.querySelectorAll(".square");
    var squares =  document.querySelectorAll(".square:nth-child(" + formula + ")");
    
    //cambiar bucles por maps
    for(var i = 0; i < allSquares.length; i++){
        allSquares[i].style.backgroundColor = mainColor;
    }

    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = secColor;
    }


    ////Guardar la formula en el localStorage
    if(squares.length != null){
        var formmatedFormula = formula.replace(/\s/g, '');
        var formulaList = localStorage.getItem("formulaList");
        formulaList = JSON.parse(formulaList);
        if(formulaList == null){
            formulaList = new Array();
        }
        if(!(formulaList.includes(formmatedFormula))){
            formulaList.push(formmatedFormula);
            formulaList = JSON.stringify(formulaList);
            localStorage.setItem("formulaList", formulaList);
        }
    }
   
}

function reset(){
    var mainColor = document.getElementById("mainColor").value;    
    var Squares = document.querySelectorAll(".square");
    for(var i = 0; i < Squares.length; i++){
        Squares[i].style.backgroundColor = mainColor;
    }
}

function saveColor(num){
    //0 is equivalent to non selected and 1 to nth:child selected
    if(num == 0){
        var color = document.getElementById("mainColor").value;
        var squares = document.querySelectorAll(".square");
        for(var i = 0; i < squares.length; i++){
            if(rgbToHex(squares[i].style.backgroundColor) == _mainColor){
                squares[i].style.backgroundColor = color;
            }
        }
        localStorage.setItem("mainColor", color);
        _mainColor = color;
    }
    else{ //if(num == 1)
        var color = document.getElementById("secColor").value;
        var squares = document.querySelectorAll(".square");
        for(var i = 0; i < squares.length; i++){
            if(rgbToHex(squares[i].style.backgroundColor) == _secColor){
                squares[i].style.backgroundColor = color;
            }
        }
        localStorage.setItem("secColor", color);
        _secColor = color;
    }
}

function initAutoComplete(){
    var formulaList = localStorage.getItem("formulaList");
    formulaList = JSON.parse(formulaList);
    if(formulaList != null){
        var completeBox = document.getElementById("completeBox");
        for(var i = 0; i < formulaList.length; i++){
            var node = document.createElement("option");
            node.textContent = formulaList[i];
            completeBox.appendChild(node);
        }
        var formulaInput = document.getElementById("formula");
    }
}

function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}

