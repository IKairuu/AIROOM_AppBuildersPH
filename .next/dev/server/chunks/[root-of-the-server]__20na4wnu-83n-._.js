module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/launch/checks/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$system$2f$launch$2d$check$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/system/launch-check.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/launch-checks/index.ts [app-route] (ecmascript)");
;
;
;
async function GET(req, ctx) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connection"])();
    const { id } = await ctx.params;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$system$2f$launch$2d$check$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isLaunchCheckId"])(id)) return Response.json({
        error: "Unknown check"
    }, {
        status: 404
    });
    const port = req.nextUrl.port || process.env.PORT || "80";
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runLaunchCheck"])(id, {
        port
    });
    return Response.json(result, {
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
"[project]/src/lib/utils/host-os.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// The laptop's operating system, and the words each one uses for the same setup steps.
// Safe on both sides: the server passes process.platform, the browser its user agent.
__turbopack_context__.s([
    "OS_WORDS",
    ()=>OS_WORDS,
    "detectBrowserOs",
    ()=>detectBrowserOs,
    "hostOsFromPlatform",
    ()=>hostOsFromPlatform
]);
function hostOsFromPlatform(platform) {
    if (platform === "win32") return "windows";
    if (platform === "darwin") return "mac";
    return "linux";
}
function detectBrowserOs() {
    if (typeof navigator === "undefined") return "windows";
    const nav = navigator;
    const text = `${nav.userAgentData?.platform ?? ""} ${nav.platform ?? ""} ${nav.userAgent}`.toLowerCase();
    if (text.includes("win")) return "windows";
    if (text.includes("mac")) return "mac";
    return "linux";
}
const OS_WORDS = {
    windows: {
        name: "Windows",
        hotspot: "Mobile Hotspot",
        turnOnHotspot: "Turn on Mobile Hotspot in Settings › Network & internet, or run scripts\\start-hotspot.bat for a room with no internet.",
        startOllama: "Open Ollama from the Start menu, then try again.",
        installOllama: "Install Ollama from ollama.com/download/windows, open it from the Start menu, then try again.",
        allowFirewall: ()=>"If phones can’t connect, allow Node.js on private and public networks in Windows Firewall."
    },
    mac: {
        name: "macOS",
        hotspot: "Internet Sharing",
        turnOnHotspot: "Turn on Internet Sharing to Wi-Fi in System Settings › General › Sharing (share from Ethernet or USB, to Wi-Fi).",
        startOllama: "Open Ollama from Applications, then try again.",
        installOllama: "Install Ollama from ollama.com/download/mac, move it to Applications and open it, then try again.",
        allowFirewall: ()=>"If phones can’t connect, allow incoming connections for node in System Settings › Network › Firewall › Options."
    },
    linux: {
        name: "Linux",
        hotspot: "Wi-Fi Hotspot",
        turnOnHotspot: "Turn on Wi-Fi Hotspot in Settings › Wi-Fi, or run “nmcli device wifi hotspot ssid AIROOM password <8+ characters>”.",
        startOllama: "Run “systemctl start ollama” (or “ollama serve”) in a terminal, then try again.",
        installOllama: "Install Ollama with “curl -fsSL https://ollama.com/install.sh | sh”, then try again.",
        allowFirewall: (port)=>`If phones can’t connect, open the port with “sudo ufw allow ${port}/tcp”.`
    }
};
}),
"[project]/src/models/system/launch-check.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LAUNCH_CHECK_IDS",
    ()=>LAUNCH_CHECK_IDS,
    "isLaunchCheckId",
    ()=>isLaunchCheckId
]);
const LAUNCH_CHECK_IDS = [
    "model",
    "server",
    "network",
    "memory",
    "compute",
    "power",
    "internet"
];
function isLaunchCheckId(value) {
    return LAUNCH_CHECK_IDS.includes(value);
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
"[project]/src/services/system/launch-checks/hardware-checks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkCompute",
    ()=>checkCompute,
    "checkMemory",
    ()=>checkMemory,
    "checkPower",
    ()=>checkPower
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__ = __turbopack_context__.i("[externals]/systeminformation [external] (systeminformation, cjs, [project]/node_modules/systeminformation)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/ollama/ollama-client.ts [app-route] (ecmascript)");
;
;
;
;
const GB = 1024 ** 3;
// Room for the model's context, the server and the browser on top of the model file.
const HEADROOM_BYTES = 1.5 * GB;
// Used when Ollama can't tell us the model size.
const FALLBACK_MODEL_BYTES = 3.5 * GB;
const gb = (bytes)=>`${(bytes / GB).toFixed(1)} GB`;
async function checkMemory() {
    const total = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].totalmem();
    const free = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].freemem();
    const main = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main);
    let modelBytes = FALLBACK_MODEL_BYTES;
    let loaded = false;
    try {
        const inventory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOllamaInventory"])();
        modelBytes = inventory.installed.get(main)?.size ?? FALLBACK_MODEL_BYTES;
        loaded = inventory.loaded.has(main);
    } catch  {
    // The model check reports Ollama problems. Here we only need a size estimate.
    }
    const detail = `${gb(total)} total, ${gb(free)} free`;
    const needed = modelBytes + HEADROOM_BYTES;
    if (total < needed) {
        return {
            id: "memory",
            outcome: "failed",
            detail: `${detail}. ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main} needs about ${gb(needed)}.`,
            fix: `Use a laptop with more memory, or switch to ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].lowPower}.`
        };
    }
    // A loaded model already holds its memory, so what's free is extra.
    if (loaded) return {
        id: "memory",
        outcome: "ready",
        detail: `${detail}, model already loaded`
    };
    if (free < needed) {
        return {
            id: "memory",
            outcome: "warning",
            detail: `${detail}. The model needs about ${gb(needed)}, so answers may be slow.`,
            fix: `Close other apps to free about ${gb(needed - free)}.`
        };
    }
    return {
        id: "memory",
        outcome: "ready",
        detail
    };
}
// Ollama runs on a graphics card with enough of its own memory; otherwise on the processor.
const MIN_VRAM_MB = 3500;
async function checkCompute() {
    const [cpu, graphics] = await Promise.all([
        __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__["default"].cpu(),
        __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__["default"].graphics()
    ]);
    const cpuName = `${cpu.manufacturer} ${cpu.brand}`.trim();
    const cores = cpu.physicalCores || cpu.cores;
    const appleSilicon = cpu.manufacturer === "Apple";
    const gpu = graphics.controllers.filter((c)=>!c.vramDynamic && (c.vram ?? 0) > 0).sort((a, b)=>(b.vram ?? 0) - (a.vram ?? 0))[0];
    const gpuText = gpu ? `${gpu.model} (${gb((gpu.vram ?? 0) * 1024 ** 2)})` : null;
    const detail = [
        `${cpuName}, ${cores} cores`,
        gpuText
    ].filter(Boolean).join(" · ");
    if (appleSilicon || gpu && (gpu.vram ?? 0) >= MIN_VRAM_MB) {
        return {
            id: "compute",
            outcome: "ready",
            detail
        };
    }
    return {
        id: "compute",
        outcome: "warning",
        detail: `${detail}. No graphics card with enough memory, so answers run on the processor.`,
        fix: `Answers will be slower. Fewer phones at once, or ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].lowPower}, keeps it quick.`
    };
}
const LOW_BATTERY = 20;
const SHORT_BATTERY = 50;
async function checkPower() {
    const battery = await __TURBOPACK__imported__module__$5b$externals$5d2f$systeminformation__$5b$external$5d$__$28$systeminformation$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$systeminformation$29$__["default"].battery();
    if (!battery.hasBattery) return {
        id: "power",
        outcome: "ready",
        detail: "Plugged in (no battery)"
    };
    const pluggedIn = battery.acConnected || battery.isCharging;
    const detail = `${battery.percent}%${battery.isCharging ? ", charging" : pluggedIn ? ", plugged in" : " on battery"}`;
    if (pluggedIn) return {
        id: "power",
        outcome: "ready",
        detail
    };
    if (battery.percent < LOW_BATTERY) {
        return {
            id: "power",
            outcome: "failed",
            detail,
            fix: "Plug in the charger, then try again."
        };
    }
    if (battery.percent < SHORT_BATTERY) {
        return {
            id: "power",
            outcome: "warning",
            detail,
            fix: "Plug in the charger for a long session."
        };
    }
    return {
        id: "power",
        outcome: "ready",
        detail
    };
}
}),
"[project]/src/services/system/launch-checks/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Server-only: reads this laptop's hardware and services. Import from route handlers only.
__turbopack_context__.s([
    "runLaunchCheck",
    ()=>runLaunchCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$hardware$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/launch-checks/hardware-checks.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$internet$2d$check$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/launch-checks/internet-check.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$model$2d$check$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/launch-checks/model-check.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$network$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/launch-checks/network-checks.ts [app-route] (ecmascript)");
;
;
;
;
const runners = {
    model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$model$2d$check$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkModel"],
    server: ({ port })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$network$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkServer"])(port),
    network: ({ port })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$network$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkNetwork"])(port),
    memory: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$hardware$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkMemory"],
    compute: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$hardware$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkCompute"],
    power: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$hardware$2d$checks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkPower"],
    internet: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$launch$2d$checks$2f$internet$2d$check$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkInternet"]
};
async function runLaunchCheck(id, ctx) {
    try {
        return await runners[id](ctx);
    } catch  {
        return {
            id,
            outcome: "warning",
            detail: "This laptop didn’t report this one.",
            fix: "AIROOM can still launch. Try again to re-check."
        };
    }
}
}),
"[project]/src/services/system/launch-checks/internet-check.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkInternet",
    ()=>checkInternet
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$dns$2f$promises__$5b$external$5d$__$28$node$3a$dns$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:dns/promises [external] (node:dns/promises, cjs)");
;
const TIMEOUT_MS = 1500;
async function checkInternet() {
    try {
        await Promise.race([
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$dns$2f$promises__$5b$external$5d$__$28$node$3a$dns$2f$promises$2c$__cjs$29$__["lookup"])("ollama.com"),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error("timeout")), TIMEOUT_MS))
        ]);
        return {
            id: "internet",
            outcome: "ready",
            detail: "Connected, but not needed. AIROOM works offline."
        };
    } catch  {
        return {
            id: "internet",
            outcome: "ready",
            detail: "Offline. AIROOM doesn’t need the internet."
        };
    }
}
}),
"[project]/src/services/system/launch-checks/model-check.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkModel",
    ()=>checkModel
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$host$2d$os$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/host-os.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/ollama/ollama-client.ts [app-route] (ecmascript)");
;
;
;
;
;
;
// Optional models: AIROOM still runs without them, with less.
const OPTIONAL = [
    {
        tag: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].lowPower,
        use: "battery saver"
    },
    {
        tag: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].embedding,
        use: "file search"
    }
];
// Where each OS's Ollama installer puts the app.
function ollamaInstallPaths(hostOs) {
    switch(hostOs){
        case "windows":
            {
                const local = process.env.LOCALAPPDATA ?? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].homedir(), "AppData", "Local");
                const programFiles = process.env.ProgramFiles ?? "C:\\Program Files";
                return [
                    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(local, "Programs", "Ollama", "ollama.exe"),
                    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(programFiles, "Ollama", "ollama.exe")
                ];
            }
        case "mac":
            return [
                "/Applications/Ollama.app",
                __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].homedir(), "Applications", "Ollama.app"),
                "/usr/local/bin/ollama",
                "/opt/homebrew/bin/ollama"
            ];
        case "linux":
            return [
                "/usr/local/bin/ollama",
                "/usr/bin/ollama",
                "/snap/bin/ollama"
            ];
    }
}
async function isOllamaInstalled(hostOs) {
    const found = await Promise.all(ollamaInstallPaths(hostOs).map((p)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["access"])(p).then(()=>true, ()=>false)));
    return found.includes(true);
}
async function checkModel() {
    let inventory;
    try {
        inventory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOllamaInventory"])();
    } catch  {
        const hostOs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$host$2d$os$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hostOsFromPlatform"])(process.platform);
        const words = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$host$2d$os$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OS_WORDS"][hostOs];
        if (!await isOllamaInstalled(hostOs)) {
            return {
                id: "model",
                outcome: "failed",
                detail: `Ollama isn’t installed on this ${words.name} laptop.`,
                fix: words.installOllama
            };
        }
        return {
            id: "model",
            outcome: "failed",
            detail: "Ollama is installed but isn’t running.",
            fix: words.startOllama
        };
    }
    const main = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main);
    if (!inventory.installed.has(main)) {
        return {
            id: "model",
            outcome: "failed",
            detail: `Ollama ${inventory.version} is running, but ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main} isn’t installed.`,
            fix: `Run “ollama pull ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main}” in a terminal, then try again.`
        };
    }
    const state = inventory.loaded.has(main) ? "loaded and ready" : "installed";
    const detail = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODELS"].main} ${state}, Ollama ${inventory.version}`;
    const missing = OPTIONAL.filter((m)=>!inventory.installed.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ollama$2f$ollama$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeTag"])(m.tag)));
    if (missing.length > 0) {
        return {
            id: "model",
            outcome: "warning",
            detail: `${detail}. Missing ${missing.map((m)=>`${m.tag} (${m.use})`).join(" and ")}.`,
            fix: `AIROOM can launch without it. To add it, run ${missing.map((m)=>`“ollama pull ${m.tag}”`).join(" and ")}.`
        };
    }
    return {
        id: "model",
        outcome: "ready",
        detail
    };
}
}),
"[project]/src/services/system/launch-checks/network-checks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkNetwork",
    ()=>checkNetwork,
    "checkServer",
    ()=>checkServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$host$2d$os$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/host-os.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$room$2d$network$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/system/room-network.ts [app-route] (ecmascript)");
