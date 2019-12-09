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
