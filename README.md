# A-Frame Keyboard

Teclado virtual

[A-Frame](https://aframe.io/) v0.9.2+.

![](static/screenshot.png)

### Atributos

| Nombre | Descripción | Default |
| --- | --- | --- | 
| keyColor | Color de la letra | #FFF |
| activeKeyColor | Color del cuadro de la tecla activa | #FF0 |
| letterColor | Color del cuadro de la tecla | #000 |
| shiftMayus | Booleano que determina si está activo el teclado con mayúsculas | 0 (false) |
| contUser | Booleano que determina si hay algún caracter en el campo ‘Usuario’ | 0 (false) |
| contPass | Booleano que determina si hay algún caracter en el campo ‘Contraseña’ | 0 (false) |
| soundSrc | Efecto de sonido al presionar alguna tecla | keySound.mp3 |

### Métodos

| Nombre | Descripción |
| --- | --- |
| overTecla() | Efecto al posicionar cursor encima de la tecla. |
| outTecla() | Efecto al posicionar cursor fuera de la tecla. |
| inputTecla() | Detecta tecla presionada en teclado VR. |
| clearInput() | Borra texto en campo de texto en teclado VR. |
| cambiaTeclado() | Alterna teclado VR Minus/Mayus. |
| destruyeTeclado() | Destruye teclado VR existente. |
| active() | Efecto de campo de texto activo. |
| tabActive() | Efecto de campo de texto activo por medio de tecla Tab en teclado físico. |
| reset() | Resetea color de bordes en campos de texto. |
| openkeyboard() | Abre teclado VR. |
| inputTeclado() | Detecta tecla presionada en teclado físico. |
| login() | Verificación de campos de texto. |

### Dependencias

[https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js ](https://rawgit.com/rdub80/aframe-gui/master/dist/aframe-gui.min.js )
[https://raw.githubusercontent.com/andycandys/keyboard/master/js/keyboard-json.js](https://raw.githubusercontent.com/andycandys/keyboard/master/js/keyboard-json.js)
[https://raw.githubusercontent.com/andycandys/keyboard/master/keySound.mp3 ](https://raw.githubusercontent.com/andycandys/keyboard/master/keySound.mp3)
[https://raw.githubusercontent.com/andycandys/keyboard/master/fonts/Roboto-Regular-msdf.json](https://raw.githubusercontent.com/andycandys/keyboard/master/fonts/Roboto-Regular-msdf.json)

### HTML

```javascript
<a-scene vr-mode-ui cursor="rayOrigin:mouse" raycaster="objects:#user, #pass, #teclado>a-entity>a-plane, #login">
  <a-entity id="inputs">
    <a-gui-input id="user" position="0 1.85 -0.5" width="1.6" height="0.35" value="Usuario" font-size="50px" font-color="#212121" border-color="#212121" border-hover-color="#424242" background-color="#FAFAFA" hover-color="#F5F5F5" active-color="#FFEB3B" scale="0.3 0.3 0.3"></a-gui-input>
    <a-gui-input id="pass" position="0 1.75 -0.5" width="1.6" height="0.35" value="Contraseña" font-size="50px" font-color="#212121" border-color="#212121" border-hover-color="#424242" background-color="#FAFAFA" hover-color="#F5F5F5" active-color="#FFEB3B" scale="0.3 0.3 0.3"></a-gui-input>
    <a-gui-button id="login" width="0.5" height="0.15" key-code="32" value="Log in" font-family="Arial" margin="0 0 0.05 0" position="0 1.66 -0.5" font-size="40px" scale="0.3 0.3 0.3"></a-gui-button>
  </a-entity>
  <a-entity id="tecladoWrapper" scale="0 0 0" position="0 0 0">
    <a-entity id="teclado" keyboard="letterColor:#FFF; keyColor:#000;" position="-0.4 1.57 -0.5" scale="0 0 0"></a-entity>
  </a-entity>
</a-scene>
```
