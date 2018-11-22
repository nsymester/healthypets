// module "WhiteLabelling.js"

// postcodes

let httpRequest;

function WhiteLabelling(theme = 'Towergate') {
  // if (theme === 'Healthy Pets') {
  //   // main colours
  //   document.documentElement.style.setProperty('--primary-colour', 'orange');

  //   // main body and panel backgrounds
  //   document.documentElement.style.setProperty('--panel-bg-colour', 'orange');
  //   document.documentElement.style.setProperty('--body-bg-colour', 'orange');

  //   // menu background colour
  //   document.documentElement.style.setProperty('--menu-bg-colour', 'orange');
  //   document.documentElement.style.setProperty('--sub-menu-bg-colour', 'orange');

  //   // policy colours
  //   document.documentElement.style.setProperty('--lifetime-colour', 'orange');
  //   document.documentElement.style.setProperty('--maximum-colour', 'orange');
  //   document.documentElement.style.setProperty('--accident-colour', 'orange');

  //   // form colours
  //   document.documentElement.style.setProperty('--form-label-colour', 'orange');
  //   document.documentElement.style.setProperty('--cta-colour', 'orange');
  //   document.documentElement.style.setProperty('--input-bg-colour', 'orange');
  // }
  makeRequest('theme.json');
}

function makeRequest(file) {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    console.warn('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.onreadystatechange = processContents;
  httpRequest.open('GET', `/config/${file}`);
  httpRequest.send();
}

function processContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      // parse the json file
      const config = JSON.parse(httpRequest.responseText);

      // load theme
      switch (config.command) {
      case 'load':
        makeRequest(`/themes/${config.theme}`);
        break;
      case 'activate':
        loadTheme(config);
        break;
      default:
        // do nothing
      }
    } else {
      console.error('There was a problem with the request.');
    }
  }
}

function loadTheme(theme) {
  // console.log(theme);
  // change css info
  // for (const style in theme.colours) {
  //   document.documentElement.style.setProperty(style, theme.colours[style]);
  // }

  const cssId = 'myCss'; // you could encode the css path itself to generate id..
  if (!document.getElementById(cssId)) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = theme.css;
    link.media = 'all';
    head.appendChild(link);
  }

  // change image info
  document.querySelector('.logo__mobile').setAttribute('srcset', theme.images['logo-mobile']);
  document.querySelector('.logo__desktop').setAttribute('srcset', theme.images['logo-desktop']);
  document.querySelector('.logo img').setAttribute('src', theme.images['logo-mobile']);
  document.querySelector('.logo img').setAttribute('alt', `${theme.name} logo`);
}

export { WhiteLabelling };
