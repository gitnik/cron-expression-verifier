tremendous.ooo/cron - cron expression verifier
===

Ever wanted to check for the validity of a cron expression or simply know when the next run is due, but all you had available was curl? With tremendous.ooo/cron, curl is actually all you need.

## How to use
Simply make a POST request to `tremendous.ooo/cron` with the following payload:
```json
{
    "cron": "0 0 * * WED"
}
```

and it will tell whether the expression is valid and when the next run would be:

```json
{
    "nextRun": "2020-06-17T00:00:00.000Z",
    "status": 200
}
```

If you supply an invalid or no cron expression, here's what you'll get:
```json
{
    "error": "Invalid cron expression. Check crontab.guru for help.",
    "status": 400
}
```

_Disclaimer: This project is not associated with crontab.guru_

## How to publish

This site is hosted on [Cloudflare Workers](https://workers.cloudflare.com/). If you're looking to make changes and want to publish this yourself, use the following instructions:

1. `docker run -ti --entrypoint bash -v $PWD:/app node`
2. `npm i @cloudflare/wrangler`
3. `./node_modules/.bin/wrangler publish`