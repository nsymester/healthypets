# Healthy Pets

## Getting Started

### To install

```bash
$ npm install
```

### To run on a local server

```bash
$ npm run start
```

Then enter **http://localhost:3000** in a web browser

### To build production version

```bash
$ npm run build
```

## Build

Built using: 

* Nunjucks templating language for JavaScript
* Bootstrap 4 with custom styles added using SASS

## SASS Stylesheet Architecture

These files are organised according to the ITCSS (Inverted Triangle CSS) Architecture.

```
---------------------------------------
\               Settings              /
 \-----------------------------------/
  \              Tools              /
   \-------------------------------/
    \           Generic           /
     \---------------------------/
      \        Elements         /
       \-----------------------/
        \       Objects       /
         \-------------------/
          \    Components   /
           \---------------/
            \  Overrides  /
             \-----------/
              \         /
               \       /
                \     /
                  ---
```

The top layer of the triangle, **Settings**, contains the most generic styles and as you progress downwards the styles become more and more specific ending with **Overrides**.

## White Labelling

You can change the theme of this application.

### Create a Theme

* create a theme file in the `JSON` format

e.g.:

```json
{
  "command": "activate",
  "name": "Towergate Insurance",
  "images": {
    "logo-mobile": "/images/towergateinsurance/logo.png",
    "logo-desktop": "/images/towergateinsurance/logo.png"
  },
  "colours": {
    "--primary-colour": "#192a56",
    "--panel-bg-colour": "#fff",
    "--body-bg-colour": "#f8f8f8",

    "--menu-bg-colour": "white",
    "--menu-text-colour": "#192a56",
    "--sub-menu-bg-colour": "white",

    "--lifetime-colour": "aqua",
    "--maximum-colour": "magenta",
    "--accident-colour": "black",

    "--form-label-colour": "#aaa",
    "--cta-colour": "#ff8833",
    "--input-bg-colour": "silver",
    "--btn-text-colour": "#1e2d53",
    "--btn-body-colour": "#ffdc00",
    "--btn-body-outline-colour": "#ffdc00",
    "--btn-text-outline-colour": "#192a56",
    "--radio-btn-selected-body-colour": "#ffdc00",
    "--radio-btn-selected-text-colour": "#192a56",

    "--info-border-colour": "#ffdc00",
    "--sale-border-colour": "rgba(90,167,0,1)"
  }
}
```

The following aids with understanding the purpose of each key:

* command - just tells the application to activate this theme.
* images - currently only the location of the logo
* colours - these are the current colour properties that can be modified, hopefully their names make them self explanatory

## Activate the Theme

To activate your theme edit the `theme.json` file and replace the existing theme name with the one you created.
