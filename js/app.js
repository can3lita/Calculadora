var Calculadora = {
    pantalla : document.getElementById("display").innerHTML,
    numero : 0,
    operacion : 0, //1. resta 2. suma 3. division 4. multiplicacion
    
    decimal: 0,
	signo: 0,
	solo8: 8,
	stop: 0,
	auxnum: 0,
	auxestado: 0,
    
    inicializar : (
        function(){
            this.eventosMouse();
        }
    ),
    efectoTecla: function(tecla){		
        document.getElementById(tecla).addEventListener("mousedown", function(){Calculadora.reducir(tecla)});
        document.getElementById(tecla).addEventListener("mouseup", function(){Calculadora.aumentar(tecla)});
	},
    reducir : function(tecla){
        document.getElementById(tecla).style.transform="scale(0.9)";
    },
    aumentar : function(tecla){
        document.getElementById(tecla).style.transform="scale(1)";
    },
    eventosMouse : function(){
        document.getElementById("0").addEventListener("click",function(){Calculadora.mostrarDigito("0")});
		document.getElementById("1").addEventListener("click",function(){Calculadora.mostrarDigito("1")});
		document.getElementById("2").addEventListener("click",function(){Calculadora.mostrarDigito("2")});
		document.getElementById("3").addEventListener("click",function(){Calculadora.mostrarDigito("3")});
		document.getElementById("4").addEventListener("click",function(){Calculadora.mostrarDigito("4")});
		document.getElementById("5").addEventListener("click",function(){Calculadora.mostrarDigito("5")});
		document.getElementById("6").addEventListener("click",function(){Calculadora.mostrarDigito("6")});
		document.getElementById("7").addEventListener("click",function(){Calculadora.mostrarDigito("7")});
		document.getElementById("8").addEventListener("click",function(){Calculadora.mostrarDigito("8")});
		document.getElementById("9").addEventListener("click",function(){Calculadora.mostrarDigito("9")});
        
        document.getElementById("dividido").addEventListener("click",function(){Calculadora.dividido()});
		document.getElementById("menos").addEventListener("click",function(){Calculadora.menos()});
        document.getElementById("mas").addEventListener("click",function(){Calculadora.mas()});
		document.getElementById("por").addEventListener("click",function(){Calculadora.por()});
        
		document.getElementById("on").addEventListener("click",function(){Calculadora.on()});
		document.getElementById("sign").addEventListener("click",function(){Calculadora.sign()});
		document.getElementById("punto").addEventListener("click",function(){Calculadora.punto()});
		document.getElementById("igual").addEventListener("click",function(){Calculadora.igual()});
        
        document.getElementById("raiz").addEventListener("click",function(){Calculadora.raiz()});
    },
    mostrarDigito : function(digito){
        this.efectoTecla(digito);
		if(this.signo == 1 && this.stop == 0){
			this.solo8 += 1,
			this.stop = 1;
		}
		if(this.decimal == 1  && this.stop == 0){
			this.solo8 += 1,
			this.stop = 1;
		}
		if(this.pantalla.length < this.solo8){
            if(this.pantalla == '0'){
                this.pantalla=digito;
            }else{ 
                var str2=digito; 
                var res = this.pantalla.concat(str2);
                this.pantalla=res;
            }
		}
        this.mostrarPantalla();
    },
    mostrarPantalla : function(){
        if(this.pantalla.toString().length > this.solo8){
			this.pantalla = this.pantalla.toString().substring(0,8);
		}
		document.getElementById("display").innerHTML = this.pantalla;
    },
    raiz : function(){
        this.efectoTecla("raiz");
    },
    menos : function(){
        this.efectoTecla("menos");
        this.numero = Number(this.pantalla);
        this.pantalla = "",
        this.operacion = 1,
            
        this.auxestado = 0,
        this.signo = 0,
        this.auxnum = 0,
        this.decimal = 0,
            
        this.mostrarPantalla();
    },
    mas : function(){
        this.efectoTecla("mas");
        this.numero = Number(this.pantalla);
        this.pantalla = "",
        this.operacion = 2,
            
        this.auxestado = 0,
        this.signo = 0,
        this.auxnum = 0,
        this.decimal = 0,
            
        this.mostrarPantalla();
    },
    dividido : function(){
        this.efectoTecla("division");
        this.numero = Number(this.pantalla);
        this.pantalla = "",
        this.operacion = 3,
            
        this.auxestado = 0,
        this.signo = 0,
        this.auxnum = 0,
        this.decimal = 0,
            
        this.mostrarPantalla();
    },
    por : function(){
        this.efectoTecla("por");
        this.numero = Number(this.pantalla);
        this.pantalla = "",
        this.operacion = 4,
            
        this.auxestado = 0,
        this.signo = 0,
        this.auxnum = 0,
        this.decimal = 0,
            
        this.mostrarPantalla();
    },
    on : function(){
        this.efectoTecla("on");
        this.pantalla="0";
        
        this.decimal = 0,
		this.signo = 0,
		this.stop = 0,
		this.solo8 = 8 
		this.numero = 0,
		this.auxestado = 0,
		this.auxnum = 0,	
		this.operacion = 0,
            
        this.mostrarPantalla();
    },
    sign : function(){
        this.efectoTecla("sign");
		if(this.pantalla != 0){
			if(this.signo == 0){
				this.pantalla = "-" + this.pantalla,
				this.signo = 1;
			}else{
				this.pantalla = this.pantalla.slice(1);
				this.signo = 0;
			}
		}
		this.mostrarPantalla();
    },
    punto : function(){
        this.efectoTecla("punto");
		if(this.decimal == 0){
			this.pantalla += ".";
		}
		this.decimal = 1,
		this.mostrarPantalla();
    },
    igual: function(){
		this.efectoTecla("igual");
		switch(this.operacion){
			case 1: //resta
					if(this.auxestado == 0){
						this.auxnum = Number(this.pantalla),
						this.pantalla = this.numero - Number(this.pantalla),
						this.auxestado = 1,
						this.numero = 0;
					}else{
						this.pantalla = Number(this.pantalla)-this.auxnum;
					}
				break;
            case 2: //suma
					if(this.auxestado == 0){
						this.auxnum = Number(this.pantalla),
						this.pantalla = this.numero + Number(this.pantalla),
						this.auxestado = 1,
						this.numero = 0;
					}else{
						this.pantalla = Number(this.pantalla)+this.auxnum;
					}
				break;
            case 3: //division
					if(this.auxestado == 0){
						this.auxnum = Number(this.pantalla),
						this.pantalla = this.numero / Number(this.pantalla),
						this.auxestado = 1,
						this.numero = 0;
					}else{
						this.pantalla = Number(this.pantalla)/this.auxnum;
					}
				break;
			case 4: //multiplicacion
					if(this.auxestado == 0){
						this.auxnum = Number(this.pantalla),
						this.pantalla = this.numero * Number(this.pantalla),
						this.auxestado = 1,
						this.numero = 0;
					}else{
						this.pantalla = Number(this.pantalla)*this.auxnum;
					}
				break;
			default:
				break;
		}
		this.mostrarPantalla();
	},
}
Calculadora.inicializar();

