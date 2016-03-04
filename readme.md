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

### Folder based loading

```
/root
  |- routes
    |- user.js
    |- fruit.js
```

Usage:
```
var routes = require('tiny-load)('folder', 'routes');
var routesUser = routes.user();
var routesFruit = routes.fruit();
```

# Todo

- [ ] Tests. We all need and love them.
- [x] Folder based loading
- [x] Organize dev content into test content
- [x] filter default/common folders - git, node_modules
- [ ] Type based loading needs to specify starting directory, otherwise slows down from node_modules
