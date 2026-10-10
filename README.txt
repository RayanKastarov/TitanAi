TitanAI Business Intelligence upgrade

1. Back up existing server.js, app.js and index.html.
2. Replace them with these three files in the SAME folder.
3. Keep your existing package.json and dependencies (express, helmet, axios, pg).
4. OPENROUTER_API_KEY is required as before.
5. Optional: add TAVILY_API_KEY to your server environment for live web search. Without it, Business mode still provides strategy based on supplied data, but MUST not claim current price verification.
6. Restart or redeploy. Click Business at top. Test: Compare prices of three CRM services for a 5-person team and recommend one with sources.
7. Search results are snippets, not verified live checkout prices. Review original URLs before making purchasing decisions.
8. Before public launch: add per-user daily budgets, durable rate limits and billing protections.
