module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/queue/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$queue$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/live/queue-snapshot.ts [app-route] (ecmascript)");
;
;
async function GET() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connection"])();
    return Response.json(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$queue$2d$snapshot$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getQueueSnapshot"])(), {
        headers: {
            "Cache-Control": "no-store"
        }
    });
}
}),
"[project]/src/lib/constants/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Ollama model tags AIROOM uses. Change them here, nowhere else. */ __turbopack_context__.s([
    "MODELS",
    ()=>MODELS,
    "OLLAMA_HOST",
    ()=>OLLAMA_HOST
]);
const MODELS = {
    main: "gemma3:4b",
    vision: "gemma3:4b",
    lowPower: "gemma3:1b",
    embedding: "nomic-embed-text"
};
const OLLAMA_HOST = process.env.OLLAMA_HOST ?? "http://127.0.0.1:11434";
}),
"[project]/src/models/chat/chat.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CHAT_LIMITS",
    ()=>CHAT_LIMITS
]);
const CHAT_LIMITS = {
    maxMessages: 40,
    maxMessageChars: 8000
};
}),
"[project]/src/models/knowledge/knowledge-file.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// A file the host added, read into text so a Room's chatbot can answer from it.
__turbopack_context__.s([
    "KNOWLEDGE_ACCEPT",
    ()=>KNOWLEDGE_ACCEPT,
    "KNOWLEDGE_FILE_TYPES",
    ()=>KNOWLEDGE_FILE_TYPES,
    "KNOWLEDGE_LIMITS",
    ()=>KNOWLEDGE_LIMITS,
    "fileTypeFromName",
    ()=>fileTypeFromName
]);
const KNOWLEDGE_FILE_TYPES = {
    pdf: {
        label: "PDF",
        mime: "application/pdf"
    },
    docx: {
        label: "Word",
        mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    },
    txt: {
        label: "Text",
        mime: "text/plain"
    },
    md: {
        label: "Markdown",
        mime: "text/markdown"
    }
};
const KNOWLEDGE_LIMITS = {
    maxFileBytes: 20 * 1024 * 1024,
    maxFilesPerRoom: 20
};
function fileTypeFromName(name) {
    const ext = name.split(".").pop()?.toLowerCase();
    return ext && ext in KNOWLEDGE_FILE_TYPES ? ext : null;
}
const KNOWLEDGE_ACCEPT = ".pdf,.docx,.txt,.md";
}),
"[project]/src/models/queue/queue.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QUEUE_RULES",
    ()=>QUEUE_RULES
]);
const QUEUE_RULES = {
    maxAnswering: 4,
    rushAt: 6
};
}),
"[project]/src/models/room/room-preset.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROOM_NAME_MAX",
    ()=>ROOM_NAME_MAX,
    "ROOM_PRESETS",
    ()=>ROOM_PRESETS,
    "ROOM_PRESET_IDS",
    ()=>ROOM_PRESET_IDS,
    "ROOM_PURPOSE_MAX",
    ()=>ROOM_PURPOSE_MAX,
    "ROOM_RULES_MAX",
    ()=>ROOM_RULES_MAX,
    "defaultRules",
    ()=>defaultRules,
    "isRoomPresetId",
    ()=>isRoomPresetId
]);
const ROOM_PRESET_IDS = [
    "general",
    "class",
    "office",
    "barangay",
    "emergency"
];
const ROOM_PRESETS = {
    general: {
        id: "general",
        label: "General",
        blurb: "An everyday offline assistant for anyone in the room. No setup needed.",
        nameHint: "Open Room",
        ruleStarters: [
            "Be a friendly helper for anyone in the room",
            "Always answer in Taglish",
            "Keep answers short, 3 sentences max",
            "Use bullet points when explaining steps"
        ]
    },
    class: {
        id: "class",
        label: "Class",
        blurb: "Learning support grounded in your lessons, with Tutor mode.",
        nameHint: "Grade 9 Science",
        ruleStarters: [
            "Make it a quiz bot: ask one question at a time from the files",
            "Be a tutor: give hints first, not the answer",
            "Don't give homework answers right away; help them think",
            "Talk like a friendly ate to Grade 9 students"
        ]
    },
    office: {
        id: "office",
        label: "Office",
        blurb: "Internal procedures and workplace help that stays inside the office.",
        nameHint: "New hire onboarding",
        ruleStarters: [
            "Answer only from our company policies and procedures",
            "Use a formal, professional tone",
            "Explain processes as numbered steps",
            "If a policy isn't in the files, say to ask HR"
        ]
    },
    barangay: {
        id: "barangay",
        label: "Barangay Help Desk",
        blurb: "Local services, requirements and ordinances for residents.",
        nameHint: "Barangay San Roque Help Desk",
        ruleStarters: [
            "List the requirements and fees for each barangay document",
            "Answer in Filipino, polite and simple",
            "Give office hours and where to go when relevant",
            "Give senior citizens and PWDs priority lane info"
        ]
    },
    emergency: {
        id: "emergency",
        label: "Emergency",
        blurb: "Approved safety information and referral guidance during a crisis.",
        nameHint: "Evacuation center",
        ruleStarters: [
            "Answer only from the approved safety files",
            "Keep answers short and calm, in Filipino or English",
            "For injuries or danger, give 911 and 143 first",
            "Say where to get food, water and medical help"
        ]
    }
};
function isRoomPresetId(value) {
    return typeof value === "string" && ROOM_PRESET_IDS.includes(value);
}
const ROOM_NAME_MAX = 60;
const ROOM_PURPOSE_MAX = 120;
const ROOM_RULES_MAX = 2000;
function defaultRules(preset, name) {
    return [
        `- You are the assistant for the Room “${name}”. ${ROOM_PRESETS[preset].blurb}`,
        "- Answer from this Room's files first, and say where the answer came from.",
        "- Keep answers short, clear and friendly, in the language people write in."
    ].join("\n");
}
}),
"[project]/src/models/room/room-session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// A Room's session: phones can only ask while it's live. Ending it tells every
// phone to clear its chat (phone chats are never stored on the laptop).
__turbopack_context__.s([
    "IDLE_SESSION",
    ()=>IDLE_SESSION,
    "PHONE_ID_HEADER",
    ()=>PHONE_ID_HEADER,
    "PHONE_ID_PATTERN",
    ()=>PHONE_ID_PATTERN
]);
const IDLE_SESSION = {
    state: "idle",
    number: 0,
    startedAt: null,
    endedAt: null
};
const PHONE_ID_PATTERN = /^[a-z0-9-]{8,64}$/;
const PHONE_ID_HEADER = "x-airoom-phone";
}),
"[project]/src/services/chat/chat-http.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatPublicError",
    ()=>ChatPublicError,
    "chatStreamResponse",
    ()=>chatStreamResponse,
    "parseChatTurns",
    ()=>parseChatTurns
]);
// Server-only helpers shared by the chat route handlers.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$chat$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/chat/chat.ts [app-route] (ecmascript)");
;
function parseChatTurns(body) {
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$chat$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CHAT_LIMITS"].maxMessages) return null;
    const turns = [];
    for (const m of messages){
        const { role, content } = m ?? {};
        if (role !== "user" && role !== "assistant") return null;
        if (typeof content !== "string" || content.length > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$chat$2f$chat$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CHAT_LIMITS"].maxMessageChars) return null;
        turns.push({
            role,
            content
        });
    }
    return turns.at(-1)?.role === "user" && turns.at(-1)?.content.trim() ? turns : null;
}
class ChatPublicError extends Error {
}
function chatStreamResponse(events, signal, errorMessage) {
    const encoder = new TextEncoder();
    const line = (event)=>encoder.encode(`${JSON.stringify(event)}\n`);
    const body = new ReadableStream({
        async start (controller) {
            try {
                for await (const event of events())controller.enqueue(line(event));
            } catch (error) {
                if (!signal.aborted) {
                    const message = error instanceof ChatPublicError ? error.message : errorMessage;
                    controller.enqueue(line({
                        type: "error",
                        message
                    }));
                }
            } finally{
                controller.close();
            }
        }
    });
    return new Response(body, {
        headers: {
            "Content-Type": "application/x-ndjson; charset=utf-8",
            "Cache-Control": "no-store"
        }
    });
}
}),
"[project]/src/services/knowledge/chunk-text.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chunkSegments",
    ()=>chunkSegments
]);
// About a paragraph or two: small enough to match a question, big enough to answer it.
const CHUNK_CHARS = 1000;
const OVERLAP_CHARS = 150;
const clean = (text)=>text.replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
function chunkSegments(segments) {
    const chunks = [];
    for (const { page, text } of segments){
        const body = clean(text);
        let start = 0;
        while(start < body.length){
            let end = Math.min(start + CHUNK_CHARS, body.length);
            if (end < body.length) {
                const window = body.slice(start, end);
                const breakAt = Math.max(window.lastIndexOf("\n\n"), window.lastIndexOf(". "), window.lastIndexOf(" "));
                if (breakAt > CHUNK_CHARS / 2) end = start + breakAt + 1;
            }
            const piece = body.slice(start, end).trim();
            if (piece.length > 20) chunks.push({
                page,
                text: piece
            });
            if (end >= body.length) break;
            start = Math.max(end - OVERLAP_CHARS, start + 1);
        }
    }
    return chunks;
}
}),
"[project]/src/services/knowledge/extract-text.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractFileText",
    ()=>extractFileText
]);
// Server-only: turns an uploaded file into plain text, page by page where the format has pages.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mammoth$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mammoth/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unpdf$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unpdf/dist/index.mjs [app-route] (ecmascript)");
;
;
async function extractFileText(buffer, type) {
    switch(type){
        case "pdf":
            {
                const pdf = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unpdf$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDocumentProxy"])(new Uint8Array(buffer));
                const { totalPages, text } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unpdf$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractText"])(pdf, {
                    mergePages: false
                });
                return {
                    pages: totalPages,
                    segments: text.map((t, i)=>({
                            page: i + 1,
                            text: t
                        }))
                };
            }
        case "docx":
            {
                const { value } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mammoth$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].extractRawText({
                    buffer
                });
                return {
                    pages: null,
                    segments: [
                        {
                            page: null,
                            text: value
                        }
                    ]
                };
            }
        case "txt":
        case "md":
            return {
                pages: null,
                segments: [
                    {
                        page: null,
                        text: buffer.toString("utf8")
                    }
                ]
            };
    }
}
}),
"[project]/src/services/knowledge/upload-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KnowledgeError",
    ()=>KnowledgeError,
    "deleteUpload",
    ()=>deleteUpload,
    "getUpload",
    ()=>getUpload,
    "saveUpload",
    ()=>saveUpload,
    "uploadDir",
    ()=>uploadDir
]);
// Server-only: files the host uploaded that don't belong to a Room yet.
// data/uploads/<id>/ holds the original file, meta.json and chunks.json.
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/knowledge/knowledge-file.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$embed$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/ollama/embed-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage/data-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$chunk$2d$text$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/knowledge/chunk-text.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$extract$2d$text$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/knowledge/extract-text.ts [app-route] (ecmascript)");
;
;
;
;
;
;
class KnowledgeError extends Error {
}
const uploadDir = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("uploads", id);
const supported = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KNOWLEDGE_FILE_TYPES"]).map((t)=>t.label).join(", ");
async function saveUpload(file) {
    const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fileTypeFromName"])(file.name);
    if (!type) throw new KnowledgeError(`“${file.name}” can’t be read. Use ${supported} (.pdf, .docx, .txt, .md).`);
    if (file.size === 0) throw new KnowledgeError(`“${file.name}” is empty.`);
    if (file.size > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KNOWLEDGE_LIMITS"].maxFileBytes) {
        throw new KnowledgeError(`“${file.name}” is over ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KNOWLEDGE_LIMITS"].maxFileBytes / 1024 / 1024} MB.`);
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    let extracted;
    try {
        extracted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$extract$2d$text$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractFileText"])(buffer, type);
    } catch  {
        throw new KnowledgeError(`“${file.name}” couldn’t be opened. It may be damaged or password-protected.`);
    }
    const pieces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$chunk$2d$text$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chunkSegments"])(extracted.segments);
    if (pieces.length === 0) {
        throw new KnowledgeError(`No text found in “${file.name}”. Scanned pages and images can’t be read yet.`);
    }
    let vectors;
    try {
        vectors = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$embed$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["embedPassages"])(pieces.map((p)=>p.text));
    } catch  {
        throw new KnowledgeError("Couldn’t index the file. Check that Ollama is running and nomic-embed-text is installed.");
    }
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newId"])();
    const name = file.name.slice(0, 200);
    const meta = {
        id,
        name,
        type,
        size: file.size,
        pages: extracted.pages,
        passages: pieces.length,
        uploadedAt: new Date().toISOString()
    };
    const chunks = pieces.map((p, i)=>({
            fileId: id,
            fileName: name,
            page: p.page,
            text: p.text,
            vector: vectors[i]
        }));
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(uploadDir(id), {
        recursive: true
    });
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("uploads", id, `original.${type}`), buffer);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("uploads", id, "chunks.json"), chunks);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("uploads", id, "meta.json"), meta);
    return meta;
}
async function getUpload(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeId"])(id) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("uploads", id, "meta.json")) : null;
}
async function deleteUpload(id) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeId"])(id)) await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(uploadDir(id), {
        recursive: true,
        force: true
    });
}
;
}),
"[project]/src/services/live/answer-queue.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueueError",
    ()=>QueueError,
    "cancelRoom",
    ()=>cancelRoom,
    "enqueue",
    ()=>enqueue,
    "isRush",
    ()=>isRush,
    "queueView",
    ()=>queueView,
    "skip",
    ()=>skip
]);
// Server-only: the fair line for the laptop's AI. Every question is accepted;
// up to QUEUE_RULES.maxAnswering are answered at once and the rest wait their
// turn, urgent first, then first come first served. Only counts and anonymous
// labels are kept here, never the question text.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$queue$2f$queue$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/queue/queue.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chat$2f$chat$2d$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/chat/chat-http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage/data-store.ts [app-route] (ecmascript)");
;
;
;
class QueueError extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$chat$2f$chat$2d$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ChatPublicError"] {
}
const g = globalThis;
const q = g.__airoomQueue ??= {
    entries: [],
    answeredToday: 0,
    urgentAt: [],
    day: ""
};
const today = ()=>new Date().toDateString();
const URGENT_WINDOW_MS = 5 * 60_000;
function answering() {
    return q.entries.filter((e)=>e.status === "answering");
}
function waitingInOrder() {
    return q.entries.filter((e)=>e.status === "waiting").sort((a, b)=>Number(b.urgent) - Number(a.urgent) || a.askedAt.localeCompare(b.askedAt));
}
// Starts as many waiting questions as there are free slots.
function pump() {
    let free = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$queue$2f$queue$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QUEUE_RULES"].maxAnswering - answering().length;
    for (const e of waitingInOrder()){
        if (free <= 0) break;
        e.status = "answering";
        free -= 1;
        e.start();
    }
}
function isRush() {
    return q.entries.length > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$queue$2f$queue$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QUEUE_RULES"].rushAt;
}
function enqueue(opts) {
    const { roomId, phoneId, phoneLabel, urgent, signal } = opts;
    if (!urgent && q.entries.some((e)=>e.phoneId === phoneId)) {
        throw new QueueError("Please wait for your current answer to finish, then ask again. This keeps it fair when many people are asking.");
    }
    let start;
    let fail;
    const ready = new Promise((resolve, reject)=>{
        start = resolve;
        fail = reject;
    });
    const entry = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newId"])(),
        roomId,
        phoneId,
        phoneLabel,
        status: "waiting",
        urgent,
        askedAt: new Date().toISOString(),
        start,
        fail
    };
    q.entries.push(entry);
    if (urgent) q.urgentAt.push(Date.now());
    pump();
    const startedRightAway = entry.status === "answering";
    let finished = false;
    const done = ()=>{
        if (finished) return;
        finished = true;
        const wasAnswering = entry.status === "answering";
        q.entries = q.entries.filter((e)=>e !== entry);
        if (wasAnswering) {
            if (q.day !== today()) {
                q.day = today();
                q.answeredToday = 0;
            }
            q.answeredToday += 1;
        }
        pump();
    };
    // The phone left or pressed Stop while waiting: give the place to the next one.
    signal.addEventListener("abort", ()=>{
        if (entry.status === "waiting") entry.fail(new QueueError("Stopped."));
        done();
    });
    return {
        ready,
        startedRightAway,
        done
    };
}
function skip(id) {
    const entry = q.entries.find((e)=>e.id === id && e.status === "waiting");
    if (!entry) return false;
    q.entries = q.entries.filter((e)=>e !== entry);
    entry.fail(new QueueError("The host skipped this question. You can ask again."));
    pump();
    return true;
}
function cancelRoom(roomId) {
    for (const e of q.entries.filter((x)=>x.roomId === roomId && x.status === "waiting")){
        q.entries = q.entries.filter((x)=>x !== e);
        e.fail(new QueueError("The host ended the session."));
    }
    pump();
}
function queueView() {
    q.urgentAt = q.urgentAt.filter((t)=>Date.now() - t < URGENT_WINDOW_MS);
    const items = [
        ...answering(),
        ...waitingInOrder()
    ].map(({ id, roomId, phoneLabel, status, urgent, askedAt })=>({
            id,
            roomId,
            phoneLabel,
            status,
            urgent,
            askedAt
        }));
    return {
        items,
        askingPhones: new Set(q.entries.map((e)=>`${e.roomId}:${e.phoneId}`)),
        answering: answering().length,
        waiting: q.entries.length - answering().length,
        rush: isRush(),
        recentUrgent: q.urgentAt.length,
        answeredToday: q.day === today() ? q.answeredToday : 0
    };
}
}),
"[project]/src/services/live/live-state.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allSessions",
    ()=>allSessions,
    "connectedPhones",
    ()=>connectedPhones,
    "endSession",
    ()=>endSession,
    "forgetRoom",
    ()=>forgetRoom,
    "getSession",
    ()=>getSession,
    "onSessionEvent",
    ()=>onSessionEvent,
    "phoneConnected",
    ()=>phoneConnected,
    "phoneDisconnected",
    ()=>phoneDisconnected,
    "phoneLabel",
    ()=>phoneLabel,
    "startSession",
    ()=>startSession
]);
// Server-only: what's happening in each Room right now. Sessions are saved in
// data/sessions.json so a restart remembers which Rooms are live; connected
// phones live in memory only. One Node process serves the whole room, so a
// single shared object (kept on globalThis for development reloads) is enough.
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$events__$5b$external$5d$__$28$node$3a$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:events [external] (node:events, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/room/room-session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage/data-store.ts [app-route] (ecmascript)");
;
;
;
const g = globalThis;
const live = g.__airoomLive ??= {
    sessions: null,
    phones: new Map(),
    joined: new Map(),
    events: new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$events__$5b$external$5d$__$28$node$3a$events$2c$__cjs$29$__["EventEmitter"]()
};
live.events.setMaxListeners(1000);
// A phone that drops off (screen lock, Wi-Fi blip) counts as connected for this long.
const LEAVE_GRACE_MS = 20_000;
const FILE = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("sessions.json");
async function sessions() {
    if (!live.sessions) {
        const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])(FILE()) ?? {};
        live.sessions = new Map(Object.entries(saved));
    }
    return live.sessions;
}
async function save() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])(FILE(), Object.fromEntries(await sessions()));
}
async function getSession(roomId) {
    return (await sessions()).get(roomId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDLE_SESSION"];
}
async function startSession(roomId) {
    const all = await sessions();
    const current = all.get(roomId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDLE_SESSION"];
    if (current.state === "live") return current;
    const session = {
        state: "live",
        number: current.number + 1,
        startedAt: new Date().toISOString(),
        endedAt: null
    };
    all.set(roomId, session);
    live.joined.set(roomId, 0);
    // Phones already on the page get new labels for the new session.
    for (const phone of live.phones.get(roomId)?.values() ?? [])phone.label = nextLabel(roomId);
    await save();
    live.events.emit("session", {
        roomId,
        session
    });
    return session;
}
async function endSession(roomId) {
    const all = await sessions();
    const current = all.get(roomId) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDLE_SESSION"];
    const session = {
        ...current,
        state: "ended",
        endedAt: new Date().toISOString()
    };
    all.set(roomId, session);
    await save();
    live.events.emit("session", {
        roomId,
        session
    });
    return session;
}
async function forgetRoom(roomId) {
    (await sessions()).delete(roomId);
    live.phones.delete(roomId);
    live.joined.delete(roomId);
    await save();
}
function onSessionEvent(listener) {
    live.events.on("session", listener);
    return ()=>{
        live.events.off("session", listener);
    };
}
function nextLabel(roomId) {
    const n = (live.joined.get(roomId) ?? 0) + 1;
    live.joined.set(roomId, n);
    return `Phone ${String(n).padStart(2, "0")}`;
}
function phoneConnected(roomId, phoneId) {
    const room = live.phones.get(roomId) ?? new Map();
    live.phones.set(roomId, room);
    const phone = room.get(phoneId);
    if (phone) {
        clearTimeout(phone.leaveTimer);
        phone.connections += 1;
        return phone.label;
    }
    const label = nextLabel(roomId);
    room.set(phoneId, {
        label,
        joinedAt: new Date().toISOString(),
        connections: 1
    });
    return label;
}
function phoneDisconnected(roomId, phoneId) {
    const phone = live.phones.get(roomId)?.get(phoneId);
    if (!phone) return;
    phone.connections -= 1;
    if (phone.connections > 0) return;
    phone.leaveTimer = setTimeout(()=>{
        if (phone.connections <= 0) live.phones.get(roomId)?.delete(phoneId);
    }, LEAVE_GRACE_MS);
}
function phoneLabel(roomId, phoneId) {
    return live.phones.get(roomId)?.get(phoneId)?.label ?? "Phone";
}
function connectedPhones() {
    return [
        ...live.phones.entries()
    ].flatMap(([roomId, room])=>[
            ...room.entries()
        ].map(([phoneId, p])=>({
                roomId,
                phoneId,
                label: p.label,
                joinedAt: p.joinedAt
            })));
}
async function allSessions() {
    return sessions();
}
}),
"[project]/src/services/live/queue-snapshot.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Server-only: the host's Queue & phones view. Counts and anonymous labels only.
__turbopack_context__.s([
    "getQueueSnapshot",
    ()=>getQueueSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/room/room-session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$rooms$2f$room$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/rooms/room-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$answer$2d$queue$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/live/answer-queue.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$live$2d$state$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/live/live-state.ts [app-route] (ecmascript)");
;
;
;
;
async function getQueueSnapshot() {
    const [rooms, sessions] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$rooms$2f$room$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listRooms"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$live$2d$state$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["allSessions"])()
    ]);
    const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$answer$2d$queue$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["queueView"])();
    const phones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$live$2f$live$2d$state$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectedPhones"])();
    return {
        items: view.items,
        phones: phones.map((p)=>({
                label: p.label,
                roomId: p.roomId,
                joinedAt: p.joinedAt,
                asking: view.askingPhones.has(`${p.roomId}:${p.phoneId}`)
            })).sort((a, b)=>a.joinedAt.localeCompare(b.joinedAt)),
        rooms: rooms.map((r)=>({
                roomId: r.id,
                name: r.name,
                session: sessions.get(r.id) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDLE_SESSION"],
                phones: phones.filter((p)=>p.roomId === r.id).length
            })),
        answering: view.answering,
        waiting: view.waiting,
        rush: view.rush,
        recentUrgent: view.recentUrgent,
        answeredToday: view.answeredToday
    };
}
}),
"[project]/src/services/ollama/embed-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cosineSimilarity",
    ()=>cosineSimilarity,
    "embedPassages",
    ()=>embedPassages,
    "embedQuery",
    ()=>embedQuery
]);
// Server-only: turns text into vectors with the local embedding model.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ollama$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ollama/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/models.ts [app-route] (ecmascript)");
;
;
const ollama = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ollama$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Ollama"]({
    host: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OLLAMA_HOST"]
});
const BATCH = 32;
// nomic-embed-text expects these prefixes to tell passages and questions apart.
const DOC_PREFIX = "search_document: ";
const QUERY_PREFIX = "search_query: ";
async function embed(inputs) {
    const vectors = [];
    for(let i = 0; i < inputs.length; i += BATCH){
        const { embeddings } = await ollama.embed({
            model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].embedding,
            input: inputs.slice(i, i + BATCH)
        });
        vectors.push(...embeddings);
    }
    return vectors;
}
const embedPassages = (texts)=>embed(texts.map((t)=>DOC_PREFIX + t));
async function embedQuery(text) {
    const [vector] = await embed([
        QUERY_PREFIX + text
    ]);
    return vector;
}
function cosineSimilarity(a, b) {
    let dot = 0;
    let na = 0;
    let nb = 0;
    for(let i = 0; i < a.length; i++){
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    return na && nb ? dot / Math.sqrt(na * nb) : 0;
}
}),
"[project]/src/services/rooms/room-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRoom",
    ()=>createRoom,
    "deleteRoom",
    ()=>deleteRoom,
    "getRoom",
    ()=>getRoom,
    "getRoomIndex",
    ()=>getRoomIndex,
    "listRooms",
    ()=>listRooms,
    "parseCreateRoomInput",
    ()=>parseCreateRoomInput,
    "renameRoom",
    ()=>renameRoom
]);
// Server-only: Rooms live in data/rooms/<id>/. room.json describes the Room,
// files/<fileId>/ holds its files, and index.json holds every passage with its vector.
// A Room's files are moved in when it's created, so no other Room can search them.
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/knowledge/knowledge-file.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$preset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/room/room-preset.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/knowledge/upload-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage/data-store.ts [app-route] (ecmascript)");
;
;
;
;
;
const roomFile = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms", id, "room.json");
const indexFile = (id)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms", id, "index.json");
function parseCreateRoomInput(body) {
    const b = body ?? {};
    const name = typeof b.name === "string" ? b.name.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$preset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROOM_NAME_MAX"]) : "";
    if (!name) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("Give the Room a name.");
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$preset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isRoomPresetId"])(b.preset)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("Pick a Room type.");
    const purpose = typeof b.purpose === "string" ? b.purpose.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$preset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROOM_PURPOSE_MAX"]) : "";
    const rules = typeof b.rules === "string" ? b.rules.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$preset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROOM_RULES_MAX"]) : "";
    const fileIds = Array.isArray(b.fileIds) ? [
        ...new Set(b.fileIds.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeId"]))
    ] : [];
    if (fileIds.length > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KNOWLEDGE_LIMITS"].maxFilesPerRoom) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"](`A Room can have up to ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$knowledge$2f$knowledge$2d$file$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KNOWLEDGE_LIMITS"].maxFilesPerRoom} files.`);
    }
    return {
        name,
        preset: b.preset,
        purpose,
        rules,
        fileIds
    };
}
async function createRoom(input) {
    const files = [];
    for (const fileId of input.fileIds){
        const meta = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUpload"])(fileId);
        if (!meta) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("One of the files is gone. Remove it and add it again.");
        files.push(meta);
    }
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["newId"])();
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms", id, "files"), {
        recursive: true
    });
    const index = [];
    for (const file of files){
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms", id, "files", file.id);
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rename"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uploadDir"])(file.id), target);
        index.push(...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms", id, "files", file.id, "chunks.json")) ?? []);
    }
    const room = {
        id,
        name: input.name,
        preset: input.preset,
        purpose: input.purpose,
        rules: input.rules,
        files,
        createdAt: new Date().toISOString()
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])(indexFile(id), index);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])(roomFile(id), room);
    return room;
}
async function getRoom(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeId"])(id) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])(roomFile(id)) : null;
}
// A Room's index never changes after it's created, so it's read from disk once.
const indexCache = new Map();
async function getRoomIndex(id) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeId"])(id)) return [];
    const cached = indexCache.get(id);
    if (cached) return cached;
    const index = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])(indexFile(id));
    if (index) indexCache.set(id, index);
    return index ?? [];
}
async function listRooms() {
    let ids;
    try {
        ids = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readdir"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms"));
    } catch  {
        return [];
    }
    const rooms = await Promise.all(ids.filter(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSafeId"]).map(getRoom));
    return rooms.filter((r)=>r !== null).sort((a, b)=>b.createdAt.localeCompare(a.createdAt));
}
async function deleteRoom(id) {
    if (!await getRoom(id)) return false;
    indexCache.delete(id);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("rooms", id), {
        recursive: true,
        force: true
    });
    return true;
}
async function renameRoom(id, name) {
    const room = await getRoom(id);
    if (!room) return null;
    const clean = typeof name === "string" ? name.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$room$2f$room$2d$preset$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROOM_NAME_MAX"]) : "";
    if (!clean) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("Give the Room a name.");
    const updated = {
        ...room,
        name: clean
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])(roomFile(id), updated);
    return updated;
}
}),
"[project]/src/services/storage/data-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_DIR",
    ()=>DATA_DIR,
    "dataPath",
    ()=>dataPath,
    "isSafeId",
    ()=>isSafeId,
    "newId",
    ()=>newId,
    "readJson",
    ()=>readJson,
    "writeJson",
    ()=>writeJson
]);
// Server-only: AIROOM keeps everything as files under /data on the host laptop.
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
;
const DATA_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data");
const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const newId = ()=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])();
function isSafeId(id) {
    return typeof id === "string" && ID_PATTERN.test(id);
}
function dataPath(...parts) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(DATA_DIR, ...parts);
}
async function readJson(file) {
    try {
        return JSON.parse(await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(file, "utf8"));
    } catch  {
        return null;
    }
}
async function writeJson(file, value) {
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(file), {
        recursive: true
    });
    const tmp = `${file}.${process.pid}.tmp`;
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(tmp, JSON.stringify(value));
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rename"])(tmp, file);
}
}),
]})(),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/module-loading/track-module-loading.external.js [external] (next/dist/server/app-render/module-loading/track-module-loading.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/module-loading/track-module-loading.external.js", () => require("next/dist/server/app-render/module-loading/track-module-loading.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1i2y4h4g8v4t2._.js.map