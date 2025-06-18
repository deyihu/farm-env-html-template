# farm-env-html-template

This is farm js plugin  

Using environment variables in HTML file  

## Install

```sh
npm i farm-env-html-template
```

## Config

```ts
//farm.config.ts

import { defineConfig } from "@farmfe/core";
import farm_env_html_template from 'farm-env-html-template';
//other plugins

export default defineConfig({
  compilation: {
    presetEnv: false,
    input: {
      index: './index.html',
      about: './about.html',
    },
  },
  plugins: [
    farm_env_html_template({}),
    //other plugins
    
    ],
})

```

## Use

```
//.env

FARM_TITLE=HELLO


```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <title>%FARM_TITLE%</title>
</head>

<body>
    <div id="app"></div>
    <script src="./src/main.ts"></script>
</body>

</html>
```
