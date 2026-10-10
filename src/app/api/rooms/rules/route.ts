import { buildRules, parseRulesRequest } from "@/services/rooms/rules-builder-service";

// The Create Room wizard's Rules chat: the host describes the chatbot, and gets back updated rules.
export async function POST(req: Request) {
  const request = parseRulesRequest(await req.json().catch(() => null));
  if (!request) return Response.json({ error: "Invalid rules request" }, { status: 400 });
  try {
    return Response.json(await buildRules(request));
  } catch {
    return Response.json(
      { error: "Couldn’t update the rules. Check that Ollama is running, then try again." },
      { status: 503 },
    );
  }
}
