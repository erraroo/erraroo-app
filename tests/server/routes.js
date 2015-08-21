export function defaultRoutes() {
  this.get('/api/v1/users/1', function(request) {
    return [200, {"Content-Type": "application/json"},
      JSON.stringify({
        Users: {
          ID: "1",
          Email: "bob@example.com"
        }
      })];
  });

  this.get('/api/v1/projects', function(request) {
    return [200, {"Content-Type": "application/json"},
      JSON.stringify({
        Projects: [
          {ID: 1, Name: 'project one'},
          {ID: 2, Name: 'project two'}
        ]
      })];
  });

  this.get('/api/v1/errors', function(request) {
    return [200, {"Content-Type": "application/json"},
      JSON.stringify({
        Errors: [
          {ID: 1, Message: 'error one'},
          {ID: 2, Message: 'error two'}
        ]
      })];
  });

  this.post('/api/v1/sessions', function(request) {
    return [201, {"Content-Type": "application/json"},
      JSON.stringify({
        token: 'xxx',
        userID: '1',
      })];
  });
}

