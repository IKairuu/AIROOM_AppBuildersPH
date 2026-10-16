module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/system/status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$status$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/status-service.ts [app-route] (ecmascript)");
;
;
async function GET() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connection"])();
    return Response.json(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$status$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSystemStatus"])(), {
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
"[project]/src/lib/utils/model-label.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** "gemma3:4b" → "Gemma 3 4B", "qwen2.5-coder:7b" → "Qwen 2.5 Coder 7B". */ __turbopack_context__.s([
    "modelLabel",
    ()=>modelLabel
]);
function modelLabel(tag) {
    const [name, size = ""] = tag.split(":");
    const words = name.replace(/([a-z])(\d)/gi, "$1 $2").split(/[-_\s]+/).filter(Boolean).map((w)=>w.charAt(0).toUpperCase() + w.slice(1));
    const suffix = size && size !== "latest" ? ` ${size.toUpperCase()}` : "";
    return `${words.join(" ")}${suffix}`;
}
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
"[project]/src/models/system/settings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// The host's settings, saved on the laptop in data/settings.json.
__turbopack_context__.s([
    "DEFAULT_SETTINGS",
    ()=>DEFAULT_SETTINGS,
    "HOST_NAME_MAX",
    ()=>HOST_NAME_MAX,
    "LOW_BATTERY_PERCENT",
    ()=>LOW_BATTERY_PERCENT
]);
const DEFAULT_SETTINGS = {
    hostName: "",
    modelMode: "auto"
};
const HOST_NAME_MAX = 30;
const LOW_BATTERY_PERCENT = 30;
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
"[project]/src/services/ollama/ollama-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOllamaInventory",
    ()=>getOllamaInventory,
    "normalizeTag",
    ()=>normalizeTag,
    "ollamaGet",
    ()=>ollamaGet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/models.ts [app-route] (ecmascript)");
