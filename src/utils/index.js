const printRoutes = (app) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
      if (middleware.route) { // routes registered directly on the app
        routes.push(middleware.route);
      } else if (middleware.name === 'router') { // router middleware
        middleware.handle.stack.forEach((handler) => {
          let route;
          route = handler.route;
          route && routes.push(route);
        });
      }
    });
  
    routes.forEach((route) => {
      const methods = Object.keys(route.methods).map(method => method.toUpperCase()).join(', ');
      console.log(`${methods} ${route.path}`);
    });
  };
  
  module.exports = {
    printRoutes
  }