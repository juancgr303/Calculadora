var calculadora = {
	
	pantalla: document.getElementById("display"),
	pantallaValor: "0",
	operacion: "",
	v1: 0,
	v2: 0,
	ultimoValor: 0,
	resultado: 0,
	auxIgual: false, 
	
	init: (function(){
		this.formatoBotones(".tecla");
		this.eventoFuncion();
	}),
	
	//Animación de Botones
	
	formatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onclick = this.hacerClick;
			x[i].onmouseleave = this.salirBoton;
		};
	},

	hacerClick: function(event){
		calculadora.reduceBoton(event.target);
	},

	salirBoton: function(event){
		calculadora.aumentaBoton(event.target);
	},
	
	//Formato de botones 
	
	reduceBoton: function(elemento){
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
	
	aumentaBoton: function(elemento){
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
		
	//Eventos de función de calculadora

	eventoFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},
	
	//Funcion de teclas de calculadora
	
	borrarPantalla: function(){ 

	    this.pantallaValor = "0";
		this.operacion = "";
		this.v1 = 0;
		this.v2 = 0;
		this.resultado = 0;
		this.auxIgual = false;
		this.ultimoValor = 0;
		this.recargarPantalla();
	},
	
	cambiarSigno: function(){
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
	
	ingresoDecimal: function(){
		if (this.pantallaValor.indexOf(".")== -1) {
			if (this.pantallaValor == ""){
				this.pantallaValor = this.pantallaValor + "0.";
			} else {
				this.pantallaValor = this.pantallaValor + ".";
			}
			this.recargarPantalla();
		}
	},
	
	ingresoNumero: function(valor){
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
	
	ingresoOperacion: function(oper){
		this.v1 = parseFloat(this.pantallaValor);
		this.pantallaValor = "";
		this.operacion = oper;
		this.auxIgual = false;
		this.recargarPantalla();
	},
	
	verResultado: function(){ 

		if(!this.auxIgual){ 
			this.v2 = parseFloat(this.pantallaValor);
			this.ultimoValor = this.v2;
		
		
			this.realizarOperacion(this.v1, this.v2, this.operacion);
		
		} else { 
		
		this.realizarOperacion(this.v1, this.ultimoValor, this.operacion);
		}
	
		
		this.v1 = this.resultado;
	
		
		this.pantallaValor = "";
	
		

		if (this.resultado.toString().length < 9){
			this.pantallaValor = this.resultado.toString();
		} else {
			this.pantallaValor = this.resultado.toString().slice(0,8) + "...";
		}
	
		

		this.auxIgual = true;		
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