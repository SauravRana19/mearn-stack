const url = require('url');
const { ditstekEmployee, smartDataEmployee } = require('./employeeData.js');

const writeSuccessHead = (res, statusCode, statusText, contentType) => {
  res.writeHead(statusCode, statusText, { 'Content-Type': contentType });
};

const renderHTMLPage = (title, bodyContent) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
        h1 { color: #333; }
        table { width: 100%; border-collapse: collapse; background: white; }
        th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
        th { background-color: #f0f0f0; }
        button { padding: 10px 20px; margin: 5px; cursor: pointer; }
      </style>
    </head>
    <body>
      ${bodyContent}
    </body>
  </html>
`;

const renderEmployeeTablePage = (title, data) => {
  const headers = Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('');
  const rows = data.map(emp =>
    `<tr>${Object.values(emp).map(val => `<td>${val}</td>`).join('')}</tr>`
  ).join('');
  return renderHTMLPage(title, `
    <h1>${title}</h1>
    <table>
      <thead><tr>${headers}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `);
};

const requestHandler = (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const reqMethod = req.method;
  console.log('enter',pathname , reqMethod);
  

  if (pathname === '/' && reqMethod === 'GET') {
    writeSuccessHead(res, 200, 'OK', 'text/html');
    res.end(renderHTMLPage("Dashboard", `
      <h1>Welcome to Employee's Dashboard Module</h1>
      <div>
        <button onclick="location.href='/ditstekemployee'">DitsTek</button>
        <button onclick="location.href='/smartdataemployee'">SmartData</button>
      </div>
    `));
  }

  else if (pathname === '/ditstekemployee' && reqMethod === 'GET') {
    writeSuccessHead(res, 200, 'OK', 'text/html');
    res.end(renderEmployeeTablePage("Ditstek Employee Module", ditstekEmployee));
  }
  else if (pathname === '/getallditstekemployee' && reqMethod === 'GET') {
    writeSuccessHead(res, 200, 'OK', 'application/json');
    res.end(JSON.stringify(ditstekEmployee));
  }
  else if (pathname === '/ditstekemployee' && reqMethod === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newEmployee = JSON.parse(body);
      console.log('body', body);
      console.log('newEmployee', newEmployee);
      // ditstekEmployee.push(newEmployee);

      writeSuccessHead(res, 201, 'Created', 'application/json');
      res.end(JSON.stringify({ message: 'Employee added successfully' }));
    });
  }

  else if (pathname === '/smartdataemployee' && reqMethod === 'GET') {
    writeSuccessHead(res, 200, 'OK', 'text/html');
    res.end(renderEmployeeTablePage("SmartData Employee Module", smartDataEmployee));
  }

  else {
    writeSuccessHead(res, 404, 'Not Found', 'text/html');
  
    const html404 = renderHTMLPage("404 Not Found", `
      <div style="text-align: center;">
        <h1 style="font-size: 72px; color: #ff4c4c;">404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you’re looking for doesn’t exist or has been moved.</p>
        <button onclick="location.href='/'">Go to Home</button>
      </div>
    `);
  
    res.end(html404);
  }
};

module.exports = { requestHandler };