;
;
const words = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$host$2d$os$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OS_WORDS"][(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$host$2d$os$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hostOsFromPlatform"])(process.platform)];
function checkNetwork(port) {
    const { hotspot, turnOnHotspot } = words();
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$room$2d$network$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findRoomAddress"])();
    if (!address) {
        return {
            id: "network",
            outcome: "failed",
            detail: "This laptop isn’t on any network phones can join.",
            fix: `${turnOnHotspot} Then try again.`
        };
    }
    if (address.hotspot) {
        return {
            id: "network",
            outcome: "ready",
            detail: `${hotspot} is on. Phones open ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$room$2d$network$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roomUrl"])(address, port)}`
        };
    }
    return {
        id: "network",
        outcome: "warning",
        detail: `Mobile Hotspot is off. Phones on the same Wi-Fi as this laptop can open ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$room$2d$network$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roomUrl"])(address, port)}`,
        fix: "For a room with no router, turn on Mobile Hotspot in Windows Settings."
    };
}
async function checkServer(port) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$room$2d$network$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findRoomAddress"])();
    if (!address) {
        return {
            id: "server",
            outcome: "warning",
            detail: `Running on port ${port}, but there’s no network to share it on yet.`,
            fix: "Fix the room network below, then try again."
        };
    }
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$system$2f$room$2d$network$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["roomUrl"])(address, port);
    try {
        const res = await fetch(`${url}/api/ping`, {
            signal: AbortSignal.timeout(2500),
            cache: "no-store"
        });
        if (!res.ok) throw new Error(String(res.status));
        return {
            id: "server",
            outcome: "ready",
            detail: `Serving the chat page at ${url}`
        };
    } catch  {
        return {
            id: "server",
            outcome: "failed",
            detail: `The server is running on port ${port}, but not at ${url}.`,
            fix: `Start AIROOM with “npm run dev” or “npm start”, which listen on every network. ${words().allowFirewall(port)}`
        };
    }
}
}),
"[project]/src/services/system/room-network.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findRoomAddress",
    ()=>findRoomAddress,
    "roomUrl",
    ()=>roomUrl
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
;
// Default addresses the OS gives itself when it shares a hotspot:
// Windows Mobile Hotspot (192.168.137.x), macOS Internet Sharing, Linux NetworkManager.
// Exact matches for the last two, so a router-given 192.168.2.1xx isn't mistaken for one.
const isHotspotAddress = (ip)=>ip.startsWith("192.168.137.") || ip === "192.168.2.1" || ip === "10.42.0.1";
// Adapters phones can never reach: VPNs, VMs, WSL, Bluetooth.
const IGNORED_ADAPTERS = /vEthernet|WSL|Hyper-V|VirtualBox|VMware|Hamachi|Tailscale|ZeroTier|docker|Bluetooth|Loopback|utun|awdl/i;
function isPrivateIPv4(ip) {
    const [a, b] = ip.split(".").map(Number);
    return a === 10 || a === 192 && b === 168 || a === 172 && b >= 16 && b <= 31;
}
function findRoomAddress() {
    const candidates = [];
    for (const [adapter, addresses] of Object.entries(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].networkInterfaces())){
        if (IGNORED_ADAPTERS.test(adapter)) continue;
        for (const addr of addresses ?? []){
            if (addr.family !== "IPv4" || addr.internal || !isPrivateIPv4(addr.address)) continue;
            const hotspot = isHotspotAddress(addr.address);
            candidates.push({
                ip: addr.address,
                adapter,
                hotspot
            });
        }
    }
    return candidates.find((c)=>c.hotspot) ?? candidates[0] ?? null;
}
function roomUrl(address, port) {
    return `http://${address.ip}${port === "80" ? "" : `:${port}`}`;
}
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[externals]/node:dns/promises [external] (node:dns/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:dns/promises", () => require("node:dns/promises"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:os", () => require("node:os"));

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
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20na4wnu-83n-._.js.map