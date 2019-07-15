var calculadora = {
	
	pantalla: document.getElementById("display"),
	pantallaValor: "0",	
	v1: 0,
	v2: 0,
	vLast: 0,
    resultado: 0,
    operacion: "",
	igualAux: false,
	init: (function(){
		this.eventoBoton(".tecla");
		this.eventoFuncion();
	}),
	//Animación de botones	
	eventoBoton: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onclick = this.presionaBoton;
			x[i].onmouseleave = this.sueltaBoton;
		};
	},

    sueltaBoton: function(event){
		calculadora.tamañoOriginal(event.target);
    },    
        tamañoOriginal: function(elemento){
            var x = elemento.id;
            if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
                elemento.style.width = "29%";
                elemento.style.height = "62.91px";
            } else if(x=="mas") {
                elemento.style.width = "90%";
                elemento.style.height = "100%";
            } else {
            elemento.style.width = "22%";
            elemento.style.height = "62.91px";
            }
        },

	presionaBoton: function(event){
		calculadora.tamañoPresionado(event.target);
	},		
        tamañoPresionado: function(elemento){
            var x = elemento.id;
            if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
                elemento.style.width = "28%";
                elemento.style.height = "62px";
            } else if(x=="mas") {
                elemento.style.width = "88%";
                elemento.style.height = "98%";
            } else {
            elemento.style.width = "21%";
            elemento.style.height = "62px";
            }
        },
    
    // Darle funcion a los botones
	
	eventoFuncion: function(){		
		document.getElementById("1").addEventListener("click", function() {calculadora.num("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.num("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.num("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.num("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.num("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.num("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.num("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.num("8");});
        document.getElementById("9").addEventListener("click", function() {calculadora.num("9");});
        document.getElementById("0").addEventListener("click", function() {calculadora.num("0");});
        document.getElementById("mas").addEventListener("click", function() {calculadora.operacion("+");});
        document.getElementById("menos").addEventListener("click", function() {calculadora.operacion("-");});
		document.getElementById("por").addEventListener("click", function() {calculadora.operacion("*");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.operacion("/");});
        document.getElementById("on").addEventListener("click", function() {calculadora.reiniciarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.signo();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.Decimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.Resultado();});
	},
    
    // Operaciones y valores iniciales
    
	reiniciarPantalla: function(){ 

	    this.pantallaValor = "0";
		this.operacion = "";
		this.v1 = 0;
		this.v2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.igualAux = false;
		this.vLast = 0;
		this.recargarPantalla();
	},
	
	signo: function(){
		if (this.pantallaValor !="0") {
			var aux;
			if (this.pantallaValor.charAt(0)=="-") {
				aux = this.pantallaValor.slice(1);
			}	else {
				aux = "-" + this.pantallaValor;
			}
		this.pantallaValor = "";
		this.pantallaValor = aux;
		this.recargarPantalla();
		}
	},
	
	Decimal: function(){
		if (this.pantallaValor.indexOf(".")== -1) {
			if (this.pantallaValor == ""){
				this.pantallaValor = this.pantallaValor + "0.";
			} else {
				this.pantallaValor = this.pantallaValor + ".";
			}
			this.recargarPantalla();
		}
	},
	
	num: function(valor){
		if (this.pantallaValor.length < 8) {
		
			if (this.pantallaValor=="0") {
				this.pantallaValor = "";
				this.pantallaValor = this.pantallaValor + valor;
			} else {
				this.pantallaValor = this.pantallaValor + valor;
			}
		this.recargarPantalla();
		}
	},
	
	operacion: function(operando){
		this.v1 = parseFloat(this.pantallaValor);
		this.pantallaValor = "";
		this.operacion = operando;
		this.igualAux = false;
		this.recargarPantalla();
	},
	
	Resultado: function(){

		if(!this.igualAux){ 
			this.v2 = parseFloat(this.pantallaValor);
			this.vLast = this.v2;
			this.realizarOperacion(this.v1, this.v2, this.operacion);
		
		} else {
			this.realizarOperacion(this.v1, this.vLast, this.operacion);
		}
	
		this.v1 = this.resultado;
		this.pantallaValor = "";
	
		if (this.resultado.toString().length < 9){
			this.pantallaValor = this.resultado.toString();
		} else {
			this.pantallaValor = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.igualAux = true;		
		this.recargarPantalla();
	
	},
	
	realizarOperacion: function(v1, v2, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(v1 + v2);
			break;
			case "-": 
				this.resultado = eval(v1 - v2);
			break;
			case "*": 
				this.resultado = eval(v1 * v2);
			break;
			case "/": 
				this.resultado = eval(v1 / v2);
		}
	},
	
	recargarPantalla: function(){
		this.pantalla.innerHTML = this.pantallaValor;
	}
	
};

calculadora.init();