;
const TIMEOUT_MS = 3000;
async function ollamaGet(path) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OLLAMA_HOST"]}${path}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store"
    });
    if (!res.ok) throw new Error(`Ollama ${path} returned ${res.status}`);
    return res.json();
}
function normalizeTag(tag) {
    return tag.includes(":") ? tag : `${tag}:latest`;
}
async function getOllamaInventory() {
    const [{ version }, tags, ps] = await Promise.all([
        ollamaGet("/api/version"),
        ollamaGet("/api/tags"),
        ollamaGet("/api/ps")
    ]);
    return {
        version,
        installed: new Map(tags.models.map((m)=>[
                normalizeTag(m.name),
                m
            ])),
        loaded: new Set(ps.models.map((m)=>normalizeTag(m.name)))
    };
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
"[project]/src/services/system/hotspot-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHotspotConfig",
    ()=>getHotspotConfig,
    "saveHotspotConfig",
    ()=>saveHotspotConfig,
    "wifiQrText",
    ()=>wifiQrText
]);
// Server-only: the Wi-Fi name and password phones need to join the laptop's hotspot.
// Read from Windows Mobile Hotspot when possible, otherwise what the host typed in.
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:child_process [external] (node:child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:util [external] (node:util, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage/data-store.ts [app-route] (ecmascript)");
;
;
;
const run = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$child_process__$5b$external$5d$__$28$node$3a$child_process$2c$__cjs$29$__["execFile"]);
// Asks Windows for the Mobile Hotspot settings (works whether the hotspot is on or off).
const WINDOWS_SCRIPT = `
[void][Windows.Networking.Connectivity.NetworkInformation, Windows.Networking.Connectivity, ContentType=WindowsRuntime]
[void][Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager, Windows.Networking.NetworkOperators, ContentType=WindowsRuntime]
$p = [Windows.Networking.Connectivity.NetworkInformation]::GetInternetConnectionProfile()
if (-not $p) { $p = [Windows.Networking.Connectivity.NetworkInformation]::GetConnectionProfiles() | Select-Object -First 1 }
$c = [Windows.Networking.NetworkOperators.NetworkOperatorTetheringManager]::CreateFromConnectionProfile($p).GetCurrentAccessPointConfiguration()
@{ ssid = $c.Ssid; password = $c.Passphrase } | ConvertTo-Json -Compress
`;
const SAVED_FILE = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("hotspot.json");
// The hotspot name and password rarely change, and reading them from Windows takes a few seconds.
const CACHE_MS = 5 * 60_000;
let cache = null;
async function readFromWindows() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const { stdout } = await run("powershell.exe", [
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            WINDOWS_SCRIPT
        ], {
            timeout: 8000,
            windowsHide: true
        });
        const { ssid, password } = JSON.parse(stdout.trim());
        return ssid ? {
            ssid,
            password: password ?? "",
            source: "windows"
        } : null;
    } catch  {
        return null;
    }
}
async function getHotspotConfig() {
    if (cache && Date.now() - cache.at < CACHE_MS) return cache.value;
    const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])(SAVED_FILE());
    const value = await readFromWindows() ?? (saved?.ssid ? {
        ...saved,
        source: "saved"
    } : null);
    cache = {
        at: Date.now(),
        value
    };
    return value;
}
async function saveHotspotConfig(ssid, password) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])(SAVED_FILE(), {
        ssid,
        password
    });
    cache = null;
}
function wifiQrText({ ssid, password }) {
    const esc = (s)=>s.replace(/([\\;,:"])/g, "\\$1");
    return password ? `WIFI:T:WPA;S:${esc(ssid)};P:${esc(password)};;` : `WIFI:T:nopass;S:${esc(ssid)};;`;
}
}),
"[project]/src/services/system/settings-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveModel",
    ()=>getActiveModel,
    "getModelState",
    ()=>getModelState,
    "getSettings",
    ()=>getSettings,
    "getSettingsView",
    ()=>getSettingsView,
    "updateSettings",
    ()=>updateSettings
]);
// Server-only: reads and saves the host's settings, and works out which model chats use.
var __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__ = __turbopack_context__.i("[externals]/systeminformation [external] (systeminformation, cjs, [project]/node_modules/systeminformation)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$model$2d$label$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/model-label.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$system$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/system/settings.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/knowledge/upload-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/ollama/ollama-client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage/data-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$hotspot$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/hotspot-service.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const FILE = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dataPath"])("settings.json");
// Embedding models can't chat, so they're never offered.
const NOT_FOR_CHAT = /embed|minilm|bge-|nomic/i;
async function getSettings() {
    return {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$system$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"],
        ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJson"])(FILE()) ?? {}
    };
}
async function installedChatModels() {
    try {
        const { installed } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOllamaInventory"])();
        const models = [
            ...installed.values()
        ].filter((m)=>!NOT_FOR_CHAT.test(m.name)).map((m)=>({
                tag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(m.name),
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$model$2d$label$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(m.name),
                size: m.size
            })).sort((a, b)=>a.label.localeCompare(b.label));
        return {
            models,
            reachable: true
        };
    } catch  {
        return {
            models: [],
            reachable: false
        };
    }
}
// Battery is read at most once a minute; it changes slowly and the reading takes a moment.
let batteryCache = null;
async function onLowBattery() {
    if (batteryCache && Date.now() - batteryCache.at < 60_000) return batteryCache.low;
    let low = false;
    try {
        const b = await __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__["default"].battery();
        low = b.hasBattery && !b.acConnected && !b.isCharging && b.percent <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$system$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LOW_BATTERY_PERCENT"];
    } catch  {
        low = false;
    }
    batteryCache = {
        at: Date.now(),
        low
    };
    return low;
}
async function resolveModel(settings, installed) {
    const has = (tag)=>installed.some((m)=>m.tag === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(tag));
    if (settings.modelMode !== "auto" && has(settings.modelMode)) {
        return {
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(settings.modelMode),
            batterySaver: false
        };
    }
    if (settings.modelMode === "auto" && has(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].lowPower) && await onLowBattery()) {
        return {
            model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].lowPower,
            batterySaver: true
        };
    }
    return {
        model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main,
        batterySaver: false
    };
}
async function getActiveModel() {
    return (await getModelState()).model;
}
async function getModelState() {
    const [settings, { models }] = await Promise.all([
        getSettings(),
        installedChatModels()
    ]);
    return resolveModel(settings, models);
}
async function getSettingsView() {
    const [settings, { models, reachable }, wifi] = await Promise.all([
        getSettings(),
        installedChatModels(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$hotspot$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHotspotConfig"])()
    ]);
    const { model, batterySaver } = await resolveModel(settings, models);
    return {
        settings,
        activeModel: model,
        activeModelLabel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$model$2d$label$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(model),
        batterySaver,
        installed: models,
        ollamaReachable: reachable,
        wifi: wifi ? {
            ssid: wifi.ssid,
            source: wifi.source
        } : null
    };
}
async function updateSettings(body) {
    const b = body ?? {};
    const next = await getSettings();
    if ("hostName" in b) {
        if (typeof b.hostName !== "string") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("Type a name.");
        next.hostName = b.hostName.trim().slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$system$2f$settings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HOST_NAME_MAX"]);
    }
    if ("modelMode" in b) {
        if (typeof b.modelMode !== "string") throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("Pick a model.");
        if (b.modelMode !== "auto") {
            const { models } = await installedChatModels();
            if (!models.some((m)=>m.tag === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(b.modelMode))) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$knowledge$2f$upload$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KnowledgeError"]("That model isn’t installed in Ollama on this laptop.");
            }
        }
        next.modelMode = b.modelMode === "auto" ? "auto" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(b.modelMode);
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2f$data$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeJson"])(FILE(), next);
    return next;
}
}),
"[project]/src/services/system/speed-tracker.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "latestSpeed",
    ()=>latestSpeed,
    "recordSpeed",
    ()=>recordSpeed
]);
// Server-only: remembers how fast the latest answer was written, from any chat.
const g = globalThis;
const speed = g.__airoomSpeed ??= {
    rate: null
};
function recordSpeed(tokensPerSecond) {
    if (tokensPerSecond && Number.isFinite(tokensPerSecond)) speed.rate = tokensPerSecond;
}
function latestSpeed() {
    return speed.rate;
}
}),
"[project]/src/services/system/status-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSystemStatus",
    ()=>getSystemStatus
]);
// Server-only: the live status strip (internet, battery, model, speed).
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$dns$2f$promises__$5b$external$5d$__$28$node$3a$dns$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:dns/promises [external] (node:dns/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__ = __turbopack_context__.i("[externals]/systeminformation [external] (systeminformation, cjs, [project]/node_modules/systeminformation)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$model$2d$label$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/model-label.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$settings$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/settings-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$speed$2d$tracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/speed-tracker.ts [app-route] (ecmascript)");
;
;
;
;
;
// Internet and battery change slowly and take a moment to read, so each is cached briefly.
const INTERNET_MS = 30_000;
const BATTERY_MS = 15_000;
let internetCache = null;
let batteryCache = null;
async function hasInternet() {
    if (internetCache && Date.now() - internetCache.at < INTERNET_MS) return internetCache.value;
    let value = false;
    try {
        await Promise.race([
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$dns$2f$promises__$5b$external$5d$__$28$node$3a$dns$2f$promises$2c$__cjs$29$__["lookup"])("ollama.com"),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error("timeout")), 1500))
        ]);
        value = true;
    } catch  {
        value = false;
    }
    internetCache = {
        at: Date.now(),
        value
    };
    return value;
}
async function battery() {
    if (batteryCache && Date.now() - batteryCache.at < BATTERY_MS) return batteryCache.value;
    let value = null;
    try {
        const b = await __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__["default"].battery();
        if (b.hasBattery) value = {
            percent: Math.round(b.percent),
            charging: b.isCharging || b.acConnected
        };
    } catch  {
        value = null;
    }
    batteryCache = {
        at: Date.now(),
        value
    };
    return value;
}
async function getSystemStatus() {
    const [internet, bat, { model, batterySaver }] = await Promise.all([
        hasInternet(),
        battery(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$settings$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getModelState"])()
    ]);
    return {
        internet,
        battery: bat,
        model,
        modelLabel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$model$2d$label$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(model),
        batterySaver,
        tokensPerSecond: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$speed$2d$tracker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["latestSpeed"])()
    };
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
"[externals]/node:child_process [external] (node:child_process, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:child_process", () => require("node:child_process"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:dns/promises [external] (node:dns/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:dns/promises", () => require("node:dns/promises"));

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
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:util", () => require("node:util"));

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

//# sourceMappingURL=%5Broot-of-the-server%5D__0jutcz3biqt56._.js.map