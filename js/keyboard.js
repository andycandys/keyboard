AFRAME.registerComponent('keyboard', {
  schema: {
    keyColor: {type:'string', default: '#FFF'},
    activeKeyColor: {type:'string', default: '#FF0'},
    letterColor: {type: 'string', default: "#000"},
    shiftMayus: {type: 'number', default: 0},
    contUser: {type: 'number', default: 0},
    contPass: {type: 'number', default: 0},
    soundSrc: {type: 'string', default:"keySound.mp3"}
  },
  
  init: function () {
    //Declara variables
    this.textInput = '';
    this.i = 0;
    this.j = 0;
    this.currentLetter = '';
    this.letterRepeat = 0;
    this.newPos = 0;
    this.teclaTemp = '';
    this.planoWidth = 0;
    this.key = '';
    this.text = '';
    this.textFieldUser = '';
    this.textFieldPass = '';
    this.jsonActual = '';
    this.shiftKey = 0;
    this.username = '';
    this.password = [];
    this.vr = 0;
    this.contador = 0;
    this.userCont = 0;
    this.passCont = 0;
    this.soundSrc = ''; 
    this.vrkeyComponent = document.querySelector('[keyboard]').components.keyboard;
    var self = this;  
    //Crea entidad sonido tecla  
    this.soundTecla = document.createElement("a-entity");
    document.querySelector("a-scene").appendChild(this.soundTecla);
    //Deshabilita tecla F
    document.querySelector("a-scene").setAttribute("keyboard-shortcuts","enterVR: false"); 
    //Placeholder inicial  
    this.textFieldUser = document.getElementById("user");
    this.textFieldPass = document.getElementById("pass");
    this.textFieldUser.setAttribute('gui-input', 'text', "Usuario");
    this.textFieldPass.setAttribute('gui-input', 'text', "Contraseña");          
    //Verifica si está en VR
    window.addEventListener('enter-vr', e => {
    if (AFRAME.utils.device.checkHeadsetConnected()) {
      this.vr = 1;
      //var textFields = document.getElementById("textFields");
      //textFields.style.visibility = "hidden";
    } 
    });    
  },
  
  update: function (oldData) {
    //Variables     
    self.vrkeyComponent =  this.vrkeyComponent;
    var vrkeyComponent = self.vrkeyComponent;
    console.log(self.vrkeyComponent);
    var login = document.getElementById("login");
    login.addEventListener('click', vrkeyComponent.login);    
    self.textFieldUser = document.getElementById("user");
    self.textFieldPass = document.getElementById("pass");
    self.textFieldUser.addEventListener('click', vrkeyComponent.active);
    self.textFieldPass.addEventListener('click', vrkeyComponent.active);    
    self.soundTecla = this.soundTecla;
    self.soundSrc = this.data.soundSrc;
    self.shiftKey = 0;
    self.vr = this.vr;
    
    //Verifica si hay texto en los campos
    if (this.data.contUser == 0) {
      self.userCont = 0;
    } 

    if (this.data.contPass == 0) {
      self.passCont = 0;
      self.password = [];
    }
   
    //Destruye y vuelve a crear teclado
    vrkeyComponent.destruyeTeclado();

    if (this.data.shiftMayus == 0) {
      this.jsonActual = keyjson;
    } else {
      this.jsonActual = keyjsonMayus;
    }

    for(this.i=0;this.i<5;this.i++){
      for(this.j=0;this.j<17;this.j++){
        var tecla = document.createElement("a-entity");
        var letra = document.createElement("a-text");
        var plano = document.createElement("a-plane");

        //console.log(keyjson[0][i][j]);
        if(this.jsonActual[0][this.i][this.j]!=null){         
          if(this.currentLetter!=this.jsonActual[0][this.i][this.j]){
            if(this.letterRepeat>0){
              this.planoWidth=(.06*(this.letterRepeat+1))-.01;
              //console.log(planoWidth);
              this.newPos = (this.planoWidth/2)-.025;
              //console.log(newPos);
              this.teclaTemp.querySelector("a-plane").setAttribute("width", this.planoWidth);
              this.teclaTemp.querySelector("a-plane").setAttribute("position", {y: 0, z: 0, x: this.newPos});
              this.teclaTemp.querySelector("a-text").setAttribute("position", {y: 0, z: 0, x: this.newPos});
            }
            
            if(this.jsonActual[0][this.i][this.j]!="end"){
              letra.setAttribute("font","fonts/Roboto-Regular-msdf.json");
              letra.setAttribute("value", this.jsonActual[0][this.i][this.j]);
              letra.setAttribute("position","0 0 .001");
              letra.setAttribute("color", this.data.letterColor);
              letra.setAttribute("negate", "false");
              letra.setAttribute("text", "width:.5");
              letra.setAttribute("align", "center");
              plano.setAttribute("width", ".05");
              plano.setAttribute("height", ".05");   
              plano.setAttribute("color", this.data.keyColor);
              plano.setAttribute("class", "tecla");
              plano.addEventListener("click", vrkeyComponent.inputTecla);
              plano.addEventListener("mouseenter", vrkeyComponent.overTecla);
              plano.addEventListener("mouseleave", vrkeyComponent.outTecla);
              plano.setAttribute("animation__color", "property:material.color; from:"+this.data.activeKeyColor+";to:"+this.data.keyColor+"; dur:100; startEvents:teclaClick;");
              tecla.setAttribute("animation__scale", "property:scale; from:.9 .9 .9; to:1 1 1; dur:100; startEvents:teclaClick;");
              tecla.setAttribute("animation__hover", "property:scale; from:1 1 1; to:1.1 1.1 1.1; dur:100; startEvents:teclaHover;");
              tecla.setAttribute("animation__out", "property:scale; from:1.1 1.1 1.1; to:1 1 1; dur:100; startEvents:teclaOut;");
              tecla.setAttribute("position", (this.j*.06)+" "+(-this.i*.06)+" 0");
              tecla.appendChild(plano);
              tecla.appendChild(letra);
              this.currentLetter = this.jsonActual[0][this.i][this.j];
              this.el.appendChild(tecla);
              this.letterRepeat = 0;
              this.teclaTemp = tecla;
            }
          }else{
            this.letterRepeat++;
            this.teclaTemp.querySelector("a-plane");
            //console.log(keyjson[0][i][j]);
            //currentLetter = keyjson[0][i][j];
          }
        }
      }
    }
  },

  //HoverTecla
  overTecla: function () {
    this.parentElement.emit("teclaHover");
  },

  //OutTecla
  outTecla: function () {
    this.parentElement.emit("teclaOut");
  },

  //InputTecla VR
  inputTecla: function () {    
    self.text = this.parentElement.querySelector("a-text").getAttribute("value");
    this.parentElement.emit("teclaClick");
    this.emit("teclaClick");
    //Reproduce sonido
    self.soundTecla.setAttribute("sound","src: url("+self.soundSrc+");");
    self.soundTecla.components.sound.playSound();
    //Campo Usuario
    if (self.textInput == "user") {
      if (text === 'Supr') {
        self.textFieldUser.components['gui-input'].delete();
        if (self.textFieldUser.getAttribute('gui-input').text == "") {
          self.textFieldUser.setAttribute('gui-input', 'text', "Usuario");
          self.userCont = 0;
        }
      } else if (text === 'space') {
        self.textFieldUser.components['gui-input'].appendText(' ');
        } else if (text === 'Clear') {
            vrkeyComponent.clearInput();
          } else if (text === 'hide') {
              var keyboard = document.getElementById("teclado");
              keyboard.object3D.scale.set(0,0,0);              
            } else if (text === 'shift') {
                vrkeyComponent.cambiaTeclado();
              } else {
                  while (self.userCont == 0) {
                    self.textFieldUser.setAttribute('gui-input', 'text', "");
                    var keyboardVR = document.getElementById("teclado");
                    keyboardVR.setAttribute("keyboard","contUser", 1);
                    self.userCont = 1;
                  }
                  self.textFieldUser.components['gui-input'].appendText(text);
                } 
      self.username = self.textFieldUser.getAttribute('gui-input').text;        
    }
    //Campo Contraseña
    else {
      if (text === 'Supr') {
        self.textFieldPass.components['gui-input'].delete();
        self.password.pop(text);
        if (self.textFieldPass.getAttribute('gui-input').text == "") {
          self.textFieldPass.setAttribute('gui-input', 'text', "Contraseña");
          self.passCont = 0;
        }
      } else if (text === 'space') {
          self.textFieldPass.components['gui-input'].appendText(' ');
        } else if (text === 'Clear') {
            vrkeyComponent.clearInput();
          } else if (text === 'hide') {
              var keyboard = document.getElementById("teclado");
              keyboard.object3D.scale.set(0,0,0);
            } else if (text === 'shift') {
                vrkeyComponent.cambiaTeclado();
              } else {
                  while (self.passCont == 0) {
                    self.textFieldPass.setAttribute('gui-input', 'text', "");
                    var keyboardVR = document.getElementById("teclado");
                    keyboardVR.setAttribute("keyboard","contPass", 1);
                    self.passCont = 1;
                  }                
                  self.password.push(text);
                  self.textFieldPass.components['gui-input'].appendText('*');
                }       
    }  
    //console.log("El usuario es: "+username);
    //console.log("La contraseña es: "+password.join(''));    
  },

  //Borra texto en campo VR
  clearInput: function () {      
    if (self.textInput == "user") {
      self.username = "";
      self.textFieldUser.setAttribute('gui-input', 'text', "Usuario");
      self.userCont = 0;
    }
    else {
      self.password = [];
      self.textFieldPass.setAttribute('gui-input', 'text', "Contraseña");
      self.passCont = 0;
    }
  },

  //Cambia teclado mayus minus VR
  cambiaTeclado: function () {
    var keyboardVR = document.getElementById("teclado");
    //vrkeyComponent.destruyeTeclado();
    if (self.shiftKey==0) {
      keyboardVR.setAttribute("keyboard","shiftMayus", 1);
      self.shiftKey = 1;
    }   
    else {
      keyboardVR.setAttribute("keyboard","shiftMayus",0);
      self.shiftKey = 0; 
    }  
  },

  //Destruye teclado
  destruyeTeclado: function(){
    var keyboardVR = document.getElementById("teclado");
    while (keyboardVR.hasChildNodes()) {
      keyboardVR.removeChild(keyboardVR.lastChild);
    }
  },

  //Cuado de texto activo
  active: function () {
    vrkeyComponent.reset();
    vrkeyComponent.openKeyboard();
    self.textInput = this.id;
    this.setAttribute("border-color", "#424242");     
  },

  //Cuado de texto activo con tecla TAB
  tabActive: function () {
    if (self.textInput == "user") {
      self.textFieldUser.setAttribute("border-color", "#424242");  
    }
    else {
      self.textFieldPass.setAttribute("border-color", "#424242"); 
    }
  },

  //Resetea bordes
  reset: function () {
    self.textFieldUser.setAttribute("border-color", "#212121");
    self.textFieldPass.setAttribute("border-color", "#212121");
  },

  //Abre teclado VR
  openKeyboard: function () {    
    var camRotation = document.getElementById("head");
    var tecladoWrapper = document.getElementById("tecladoWrapper");
    tecladoWrapper.object3D.rotation.y = camRotation.object3D.rotation.y;
    var teclado = document.getElementById("teclado");
    if (this.vr == 1) { 
      tecladoWrapper.object3D.scale.set(1,1,1);
      teclado.object3D.scale.set(1,1,1);
    }
    else {
      document.addEventListener("keydown", this.vrkeyComponent.inputTeclado);
    }
  },

  //Funcionamiento teclado físico
  inputTeclado: function() {
    //Campo de texto Usuario
    if (self.textInput == "user") {
        if (event.key == 'Backspace') {
          self.textFieldUser.components['gui-input'].delete();
          if (self.textFieldUser.getAttribute('gui-input').text == "") {
          self.textFieldUser.setAttribute('gui-input', 'text', "Usuario");
          self.userCont = 0;
          }    
        }
        else if (event.key == 'Shift' || event.key == 'Control' || event.key == 'Alt' || event.key == 'Escape' || event.key == 'F1' || event.key == 'F2' || event.key == 'F3' || event.key == 'F4' || event.key == 'F5' || event.key == 'F6' || event.key == 'F7' || event.key == 'F8' || event.key == 'F9' || event.keytextInput == 'F10' || event.key == 'F11' || event.key == 'F12' || event.key == 'CapsLock' || event.key == 'Insert' || event.key == 'Delete' || event.key == 'Home' || event.key == 'End' || event.key == 'PageUp' || event.key == 'PageDown' || event.key == 'Dead' || event.key == 'Meta' || event.key == 'AltGraph' || event.key == 'ArrowLeft' || event.key == 'ArrowUp' || event.key == 'ArrowRight' || event.key == 'ArrowDown' || event.key == 'NumLock' || event.key == 'Enter') { }
        else if (event.key == 'Tab') {       
          self.textInput = "pass";
          vrkeyComponent.reset();
          vrkeyComponent.tabActive();
        }
        else if (event.key == 'Space') { 
          self.textFieldUser.components['gui-input'].appendText(' ');          
        }
        else {
          while (self.userCont == 0) {
            self.textFieldUser.setAttribute('gui-input', 'text', "");
            self.userCont = 1;
          }   
          var x = event.key;
          self.textFieldUser.components['gui-input'].appendText(x);
        }
        self.username = self.textFieldUser.getAttribute('gui-input').text;           
      }

      //Campo de texto Contraseña
      else {
        if (event.key == 'Backspace') {
          self.textFieldPass.components['gui-input'].delete();
          self.password.pop();
          if (self.textFieldPass.getAttribute('gui-input').text == "") {
          self.textFieldPass.setAttribute('gui-input', 'text', "Contraseña");
          self.passCont = 0;
          }    
        }
        else if (event.key == 'Shift' || event.key == 'Control' || event.key == 'Alt' || event.key == 'Escape' || event.key == 'F1' || event.key == 'F2' || event.key == 'F3' || event.key == 'F4' || event.key == 'F5' || event.key == 'F6' || event.key == 'F7' || event.key == 'F8' || event.key == 'F9' || event.key == 'F10' || event.key == 'F11' || event.key == 'F12' || event.key == 'CapsLock' || event.key == 'Insert' || event.key == 'Delete' || event.key == 'Home' || event.key == 'End' || event.key == 'PageUp' || event.key == 'PageDown' || event.key == 'Dead' || event.key == 'Meta' || event.key == 'AltGraph' || event.key == 'ArrowLeft' || event.key == 'ArrowUp' || event.key == 'ArrowRight' || event.key == 'ArrowDown' || event.key == 'NumLock' || event.key == 'Enter') { }
        else if (event.key == 'Tab') {       
          self.textInput = "user";
          vrkeyComponent.reset();
          vrkeyComponent.tabActive();
        }
        else if (event.key == 'Space') { 
          self.textFieldPass.components['gui-input'].appendText(' ');
        }
        else {
          while (self.passCont == 0) {
            self.textFieldPass.setAttribute('gui-input', 'text', "");
            self.passCont = 1;
          }
          var x = event.key;
          self.password.push(x);
          self.textFieldPass.components['gui-input'].appendText('*');
        }
      }
  },

  //Verifica campos para ingresar
  login: function () {
    if (self.userCont == 0 || self.passCont == 0) {
      console.log("Ingresa tus datos");
      if(self.vr==0){
        alert("Ingresa tus datos");
      }
    }
    else {
      console.log("El usuario es: "+self.username);
      console.log("La contraseña es: "+self.password.join(''));
      if (self.vr==0) {
        alert("El usuario es: "+self.username);
        alert("La contraseña es: "+self.password.join(''));
      }
    }
  }
});
