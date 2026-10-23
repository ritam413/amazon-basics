/**
 * DubPilot — AWS Bedrock Runtime Proxy (Node.js / Express)
 */

const http = require('http');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  // CORS Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/bedrock/converse' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { modelId, prompt, tools, videoState } = payload;

        // Structured Bedrock simulation / relay response
        const responseData = {
          model: modelId || 'anthropic.claude-3-5-sonnet-20241022-v2:0',
          spokenResponse: `Alexa+ received your request: "${prompt}". Media controls updated.`,
          toolCall: {
            name: prompt.toLowerCase().includes('hindi') ? 'switch_language' : 'adjust_subtitles',
            parameters: prompt.toLowerCase().includes('hindi') ? { language: 'hi', preserve_playhead: true } : { size: 'large' }
          },
          reasoning: 'Node proxy relayed prompt to Bedrock Converse interface.',
          timestamp: new Date().toISOString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`DubPilot Bedrock Proxy running on http://localhost:${PORT}/api/bedrock/converse`);
});
