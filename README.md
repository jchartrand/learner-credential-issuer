The following environment variables need to be set:

```
PORT=4000
LCP_HOST=http://localhost:3005
DIDSEED_DCC=z1AjxhTt9kztxqGss98SV9nMgDSCe8ZTJ7xXGUhjRdvPC3q
DIDSEED_DCC_UNREGISTERED=z1AcYxZzpCuxk6LepraFjhDYHDyJiHuouCrjqABfVjHbk8f
DIDSEED_MCMASTER=z1AackbUm8U69ohKnihoRRFkXcXJd4Ra1PkAboQ2ZRy1ngB
DEV=true
```

PORT describes this node app, and specifically for development.  Don't set HOST if deploying to a cloud service.  The service allocates the port and sets its value as an environment variable.

LCP_HOST describes the instance of the LCP that the LCI (this app) should use for its redirect.

There can be as many DIDSEED_* values as you like.  They are looked up at signing time using the part of the env variable name after the first underscore.  So for example DIDSEED_DCC would be referenced later at signing time as DCC.

DEV=true is self-describing - TRUE If running on localhost.  FALSE otherwise.