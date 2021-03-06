# Front end usage

##Heading

The project structure is based on `generator-gulp-angular`

##Project architecture :

```
├──  bower_components/
├──  e2e/
├──  gulp/
├──  nodes_modules/
│
├──  src/
│   ├──  app/
│   │   ├──  templates/
│   │   │   └── homepage.jade
│   │   │   ├── homepage.scss
│   │   │   ├── footer/
│   │   │   │   ├──  footer.jade
│   │   │   │   └──  footer.scss
│   │   │   └──  ...
│   │   ├──  components/
│   │   │   └──  Users/
│   │   │   │   └──  Users.service.js
│   │   │   │
│   │   │   └──  userProfile/
│   │   │   │   └──  userProfile.controller.js
│   │   │   │
│   │   │   └──  webDevTec/
│   │   │       └──  webDevTec.service.js
│   │   │
│   │   ├──  main/
│   │   │   ├──  main.controller.(js|ts|coffee)
│   │   │   ├──  main.controller.spec.js
│   │   │   └──  main.html
│   │   │
│   │   └──  index.config.(js|ts|coffee)
│   │   └──  index.constants.(js|ts|coffee)
│   │   └──  index.module.(js|ts|coffee)
│   │   └──  index.route.(js|ts|coffee)
│   │   └──  index.run.(js|ts|coffee)
│   │   └──  index.(scss|styl|less|css)
|   |
│   ├──  assets/
│   │   └──  images/
│   ├──  configs/
│   │   └──  sidenavConfig.json
│   ├──  favico.ico
│   └──  index.html
│
├──  .bowerrc
├──  .editorconfig
├──  .gitignore
├──  .eslintrc
├──  bower.json
├──  gulpfile.js
├──  karma.conf.js
├──  package.json
└──  protractor.conf.js
```

## Run the development server and live-reload

Install the different packages :
- with `npm install`
- and `bower install`

Just launch `gulp serve` in the root directory where `gulpfile.js` is located
