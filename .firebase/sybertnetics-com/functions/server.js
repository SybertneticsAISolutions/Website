const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssrsybertneticscom = onRequest({"framework":"nextjs","backend":{"codebase":"default"}}, (req, res) => server.then(it => it.handle(req, res)));
  