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
