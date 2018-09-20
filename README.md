# Healthy Pets

## Tests

For the stylelint use either:

- stylelint-config-recommended or
- stylelint-config-standard

## Build

## Linting

"extends": "eslint:recommended",

## Bitbucket pipelines

Got help creating the pipeline from [Stack Overflow](https://stackoverflow.com/questions/40030786/bitbucket-pipeline-for-simple-html-site-no-database)

## SASS stylesheet structure

### CSS Architecture

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

The top layer of the triangle contains the most generic styles and as you progress downwards the styles become more and more specific ending with overrides.