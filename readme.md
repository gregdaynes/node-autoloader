# TinyLoader

a tiny, fast loading script to easily include modules.

Supports both loading by component, and by type.

## Usage

### Component based loading

```
/root
  |- user
    |- helpers.js
    |- models.js
    |- routes.js
```

Usage:
```
var component = require('tiny-load')('path/to/component');
```

Common style
```
var user = require('tiny-load')('user');
var userHelper = user.helpers();
var userRoutes = user.routes();

userRoutes.fn(params);
```

Inline style
```
var userRoutes = require('tiny-loader')('user').routes();

userRoutes.fn(params);
```

### Type based loading

```
/root
  |- user
    |- helpers.js
    |- models.js
    |- routes.js
  |- components
    |- fruit
      |- helpers.js
      |- routes.js
```

Usage:
```
var routes = require('tiny-load')(true, 'routes.js');
var routesUser = routes.user();
var routesFruit = routes.fruit();

routesUser.fn(params);
routesFruit.fn(params);
```

# Todo

- [ ] Tests. We all need and love them.
- [ ] Folder based loading
- [ ] Organize dev content into test content
