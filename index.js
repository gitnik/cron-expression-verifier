const parser = require('cron-parser');

import documentation from './html/documentation.html';

async function handlePostRequest(request) {
  let requestData;

  const baseUrl = request.url;

  try {
    requestData = await request.json();

    if (requestData === {}) {
      throw new Error();
    }
  } catch (err) {
    return returnJsonResponse(
      400,
      { error: `Missing or invalid payload. Check GET ${baseUrl} for documentation`}    
    );
  }
  
  const cronExpression = requestData.cron;

  if (cronExpression === null || cronExpression === undefined) {
    return returnJsonResponse(
      400,
      { error: `Missing cron expression. Check GET ${baseUrl} for documentation`}    
    );
  }

  try {
    const interval = parser.parseExpression(cronExpression);
     
    const nextRun = interval.next().toISOString();

    return returnJsonResponse(
      200,
      { nextRun }
    );
  } catch (err) {
    return returnJsonResponse(
      400,
      { error: 'Invalid cron expression. Check crontab.guru for help.'}    
    );
  }
}

async function returnJsonResponse(status, response) {
  const options = {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };

  response.status = status;

  return new Response(JSON.stringify(response), options);
}

async function handleGetRequest(event) {
  const options = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  };

  return new Response(documentation, options);
}

addEventListener('fetch', event => {
  const { request } = event;

  let response;

  if (request.method === 'POST') {
    response = handlePostRequest(request);
  } else {
    response = handleGetRequest(event);
  }

  return event.respondWith(response);
});




