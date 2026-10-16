module.exports = [
(()=>{"use strict";return[
"[project]/node_modules/base64-js/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
    }
    return parts.join('');
}
}),
"[project]/node_modules/dingbat-to-unicode/dist/dingbats.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dingbats = {
    "SYMBOL": {
        32: 32,
        33: 33,
        34: 8704,
        35: 35,
        36: 8707,
        37: 37,
        38: 38,
        39: 8717,
        40: 40,
        41: 41,
        42: 42,
        43: 43,
        44: 44,
        45: 8722,
        46: 46,
        47: 47,
        48: 48,
        49: 49,
        50: 50,
        51: 51,
        52: 52,
        53: 53,
        54: 54,
        55: 55,
        56: 56,
        57: 57,
        58: 58,
        59: 59,
        60: 60,
        61: 61,
        62: 62,
        63: 63,
        64: 8773,
        65: 913,
        66: 914,
        67: 935,
        68: 916,
        69: 917,
        70: 934,
        71: 915,
        72: 919,
        73: 921,
        74: 977,
        75: 922,
        76: 923,
        77: 924,
        78: 925,
        79: 927,
        80: 928,
        81: 920,
        82: 929,
        83: 931,
        84: 932,
        85: 933,
        86: 962,
        87: 937,
        88: 926,
        89: 936,
        90: 918,
        91: 91,
        92: 8756,
        93: 93,
        94: 8869,
        95: 95,
        96: 8254,
        97: 945,
        98: 946,
        99: 967,
        100: 948,
        101: 949,
        102: 966,
        103: 947,
        104: 951,
        105: 953,
        106: 981,
        107: 954,
        108: 955,
        109: 956,
        110: 957,
        111: 959,
        112: 960,
        113: 952,
        114: 961,
        115: 963,
        116: 964,
        117: 965,
        118: 982,
        119: 969,
        120: 958,
        121: 968,
        122: 950,
        123: 123,
        124: 124,
        125: 125,
        126: 126,
        160: 8364,
        161: 978,
        162: 8242,
        163: 8804,
        164: 8260,
        165: 8734,
        166: 402,
        167: 9827,
        168: 9830,
        169: 9829,
        170: 9824,
        171: 8596,
        172: 8592,
        173: 8593,
        174: 8594,
        175: 8595,
        176: 176,
        177: 177,
        178: 8243,
        179: 8805,
        180: 215,
        181: 8733,
        182: 8706,
        183: 8226,
        184: 247,
        185: 8800,
        186: 8801,
        187: 8776,
        188: 8230,
        189: 9168,
        190: 9135,
        191: 8629,
        192: 8501,
        193: 8465,
        194: 8476,
        195: 8472,
        196: 8855,
        197: 8853,
        198: 8709,
        199: 8745,
        200: 8746,
        201: 8835,
        202: 8839,
        203: 8836,
        204: 8834,
        205: 8838,
        206: 8712,
        207: 8713,
        208: 8736,
        209: 8711,
        210: 174,
        211: 169,
        212: 8482,
        213: 8719,
        214: 8730,
        215: 8901,
        216: 172,
        217: 8743,
        218: 8744,
        219: 8660,
        220: 8656,
        221: 8657,
        222: 8658,
        223: 8659,
        224: 9674,
        225: 12296,
        226: 174,
        227: 169,
        228: 8482,
        229: 8721,
        230: 9115,
        231: 9116,
        232: 9117,
        233: 9121,
        234: 9122,
        235: 9123,
        236: 9127,
        237: 9128,
        238: 9129,
        239: 9130,
        240: 63743,
        241: 12297,
        242: 8747,
        243: 8992,
        244: 9134,
        245: 8993,
        246: 9118,
        247: 9119,
        248: 9120,
        249: 9124,
        250: 9125,
        251: 9126,
        252: 9131,
        253: 9132,
        254: 9133
    },
    "WEBDINGS": {
        32: 32,
        33: 128375,
        34: 128376,
        35: 128370,
        36: 128374,
        37: 127942,
        38: 127894,
        39: 128391,
        40: 128488,
        41: 128489,
        42: 128496,
        43: 128497,
        44: 127798,
        45: 127895,
        46: 128638,
        47: 128636,
        48: 128469,
        49: 128470,
        50: 128471,
        51: 9204,
        52: 9205,
        53: 9206,
        54: 9207,
        55: 9194,
        56: 9193,
        57: 9198,
        58: 9197,
        59: 9208,
        60: 9209,
        61: 9210,
        62: 128474,
        63: 128499,
        64: 128736,
        65: 127959,
        66: 127960,
        67: 127961,
        68: 127962,
        69: 127964,
        70: 127981,
        71: 127963,
        72: 127968,
        73: 127958,
        74: 127965,
        75: 128739,
        76: 128269,
        77: 127956,
        78: 128065,
        79: 128066,
        80: 127966,
        81: 127957,
        82: 128740,
        83: 127967,
        84: 128755,
        85: 128364,
        86: 128363,
        87: 128360,
        88: 128264,
        89: 127892,
        90: 127893,
        91: 128492,
        92: 128637,
        93: 128493,
        94: 128490,
        95: 128491,
        96: 11156,
        97: 10004,
        98: 128690,
        99: 11036,
        100: 128737,
        101: 128230,
        102: 128753,
        103: 11035,
        104: 128657,
        105: 128712,
        106: 128745,
        107: 128752,
        108: 128968,
        109: 128372,
        110: 11044,
        111: 128741,
        112: 128660,
        113: 128472,
        114: 128473,
        115: 10067,
        116: 128754,
        117: 128647,
        118: 128653,
        119: 9971,
        120: 10680,
        121: 8854,
        122: 128685,
        123: 128494,
        124: 9168,
        125: 128495,
        126: 128498,
        128: 128697,
        129: 128698,
        130: 128713,
        131: 128714,
        132: 128700,
        133: 128125,
        134: 127947,
        135: 9975,
        136: 127938,
        137: 127948,
        138: 127946,
        139: 127940,
        140: 127949,
        141: 127950,
        142: 128664,
        143: 128480,
        144: 128738,
        145: 128176,
        146: 127991,
        147: 128179,
        148: 128106,
        149: 128481,
        150: 128482,
        151: 128483,
        152: 10031,
        153: 128388,
        154: 128389,
        155: 128387,
        156: 128390,
        157: 128441,
        158: 128442,
        159: 128443,
        160: 128373,
        161: 128368,
        162: 128445,
        163: 128446,
        164: 128203,
        165: 128466,
        166: 128467,
        167: 128366,
        168: 128218,
        169: 128478,
        170: 128479,
        171: 128451,
        172: 128450,
        173: 128444,
        174: 127917,
        175: 127900,
        176: 127896,
        177: 127897,
        178: 127911,
        179: 128191,
        180: 127902,
        181: 128247,
        182: 127903,
        183: 127916,
        184: 128253,
        185: 128249,
        186: 128254,
        187: 128251,
        188: 127898,
        189: 127899,
        190: 128250,
        191: 128187,
        192: 128421,
        193: 128422,
        194: 128423,
        195: 128377,
        196: 127918,
        197: 128379,
        198: 128380,
        199: 128223,
        200: 128385,
        201: 128384,
        202: 128424,
        203: 128425,
        204: 128447,
        205: 128426,
        206: 128476,
        207: 128274,
        208: 128275,
        209: 128477,
        210: 128229,
        211: 128228,
        212: 128371,
        213: 127779,
        214: 127780,
        215: 127781,
        216: 127782,
        217: 9729,
        218: 127784,
        219: 127783,
        220: 127785,
        221: 127786,
        222: 127788,
        223: 127787,
        224: 127772,
        225: 127777,
        226: 128715,
        227: 128719,
        228: 127869,
        229: 127864,
        230: 128718,
        231: 128717,
        232: 9413,
        233: 9855,
        234: 128710,
        235: 128392,
        236: 127891,
        237: 128484,
        238: 128485,
        239: 128486,
        240: 128487,
        241: 128746,
        242: 128063,
        243: 128038,
        244: 128031,
        245: 128021,
        246: 128008,
        247: 128620,
        248: 128622,
        249: 128621,
        250: 128623,
        251: 128506,
        252: 127757,
        253: 127759,
        254: 127758,
        255: 128330
    },
    "WINGDINGS": {
        32: 32,
        33: 128393,
        34: 9986,
        35: 9985,
        36: 128083,
        37: 128365,
        38: 128366,
        39: 128367,
        40: 128383,
        41: 9990,
        42: 128386,
        43: 128387,
        44: 128234,
        45: 128235,
        46: 128236,
        47: 128237,
        48: 128448,
        49: 128449,
        50: 128462,
        51: 128463,
        52: 128464,
        53: 128452,
        54: 8987,
        55: 128430,
        56: 128432,
        57: 128434,
        58: 128435,
        59: 128436,
        60: 128427,
        61: 128428,
        62: 9991,
        63: 9997,
        64: 128398,
        65: 9996,
        66: 128399,
        67: 128077,
        68: 128078,
        69: 9756,
        70: 9758,
        71: 9757,
        72: 9759,
        73: 128400,
        74: 9786,
        75: 128528,
        76: 9785,
        77: 128163,
        78: 128369,
        79: 127987,
        80: 127985,
        81: 9992,
        82: 9788,
        83: 127778,
        84: 10052,
        85: 128326,
        86: 10014,
        87: 128328,
        88: 10016,
        89: 10017,
        90: 9770,
        91: 9775,
        92: 128329,
        93: 9784,
        94: 9800,
        95: 9801,
        96: 9802,
        97: 9803,
        98: 9804,
        99: 9805,
        100: 9806,
        101: 9807,
        102: 9808,
        103: 9809,
        104: 9810,
        105: 9811,
        106: 128624,
        107: 128629,
        108: 9899,
        109: 128318,
        110: 9724,
        111: 128911,
        112: 128912,
        113: 10065,
        114: 10066,
        115: 128927,
        116: 10731,
        117: 9670,
        118: 10070,
        119: 11049,
        120: 8999,
        121: 11193,
        122: 8984,
        123: 127989,
        124: 127990,
        125: 128630,
        126: 128631,
        127: 9647,
        128: 127243,
        129: 10112,
        130: 10113,
        131: 10114,
        132: 10115,
        133: 10116,
        134: 10117,
        135: 10118,
        136: 10119,
        137: 10120,
        138: 10121,
        139: 127244,
        140: 10122,
        141: 10123,
        142: 10124,
        143: 10125,
        144: 10126,
        145: 10127,
        146: 10128,
        147: 10129,
        148: 10130,
        149: 10131,
        150: 128610,
        151: 128608,
        152: 128609,
        153: 128611,
        154: 128606,
        155: 128604,
        156: 128605,
        157: 128607,
        158: 8729,
        159: 8226,
        160: 11037,
        161: 11096,
        162: 128902,
        163: 128904,
        164: 128906,
        165: 128907,
        166: 128319,
        167: 9642,
        168: 128910,
        169: 128961,
        170: 128965,
        171: 9733,
        172: 128971,
        173: 128975,
        174: 128979,
        175: 128977,
        176: 11216,
        177: 8982,
        178: 11214,
        179: 11215,
        180: 11217,
        181: 10026,
        182: 10032,
        183: 128336,
        184: 128337,
        185: 128338,
        186: 128339,
        187: 128340,
        188: 128341,
        189: 128342,
        190: 128343,
        191: 128344,
        192: 128345,
        193: 128346,
        194: 128347,
        195: 11184,
        196: 11185,
        197: 11186,
        198: 11187,
        199: 11188,
        200: 11189,
        201: 11190,
        202: 11191,
        203: 128618,
        204: 128619,
        205: 128597,
        206: 128596,
        207: 128599,
        208: 128598,
        209: 128592,
        210: 128593,
        211: 128594,
        212: 128595,
        213: 9003,
        214: 8998,
        215: 11160,
        216: 11162,
        217: 11161,
        218: 11163,
        219: 11144,
        220: 11146,
        221: 11145,
        222: 11147,
        223: 129128,
        224: 129130,
        225: 129129,
        226: 129131,
        227: 129132,
        228: 129133,
        229: 129135,
        230: 129134,
        231: 129144,
        232: 129146,
        233: 129145,
        234: 129147,
        235: 129148,
        236: 129149,
        237: 129151,
        238: 129150,
        239: 8678,
        240: 8680,
        241: 8679,
        242: 8681,
        243: 11012,
        244: 8691,
        245: 11009,
        246: 11008,
        247: 11011,
        248: 11010,
        249: 129196,
        250: 129197,
        251: 128502,
        252: 10003,
        253: 128503,
        254: 128505
    },
    "WINGDINGS 2": {
        32: 32,
        33: 128394,
        34: 128395,
        35: 128396,
        36: 128397,
        37: 9988,
        38: 9984,
        39: 128382,
        40: 128381,
        41: 128453,
        42: 128454,
        43: 128455,
        44: 128456,
        45: 128457,
        46: 128458,
        47: 128459,
        48: 128460,
        49: 128461,
        50: 128203,
        51: 128465,
        52: 128468,
        53: 128437,
        54: 128438,
        55: 128439,
        56: 128440,
        57: 128429,
        58: 128431,
        59: 128433,
        60: 128402,
        61: 128403,
        62: 128408,
        63: 128409,
        64: 128410,
        65: 128411,
        66: 128072,
        67: 128073,
        68: 128412,
        69: 128413,
        70: 128414,
        71: 128415,
        72: 128416,
        73: 128417,
        74: 128070,
        75: 128071,
        76: 128418,
        77: 128419,
        78: 128401,
        79: 128500,
        80: 128504,
        81: 128501,
        82: 9745,
        83: 11197,
        84: 9746,
        85: 11198,
        86: 11199,
        87: 128711,
        88: 10680,
        89: 128625,
        90: 128628,
        91: 128626,
        92: 128627,
        93: 8253,
        94: 128633,
        95: 128634,
        96: 128635,
        97: 128614,
        98: 128612,
        99: 128613,
        100: 128615,
        101: 128602,
        102: 128600,
        103: 128601,
        104: 128603,
        105: 9450,
        106: 9312,
        107: 9313,
        108: 9314,
        109: 9315,
        110: 9316,
        111: 9317,
        112: 9318,
        113: 9319,
        114: 9320,
        115: 9321,
        116: 9471,
        117: 10102,
        118: 10103,
        119: 10104,
        120: 10105,
        121: 10106,
        122: 10107,
        123: 10108,
        124: 10109,
        125: 10110,
        126: 10111,
        128: 9737,
        129: 127765,
        130: 9789,
        131: 9790,
        132: 11839,
        133: 10013,
        134: 128327,
        135: 128348,
        136: 128349,
        137: 128350,
        138: 128351,
        139: 128352,
        140: 128353,
        141: 128354,
        142: 128355,
        143: 128356,
        144: 128357,
        145: 128358,
        146: 128359,
        147: 128616,
        148: 128617,
        149: 8901,
        150: 128900,
        151: 10625,
        152: 9679,
        153: 9675,
        154: 128901,
        155: 128903,
        156: 128905,
        157: 8857,
        158: 10687,
        159: 128908,
        160: 128909,
        161: 9726,
        162: 9632,
        163: 9633,
        164: 128913,
        165: 128914,
        166: 128915,
        167: 128916,
        168: 9635,
        169: 128917,
        170: 128918,
        171: 128919,
        172: 128920,
        173: 11049,
        174: 11045,
        175: 9671,
        176: 128922,
        177: 9672,
        178: 128923,
        179: 128924,
        180: 128925,
        181: 128926,
        182: 11050,
        183: 11047,
        184: 9674,
        185: 128928,
        186: 9686,
        187: 9687,
        188: 11210,
        189: 11211,
        190: 11200,
        191: 11201,
        192: 11039,
        193: 11202,
        194: 11043,
        195: 11042,
        196: 11203,
        197: 11204,
        198: 128929,
        199: 128930,
        200: 128931,
        201: 128932,
        202: 128933,
        203: 128934,
        204: 128935,
        205: 128936,
        206: 128937,
        207: 128938,
        208: 128939,
        209: 128940,
        210: 128941,
        211: 128942,
        212: 128943,
        213: 128944,
        214: 128945,
        215: 128946,
        216: 128947,
        217: 128948,
        218: 128949,
        219: 128950,
        220: 128951,
        221: 128952,
        222: 128953,
        223: 128954,
        224: 128955,
        225: 128956,
        226: 128957,
        227: 128958,
        228: 128959,
        229: 128960,
        230: 128962,
        231: 128964,
        232: 128966,
        233: 128969,
        234: 128970,
        235: 10038,
        236: 128972,
        237: 128974,
        238: 128976,
        239: 128978,
        240: 10041,
        241: 128963,
        242: 128967,
        243: 10031,
        244: 128973,
        245: 128980,
        246: 11212,
        247: 11213,
        248: 8251,
        249: 8258
    },
    "WINGDINGS 3": {
        32: 32,
        33: 11104,
        34: 11106,
        35: 11105,
        36: 11107,
        37: 11110,
        38: 11111,
        39: 11113,
        40: 11112,
        41: 11120,
        42: 11122,
        43: 11121,
        44: 11123,
        45: 11126,
        46: 11128,
        47: 11131,
        48: 11133,
        49: 11108,
        50: 11109,
        51: 11114,
        52: 11116,
        53: 11115,
        54: 11117,
        55: 11085,
        56: 11168,
        57: 11169,
        58: 11170,
        59: 11171,
        60: 11172,
        61: 11173,
        62: 11174,
        63: 11175,
        64: 11152,
        65: 11153,
        66: 11154,
        67: 11155,
        68: 11136,
        69: 11139,
        70: 11134,
        71: 11135,
        72: 11140,
        73: 11142,
        74: 11141,
        75: 11143,
        76: 11151,
        77: 11149,
        78: 11150,
        79: 11148,
        80: 11118,
        81: 11119,
        82: 9099,
        83: 8996,
        84: 8963,
        85: 8997,
        86: 9251,
        87: 9085,
        88: 8682,
        89: 11192,
        90: 129184,
        91: 129185,
        92: 129186,
        93: 129187,
        94: 129188,
        95: 129189,
        96: 129190,
        97: 129191,
        98: 129192,
        99: 129193,
        100: 129194,
        101: 129195,
        102: 129104,
        103: 129106,
        104: 129105,
        105: 129107,
        106: 129108,
        107: 129109,
        108: 129111,
        109: 129110,
        110: 129112,
        111: 129113,
        112: 9650,
        113: 9660,
        114: 9651,
        115: 9661,
        116: 9664,
        117: 9654,
        118: 9665,
        119: 9655,
        120: 9699,
        121: 9698,
        122: 9700,
        123: 9701,
        124: 128896,
        125: 128898,
        126: 128897,
        128: 128899,
        129: 11205,
        130: 11206,
        131: 11207,
        132: 11208,
        133: 11164,
        134: 11166,
        135: 11165,
        136: 11167,
        137: 129040,
        138: 129042,
        139: 129041,
        140: 129043,
        141: 129044,
        142: 129046,
        143: 129045,
        144: 129047,
        145: 129048,
        146: 129050,
        147: 129049,
        148: 129051,
        149: 129052,
        150: 129054,
        151: 129053,
        152: 129055,
        153: 129024,
        154: 129026,
        155: 129025,
        156: 129027,
        157: 129028,
        158: 129030,
        159: 129029,
        160: 129031,
        161: 129032,
        162: 129034,
        163: 129033,
        164: 129035,
        165: 129056,
        166: 129058,
        167: 129060,
        168: 129062,
        169: 129064,
        170: 129066,
        171: 129068,
        172: 129180,
        173: 129181,
        174: 129182,
        175: 129183,
        176: 129070,
        177: 129072,
        178: 129074,
        179: 129076,
        180: 129078,
        181: 129080,
        182: 129082,
        183: 129081,
        184: 129083,
        185: 129176,
        186: 129178,
        187: 129177,
        188: 129179,
        189: 129084,
        190: 129086,
        191: 129085,
        192: 129087,
        193: 129088,
        194: 129090,
        195: 129089,
        196: 129091,
        197: 129092,
        198: 129094,
        199: 129093,
        200: 129095,
        201: 11176,
        202: 11177,
        203: 11178,
        204: 11179,
        205: 11180,
        206: 11181,
        207: 11182,
        208: 11183,
        209: 129120,
        210: 129122,
        211: 129121,
        212: 129123,
        213: 129124,
        214: 129125,
        215: 129127,
        216: 129126,
        217: 129136,
        218: 129138,
        219: 129137,
        220: 129139,
        221: 129140,
        222: 129141,
        223: 129143,
        224: 129142,
        225: 129152,
        226: 129154,
        227: 129153,
        228: 129155,
        229: 129156,
        230: 129157,
        231: 129159,
        232: 129158,
        233: 129168,
        234: 129170,
        235: 129169,
        236: 129171,
        237: 129172,
        238: 129174,
        239: 129173,
        240: 129175
    }
};
exports.default = dingbats;
}),
"[project]/node_modules/dingbat-to-unicode/dist/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hex = exports.dec = exports.codePoint = void 0;
var dingbats_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/dingbat-to-unicode/dist/dingbats.js [app-route] (ecmascript)"));
var dingbatsByCodePoint = {};
var fromCodePoint = String.fromCodePoint ? String.fromCodePoint : fromCodePointPolyfill;
function codePoint(typeface, codePoint) {
    var codePointMap = dingbats_1.default[typeface.toUpperCase()];
    if (codePointMap === undefined) {
        return undefined;
    }
    var unicodeCodePoint = codePointMap[codePoint];
    if (unicodeCodePoint === undefined) {
        return undefined;
    }
    return {
        codePoint: unicodeCodePoint,
        string: fromCodePoint(unicodeCodePoint)
    };
}
exports.codePoint = codePoint;
function dec(typeface, dec) {
    return codePoint(typeface, parseInt(dec, 10));
}
exports.dec = dec;
function hex(typeface, hex) {
    return codePoint(typeface, parseInt(hex, 16));
}
exports.hex = hex;
function fromCodePointPolyfill(codePoint) {
    if (codePoint <= 0xFFFF) {
        // BMP
        return String.fromCharCode(codePoint);
    } else {
        // Astral
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var highSurrogate = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800;
        var lowSurrogate = (codePoint - 0x10000) % 0x400 + 0xDC00;
        return String.fromCharCode(highSurrogate, lowSurrogate);
    }
}
;
}),
"[project]/node_modules/immediate/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Mutation = /*TURBOPACK member replacement*/ __turbopack_context__.g.MutationObserver || /*TURBOPACK member replacement*/ __turbopack_context__.g.WebKitMutationObserver;
var scheduleDrain;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
{
    var called;
    var observer;
    var element;
    var channel;
} else {
    scheduleDrain = function() {
        process.nextTick(nextTick);
    };
}
var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
    draining = true;
    var i, oldQueue;
    var len = queue.length;
    while(len){
        oldQueue = queue;
        queue = [];
        i = -1;
        while(++i < len){
            oldQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
module.exports = immediate;
function immediate(task) {
    if (queue.push(task) === 1 && !draining) {
        scheduleDrain();
    }
}
}),
"[project]/node_modules/lie/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var immediate = __turbopack_context__.r("[project]/node_modules/immediate/lib/index.js [app-route] (ecmascript)");
/* istanbul ignore next */ function INTERNAL() {}
var handlers = {};
var REJECTED = [
    'REJECTED'
];
var FULFILLED = [
    'FULFILLED'
];
var PENDING = [
    'PENDING'
];
/* istanbul ignore else */ if (!("TURBOPACK compile-time value", false)) {
    // in which we actually take advantage of JS scoping
    var UNHANDLED = [
        'UNHANDLED'
    ];
}
module.exports = Promise;
function Promise(resolver) {
    if (typeof resolver !== 'function') {
        throw new TypeError('resolver must be a function');
    }
    this.state = PENDING;
    this.queue = [];
    this.outcome = void 0;
    /* istanbul ignore else */ if ("TURBOPACK compile-time truthy", 1) {
        this.handled = UNHANDLED;
    }
    if (resolver !== INTERNAL) {
        safelyResolveThenable(this, resolver);
    }
}
Promise.prototype.finally = function(callback) {
    if (typeof callback !== 'function') {
        return this;
    }
    var p = this.constructor;
    return this.then(resolve, reject);
    //TURBOPACK unreachable
    ;
    function resolve(value) {
        function yes() {
            return value;
        }
        return p.resolve(callback()).then(yes);
    }
    function reject(reason) {
        function no() {
            throw reason;
        }
        return p.resolve(callback()).then(no);
    }
};
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};
Promise.prototype.then = function(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
        return this;
    }
    var promise = new this.constructor(INTERNAL);
    /* istanbul ignore else */ if ("TURBOPACK compile-time truthy", 1) {
        if (this.handled === UNHANDLED) {
            this.handled = null;
        }
    }
    if (this.state !== PENDING) {
        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
        unwrap(promise, resolver, this.outcome);
    } else {
        this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    }
    return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
    this.promise = promise;
    if (typeof onFulfilled === 'function') {
        this.onFulfilled = onFulfilled;
        this.callFulfilled = this.otherCallFulfilled;
    }
    if (typeof onRejected === 'function') {
        this.onRejected = onRejected;
        this.callRejected = this.otherCallRejected;
    }
}
QueueItem.prototype.callFulfilled = function(value) {
    handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function(value) {
    unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function(value) {
    handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function(value) {
    unwrap(this.promise, this.onRejected, value);
};
function unwrap(promise, func, value) {
    immediate(function() {
        var returnValue;
        try {
            returnValue = func(value);
        } catch (e) {
            return handlers.reject(promise, e);
        }
        if (returnValue === promise) {
            handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
        } else {
            handlers.resolve(promise, returnValue);
        }
    });
}
handlers.resolve = function(self, value) {
    var result = tryCatch(getThen, value);
    if (result.status === 'error') {
        return handlers.reject(self, result.value);
    }
    var thenable = result.value;
    if (thenable) {
        safelyResolveThenable(self, thenable);
    } else {
        self.state = FULFILLED;
        self.outcome = value;
        var i = -1;
        var len = self.queue.length;
        while(++i < len){
            self.queue[i].callFulfilled(value);
        }
    }
    return self;
};
handlers.reject = function(self, error) {
    self.state = REJECTED;
    self.outcome = error;
    /* istanbul ignore else */ if ("TURBOPACK compile-time truthy", 1) {
        if (self.handled === UNHANDLED) {
            immediate(function() {
                if (self.handled === UNHANDLED) {
                    process.emit('unhandledRejection', error, self);
                }
            });
        }
    }
    var i = -1;
    var len = self.queue.length;
    while(++i < len){
        self.queue[i].callRejected(error);
    }
    return self;
};
function getThen(obj) {
    // Make sure we only access the accessor once as required by the spec
    var then = obj && obj.then;
    if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
        return function appyThen() {
            then.apply(obj, arguments);
        };
    }
}
function safelyResolveThenable(self, thenable) {
    // Either fulfill, reject or reject with error
    var called = false;
    function onError(value) {
        if (called) {
            return;
        }
        called = true;
        handlers.reject(self, value);
    }
    function onSuccess(value) {
        if (called) {
            return;
        }
        called = true;
        handlers.resolve(self, value);
    }
    function tryToUnwrap() {
        thenable(onSuccess, onError);
    }
    var result = tryCatch(tryToUnwrap);
    if (result.status === 'error') {
        onError(result.value);
    }
}
function tryCatch(func, value) {
    var out = {};
    try {
        out.value = func(value);
        out.status = 'success';
    } catch (e) {
        out.status = 'error';
        out.value = e;
    }
    return out;
}
Promise.resolve = resolve;
function resolve(value) {
    if (value instanceof this) {
        return value;
    }
    return handlers.resolve(new this(INTERNAL), value);
}
Promise.reject = reject;
function reject(reason) {
    var promise = new this(INTERNAL);
    return handlers.reject(promise, reason);
}
Promise.all = all;
function all(iterable) {
    var self = this;
    if (Object.prototype.toString.call(iterable) !== '[object Array]') {
        return this.reject(new TypeError('must be an array'));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
        return this.resolve([]);
    }
    var values = new Array(len);
    var resolved = 0;
    var i = -1;
    var promise = new this(INTERNAL);
    while(++i < len){
        allResolver(iterable[i], i);
    }
    return promise;
    //TURBOPACK unreachable
    ;
    function allResolver(value, i) {
        self.resolve(value).then(resolveFromAll, function(error) {
            if (!called) {
                called = true;
                handlers.reject(promise, error);
            }
        });
        function resolveFromAll(outValue) {
            values[i] = outValue;
            if (++resolved === len && !called) {
                called = true;
                handlers.resolve(promise, values);
            }
        }
    }
}
Promise.race = race;
function race(iterable) {
    var self = this;
    if (Object.prototype.toString.call(iterable) !== '[object Array]') {
        return this.reject(new TypeError('must be an array'));
    }
    var len = iterable.length;
    var called = false;
    if (!len) {
        return this.resolve([]);
    }
    var i = -1;
    var promise = new this(INTERNAL);
    while(++i < len){
        resolver(iterable[i]);
    }
    return promise;
    //TURBOPACK unreachable
    ;
    function resolver(value) {
        self.resolve(value).then(function(response) {
            if (!called) {
                called = true;
                handlers.resolve(promise, response);
            }
        }, function(error) {
            if (!called) {
                called = true;
                handlers.reject(promise, error);
            }
        });
    }
}
}),
"[project]/node_modules/ollama/dist/browser.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ollama",
    ()=>Ollama$1,
    "default",
    ()=>browser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$whatwg$2d$fetch$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/whatwg-fetch/fetch.js [app-route] (ecmascript)");
;
const defaultPort = "11434";
const defaultHost = `http://127.0.0.1:${defaultPort}`;
const version = "0.6.4";
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value)=>key in obj ? __defProp$1(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField$1 = (obj, key, value)=>{
    __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
class ResponseError extends Error {
    constructor(error, status_code){
        super(error);
        this.error = error;
        this.status_code = status_code;
        this.name = "ResponseError";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError);
        }
    }
}
class AbortableAsyncIterator {
    constructor(abortController, itr, doneCallback){
        __publicField$1(this, "abortController");
        __publicField$1(this, "itr");
        __publicField$1(this, "doneCallback");
        this.abortController = abortController;
        this.itr = itr;
        this.doneCallback = doneCallback;
    }
    abort() {
        this.abortController.abort();
    }
    async *[Symbol.asyncIterator]() {
        for await (const message of this.itr){
            if ("error" in message) {
                throw new Error(message.error);
            }
            yield message;
            if (message.done || message.status === "success") {
                this.doneCallback();
                return;
            }
        }
        throw new Error("Did not receive done or success response in stream.");
    }
}
const checkOk = async (response)=>{
    if (response.ok) {
        return;
    }
    let message = `Error ${response.status}: ${response.statusText}`;
    let errorData = null;
    if (response.headers.get("content-type")?.includes("application/json")) {
        try {
            errorData = await response.json();
            message = errorData.error || message;
        } catch (error) {
            console.log("Failed to parse error response as JSON");
        }
    } else {
        try {
            console.log("Getting text from response");
            const textResponse = await response.text();
            message = textResponse || message;
        } catch (error) {
            console.log("Failed to get text from error response");
        }
    }
    throw new ResponseError(message, response.status);
};
function getPlatform() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else if (typeof process !== "undefined") {
        return `${process.arch} ${process.platform} Node.js/${process.version}`;
    }
    return "";
}
function normalizeHeaders(headers) {
    if (headers instanceof Headers) {
        const obj = {};
        headers.forEach((value, key)=>{
            obj[key] = value;
        });
        return obj;
    } else if (Array.isArray(headers)) {
        return Object.fromEntries(headers);
    } else {
        return headers || {};
    }
}
const readEnvVar = (obj, key)=>{
    return obj[key];
};
const fetchWithHeaders = async (fetch1, url, options = {})=>{
    const defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": `ollama-js/${version} (${getPlatform()})`
    };
    options.headers = normalizeHeaders(options.headers);
    try {
        const parsed = new URL(url);
        if (parsed.protocol === "https:" && parsed.hostname === "ollama.com") {
            const apiKey = typeof process === "object" && process !== null && typeof process.env === "object" && process.env !== null ? readEnvVar(process.env, "OLLAMA_API_KEY") : void 0;
            const authorization = options.headers["authorization"] || options.headers["Authorization"];
            if (!authorization && apiKey) {
                options.headers["Authorization"] = `Bearer ${apiKey}`;
            }
        }
    } catch (error) {
        console.error("error parsing url", error);
    }
    const customHeaders = Object.fromEntries(Object.entries(options.headers).filter(([key])=>!Object.keys(defaultHeaders).some((defaultKey)=>defaultKey.toLowerCase() === key.toLowerCase())));
    options.headers = {
        ...defaultHeaders,
        ...customHeaders
    };
    return fetch1(url, options);
};
const get = async (fetch1, host, options)=>{
    const response = await fetchWithHeaders(fetch1, host, {
        headers: options?.headers
    });
    await checkOk(response);
    return response;
};
const post = async (fetch1, host, data, options)=>{
    const isRecord = (input)=>{
        return input !== null && typeof input === "object" && !Array.isArray(input);
    };
    const formattedData = isRecord(data) ? JSON.stringify(data) : data;
    const response = await fetchWithHeaders(fetch1, host, {
        method: "POST",
        body: formattedData,
        signal: options?.signal,
        headers: options?.headers
    });
    await checkOk(response);
    return response;
};
const del = async (fetch1, host, data, options)=>{
    const response = await fetchWithHeaders(fetch1, host, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: options?.headers
    });
    await checkOk(response);
    return response;
};
const parseJSON = async function*(itr) {
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    const reader = itr.getReader();
    while(true){
        const { done, value: chunk } = await reader.read();
        if (done) {
            reader.releaseLock();
            break;
        }
        buffer += decoder.decode(chunk, {
            stream: true
        });
        const parts = buffer.split("\n");
        buffer = parts.pop() ?? "";
        for (const part of parts){
            try {
                yield JSON.parse(part);
            } catch (error) {
                console.warn("invalid json: ", part);
            }
        }
    }
    buffer += decoder.decode();
    for (const part of buffer.split("\n").filter((p)=>p !== "")){
        try {
            yield JSON.parse(part);
        } catch (error) {
            console.warn("invalid json: ", part);
        }
    }
};
const formatHost = (host)=>{
    if (!host) {
        return defaultHost;
    }
    let isExplicitProtocol = host.includes("://");
    if (host.startsWith(":")) {
        host = `http://127.0.0.1${host}`;
        isExplicitProtocol = true;
    }
    if (!isExplicitProtocol) {
        host = `http://${host}`;
    }
    const url = new URL(host);
    let port = url.port;
    if (!port) {
        if (!isExplicitProtocol) {
            port = defaultPort;
        } else {
            port = url.protocol === "https:" ? "443" : "80";
        }
    }
    let auth = "";
    if (url.username) {
        auth = url.username;
        if (url.password) {
            auth += `:${url.password}`;
        }
        auth += "@";
    }
    let formattedHost = `${url.protocol}//${auth}${url.hostname}:${port}${url.pathname}`;
    if (formattedHost.endsWith("/")) {
        formattedHost = formattedHost.slice(0, -1);
    }
    return formattedHost;
};
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>{
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
};
let Ollama$1 = class Ollama {
    constructor(config){
        __publicField(this, "config");
        __publicField(this, "fetch");
        __publicField(this, "ongoingStreamedRequests", []);
        this.config = {
            host: "",
            headers: config?.headers
        };
        if (!config?.proxy) {
            this.config.host = formatHost(config?.host ?? defaultHost);
        }
        this.fetch = config?.fetch ?? fetch;
    }
    // Abort any ongoing streamed requests to Ollama
    abort() {
        for (const request of this.ongoingStreamedRequests){
            request.abort();
        }
        this.ongoingStreamedRequests.length = 0;
    }
    /**
   * Processes a request to the Ollama server. If the request is streamable, it will return a
   * AbortableAsyncIterator that yields the response messages. Otherwise, it will return the response
   * object.
   * @param endpoint {string} - The endpoint to send the request to.
   * @param request {object} - The request object to send to the endpoint.
   * @protected {T | AbortableAsyncIterator<T>} - The response object or a AbortableAsyncIterator that yields
   * response messages.
   * @throws {Error} - If the response body is missing or if the response is an error.
   * @returns {Promise<T | AbortableAsyncIterator<T>>} - The response object or a AbortableAsyncIterator that yields the streamed response.
   */ async processStreamableRequest(endpoint, request) {
        request.stream = request.stream ?? false;
        const host = `${this.config.host}/api/${endpoint}`;
        if (request.stream) {
            const abortController = new AbortController();
            const response2 = await post(this.fetch, host, request, {
                signal: abortController.signal,
                headers: this.config.headers
            });
            if (!response2.body) {
                throw new Error("Missing body");
            }
            const itr = parseJSON(response2.body);
            const abortableAsyncIterator = new AbortableAsyncIterator(abortController, itr, ()=>{
                const i = this.ongoingStreamedRequests.indexOf(abortableAsyncIterator);
                if (i > -1) {
                    this.ongoingStreamedRequests.splice(i, 1);
                }
            });
            this.ongoingStreamedRequests.push(abortableAsyncIterator);
            return abortableAsyncIterator;
        }
        const response = await post(this.fetch, host, request, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Encodes an image to base64 if it is a Uint8Array.
   * @param image {Uint8Array | string} - The image to encode.
   * @returns {Promise<string>} - The base64 encoded image.
   */ async encodeImage(image) {
        if (typeof image !== "string") {
            const uint8Array = new Uint8Array(image);
            let byteString = "";
            const len = uint8Array.byteLength;
            for(let i = 0; i < len; i++){
                byteString += String.fromCharCode(uint8Array[i]);
            }
            return btoa(byteString);
        }
        return image;
    }
    /**
   * Generates a response from a text prompt.
   * @param request {GenerateRequest} - The request object.
   * @returns {Promise<GenerateResponse | AbortableAsyncIterator<GenerateResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */ async generate(request) {
        if (request.images) {
            request.images = await Promise.all(request.images.map(this.encodeImage.bind(this)));
        }
        return this.processStreamableRequest("generate", request);
    }
    /**
   * Chats with the model. The request object can contain messages with images that are either
   * Uint8Arrays or base64 encoded strings. The images will be base64 encoded before sending the
   * request.
   * @param request {ChatRequest} - The request object.
   * @returns {Promise<ChatResponse | AbortableAsyncIterator<ChatResponse>>} - The response object or an
   * AbortableAsyncIterator that yields response messages.
   */ async chat(request) {
        if (request.messages) {
            for (const message of request.messages){
                if (message.images) {
                    message.images = await Promise.all(message.images.map(this.encodeImage.bind(this)));
                }
            }
        }
        return this.processStreamableRequest("chat", request);
    }
    /**
   * Creates a new model from a stream of data.
   * @param request {CreateRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or a stream of progress responses.
   */ async create(request) {
        return this.processStreamableRequest("create", {
            ...request
        });
    }
    /**
   * Pulls a model from the Ollama registry. The request object can contain a stream flag to indicate if the
   * response should be streamed.
   * @param request {PullRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */ async pull(request) {
        return this.processStreamableRequest("pull", {
            name: request.model,
            stream: request.stream,
            insecure: request.insecure
        });
    }
    /**
   * Pushes a model to the Ollama registry. The request object can contain a stream flag to indicate if the
   * response should be streamed.
   * @param request {PushRequest} - The request object.
   * @returns {Promise<ProgressResponse | AbortableAsyncIterator<ProgressResponse>>} - The response object or
   * an AbortableAsyncIterator that yields response messages.
   */ async push(request) {
        return this.processStreamableRequest("push", {
            name: request.model,
            stream: request.stream,
            insecure: request.insecure
        });
    }
    /**
   * Deletes a model from the server. The request object should contain the name of the model to
   * delete.
   * @param request {DeleteRequest} - The request object.
   * @returns {Promise<StatusResponse>} - The response object.
   */ async delete(request) {
        await del(this.fetch, `${this.config.host}/api/delete`, {
            name: request.model
        }, {
            headers: this.config.headers
        });
        return {
            status: "success"
        };
    }
    /**
   * Copies a model from one name to another. The request object should contain the name of the
   * model to copy and the new name.
   * @param request {CopyRequest} - The request object.
   * @returns {Promise<StatusResponse>} - The response object.
   */ async copy(request) {
        await post(this.fetch, `${this.config.host}/api/copy`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return {
            status: "success"
        };
    }
    /**
   * Lists the models on the server.
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */ async list() {
        const response = await get(this.fetch, `${this.config.host}/api/tags`, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Shows the metadata of a model. The request object should contain the name of the model.
   * @param request {ShowRequest} - The request object.
   * @returns {Promise<ShowResponse>} - The response object.
   */ async show(request) {
        const response = await post(this.fetch, `${this.config.host}/api/show`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Embeds text input into vectors.
   * @param request {EmbedRequest} - The request object.
   * @returns {Promise<EmbedResponse>} - The response object.
   */ async embed(request) {
        const response = await post(this.fetch, `${this.config.host}/api/embed`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /** Score choice, noul, and score questions. Returns JSON without streaming. */ async systemone(request) {
        const response = await post(this.fetch, `${this.config.host}/v1/systemone`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Embeds a text prompt into a vector.
   * @param request {EmbeddingsRequest} - The request object.
   * @returns {Promise<EmbeddingsResponse>} - The response object.
   */ async embeddings(request) {
        const response = await post(this.fetch, `${this.config.host}/api/embeddings`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Lists the running models on the server
   * @returns {Promise<ListResponse>} - The response object.
   * @throws {Error} - If the response body is missing.
   */ async ps() {
        const response = await get(this.fetch, `${this.config.host}/api/ps`, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Returns the Ollama server version.
   * @returns {Promise<VersionResponse>} - The server version object.
   */ async version() {
        const response = await get(this.fetch, `${this.config.host}/api/version`, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Performs web search using the Ollama web search API
   * @param request {WebSearchRequest} - The search request containing query and options
   * @returns {Promise<WebSearchResponse>} - The search results
   * @throws {Error} - If the request is invalid or the server returns an error
   */ async webSearch(request) {
        if (!request.query || request.query.length === 0) {
            throw new Error("Query is required");
        }
        const response = await post(this.fetch, `https://ollama.com/api/web_search`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return await response.json();
    }
    /**
   * Fetches a single page using the Ollama web fetch API
   * @param request {WebFetchRequest} - The fetch request containing a URL
   * @returns {Promise<WebFetchResponse>} - The fetch result
   * @throws {Error} - If the request is invalid or the server returns an error
   */ async webFetch(request) {
        if (!request.url || request.url.length === 0) {
            throw new Error("URL is required");
        }
        const response = await post(this.fetch, `https://ollama.com/api/web_fetch`, {
            ...request
        }, {
            headers: this.config.headers
        });
        return await response.json();
    }
};
const browser = new Ollama$1();
;
}),
"[project]/node_modules/ollama/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ollama",
    ()=>Ollama,
    "default",
    ()=>index
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ollama$2f$dist$2f$browser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ollama/dist/browser.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$whatwg$2d$fetch$2f$fetch$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/whatwg-fetch/fetch.js [app-route] (ecmascript)");
;
;
;
;
class Ollama extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ollama$2f$dist$2f$browser$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Ollama"] {
    async encodeImage(image) {
        if (typeof image !== "string") {
            return Buffer.from(image).toString("base64");
        }
        try {
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(image)) {
                const fileBuffer = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["promises"].readFile((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["resolve"])(image));
                return Buffer.from(fileBuffer).toString("base64");
            }
        } catch  {}
        return image;
    }
    /**
   * checks if a file exists
   * @param path {string} - The path to the file
   * @private @internal
   * @returns {Promise<boolean>} - Whether the file exists or not
   */ async fileExists(path) {
        try {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["promises"].access(path);
            return true;
        } catch  {
            return false;
        }
    }
    async create(request) {
        if (request.from && await this.fileExists((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["resolve"])(request.from))) {
            throw Error("Creating with a local path is not currently supported from ollama-js");
        }
        if (request.stream) {
            return super.create(request);
        } else {
            return super.create(request);
        }
    }
}
const index = new Ollama();
;
}),
"[project]/node_modules/process-nextick-args/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if (typeof process === 'undefined' || !process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
    module.exports = {
        nextTick: nextTick
    };
} else {
    module.exports = process;
}
function nextTick(fn, arg1, arg2, arg3) {
    if (typeof fn !== 'function') {
        throw new TypeError('"callback" argument must be a function');
    }
    var len = arguments.length;
    var args, i;
    switch(len){
        case 0:
        case 1:
            return process.nextTick(fn);
        case 2:
            return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
            });
        case 3:
            return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
            });
        case 4:
            return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
            });
        default:
            args = new Array(len - 1);
            i = 0;
            while(i < args.length){
                args[i++] = arguments[i];
            }
            return process.nextTick(function afterTick() {
                fn.apply(null, args);
            });
    }
}
}),
"[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
/*<replacement>*/ var pna = __turbopack_context__.r("[project]/node_modules/process-nextick-args/index.js [app-route] (ecmascript)");
/*</replacement>*/ /*<replacement>*/ var objectKeys = Object.keys || function(obj) {
    var keys = [];
    for(var key in obj){
        keys.push(key);
    }
    return keys;
};
/*</replacement>*/ module.exports = Duplex;
/*<replacement>*/ var util = Object.create(__turbopack_context__.r("[project]/node_modules/core-util-is/lib/util.js [app-route] (ecmascript)"));
util.inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
/*</replacement>*/ var Readable = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_readable.js [app-route] (ecmascript)");
var Writable = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_writable.js [app-route] (ecmascript)");
util.inherits(Duplex, Readable);
{
    // avoid scope creep, the keys array can then be collected
    var keys = objectKeys(Writable.prototype);
    for(var v = 0; v < keys.length; v++){
        var method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
    }
}function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options && options.readable === false) this.readable = false;
    if (options && options.writable === false) this.writable = false;
    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
    this.once('end', onend);
}
Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
        return this._writableState.highWaterMark;
    }
});
// the no-half-open enforcer
function onend() {
    // if we allow half-open state, or if the writable side ended,
    // then we're ok.
    if (this.allowHalfOpen || this._writableState.ended) return;
    // no more data can be written.
    // But allow more writes to happen in this tick.
    pna.nextTick(onEndNT, this);
}
function onEndNT(self) {
    self.end();
}
Object.defineProperty(Duplex.prototype, 'destroyed', {
    get: function() {
        if (this._readableState === undefined || this._writableState === undefined) {
            return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) {
            return;
        }
        // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
    }
});
Duplex.prototype._destroy = function(err, cb) {
    this.push(null);
    this.end();
    pna.nextTick(cb, err);
};
}),
"[project]/node_modules/readable-stream/lib/_stream_passthrough.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
module.exports = PassThrough;
var Transform = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_transform.js [app-route] (ecmascript)");
/*<replacement>*/ var util = Object.create(__turbopack_context__.r("[project]/node_modules/core-util-is/lib/util.js [app-route] (ecmascript)"));
util.inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
/*</replacement>*/ util.inherits(PassThrough, Transform);
function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);
    Transform.call(this, options);
}
PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
};
}),
"[project]/node_modules/readable-stream/lib/_stream_readable.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/ var pna = __turbopack_context__.r("[project]/node_modules/process-nextick-args/index.js [app-route] (ecmascript)");
/*</replacement>*/ module.exports = Readable;
/*<replacement>*/ var isArray = __turbopack_context__.r("[project]/node_modules/readable-stream/node_modules/isarray/index.js [app-route] (ecmascript)");
/*</replacement>*/ /*<replacement>*/ var Duplex;
/*</replacement>*/ Readable.ReadableState = ReadableState;
/*<replacement>*/ var EE = __turbopack_context__.r("[externals]/events [external] (events, cjs)").EventEmitter;
var EElistenerCount = function(emitter, type) {
    return emitter.listeners(type).length;
};
/*</replacement>*/ /*<replacement>*/ var Stream = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/internal/streams/stream.js [app-route] (ecmascript)");
/*</replacement>*/ /*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var OurUint8Array = (("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.g : "TURBOPACK unreachable").Uint8Array || function() {};
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk);
}
function _isUint8Array(obj) {
    return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/ /*<replacement>*/ var util = Object.create(__turbopack_context__.r("[project]/node_modules/core-util-is/lib/util.js [app-route] (ecmascript)"));
util.inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
/*</replacement>*/ /*<replacement>*/ var debugUtil = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog('stream');
} else {
    debug = function() {};
}
/*</replacement>*/ var BufferList = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/internal/streams/BufferList.js [app-route] (ecmascript)");
var destroyImpl = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/internal/streams/destroy.js [app-route] (ecmascript)");
var StringDecoder;
util.inherits(Readable, Stream);
var kProxyEvents = [
    'error',
    'close',
    'destroy',
    'pause',
    'resume'
];
function prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [
        fn,
        emitter._events[event]
    ];
}
function ReadableState(options, stream) {
    Duplex = Duplex || __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)");
    options = options || {};
    // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    var isDuplex = stream instanceof Duplex;
    // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
    // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    var hwm = options.highWaterMark;
    var readableHwm = options.readableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0) this.highWaterMark = hwm;
    else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
    else this.highWaterMark = defaultHwm;
    // cast to ints.
    this.highWaterMark = Math.floor(this.highWaterMark);
    // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    // a flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    this.sync = true;
    // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    // has it been destroyed
    this.destroyed = false;
    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';
    // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0;
    // if true, a maybeReadMore has been scheduled
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
        if (!StringDecoder) StringDecoder = __turbopack_context__.f({
            "string_decoder": {
                id: ()=>"[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)",
                module: ()=>__turbopack_context__.r("[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)")
            },
            "string_decoder/": {
                id: ()=>"[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)",
                module: ()=>__turbopack_context__.r("[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)")
            }
        })('string_decoder/').StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}
function Readable(options) {
    Duplex = Duplex || __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)");
    if (!(this instanceof Readable)) return new Readable(options);
    this._readableState = new ReadableState(options, this);
    // legacy
    this.readable = true;
    if (options) {
        if (typeof options.read === 'function') this._read = options.read;
        if (typeof options.destroy === 'function') this._destroy = options.destroy;
    }
    Stream.call(this);
}
Object.defineProperty(Readable.prototype, 'destroyed', {
    get: function() {
        if (this._readableState === undefined) {
            return false;
        }
        return this._readableState.destroyed;
    },
    set: function(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) {
            return;
        }
        // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
    }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function(err, cb) {
    this.push(null);
    cb(err);
};
// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
        if (typeof chunk === 'string') {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
                chunk = Buffer.from(chunk, encoding);
                encoding = '';
            }
            skipChunkCheck = true;
        }
    } else {
        skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};
// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
};
function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    var state = stream._readableState;
    if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
    } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
            stream.emit('error', er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                chunk = _uint8ArrayToBuffer(chunk);
            }
            if (addToFront) {
                if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));
                else addChunk(stream, state, chunk, true);
            } else if (state.ended) {
                stream.emit('error', new Error('stream.push() after EOF'));
            } else {
                state.reading = false;
                if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
                    else maybeReadMore(stream, state);
                } else {
                    addChunk(stream, state, chunk, false);
                }
            }
        } else if (!addToFront) {
            state.reading = false;
        }
    }
    return needMoreData(state);
}
function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit('data', chunk);
        stream.read(0);
    } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
    }
    maybeReadMore(stream, state);
}
function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
    }
    return er;
}
// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}
Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
};
// backwards compatibility.
Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder) StringDecoder = __turbopack_context__.f({
        "string_decoder": {
            id: ()=>"[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)",
            module: ()=>__turbopack_context__.r("[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)")
        },
        "string_decoder/": {
            id: ()=>"[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)",
            module: ()=>__turbopack_context__.r("[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)")
        }
    })('string_decoder/').StringDecoder;
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
};
// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
        n = MAX_HWM;
    } else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
}
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
    }
    // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    // Don't have enough
    if (!state.ended) {
        state.needReadable = true;
        return 0;
    }
    return state.length;
}
// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function(n) {
    debug('read', n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0) state.emittedReadable = false;
    // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug('read: emitReadable', state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
    }
    n = howMuchToRead(n, state);
    // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
    }
    // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.
    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    debug('need readable', doRead);
    // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug('length less than watermark', doRead);
    }
    // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
        doRead = false;
        debug('reading or ended', doRead);
    } else if (doRead) {
        debug('do read');
        state.reading = true;
        state.sync = true;
        // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0) state.needReadable = true;
        // call internal read method
        this._read(state.highWaterMark);
        state.sync = false;
        // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.
        if (!state.reading) n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0) ret = fromList(n, state);
    else ret = null;
    if (ret === null) {
        state.needReadable = true;
        n = 0;
    } else {
        state.length -= n;
    }
    if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true;
        // If we tried to read() past the EOF, then emit end on the next tick.
        if (nOrig !== n && state.ended) endReadable(this);
    }
    if (ret !== null) this.emit('data', ret);
    return ret;
};
function onEofChunk(stream, state) {
    if (state.ended) return;
    if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    // emit 'readable' now to make sure it gets picked up.
    emitReadable(stream);
}
// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
        debug('emitReadable', state.flowing);
        state.emittedReadable = true;
        if (state.sync) pna.nextTick(emitReadable_, stream);
        else emitReadable_(stream);
    }
}
function emitReadable_(stream) {
    debug('emit readable');
    stream.emit('readable');
    flow(stream);
}
// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
    if (!state.readingMore) {
        state.readingMore = true;
        pna.nextTick(maybeReadMore_, stream, state);
    }
}
function maybeReadMore_(stream, state) {
    var len = state.length;
    while(!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark){
        debug('maybeReadMore read 0');
        stream.read(0);
        if (len === state.length) break;
        else len = state.length;
    }
    state.readingMore = false;
}
// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function(n) {
    this.emit('error', new Error('_read() is not implemented'));
};
Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch(state.pipesCount){
        case 0:
            state.pipes = dest;
            break;
        case 1:
            state.pipes = [
                state.pipes,
                dest
            ];
            break;
        default:
            state.pipes.push(dest);
            break;
    }
    state.pipesCount += 1;
    debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) pna.nextTick(endFn);
    else src.once('end', endFn);
    dest.on('unpipe', onunpipe);
    function onunpipe(readable, unpipeInfo) {
        debug('onunpipe');
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        debug('onend');
        dest.end();
    }
    // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = pipeOnDrain(src);
    dest.on('drain', ondrain);
    var cleanedUp = false;
    function cleanup() {
        debug('cleanup');
        // cleanup event handlers once the pipe is broken
        dest.removeListener('close', onclose);
        dest.removeListener('finish', onfinish);
        dest.removeListener('drain', ondrain);
        dest.removeListener('error', onerror);
        dest.removeListener('unpipe', onunpipe);
        src.removeListener('end', onend);
        src.removeListener('end', unpipe);
        src.removeListener('data', ondata);
        cleanedUp = true;
        // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    // If the user pushes more data while we're writing to dest then we'll end up
    // in ondata again. However, we only want to increase awaitDrain once because
    // dest will only emit one 'drain' event for the multiple writes.
    // => Introduce a guard on increasing awaitDrain.
    var increasedAwaitDrain = false;
    src.on('data', ondata);
    function ondata(chunk) {
        debug('ondata');
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (false === ret && !increasedAwaitDrain) {
            // If the user unpiped during `dest.write()`, it is possible
            // to get stuck in a permanently paused state if that write
            // also returned false.
            // => Check whether `dest` is still a piping destination.
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                debug('false write response, pause', state.awaitDrain);
                state.awaitDrain++;
                increasedAwaitDrain = true;
            }
            src.pause();
        }
    }
    // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
        debug('onerror', er);
        unpipe();
        dest.removeListener('error', onerror);
        if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
    }
    // Make sure our error handler is attached before userland ones.
    prependListener(dest, 'error', onerror);
    // Both close and finish should trigger unpipe, but only once.
    function onclose() {
        dest.removeListener('finish', onfinish);
        unpipe();
    }
    dest.once('close', onclose);
    function onfinish() {
        debug('onfinish');
        dest.removeListener('close', onclose);
        unpipe();
    }
    dest.once('finish', onfinish);
    function unpipe() {
        debug('unpipe');
        src.unpipe(dest);
    }
    // tell the dest that it's being piped to
    dest.emit('pipe', src);
    // start the flow if it hasn't been started already.
    if (!state.flowing) {
        debug('pipe resume');
        src.resume();
    }
    return dest;
};
function pipeOnDrain(src) {
    return function() {
        var state = src._readableState;
        debug('pipeOnDrain', state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
            state.flowing = true;
            flow(src);
        }
    };
}
Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
        hasUnpiped: false
    };
    // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this;
    // just one destination.  most common case.
    if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit('unpipe', this, unpipeInfo);
        return this;
    }
    // slow case. multiple pipe destinations.
    if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for(var i = 0; i < len; i++){
            dests[i].emit('unpipe', this, {
                hasUnpiped: false
            });
        }
        return this;
    }
    // try to find the right one.
    var index = indexOf(state.pipes, dest);
    if (index === -1) return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];
    dest.emit('unpipe', this, unpipeInfo);
    return this;
};
// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    if (ev === 'data') {
        // Start flowing on next tick if stream isn't explicitly paused
        if (this._readableState.flowing !== false) this.resume();
    } else if (ev === 'readable') {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.emittedReadable = false;
            if (!state.reading) {
                pna.nextTick(nReadingNextTick, this);
            } else if (state.length) {
                emitReadable(this);
            }
        }
    }
    return res;
};
Readable.prototype.addListener = Readable.prototype.on;
function nReadingNextTick(self) {
    debug('readable nexttick read 0');
    self.read(0);
}
// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
        debug('resume');
        state.flowing = true;
        resume(this, state);
    }
    return this;
};
function resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        pna.nextTick(resume_, stream, state);
    }
}
function resume_(stream, state) {
    if (!state.reading) {
        debug('resume read 0');
        stream.read(0);
    }
    state.resumeScheduled = false;
    state.awaitDrain = 0;
    stream.emit('resume');
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function() {
    debug('call pause flowing=%j', this._readableState.flowing);
    if (false !== this._readableState.flowing) {
        debug('pause');
        this._readableState.flowing = false;
        this.emit('pause');
    }
    return this;
};
function flow(stream) {
    var state = stream._readableState;
    debug('flow', state.flowing);
    while(state.flowing && stream.read() !== null){}
}
// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on('end', function() {
        debug('wrapped end');
        if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
    });
    stream.on('data', function(chunk) {
        debug('wrapped data');
        if (state.decoder) chunk = state.decoder.write(chunk);
        // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
            paused = true;
            stream.pause();
        }
    });
    // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for(var i in stream){
        if (this[i] === undefined && typeof stream[i] === 'function') {
            this[i] = function(method) {
                return function() {
                    return stream[method].apply(stream, arguments);
                };
            }(i);
        }
    }
    // proxy certain important events.
    for(var n = 0; n < kProxyEvents.length; n++){
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    this._read = function(n) {
        debug('wrapped _read', n);
        if (paused) {
            paused = false;
            stream.resume();
        }
    };
    return this;
};
Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
        return this._readableState.highWaterMark;
    }
});
// exposed for testing purposes only.
Readable._fromList = fromList;
// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;
    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join('');
        else if (state.buffer.length === 1) ret = state.buffer.head.data;
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
    } else {
        // read part of list
        ret = fromListPartial(n, state.buffer, state.decoder);
    }
    return ret;
}
// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
    var ret;
    if (n < list.head.data.length) {
        // slice is the same for buffers and strings
        ret = list.head.data.slice(0, n);
        list.head.data = list.head.data.slice(n);
    } else if (n === list.head.data.length) {
        // first chunk is a perfect match
        ret = list.shift();
    } else {
        // result spans more than one buffer
        ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
    }
    return ret;
}
// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
    var p = list.head;
    var c = 1;
    var ret = p.data;
    n -= ret.length;
    while(p = p.next){
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;
        else ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
            if (nb === str.length) {
                ++c;
                if (p.next) list.head = p.next;
                else list.head = list.tail = null;
            } else {
                list.head = p;
                p.data = str.slice(nb);
            }
            break;
        }
        ++c;
    }
    list.length -= c;
    return ret;
}
// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
    var ret = Buffer.allocUnsafe(n);
    var p = list.head;
    var c = 1;
    p.data.copy(ret);
    n -= p.data.length;
    while(p = p.next){
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
            if (nb === buf.length) {
                ++c;
                if (p.next) list.head = p.next;
                else list.head = list.tail = null;
            } else {
                list.head = p;
                p.data = buf.slice(nb);
            }
            break;
        }
        ++c;
    }
    list.length -= c;
    return ret;
}
function endReadable(stream) {
    var state = stream._readableState;
    // If we get here before consuming all the bytes, then that is a
    // bug in node.  Should never happen.
    if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    if (!state.endEmitted) {
        state.ended = true;
        pna.nextTick(endReadableNT, state, stream);
    }
}
function endReadableNT(state, stream) {
    // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit('end');
    }
}
function indexOf(xs, x) {
    for(var i = 0, l = xs.length; i < l; i++){
        if (xs[i] === x) return i;
    }
    return -1;
}
}),
"[project]/node_modules/readable-stream/lib/_stream_transform.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
module.exports = Transform;
var Duplex = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)");
/*<replacement>*/ var util = Object.create(__turbopack_context__.r("[project]/node_modules/core-util-is/lib/util.js [app-route] (ecmascript)"));
util.inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
/*</replacement>*/ util.inherits(Transform, Duplex);
function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb) {
        return this.emit('error', new Error('write callback called multiple times'));
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
    }
}
function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);
    Duplex.call(this, options);
    this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
    };
    // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true;
    // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;
    if (options) {
        if (typeof options.transform === 'function') this._transform = options.transform;
        if (typeof options.flush === 'function') this._flush = options.flush;
    }
    // When the writable side finishes, then flush out anything remaining.
    this.on('prefinish', prefinish);
}
function prefinish() {
    var _this = this;
    if (typeof this._flush === 'function') {
        this._flush(function(er, data) {
            done(_this, er, data);
        });
    } else {
        done(this, null, null);
    }
}
Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
};
// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function(chunk, encoding, cb) {
    throw new Error('_transform() is not implemented');
};
Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
};
// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
        // mark that we need a transform, so that any data that comes in
        // will get processed, now that we've asked for it.
        ts.needTransform = true;
    }
};
Transform.prototype._destroy = function(err, cb) {
    var _this2 = this;
    Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
        _this2.emit('close');
    });
};
function done(stream, er, data) {
    if (er) return stream.emit('error', er);
    if (data != null) stream.push(data);
    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');
    if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');
    return stream.push(null);
}
}),
"[project]/node_modules/readable-stream/lib/_stream_writable.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
/*<replacement>*/ var pna = __turbopack_context__.r("[project]/node_modules/process-nextick-args/index.js [app-route] (ecmascript)");
/*</replacement>*/ module.exports = Writable;
/* <replacement> */ function WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
}
// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
        onCorkedFinish(_this, state);
    };
}
/* </replacement> */ /*<replacement>*/ var asyncWrite = !("TURBOPACK compile-time value", false) && [
    'v0.10',
    'v0.9.'
].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/ /*<replacement>*/ var Duplex;
/*</replacement>*/ Writable.WritableState = WritableState;
/*<replacement>*/ var util = Object.create(__turbopack_context__.r("[project]/node_modules/core-util-is/lib/util.js [app-route] (ecmascript)"));
util.inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)");
/*</replacement>*/ /*<replacement>*/ var internalUtil = {
    deprecate: __turbopack_context__.r("[project]/node_modules/util-deprecate/node.js [app-route] (ecmascript)")
};
/*</replacement>*/ /*<replacement>*/ var Stream = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/internal/streams/stream.js [app-route] (ecmascript)");
/*</replacement>*/ /*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var OurUint8Array = (("TURBOPACK compile-time truthy", 1) ? /*TURBOPACK member replacement*/ __turbopack_context__.g : "TURBOPACK unreachable").Uint8Array || function() {};
function _uint8ArrayToBuffer(chunk) {
    return Buffer.from(chunk);
}
function _isUint8Array(obj) {
    return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/ var destroyImpl = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/internal/streams/destroy.js [app-route] (ecmascript)");
util.inherits(Writable, Stream);
function nop() {}
function WritableState(options, stream) {
    Duplex = Duplex || __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)");
    options = options || {};
    // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    var isDuplex = stream instanceof Duplex;
    // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
    // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    var hwm = options.highWaterMark;
    var writableHwm = options.writableHighWaterMark;
    var defaultHwm = this.objectMode ? 16 : 16 * 1024;
    if (hwm || hwm === 0) this.highWaterMark = hwm;
    else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
    else this.highWaterMark = defaultHwm;
    // cast to ints.
    this.highWaterMark = Math.floor(this.highWaterMark);
    // if _final has been called
    this.finalCalled = false;
    // drain event flag.
    this.needDrain = false;
    // at the start of calling end()
    this.ending = false;
    // when end() has been called, and returned
    this.ended = false;
    // when 'finish' is emitted
    this.finished = false;
    // has it been destroyed
    this.destroyed = false;
    // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || 'utf8';
    // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0;
    // a flag to see when we're in the middle of a write.
    this.writing = false;
    // when true all writes will be buffered until .uncork() call
    this.corked = 0;
    // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true;
    // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false;
    // the callback that's passed to _write(chunk,cb)
    this.onwrite = function(er) {
        onwrite(stream, er);
    };
    // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null;
    // the amount that is being written when _write is called.
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0;
    // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false;
    // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false;
    // count buffered requests
    this.bufferedRequestCount = 0;
    // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new CorkedRequest(this);
}
WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while(current){
        out.push(current);
        current = current.next;
    }
    return out;
};
(function() {
    try {
        Object.defineProperty(WritableState.prototype, 'buffer', {
            get: internalUtil.deprecate(function() {
                return this.getBuffer();
            }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
        });
    } catch (_) {}
})();
// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function(object) {
            if (realHasInstance.call(this, object)) return true;
            if (this !== Writable) return false;
            return object && object._writableState instanceof WritableState;
        }
    });
} else {
    realHasInstance = function(object) {
        return object instanceof this;
    };
}
function Writable(options) {
    Duplex = Duplex || __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)");
    // Writable ctor is applied to Duplexes, too.
    // `realHasInstance` is necessary because using plain `instanceof`
    // would return false, as no `_writableState` property is attached.
    // Trying to use the custom `instanceof` for Writable here will also break the
    // Node.js LazyTransform implementation, which has a non-trivial getter for
    // `_writableState` that would lead to infinite recursion.
    if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
        return new Writable(options);
    }
    this._writableState = new WritableState(options, this);
    // legacy.
    this.writable = true;
    if (options) {
        if (typeof options.write === 'function') this._write = options.write;
        if (typeof options.writev === 'function') this._writev = options.writev;
        if (typeof options.destroy === 'function') this._destroy = options.destroy;
        if (typeof options.final === 'function') this._final = options.final;
    }
    Stream.call(this);
}
// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function() {
    this.emit('error', new Error('Cannot pipe, not readable'));
};
function writeAfterEnd(stream, cb) {
    var er = new Error('write after end');
    // TODO: defer error events consistently everywhere, not just the cb
    stream.emit('error', er);
    pna.nextTick(cb, er);
}
// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
    var valid = true;
    var er = false;
    if (chunk === null) {
        er = new TypeError('May not write null values to stream');
    } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
        er = new TypeError('Invalid non-string/buffer chunk');
    }
    if (er) {
        stream.emit('error', er);
        pna.nextTick(cb, er);
        valid = false;
    }
    return valid;
}
Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    if (isBuf) encoding = 'buffer';
    else if (!encoding) encoding = state.defaultEncoding;
    if (typeof cb !== 'function') cb = nop;
    if (state.ended) writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
};
Writable.prototype.cork = function() {
    var state = this._writableState;
    state.corked++;
};
Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
    }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === 'string') encoding = encoding.toLowerCase();
    if (!([
        'hex',
        'utf8',
        'utf-8',
        'ascii',
        'binary',
        'base64',
        'ucs2',
        'ucs-2',
        'utf16le',
        'utf-16le',
        'raw'
    ].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
};
function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
        chunk = Buffer.from(chunk, encoding);
    }
    return chunk;
}
Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function() {
        return this._writableState.highWaterMark;
    }
});
// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
            isBuf = true;
            encoding = 'buffer';
            chunk = newChunk;
        }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;
    if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
        };
        if (last) {
            last.next = state.lastBufferedRequest;
        } else {
            state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
    } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
    }
    return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
}
function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        pna.nextTick(cb, er);
        // this can emit finish, and it will always happen
        // after error
        pna.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        stream.emit('error', er);
    } else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit('error', er);
        // this can emit finish, but finish must
        // always follow error
        finishMaybe(stream, state);
    }
}
function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
}
function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er) onwriteError(stream, state, sync, er, cb);
    else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = needFinish(state);
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
        }
        if (sync) {
            /*<replacement>*/ asyncWrite(afterWrite, stream, state, finished, cb);
        /*</replacement>*/ } else {
            afterWrite(stream, state, finished, cb);
        }
    }
}
function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
}
// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit('drain');
    }
}
// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while(entry){
            buffer[count] = entry;
            if (!entry.isBuf) allBuffers = false;
            entry = entry.next;
            count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, '', holder.finish);
        // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
        } else {
            state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
    } else {
        // Slow case, write chunks one-by-one
        while(entry){
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--;
            // if we didn't call the onwrite immediately, then
            // it means that we need to wait until it does.
            // also, that means that the chunk and cb are currently
            // being processed, so move the buffer counter past them.
            if (state.writing) {
                break;
            }
        }
        if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
}
Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new Error('_write() is not implemented'));
};
Writable.prototype._writev = null;
Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === 'function') {
        cb = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === 'function') {
        cb = encoding;
        encoding = null;
    }
    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
    // .end() fully uncorks
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    }
    // ignore unnecessary end() calls.
    if (!state.ending) endWritable(this, state, cb);
};
function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
    stream._final(function(err) {
        state.pendingcb--;
        if (err) {
            stream.emit('error', err);
        }
        state.prefinished = true;
        stream.emit('prefinish');
        finishMaybe(stream, state);
    });
}
function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === 'function') {
            state.pendingcb++;
            state.finalCalled = true;
            pna.nextTick(callFinal, stream, state);
        } else {
            state.prefinished = true;
            stream.emit('prefinish');
        }
    }
}
function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit('finish');
        }
    }
    return need;
}
function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
        if (state.finished) pna.nextTick(cb);
        else stream.once('finish', cb);
    }
    state.ended = true;
    stream.writable = false;
}
function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while(entry){
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
    }
    // reuse the free corkReq.
    state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty(Writable.prototype, 'destroyed', {
    get: function() {
        if (this._writableState === undefined) {
            return false;
        }
        return this._writableState.destroyed;
    },
    set: function(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) {
            return;
        }
        // backward compatibility, the user is explicitly
        // managing destroyed
        this._writableState.destroyed = value;
    }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function(err, cb) {
    this.end();
    cb(err);
};
}),
"[project]/node_modules/readable-stream/lib/internal/streams/BufferList.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
function copyBuffer(src, target, offset) {
    src.copy(target, offset);
}
module.exports = function() {
    function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    BufferList.prototype.push = function push(v) {
        var entry = {
            data: v,
            next: null
        };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
    };
    BufferList.prototype.unshift = function unshift(v) {
        var entry = {
            data: v,
            next: this.head
        };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
    };
    BufferList.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
    };
    BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
    };
    BufferList.prototype.join = function join(s) {
        if (this.length === 0) return '';
        var p = this.head;
        var ret = '' + p.data;
        while(p = p.next){
            ret += s + p.data;
        }
        return ret;
    };
    BufferList.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer.alloc(0);
        var ret = Buffer.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while(p){
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
        }
        return ret;
    };
    return BufferList;
}();
if (util && util.inspect && util.inspect.custom) {
    module.exports.prototype[util.inspect.custom] = function() {
        var obj = util.inspect({
            length: this.length
        });
        return this.constructor.name + ' ' + obj;
    };
}
}),
"[project]/node_modules/readable-stream/lib/internal/streams/destroy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*<replacement>*/ var pna = __turbopack_context__.r("[project]/node_modules/process-nextick-args/index.js [app-route] (ecmascript)");
/*</replacement>*/ // undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
        if (cb) {
            cb(err);
        } else if (err) {
            if (!this._writableState) {
                pna.nextTick(emitErrorNT, this, err);
            } else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                pna.nextTick(emitErrorNT, this, err);
            }
        }
        return this;
    }
    // we set destroyed to true before firing error callbacks in order
    // to make it re-entrance safe in case destroy() is called within callbacks
    if (this._readableState) {
        this._readableState.destroyed = true;
    }
    // if this is a duplex stream mark the writable part as destroyed as well
    if (this._writableState) {
        this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err) {
        if (!cb && err) {
            if (!_this._writableState) {
                pna.nextTick(emitErrorNT, _this, err);
            } else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                pna.nextTick(emitErrorNT, _this, err);
            }
        } else if (cb) {
            cb(err);
        }
    });
    return this;
}
function undestroy() {
    if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
    }
    if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
    }
}
function emitErrorNT(self, err) {
    self.emit('error', err);
}
module.exports = {
    destroy: destroy,
    undestroy: undestroy
};
}),
"[project]/node_modules/string_decoder/lib/string_decoder.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)").Buffer;
/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {
    encoding = '' + encoding;
    switch(encoding && encoding.toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc) return 'utf8';
    var retried;
    while(true){
        switch(enc){
            case 'utf8':
            case 'utf-8':
                return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return 'utf16le';
            case 'latin1':
            case 'binary':
                return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
                return enc;
            default:
                if (retried) return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
        }
    }
}
;
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i = 0;
    }
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}
}),
"[project]/node_modules/unpdf/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "configureUnPDF",
    ()=>configureUnPDF,
    "createIsomorphicCanvasFactory",
    ()=>createIsomorphicCanvasFactory,
    "definePDFJSModule",
    ()=>definePDFJSModule,
    "extractImages",
    ()=>extractImages,
    "extractLinks",
    ()=>extractLinks,
    "extractText",
    ()=>extractText,
    "extractTextItems",
    ()=>extractTextItems,
    "getDocumentProxy",
    ()=>getDocumentProxy,
    "getMeta",
    ()=>getMeta,
    "getResolvedPDFJS",
    ()=>getResolvedPDFJS,
    "renderPageAsImage",
    ()=>renderPageAsImage,
    "resolvePDFJSImport",
    ()=>resolvePDFJSImport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/track-dynamic-import.js [app-route] (ecmascript)");
var __TURBOPACK__import$2e$meta__ = {
    get url () {
        return __turbopack_context__.F("node_modules/unpdf/dist/index.mjs");
    },
    env: {
        DEV: true,
        PROD: false,
        MODE: "development",
        BASE_URL: "/",
        SSR: true
    },
    get turbopackHot () {
        return __turbopack_context__.m.hot;
    }
};
;
//#region src/_internal/dommatrix-polyfill.ts
function polyfillDOMMatrix() {
    if (typeof globalThis.DOMMatrix !== "undefined") return;
    globalThis.DOMMatrix = class DOMMatrix {
        constructor(init){
            if (Array.isArray(init) && init.length === 6) {
                this.a = init[0];
                this.b = init[1];
                this.c = init[2];
                this.d = init[3];
                this.e = init[4];
                this.f = init[5];
            } else {
                this.a = 1;
                this.b = 0;
                this.c = 0;
                this.d = 1;
                this.e = 0;
                this.f = 0;
            }
        }
        translateSelf(tx, ty = 0) {
            this.e = this.a * tx + this.c * ty + this.e;
            this.f = this.b * tx + this.d * ty + this.f;
            return this;
        }
        scaleSelf(sx, sy = sx) {
            this.a *= sx;
            this.b *= sx;
            this.c *= sy;
            this.d *= sy;
            return this;
        }
    };
}
//#endregion
//#region src/_internal/env.ts
/**
* Stubs browser globals that PDF.js expects at the module level
* in non-browser environments.
*
* @remarks
* Must be called before importing any PDF.js module, since PDF.js
* accesses these globals at parse time (top-level constants).
*/ function stubBrowserGlobals() {
    polyfillDOMMatrix();
}
//#endregion
//#region src/utils.ts
let resolvedModule;
const isNode = globalThis.process?.release?.name === "node";
const isBrowser = ("TURBOPACK compile-time value", "undefined") !== "undefined";
/**
* Returns a `PDFDocumentProxy` instance from a given binary data.
*
* Applies the following defaults:
* - `useSystemFonts: true`
*
* In Node.js environments, additionally applies:
* - `disableFontFace: true`
* - `standardFontDataUrl` resolved from the local `pdfjs-dist` package
* - `cMapUrl` and `cMapPacked` resolved from the local `pdfjs-dist` package
*/ async function getDocumentProxy(data, options = {}) {
    const { getDocument } = await getResolvedPDFJS();
    let nodeDefaults = {};
    if (isNode) try {
        const base = __TURBOPACK__import$2e$meta__.resolve("pdfjs-dist/package.json");
        nodeDefaults = {
            disableFontFace: true,
            standardFontDataUrl: new URL("./standard_fonts/", base).href,
            cMapUrl: new URL("./cmaps/", base).href,
            cMapPacked: true
        };
    } catch  {}
    return await getDocument({
        data,
        useSystemFonts: true,
        ...nodeDefaults,
        ...options
    }).promise;
}
/**
* Runs an operation on a `PDFDocumentProxy` resolved from either binary data
* or an existing proxy. Documents created here are destroyed once the
* operation settles – caller-supplied proxies keep their lifecycle with the
* caller.
*/ async function withDocument(data, operation, options) {
    const pdf = isPDFDocumentProxy(data) ? data : await getDocumentProxy(data, options);
    try {
        return await operation(pdf);
    } finally{
        if (pdf !== data) await pdf.loadingTask.destroy();
    }
}
async function getResolvedPDFJS() {
    if (!resolvedModule) await resolvePDFJSImport();
    return resolvedModule;
}
async function resolvePDFJSImport(pdfjsResolver, { reload = false } = {}) {
    if (resolvedModule && !reload) return;
    stubBrowserGlobals();
    if (pdfjsResolver) try {
        resolvedModule = await interopDefault(pdfjsResolver());
        return;
    } catch (error) {
        throw new Error(`PDF.js could not be resolved: ${error}`);
    }
    try {
        resolvedModule = await /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$track$2d$dynamic$2d$import$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trackDynamicImport"])(__turbopack_context__.A("[project]/node_modules/unpdf/dist/pdfjs.mjs [app-route] (ecmascript, async loader)"));
    } catch (error) {
        throw new Error(`Serverless PDF.js bundle could not be resolved: ${error}`);
    }
}
function isPDFDocumentProxy(data) {
    return typeof data === "object" && data !== null && "_pdfInfo" in data;
}
async function interopDefault(m) {
    const resolved = await m;
    return resolved.default || resolved;
}
//#endregion
//#region src/_internal/canvas.ts
let resolvedCanvasModule;
/**
* Derived from the PDF.js project by the Mozilla Foundation.
* @see https://github.com/mozilla/pdf.js/blob/b8de9a372f9bbf7e33adb362eeae5ef1919dba73/src/display/canvas_factory.js#L18
* @license Apache-2.0
*/ var BaseCanvasFactory = class {
    #enableHWA = false;
    constructor({ enableHWA = false } = {}){
        this.#enableHWA = enableHWA;
    }
    create(width, height) {
        const canvas = this._createCanvas(width, height);
        return {
            canvas,
            context: canvas.getContext("2d", {
                willReadFrequently: !this.#enableHWA
            })
        };
    }
    reset({ canvas }, width, height) {
        if (!canvas) throw new Error("Canvas is not specified");
        canvas.width = width;
        canvas.height = height;
    }
    destroy(context) {
        if (!context.canvas) throw new Error("Canvas is not specified");
        context.canvas.width = 0;
        context.canvas.height = 0;
        context.canvas = void 0;
        context.context = void 0;
    }
    _createCanvas(width, height) {
        throw new Error("Not implemented");
    }
};
/**
* Derived from the PDF.js project by the Mozilla Foundation.
* @see https://github.com/mozilla/pdf.js/blob/b8de9a372f9bbf7e33adb362eeae5ef1919dba73/src/display/canvas_factory.js#L18
* @license Apache-2.0
*/ var DOMCanvasFactory = class extends BaseCanvasFactory {
    constructor({ ownerDocument = globalThis.document, enableHWA = false } = {}){
        super({
            enableHWA
        });
        this._document = ownerDocument;
    }
    _createCanvas(width, height) {
        const canvas = this._document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
};
var NodeCanvasFactory = class extends BaseCanvasFactory {
    constructor({ enableHWA = false } = {}){
        super({
            enableHWA
        });
    }
    _createCanvas(width, height) {
        if (!resolvedCanvasModule) throw new Error("@napi-rs/canvas module is not resolved");
        return resolvedCanvasModule.createCanvas(width, height);
    }
};
async function resolveCanvasModule(canvasImport) {
    resolvedCanvasModule ??= await interopDefault(canvasImport());
    globalThis[Symbol.for("unpdf.canvasModule")] = resolvedCanvasModule;
}
/**
* Injects `DOMMatrix`, `ImageData` and `Path2D` constructors from the
* `@napi-rs/canvas` package into the global scope. This is necessary for
* Node.js environments that do not support these constructors natively.
*
* @remarks
* `DOMMatrix` is always set because {@link stubBrowserGlobals} may have
* installed a minimal stub to allow PDF.js to import – the real
* `@napi-rs/canvas` implementation must take precedence for rendering.
*/ function injectCanvasConstructors() {
    if (!resolvedCanvasModule) return;
    globalThis.DOMMatrix = resolvedCanvasModule.DOMMatrix;
    if (typeof globalThis.ImageData === "undefined") globalThis.ImageData = resolvedCanvasModule.ImageData;
    if (typeof globalThis.Path2D === "undefined") globalThis.Path2D = resolvedCanvasModule.Path2D;
}
//#endregion
//#region src/image.ts
/**
* Extracts images from a specific page of a PDF document, including necessary metadata,
* such as width, height, and calculated color channels.
*
* @example
* const imagesData = await extractImages(pdf, pageNum)
*
* for (const imgData of imagesData) {
*   const imageIndex = totalImagesProcessed + 1
*   await sharp(imgData.data, {
*     raw: { width: imgData.width, height: imgData.height, channels: imgData.channels }
*   })
*     .png()
*     .toFile(`${imageIndex}.png`)
* }
*/ async function extractImages$1(data, pageNumber) {
    return await withDocument(data, async (pdf)=>{
        if (pageNumber < 1 || pageNumber > pdf.numPages) throw new Error(`Invalid page number. Must be between 1 and ${pdf.numPages}.`);
        const page = await pdf.getPage(pageNumber);
        const operatorList = await page.getOperatorList();
        const { OPS } = await getResolvedPDFJS();
        const images = [];
        for(let i = 0; i < operatorList.fnArray.length; i++){
            if (operatorList.fnArray[i] !== OPS.paintImageXObject) continue;
            const imageKey = operatorList.argsArray[i][0];
            const image = await new Promise((resolve)=>(imageKey.startsWith("g_") ? page.commonObjs : page.objs).get(imageKey, resolve));
            if (!image || !image.data || !image.width || !image.height) continue;
            const { width, height, data } = image;
            const calculatedChannels = data.length / (width * height);
            if (![
                1,
                3,
                4
            ].includes(calculatedChannels)) continue;
            const channels = calculatedChannels;
            images.push({
                data,
                width,
                height,
                channels,
                key: imageKey
            });
        }
        return images;
    });
}
async function renderPageAsImage$1(data, pageNumber, options = {}) {
    const CanvasFactory = await createIsomorphicCanvasFactory(options.canvasImport);
    return await withDocument(data, async (pdf)=>{
        if (pageNumber < 1 || pageNumber > pdf.numPages) throw new Error(`Invalid page number. Must be between 1 and ${pdf.numPages}.`);
        const page = await pdf.getPage(pageNumber);
        const defaultViewport = page.getViewport({
            scale: 1
        });
        let scale = options.scale || 1;
        if (options.width) scale = options.width / defaultViewport.width;
        else if (options.height) scale = options.height / defaultViewport.height;
        const viewport = page.getViewport({
            scale: Math.max(0, scale)
        });
        const canvasFactory = new CanvasFactory();
        const drawingContext = canvasFactory.create(viewport.width, viewport.height);
        try {
            await page.render({
                canvas: drawingContext.canvas,
                canvasContext: drawingContext.context,
                viewport
            }).promise;
            const { canvas } = drawingContext;
            if (options.toDataURL) return canvas.toDataURL();
            if ("encode" in canvas) {
                const buffer = await canvas.encode("png");
                return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
            }
            const blob = await new Promise((resolve)=>{
                canvas.toBlob(resolve);
            });
            if (!blob) throw new Error("Failed to encode canvas to a PNG blob.");
            return await blob.arrayBuffer();
        } finally{
            canvasFactory.destroy(drawingContext);
        }
    }, {
        CanvasFactory
    });
}
async function createIsomorphicCanvasFactory(canvasImport) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (isNode) {
        if (!canvasImport) throw new Error("Parameter \"canvasImport\" is required in Node.js environment.");
        await resolveCanvasModule(canvasImport);
        injectCanvasConstructors();
        return NodeCanvasFactory;
    }
    throw new Error("Unsupported environment for canvas creation.");
}
//#endregion
//#region src/links.ts
async function extractLinks$1(data) {
    return await withDocument(data, async (pdf)=>{
        const pageLinks = await Promise.all(Array.from({
            length: pdf.numPages
        }, (_, i)=>getPageLinks(pdf, i + 1)));
        return {
            totalPages: pdf.numPages,
            links: pageLinks.flat()
        };
    });
}
async function getPageLinks(document, pageNumber) {
    const annotations = await (await document.getPage(pageNumber)).getAnnotations();
    const links = [];
    for (const annotation of annotations)if (annotation.subtype === "Link" && annotation.url) links.push(annotation.url);
    return links;
}
//#endregion
//#region src/meta.ts
const XMP_DATE_PROPERTIES = [
    "xmp:createdate",
    "xmp:modifydate",
    "xmp:metadatadate",
    "xap:createdate",
    "xap:modifydate",
    "xap:metadatadate"
];
async function getMeta$1(data, options = {}) {
    return await withDocument(data, async (pdf)=>{
        const meta = await pdf.getMetadata();
        const info = meta?.info || {};
        if (options.parseDates) {
            const { PDFDateString } = await getResolvedPDFJS();
            if (info?.CreationDate) info.CreationDate = PDFDateString.toDateObject(info?.CreationDate);
            if (info?.ModDate) info.ModDate = PDFDateString.toDateObject(info?.ModDate);
            if (meta.metadata) meta.metadata = new Proxy(meta.metadata, {
                get (target, prop) {
                    if (prop === "get") return (name)=>{
                        const value = target.get(name);
                        if (XMP_DATE_PROPERTIES.includes(name) && value) return parseISODateString(value);
                        return value;
                    };
                    return target[prop];
                }
            });
        }
        return {
            info,
            metadata: meta?.metadata || {}
        };
    });
}
function parseISODateString(isoDateString) {
    if (!isoDateString) return;
    const parsedDate = Date.parse(isoDateString);
    if (!Number.isNaN(parsedDate)) return new Date(parsedDate);
}
//#endregion
//#region src/text.ts
async function extractTextItems$1(data) {
    return await withDocument(data, async (pdf)=>{
        const items = await Promise.all(Array.from({
            length: pdf.numPages
        }, (_, i)=>getPageTextItems(pdf, i + 1)));
        return {
            totalPages: pdf.numPages,
            items
        };
    });
}
async function getPageTextItems(document, pageNumber) {
    const content = await (await document.getPage(pageNumber)).getTextContent();
    const styles = content.styles;
    return content.items.filter((item)=>item.str != null).map((item)=>{
        const [_a, _b, c, d, e, f] = item.transform;
        return {
            str: item.str,
            x: e,
            y: f,
            width: item.width,
            height: item.height,
            fontSize: Math.hypot(c, d),
            fontFamily: styles[item.fontName]?.fontFamily ?? "",
            dir: item.dir,
            hasEOL: item.hasEOL
        };
    });
}
async function extractText$1(data, options = {}) {
    const { mergePages = false } = options;
    return await withDocument(data, async (pdf)=>{
        const texts = await Promise.all(Array.from({
            length: pdf.numPages
        }, (_, i)=>getPageText(pdf, i + 1)));
        return {
            totalPages: pdf.numPages,
            text: mergePages ? normalizeMergedText(texts) : texts
        };
    });
}
async function getPageText(document, pageNumber) {
    return (await (await document.getPage(pageNumber)).getTextContent()).items.filter((item)=>item.str != null).map((item)=>item.str + (item.hasEOL ? "\n" : "")).join("");
}
/**
* Collapses whitespace without destroying the line structure: `hasEOL` and
* page-join line breaks survive, but at most one blank line remains.
*/ function normalizeMergedText(texts) {
    return texts.join("\n").replace(/[^\S\n]+/g, " ").replace(/ ?\n ?/g, "\n").replace(/\n{3,}/g, "\n\n");
}
//#endregion
//#region src/config.ts
/**
* By default, unpdf will use the latest version of PDF.js compiled for
* serverless environments. If you want to use a different version, you can
* provide a custom resolver function.
*
* @example
* // Use the official PDF.js build (make sure to install it first)
* import { definePDFJSModule } from 'unpdf'
*
* await definePDFJSModule(() => import('pdfjs-dist'))
*/ async function definePDFJSModule(pdfjs) {
    await resolvePDFJSImport(pdfjs, {
        reload: true
    });
}
/** @deprecated Use `definePDFJSModule` instead. Will be removed in v2. */ async function configureUnPDF(options) {
    await resolvePDFJSImport(options.pdfjs, {
        reload: true
    });
}
//#endregion
//#region src/index.ts
const getMeta = async (...args)=>{
    await resolvePDFJSImport();
    return await getMeta$1(...args);
};
const extractText = async (...args)=>{
    await resolvePDFJSImport();
    return await extractText$1(...args);
};
const extractTextItems = async (...args)=>{
    await resolvePDFJSImport();
    return await extractTextItems$1(...args);
};
const extractImages = async (...args)=>{
    await resolvePDFJSImport();
    return await extractImages$1(...args);
};
const renderPageAsImage = async (...args)=>{
    await resolvePDFJSImport();
    return await renderPageAsImage$1(...args);
};
const extractLinks = async (...args)=>{
    await resolvePDFJSImport();
    return await extractLinks$1(...args);
};
;
}),
"[project]/node_modules/whatwg-fetch/fetch.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOMException",
    ()=>DOMException,
    "Headers",
    ()=>Headers,
    "Request",
    ()=>Request,
    "Response",
    ()=>Response,
    "fetch",
    ()=>fetch
]);
/* eslint-disable no-prototype-builtins */ var g = typeof globalThis !== 'undefined' && globalThis || typeof self !== 'undefined' && self || ("TURBOPACK compile-time value", "object") !== 'undefined' && /*TURBOPACK member replacement*/ __turbopack_context__.g || {};
var support = {
    searchParams: 'URLSearchParams' in g,
    iterable: 'Symbol' in g && 'iterator' in Symbol,
    blob: 'FileReader' in g && 'Blob' in g && function() {
        try {
            new Blob();
            return true;
        } catch (e) {
            return false;
        }
    }(),
    formData: 'FormData' in g,
    arrayBuffer: 'ArrayBuffer' in g
};
function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
}
if (support.arrayBuffer) {
    var viewClasses = [
        '[object Int8Array]',
        '[object Uint8Array]',
        '[object Uint8ClampedArray]',
        '[object Int16Array]',
        '[object Uint16Array]',
        '[object Int32Array]',
        '[object Uint32Array]',
        '[object Float32Array]',
        '[object Float64Array]'
    ];
    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
}
function normalizeName(name) {
    if (typeof name !== 'string') {
        name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
        throw new TypeError('Invalid character in header field name: "' + name + '"');
    }
    return name.toLowerCase();
}
function normalizeValue(value) {
    if (typeof value !== 'string') {
        value = String(value);
    }
    return value;
}
// Build a destructive iterator for the value list
function iteratorFor(items) {
    var iterator = {
        next: function() {
            var value = items.shift();
            return {
                done: value === undefined,
                value: value
            };
        }
    };
    if (support.iterable) {
        iterator[Symbol.iterator] = function() {
            return iterator;
        };
    }
    return iterator;
}
function Headers(headers) {
    this.map = {};
    if (headers instanceof Headers) {
        headers.forEach(function(value, name) {
            this.append(name, value);
        }, this);
    } else if (Array.isArray(headers)) {
        headers.forEach(function(header) {
            if (header.length != 2) {
                throw new TypeError('Headers constructor: expected name/value pair to be length 2, found' + header.length);
            }
            this.append(header[0], header[1]);
        }, this);
    } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
        }, this);
    }
}
Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
};
Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
};
Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
};
Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name));
};
Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
};
Headers.prototype.forEach = function(callback, thisArg) {
    for(var name in this.map){
        if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
        }
    }
};
Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
        items.push(name);
    });
    return iteratorFor(items);
};
Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
        items.push(value);
    });
    return iteratorFor(items);
};
Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
        items.push([
            name,
            value
        ]);
    });
    return iteratorFor(items);
};
if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}
function consumed(body) {
    if (body._noBody) return;
    if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
}
function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.onerror = function() {
            reject(reader.error);
        };
    });
}
function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
}
function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
    var encoding = match ? match[1] : 'utf-8';
    reader.readAsText(blob, encoding);
    return promise;
}
function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);
    for(var i = 0; i < view.length; i++){
        chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
}
function bufferClone(buf) {
    if (buf.slice) {
        return buf.slice(0);
    } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
    }
}
function Body() {
    this.bodyUsed = false;
    this._initBody = function(body) {
        /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */ // eslint-disable-next-line no-self-assign
        this.bodyUsed = this.bodyUsed;
        this._bodyInit = body;
        if (!body) {
            this._noBody = true;
            this._bodyText = '';
        } else if (typeof body === 'string') {
            this._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            // IE 10-11 can't handle a DataView body.
            this._bodyInit = new Blob([
                this._bodyArrayBuffer
            ]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
        } else {
            this._bodyText = body = Object.prototype.toString.call(body);
        }
        if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
                this.headers.set('content-type', 'text/plain;charset=UTF-8');
            } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set('content-type', this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
        }
    };
    if (support.blob) {
        this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
                return rejected;
            }
            if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([
                    this._bodyArrayBuffer
                ]));
            } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as blob');
            } else {
                return Promise.resolve(new Blob([
                    this._bodyText
                ]));
            }
        };
    }
    this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
            var isConsumed = consumed(this);
            if (isConsumed) {
                return isConsumed;
            } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
                return Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset, this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength));
            } else {
                return Promise.resolve(this._bodyArrayBuffer);
            }
        } else if (support.blob) {
            return this.blob().then(readBlobAsArrayBuffer);
        } else {
            throw new Error('could not read as ArrayBuffer');
        }
    };
    this.text = function() {
        var rejected = consumed(this);
        if (rejected) {
            return rejected;
        }
        if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
        } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text');
        } else {
            return Promise.resolve(this._bodyText);
        }
    };
    if (support.formData) {
        this.formData = function() {
            return this.text().then(decode);
        };
    }
    this.json = function() {
        return this.text().then(JSON.parse);
    };
    return this;
}
// HTTP methods whose capitalization should be normalized
var methods = [
    'CONNECT',
    'DELETE',
    'GET',
    'HEAD',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'TRACE'
];
function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
}
function Request(input, options) {
    if (!(this instanceof Request)) {
        throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    options = options || {};
    var body = options.body;
    if (input instanceof Request) {
        if (input.bodyUsed) {
            throw new TypeError('Already read');
        }
        this.url = input.url;
        this.credentials = input.credentials;
        if (!options.headers) {
            this.headers = new Headers(input.headers);
        }
        this.method = input.method;
        this.mode = input.mode;
        this.signal = input.signal;
        if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
        }
    } else {
        this.url = String(input);
    }
    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
        this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal || function() {
        if ('AbortController' in g) {
            var ctrl = new AbortController();
            return ctrl.signal;
        }
    }();
    this.referrer = null;
    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
    if (this.method === 'GET' || this.method === 'HEAD') {
        if (options.cache === 'no-store' || options.cache === 'no-cache') {
            // Search for a '_' parameter in the query string
            var reParamSearch = /([?&])_=[^&]*/;
            if (reParamSearch.test(this.url)) {
                // If it already exists then set the value with the current time
                this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
            } else {
                // Otherwise add a new '_' parameter to the end with the current time
                var reQueryString = /\?/;
                this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
            }
        }
    }
}
Request.prototype.clone = function() {
    return new Request(this, {
        body: this._bodyInit
    });
};
function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
        if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
    });
    return form;
}
function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
    // https://github.com/github/fetch/issues/748
    // https://github.com/zloirock/core-js/issues/751
    preProcessedHeaders.split('\r').map(function(header) {
        return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header;
    }).forEach(function(line) {
        var parts = line.split(':');
        var key = parts.shift().trim();
        if (key) {
            var value = parts.join(':').trim();
            try {
                headers.append(key, value);
            } catch (error) {
                console.warn('Response ' + error.message);
            }
        }
    });
    return headers;
}
Body.call(Request.prototype);
function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
        throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
    }
    if (!options) {
        options = {};
    }
    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    if (this.status < 200 || this.status > 599) {
        throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
    }
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined ? '' : '' + options.statusText;
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
}
Body.call(Response.prototype);
Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new Headers(this.headers),
        url: this.url
    });
};
Response.error = function() {
    var response = new Response(null, {
        status: 200,
        statusText: ''
    });
    response.ok = false;
    response.status = 0;
    response.type = 'error';
    return response;
};
var redirectStatuses = [
    301,
    302,
    303,
    307,
    308
];
Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
    }
    return new Response(null, {
        status: status,
        headers: {
            location: url
        }
    });
};
var DOMException = g.DOMException;
try {
    new DOMException();
} catch (err) {
    DOMException = function(message, name) {
        this.message = message;
        this.name = name;
        var error = Error(message);
        this.stack = error.stack;
    };
    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
}
function fetch(input, init) {
    return new Promise(function(resolve, reject) {
        var request = new Request(input, init);
        if (request.signal && request.signal.aborted) {
            return reject(new DOMException('Aborted', 'AbortError'));
        }
        var xhr = new XMLHttpRequest();
        function abortXhr() {
            xhr.abort();
        }
        xhr.onload = function() {
            var options = {
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || '')
            };
            // This check if specifically for when a user fetches a file locally from the file system
            // Only if the status is out of a normal range
            if (request.url.indexOf('file://') === 0 && (xhr.status < 200 || xhr.status > 599)) {
                options.status = 200;
            } else {
                options.status = xhr.status;
            }
            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            setTimeout(function() {
                resolve(new Response(body, options));
            }, 0);
        };
        xhr.onerror = function() {
            setTimeout(function() {
                reject(new TypeError('Network request failed'));
            }, 0);
        };
        xhr.ontimeout = function() {
            setTimeout(function() {
                reject(new TypeError('Network request timed out'));
            }, 0);
        };
        xhr.onabort = function() {
            setTimeout(function() {
                reject(new DOMException('Aborted', 'AbortError'));
            }, 0);
        };
        function fixUrl(url) {
            try {
                return url === '' && g.location.href ? g.location.href : url;
            } catch (e) {
                return url;
            }
        }
        xhr.open(request.method, fixUrl(request.url), true);
        if (request.credentials === 'include') {
            xhr.withCredentials = true;
        } else if (request.credentials === 'omit') {
            xhr.withCredentials = false;
        }
        if ('responseType' in xhr) {
            if (support.blob) {
                xhr.responseType = 'blob';
            } else if (support.arrayBuffer) {
                xhr.responseType = 'arraybuffer';
            }
        }
        if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers || g.Headers && init.headers instanceof g.Headers)) {
            var names = [];
            Object.getOwnPropertyNames(init.headers).forEach(function(name) {
                names.push(normalizeName(name));
                xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
            });
            request.headers.forEach(function(value, name) {
                if (names.indexOf(name) === -1) {
                    xhr.setRequestHeader(name, value);
                }
            });
        } else {
            request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value);
            });
        }
        if (request.signal) {
            request.signal.addEventListener('abort', abortXhr);
            xhr.onreadystatechange = function() {
                // DONE (success or failure)
                if (xhr.readyState === 4) {
                    request.signal.removeEventListener('abort', abortXhr);
                }
            };
        }
        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
}
fetch.polyfill = true;
if (!g.fetch) {
    g.fetch = fetch;
    g.Headers = Headers;
    g.Request = Request;
    g.Response = Response;
}
}),
]})(),
"[externals]/systeminformation [external] (systeminformation, cjs, [project]/node_modules/systeminformation)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("systeminformation-c81a7b830ac43960", () => require("systeminformation-c81a7b830ac43960"));

module.exports = mod;
}),
"[project]/node_modules/core-util-is/lib/util.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(arg) {
    if (Array.isArray) {
        return Array.isArray(arg);
    }
    return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;
function isBoolean(arg) {
    return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;
function isNull(arg) {
    return arg === null;
}
exports.isNull = isNull;
function isNullOrUndefined(arg) {
    return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
    return typeof arg === 'number';
}
exports.isNumber = isNumber;
function isString(arg) {
    return typeof arg === 'string';
}
exports.isString = isString;
function isSymbol(arg) {
    return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;
function isUndefined(arg) {
    return arg === void 0;
}
exports.isUndefined = isUndefined;
function isRegExp(re) {
    return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;
function isDate(d) {
    return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
function isError(e) {
    return objectToString(e) === '[object Error]' || e instanceof Error;
}
exports.isError = isError;
function isFunction(arg) {
    return typeof arg === 'function';
}
exports.isFunction = isFunction;
function isPrimitive(arg) {
    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;
exports.isBuffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer.isBuffer;
function objectToString(o) {
    return Object.prototype.toString.call(o);
}
}),
"[project]/node_modules/inherits/inherits.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

try {
    var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
    /* istanbul ignore next */ if (typeof util.inherits !== 'function') throw '';
    module.exports = util.inherits;
} catch (e) {
    /* istanbul ignore next */ module.exports = __turbopack_context__.r("[project]/node_modules/inherits/inherits_browser.js [app-route] (ecmascript)");
}
}),
"[project]/node_modules/inherits/inherits_browser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }
    };
} else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
        }
    };
}
}),
"[project]/node_modules/lop/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.Parser = __turbopack_context__.r("[project]/node_modules/lop/lib/parser.js [app-route] (ecmascript)").Parser;
exports.rules = __turbopack_context__.r("[project]/node_modules/lop/lib/rules.js [app-route] (ecmascript)");
exports.errors = __turbopack_context__.r("[project]/node_modules/lop/lib/errors.js [app-route] (ecmascript)");
exports.results = __turbopack_context__.r("[project]/node_modules/lop/lib/parsing-results.js [app-route] (ecmascript)");
exports.StringSource = __turbopack_context__.r("[project]/node_modules/lop/lib/StringSource.js [app-route] (ecmascript)");
exports.Token = __turbopack_context__.r("[project]/node_modules/lop/lib/Token.js [app-route] (ecmascript)");
exports.bottomUp = __turbopack_context__.r("[project]/node_modules/lop/lib/bottom-up.js [app-route] (ecmascript)");
exports.RegexTokeniser = __turbopack_context__.r("[project]/node_modules/lop/lib/regex-tokeniser.js [app-route] (ecmascript)").RegexTokeniser;
exports.rule = function(ruleBuilder) {
    var rule;
    return function(input) {
        if (!rule) {
            rule = ruleBuilder();
        }
        return rule(input);
    };
};
}),
"[project]/node_modules/lop/lib/StringSource.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var StringSource = module.exports = function(string, description) {
    var self = {
        asString: function() {
            return string;
        },
        range: function(startIndex, endIndex) {
            return new StringSourceRange(string, description, startIndex, endIndex);
        }
    };
    return self;
};
var StringSourceRange = function(string, description, startIndex, endIndex) {
    this._string = string;
    this._description = description;
    this._startIndex = startIndex;
    this._endIndex = endIndex;
};
StringSourceRange.prototype.to = function(otherRange) {
    // TODO: Assert that tokens are the same across both iterators
    return new StringSourceRange(this._string, this._description, this._startIndex, otherRange._endIndex);
};
StringSourceRange.prototype.describe = function() {
    var position = this._position();
    var description = this._description ? this._description + "\n" : "";
    return description + "Line number: " + position.lineNumber + "\nCharacter number: " + position.characterNumber;
};
StringSourceRange.prototype.lineNumber = function() {
    return this._position().lineNumber;
};
StringSourceRange.prototype.characterNumber = function() {
    return this._position().characterNumber;
};
StringSourceRange.prototype._position = function() {
    var self = this;
    var index = 0;
    var nextNewLine = function() {
        return self._string.indexOf("\n", index);
    };
    var lineNumber = 1;
    while(nextNewLine() !== -1 && nextNewLine() < this._startIndex){
        index = nextNewLine() + 1;
        lineNumber += 1;
    }
    var characterNumber = this._startIndex - index + 1;
    return {
        lineNumber: lineNumber,
        characterNumber: characterNumber
    };
};
}),
"[project]/node_modules/lop/lib/Token.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = function(name, value, source) {
    this.name = name;
    this.value = value;
    if (source) {
        this.source = source;
    }
};
}),
"[project]/node_modules/lop/lib/TokenIterator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var TokenIterator = module.exports = function(tokens, startIndex) {
    this._tokens = tokens;
    this._startIndex = startIndex || 0;
};
TokenIterator.prototype.head = function() {
    return this._tokens[this._startIndex];
};
TokenIterator.prototype.tail = function(startIndex) {
    return new TokenIterator(this._tokens, this._startIndex + 1);
};
TokenIterator.prototype.toArray = function() {
    return this._tokens.slice(this._startIndex);
};
TokenIterator.prototype.end = function() {
    return this._tokens[this._tokens.length - 1];
};
// TODO: doesn't need to be a method, can be a separate function,
// which simplifies implementation of the TokenIterator interface
TokenIterator.prototype.to = function(end) {
    var start = this.head().source;
    var endToken = end.head() || end.end();
    return start.to(endToken.source);
};
}),
"[project]/node_modules/lop/lib/bottom-up.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var rules = __turbopack_context__.r("[project]/node_modules/lop/lib/rules.js [app-route] (ecmascript)");
var results = __turbopack_context__.r("[project]/node_modules/lop/lib/parsing-results.js [app-route] (ecmascript)");
exports.parser = function(name, prefixRules, infixRuleBuilders) {
    var self = {
        rule: rule,
        leftAssociative: leftAssociative,
        rightAssociative: rightAssociative
    };
    var infixRules = new InfixRules(infixRuleBuilders.map(createInfixRule));
    var prefixRule = rules.firstOf(name, prefixRules);
    function createInfixRule(infixRuleBuilder) {
        return {
            name: infixRuleBuilder.name,
            rule: lazyRule(infixRuleBuilder.ruleBuilder.bind(null, self))
        };
    }
    function rule() {
        return createRule(infixRules);
    }
    function leftAssociative(name) {
        return createRule(infixRules.untilExclusive(name));
    }
    function rightAssociative(name) {
        return createRule(infixRules.untilInclusive(name));
    }
    function createRule(infixRules) {
        return apply.bind(null, infixRules);
    }
    function apply(infixRules, tokens) {
        var leftResult = prefixRule(tokens);
        if (leftResult.isSuccess()) {
            return infixRules.apply(leftResult);
        } else {
            return leftResult;
        }
    }
    return self;
};
function InfixRules(infixRules) {
    function untilExclusive(name) {
        return new InfixRules(infixRules.slice(0, ruleNames().indexOf(name)));
    }
    function untilInclusive(name) {
        return new InfixRules(infixRules.slice(0, ruleNames().indexOf(name) + 1));
    }
    function ruleNames() {
        return infixRules.map(function(rule) {
            return rule.name;
        });
    }
    function apply(leftResult) {
        var currentResult;
        var source;
        while(true){
            currentResult = applyToTokens(leftResult.remaining());
            if (currentResult.isSuccess()) {
                source = leftResult.source().to(currentResult.source());
                leftResult = results.success(currentResult.value()(leftResult.value(), source), currentResult.remaining(), source);
            } else if (currentResult.isFailure()) {
                return leftResult;
            } else {
                return currentResult;
            }
        }
    }
    function applyToTokens(tokens) {
        return rules.firstOf("infix", infixRules.map(function(infix) {
            return infix.rule;
        }))(tokens);
    }
    return {
        apply: apply,
        untilExclusive: untilExclusive,
        untilInclusive: untilInclusive
    };
}
exports.infix = function(name, ruleBuilder) {
    function map(func) {
        return exports.infix(name, function(parser) {
            var rule = ruleBuilder(parser);
            return function(tokens) {
                var result = rule(tokens);
                return result.map(function(right) {
                    return function(left, source) {
                        return func(left, right, source);
                    };
                });
            };
        });
    }
    return {
        name: name,
        ruleBuilder: ruleBuilder,
        map: map
    };
};
// TODO: move into a sensible place and remove duplication
var lazyRule = function(ruleBuilder) {
    var rule;
    return function(input) {
        if (!rule) {
            rule = ruleBuilder();
        }
        return rule(input);
    };
};
}),
"[project]/node_modules/lop/lib/errors.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.error = function(options) {
    return new Error(options);
};
var Error = function(options) {
    this.expected = options.expected;
    this.actual = options.actual;
    this._location = options.location;
};
Error.prototype.describe = function() {
    var locationDescription = this._location ? this._location.describe() + ":\n" : "";
    return locationDescription + "Expected " + this.expected + "\nbut got " + this.actual;
};
Error.prototype.lineNumber = function() {
    return this._location.lineNumber();
};
Error.prototype.characterNumber = function() {
    return this._location.characterNumber();
};
}),
"[project]/node_modules/lop/lib/lazy-iterators.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var fromArray = exports.fromArray = function(array) {
    var index = 0;
    var hasNext = function() {
        return index < array.length;
    };
    return new LazyIterator({
        hasNext: hasNext,
        next: function() {
            if (!hasNext()) {
                throw new Error("No more elements");
            } else {
                return array[index++];
            }
        }
    });
};
var LazyIterator = function(iterator) {
    this._iterator = iterator;
};
LazyIterator.prototype.map = function(func) {
    var iterator = this._iterator;
    return new LazyIterator({
        hasNext: function() {
            return iterator.hasNext();
        },
        next: function() {
            return func(iterator.next());
        }
    });
};
LazyIterator.prototype.filter = function(condition) {
    var iterator = this._iterator;
    var moved = false;
    var hasNext = false;
    var next;
    var moveIfNecessary = function() {
        if (moved) {
            return;
        }
        moved = true;
        hasNext = false;
        while(iterator.hasNext() && !hasNext){
            next = iterator.next();
            hasNext = condition(next);
        }
    };
    return new LazyIterator({
        hasNext: function() {
            moveIfNecessary();
            return hasNext;
        },
        next: function() {
            moveIfNecessary();
            var toReturn = next;
            moved = false;
            return toReturn;
        }
    });
};
LazyIterator.prototype.first = function() {
    var iterator = this._iterator;
    if (this._iterator.hasNext()) {
        return iterator.next();
    } else {
        return null;
    }
};
LazyIterator.prototype.toArray = function() {
    var result = [];
    while(this._iterator.hasNext()){
        result.push(this._iterator.next());
    }
    return result;
};
}),
"[project]/node_modules/lop/lib/parser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var TokenIterator = __turbopack_context__.r("[project]/node_modules/lop/lib/TokenIterator.js [app-route] (ecmascript)");
exports.Parser = function(options) {
    var parseTokens = function(parser, tokens) {
        return parser(new TokenIterator(tokens));
    };
    return {
        parseTokens: parseTokens
    };
};
}),
"[project]/node_modules/lop/lib/parsing-results.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    failure: function(errors, remaining) {
        if (errors.length < 1) {
            throw new Error("Failure must have errors");
        }
        return new Result({
            status: "failure",
            remaining: remaining,
            errors: errors
        });
    },
    error: function(errors, remaining) {
        if (errors.length < 1) {
            throw new Error("Failure must have errors");
        }
        return new Result({
            status: "error",
            remaining: remaining,
            errors: errors
        });
    },
    success: function(value, remaining, source) {
        return new Result({
            status: "success",
            value: value,
            source: source,
            remaining: remaining,
            errors: []
        });
    },
    cut: function(remaining) {
        return new Result({
            status: "cut",
            remaining: remaining,
            errors: []
        });
    }
};
var Result = function(options) {
    this._value = options.value;
    this._status = options.status;
    this._hasValue = options.value !== undefined;
    this._remaining = options.remaining;
    this._source = options.source;
    this._errors = options.errors;
};
Result.prototype.map = function(func) {
    if (this._hasValue) {
        return new Result({
            value: func(this._value, this._source),
            status: this._status,
            remaining: this._remaining,
            source: this._source,
            errors: this._errors
        });
    } else {
        return this;
    }
};
Result.prototype.changeRemaining = function(remaining) {
    return new Result({
        value: this._value,
        status: this._status,
        remaining: remaining,
        source: this._source,
        errors: this._errors
    });
};
Result.prototype.isSuccess = function() {
    return this._status === "success" || this._status === "cut";
};
Result.prototype.isFailure = function() {
    return this._status === "failure";
};
Result.prototype.isError = function() {
    return this._status === "error";
};
Result.prototype.isCut = function() {
    return this._status === "cut";
};
Result.prototype.value = function() {
    return this._value;
};
Result.prototype.remaining = function() {
    return this._remaining;
};
Result.prototype.source = function() {
    return this._source;
};
Result.prototype.errors = function() {
    return this._errors;
};
}),
"[project]/node_modules/lop/lib/regex-tokeniser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Token = __turbopack_context__.r("[project]/node_modules/lop/lib/Token.js [app-route] (ecmascript)");
var StringSource = __turbopack_context__.r("[project]/node_modules/lop/lib/StringSource.js [app-route] (ecmascript)");
exports.RegexTokeniser = RegexTokeniser;
function RegexTokeniser(rules) {
    rules = rules.map(function(rule) {
        return {
            name: rule.name,
            regex: new RegExp(rule.regex.source, "g")
        };
    });
    function tokenise(input, description) {
        var source = new StringSource(input, description);
        var index = 0;
        var tokens = [];
        while(index < input.length){
            var result = readNextToken(input, index, source);
            index = result.endIndex;
            tokens.push(result.token);
        }
        tokens.push(endToken(input, source));
        return tokens;
    }
    function readNextToken(string, startIndex, source) {
        for(var i = 0; i < rules.length; i++){
            var regex = rules[i].regex;
            regex.lastIndex = startIndex;
            var result = regex.exec(string);
            if (result) {
                var endIndex = startIndex + result[0].length;
                if (result.index === startIndex && endIndex > startIndex) {
                    var value = result[1];
                    var token = new Token(rules[i].name, value, source.range(startIndex, endIndex));
                    return {
                        token: token,
                        endIndex: endIndex
                    };
                }
            }
        }
        var endIndex = startIndex + 1;
        var token = new Token("unrecognisedCharacter", string.substring(startIndex, endIndex), source.range(startIndex, endIndex));
        return {
            token: token,
            endIndex: endIndex
        };
    }
    function endToken(input, source) {
        return new Token("end", null, source.range(input.length, input.length));
    }
    return {
        tokenise: tokenise
    };
}
}),
"[project]/node_modules/lop/lib/rules.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var _ = __turbopack_context__.r("[project]/node_modules/underscore/modules/index-all.js [app-route] (ecmascript)");
var options = __turbopack_context__.r("[project]/node_modules/option/index.js [app-route] (ecmascript)");
var results = __turbopack_context__.r("[project]/node_modules/lop/lib/parsing-results.js [app-route] (ecmascript)");
var errors = __turbopack_context__.r("[project]/node_modules/lop/lib/errors.js [app-route] (ecmascript)");
var lazyIterators = __turbopack_context__.r("[project]/node_modules/lop/lib/lazy-iterators.js [app-route] (ecmascript)");
exports.token = function(tokenType, value) {
    var matchValue = value !== undefined;
    return function(input) {
        var token = input.head();
        if (token && token.name === tokenType && (!matchValue || token.value === value)) {
            return results.success(token.value, input.tail(), token.source);
        } else {
            var expected = describeToken({
                name: tokenType,
                value: value
            });
            return describeTokenMismatch(input, expected);
        }
    };
};
exports.tokenOfType = function(tokenType) {
    return exports.token(tokenType);
};
exports.firstOf = function(name, parsers) {
    if (!_.isArray(parsers)) {
        parsers = Array.prototype.slice.call(arguments, 1);
    }
    return function(input) {
        return lazyIterators.fromArray(parsers).map(function(parser) {
            return parser(input);
        }).filter(function(result) {
            return result.isSuccess() || result.isError();
        }).first() || describeTokenMismatch(input, name);
    };
};
exports.then = function(parser, func) {
    return function(input) {
        var result = parser(input);
        if (!result.map) {
            console.log(result);
        }
        return result.map(func);
    };
};
exports.sequence = function() {
    var parsers = Array.prototype.slice.call(arguments, 0);
    var rule = function(input) {
        var result = _.foldl(parsers, function(memo, parser) {
            var result = memo.result;
            var hasCut = memo.hasCut;
            if (!result.isSuccess()) {
                return {
                    result: result,
                    hasCut: hasCut
                };
            }
            var subResult = parser(result.remaining());
            if (subResult.isCut()) {
                return {
                    result: result,
                    hasCut: true
                };
            } else if (subResult.isSuccess()) {
                var values;
                if (parser.isCaptured) {
                    values = result.value().withValue(parser, subResult.value());
                } else {
                    values = result.value();
                }
                var remaining = subResult.remaining();
                var source = input.to(remaining);
                return {
                    result: results.success(values, remaining, source),
                    hasCut: hasCut
                };
            } else if (hasCut) {
                return {
                    result: results.error(subResult.errors(), subResult.remaining()),
                    hasCut: hasCut
                };
            } else {
                return {
                    result: subResult,
                    hasCut: hasCut
                };
            }
        }, {
            result: results.success(new SequenceValues(), input),
            hasCut: false
        }).result;
        var source = input.to(result.remaining());
        return result.map(function(values) {
            return values.withValue(exports.sequence.source, source);
        });
    };
    rule.head = function() {
        var firstCapture = _.find(parsers, isCapturedRule);
        return exports.then(rule, exports.sequence.extract(firstCapture));
    };
    rule.map = function(func) {
        return exports.then(rule, function(result) {
            return func.apply(this, result.toArray());
        });
    };
    function isCapturedRule(subRule) {
        return subRule.isCaptured;
    }
    return rule;
};
var SequenceValues = function(values, valuesArray) {
    this._values = values || {};
    this._valuesArray = valuesArray || [];
};
SequenceValues.prototype.withValue = function(rule, value) {
    if (rule.captureName && rule.captureName in this._values) {
        throw new Error("Cannot add second value for capture \"" + rule.captureName + "\"");
    } else {
        var newValues = _.clone(this._values);
        newValues[rule.captureName] = value;
        var newValuesArray = this._valuesArray.concat([
            value
        ]);
        return new SequenceValues(newValues, newValuesArray);
    }
};
SequenceValues.prototype.get = function(rule) {
    if (rule.captureName in this._values) {
        return this._values[rule.captureName];
    } else {
        throw new Error("No value for capture \"" + rule.captureName + "\"");
    }
};
SequenceValues.prototype.toArray = function() {
    return this._valuesArray;
};
exports.sequence.capture = function(rule, name) {
    var captureRule = function() {
        return rule.apply(this, arguments);
    };
    captureRule.captureName = name;
    captureRule.isCaptured = true;
    return captureRule;
};
exports.sequence.extract = function(rule) {
    return function(result) {
        return result.get(rule);
    };
};
exports.sequence.applyValues = function(func) {
    // TODO: check captureName doesn't conflict with source or other captures
    var rules = Array.prototype.slice.call(arguments, 1);
    return function(result) {
        var values = rules.map(function(rule) {
            return result.get(rule);
        });
        return func.apply(this, values);
    };
};
exports.sequence.source = {
    captureName: "☃source☃"
};
exports.sequence.cut = function() {
    return function(input) {
        return results.cut(input);
    };
};
exports.optional = function(rule) {
    return function(input) {
        var result = rule(input);
        if (result.isSuccess()) {
            return result.map(options.some);
        } else if (result.isFailure()) {
            return results.success(options.none, input);
        } else {
            return result;
        }
    };
};
exports.zeroOrMoreWithSeparator = function(rule, separator) {
    return repeatedWithSeparator(rule, separator, false);
};
exports.oneOrMoreWithSeparator = function(rule, separator) {
    return repeatedWithSeparator(rule, separator, true);
};
var zeroOrMore = exports.zeroOrMore = function(rule) {
    return function(input) {
        var values = [];
        var result;
        while((result = rule(input)) && result.isSuccess()){
            input = result.remaining();
            values.push(result.value());
        }
        if (result.isError()) {
            return result;
        } else {
            return results.success(values, input);
        }
    };
};
exports.oneOrMore = function(rule) {
    return exports.oneOrMoreWithSeparator(rule, noOpRule);
};
function noOpRule(input) {
    return results.success(null, input);
}
var repeatedWithSeparator = function(rule, separator, isOneOrMore) {
    return function(input) {
        var result = rule(input);
        if (result.isSuccess()) {
            var mainRule = exports.sequence.capture(rule, "main");
            var remainingRule = zeroOrMore(exports.then(exports.sequence(separator, mainRule), exports.sequence.extract(mainRule)));
            var remainingResult = remainingRule(result.remaining());
            return results.success([
                result.value()
            ].concat(remainingResult.value()), remainingResult.remaining());
        } else if (isOneOrMore || result.isError()) {
            return result;
        } else {
            return results.success([], input);
        }
    };
};
exports.leftAssociative = function(leftRule, rightRule, func) {
    var rights;
    if (func) {
        rights = [
            {
                func: func,
                rule: rightRule
            }
        ];
    } else {
        rights = rightRule;
    }
    rights = rights.map(function(right) {
        return exports.then(right.rule, function(rightValue) {
            return function(leftValue, source) {
                return right.func(leftValue, rightValue, source);
            };
        });
    });
    var repeatedRule = exports.firstOf.apply(null, [
        "rules"
    ].concat(rights));
    return function(input) {
        var start = input;
        var leftResult = leftRule(input);
        if (!leftResult.isSuccess()) {
            return leftResult;
        }
        var repeatedResult = repeatedRule(leftResult.remaining());
        while(repeatedResult.isSuccess()){
            var remaining = repeatedResult.remaining();
            var source = start.to(repeatedResult.remaining());
            var right = repeatedResult.value();
            leftResult = results.success(right(leftResult.value(), source), remaining, source);
            repeatedResult = repeatedRule(leftResult.remaining());
        }
        if (repeatedResult.isError()) {
            return repeatedResult;
        }
        return leftResult;
    };
};
exports.leftAssociative.firstOf = function() {
    return Array.prototype.slice.call(arguments, 0);
};
exports.nonConsuming = function(rule) {
    return function(input) {
        return rule(input).changeRemaining(input);
    };
};
var describeToken = function(token) {
    if (token.value) {
        return token.name + " \"" + token.value + "\"";
    } else {
        return token.name;
    }
};
function describeTokenMismatch(input, expected) {
    var error;
    var token = input.head();
    if (token) {
        error = errors.error({
            expected: expected,
            actual: describeToken(token),
            location: token.source
        });
    } else {
        error = errors.error({
            expected: expected,
            actual: "end of tokens"
        });
    }
    return results.failure([
        error
    ], input);
}
}),
"[project]/node_modules/option/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

exports.none = Object.create({
    value: function() {
        throw new Error('Called value on none');
    },
    isNone: function() {
        return true;
    },
    isSome: function() {
        return false;
    },
    map: function() {
        return exports.none;
    },
    flatMap: function() {
        return exports.none;
    },
    filter: function() {
        return exports.none;
    },
    toArray: function() {
        return [];
    },
    orElse: callOrReturn,
    valueOrElse: callOrReturn
});
function callOrReturn(value) {
    if (typeof value == "function") {
        return value();
    } else {
        return value;
    }
}
exports.some = function(value) {
    return new Some(value);
};
var Some = function(value) {
    this._value = value;
};
Some.prototype.value = function() {
    return this._value;
};
Some.prototype.isNone = function() {
    return false;
};
Some.prototype.isSome = function() {
    return true;
};
Some.prototype.map = function(func) {
    return new Some(func(this._value));
};
Some.prototype.flatMap = function(func) {
    return func(this._value);
};
Some.prototype.filter = function(predicate) {
    return predicate(this._value) ? this : exports.none;
};
Some.prototype.toArray = function() {
    return [
        this._value
    ];
};
Some.prototype.orElse = function(value) {
    return this;
};
Some.prototype.valueOrElse = function(value) {
    return this._value;
};
exports.isOption = function(value) {
    return value === exports.none || value instanceof Some;
};
exports.fromNullable = function(value) {
    if (value == null) {
        return exports.none;
    }
    return new Some(value);
};
}),
"[project]/node_modules/readable-stream/lib/internal/streams/stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
}),
"[project]/node_modules/readable-stream/node_modules/isarray/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toString = {}.toString;
module.exports = Array.isArray || function(arr) {
    return toString.call(arr) == '[object Array]';
};
}),
"[project]/node_modules/readable-stream/readable.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
if (process.env.READABLE_STREAM === 'disable' && Stream) {
    module.exports = Stream;
    exports = module.exports = Stream.Readable;
    exports.Readable = Stream.Readable;
    exports.Writable = Stream.Writable;
    exports.Duplex = Stream.Duplex;
    exports.Transform = Stream.Transform;
    exports.PassThrough = Stream.PassThrough;
    exports.Stream = Stream;
} else {
    exports = module.exports = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_readable.js [app-route] (ecmascript)");
    exports.Stream = Stream || exports;
    exports.Readable = exports;
    exports.Writable = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_writable.js [app-route] (ecmascript)");
    exports.Duplex = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_duplex.js [app-route] (ecmascript)");
    exports.Transform = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_transform.js [app-route] (ecmascript)");
    exports.PassThrough = __turbopack_context__.r("[project]/node_modules/readable-stream/lib/_stream_passthrough.js [app-route] (ecmascript)");
}
}),
"[project]/node_modules/safe-buffer/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}),
"[project]/node_modules/util-deprecate/node.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */ module.exports = __turbopack_context__.r("[externals]/util [external] (util, cjs)").deprecate;
}),
"[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject, slice = [].slice, hasProp = {}.hasOwnProperty;
    assign = function() {
        var i, key, len, source, sources, target;
        target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        if (isFunction(Object.assign)) {
            Object.assign.apply(null, arguments);
        } else {
            for(i = 0, len = sources.length; i < len; i++){
                source = sources[i];
                if (source != null) {
                    for(key in source){
                        if (!hasProp.call(source, key)) continue;
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
    isFunction = function(val) {
        return !!val && Object.prototype.toString.call(val) === '[object Function]';
    };
    isObject = function(val) {
        var ref;
        return !!val && ((ref = typeof val) === 'function' || ref === 'object');
    };
    isArray = function(val) {
        if (isFunction(Array.isArray)) {
            return Array.isArray(val);
        } else {
            return Object.prototype.toString.call(val) === '[object Array]';
        }
    };
    isEmpty = function(val) {
        var key;
        if (isArray(val)) {
            return !val.length;
        } else {
            for(key in val){
                if (!hasProp.call(val, key)) continue;
                return false;
            }
            return true;
        }
    };
    isPlainObject = function(val) {
        var ctor, proto;
        return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === 'function' && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
    };
    getValue = function(obj) {
        if (isFunction(obj.valueOf)) {
            return obj.valueOf();
        } else {
            return obj;
        }
    };
    module.exports.assign = assign;
    module.exports.isFunction = isFunction;
    module.exports.isObject = isObject;
    module.exports.isArray = isArray;
    module.exports.isEmpty = isEmpty;
    module.exports.isPlainObject = isPlainObject;
    module.exports.getValue = getValue;
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLAttribute.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLAttribute;
    module.exports = XMLAttribute = function() {
        function XMLAttribute(parent, name, value) {
            this.options = parent.options;
            this.stringify = parent.stringify;
            this.parent = parent;
            if (name == null) {
                throw new Error("Missing attribute name. " + this.debugInfo(name));
            }
            if (value == null) {
                throw new Error("Missing attribute value. " + this.debugInfo(name));
            }
            this.name = this.stringify.attName(name);
            this.value = this.stringify.attValue(value);
        }
        XMLAttribute.prototype.clone = function() {
            return Object.create(this);
        };
        XMLAttribute.prototype.toString = function(options) {
            return this.options.writer.set(options).attribute(this);
        };
        XMLAttribute.prototype.debugInfo = function(name) {
            name = name || this.name;
            if (name == null) {
                return "parent: <" + this.parent.name + ">";
            } else {
                return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
            }
        };
        return XMLAttribute;
    }();
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLCData.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLCData, XMLNode, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLCData = function(superClass) {
        extend(XMLCData, superClass);
        function XMLCData(parent, text) {
            XMLCData.__super__.constructor.call(this, parent);
            if (text == null) {
                throw new Error("Missing CDATA text. " + this.debugInfo());
            }
            this.text = this.stringify.cdata(text);
        }
        XMLCData.prototype.clone = function() {
            return Object.create(this);
        };
        XMLCData.prototype.toString = function(options) {
            return this.options.writer.set(options).cdata(this);
        };
        return XMLCData;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLComment.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLComment, XMLNode, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLComment = function(superClass) {
        extend(XMLComment, superClass);
        function XMLComment(parent, text) {
            XMLComment.__super__.constructor.call(this, parent);
            if (text == null) {
                throw new Error("Missing comment text. " + this.debugInfo());
            }
            this.text = this.stringify.comment(text);
        }
        XMLComment.prototype.clone = function() {
            return Object.create(this);
        };
        XMLComment.prototype.toString = function(options) {
            return this.options.writer.set(options).comment(this);
        };
        return XMLComment;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDTDAttList.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDTDAttList, XMLNode, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLDTDAttList = function(superClass) {
        extend(XMLDTDAttList, superClass);
        function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
            XMLDTDAttList.__super__.constructor.call(this, parent);
            if (elementName == null) {
                throw new Error("Missing DTD element name. " + this.debugInfo());
            }
            if (attributeName == null) {
                throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
            }
            if (!attributeType) {
                throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
            }
            if (!defaultValueType) {
                throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
            }
            if (defaultValueType.indexOf('#') !== 0) {
                defaultValueType = '#' + defaultValueType;
            }
            if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
                throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
            }
            if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
                throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
            }
            this.elementName = this.stringify.eleName(elementName);
            this.attributeName = this.stringify.attName(attributeName);
            this.attributeType = this.stringify.dtdAttType(attributeType);
            this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
            this.defaultValueType = defaultValueType;
        }
        XMLDTDAttList.prototype.toString = function(options) {
            return this.options.writer.set(options).dtdAttList(this);
        };
        return XMLDTDAttList;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDTDElement.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDTDElement, XMLNode, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLDTDElement = function(superClass) {
        extend(XMLDTDElement, superClass);
        function XMLDTDElement(parent, name, value) {
            XMLDTDElement.__super__.constructor.call(this, parent);
            if (name == null) {
                throw new Error("Missing DTD element name. " + this.debugInfo());
            }
            if (!value) {
                value = '(#PCDATA)';
            }
            if (Array.isArray(value)) {
                value = '(' + value.join(',') + ')';
            }
            this.name = this.stringify.eleName(name);
            this.value = this.stringify.dtdElementValue(value);
        }
        XMLDTDElement.prototype.toString = function(options) {
            return this.options.writer.set(options).dtdElement(this);
        };
        return XMLDTDElement;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDTDEntity.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDTDEntity, XMLNode, isObject, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)").isObject;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLDTDEntity = function(superClass) {
        extend(XMLDTDEntity, superClass);
        function XMLDTDEntity(parent, pe, name, value) {
            XMLDTDEntity.__super__.constructor.call(this, parent);
            if (name == null) {
                throw new Error("Missing DTD entity name. " + this.debugInfo(name));
            }
            if (value == null) {
                throw new Error("Missing DTD entity value. " + this.debugInfo(name));
            }
            this.pe = !!pe;
            this.name = this.stringify.eleName(name);
            if (!isObject(value)) {
                this.value = this.stringify.dtdEntityValue(value);
            } else {
                if (!value.pubID && !value.sysID) {
                    throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
                }
                if (value.pubID && !value.sysID) {
                    throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
                }
                if (value.pubID != null) {
                    this.pubID = this.stringify.dtdPubID(value.pubID);
                }
                if (value.sysID != null) {
                    this.sysID = this.stringify.dtdSysID(value.sysID);
                }
                if (value.nData != null) {
                    this.nData = this.stringify.dtdNData(value.nData);
                }
                if (this.pe && this.nData) {
                    throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
                }
            }
        }
        XMLDTDEntity.prototype.toString = function(options) {
            return this.options.writer.set(options).dtdEntity(this);
        };
        return XMLDTDEntity;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDTDNotation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDTDNotation, XMLNode, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLDTDNotation = function(superClass) {
        extend(XMLDTDNotation, superClass);
        function XMLDTDNotation(parent, name, value) {
            XMLDTDNotation.__super__.constructor.call(this, parent);
            if (name == null) {
                throw new Error("Missing DTD notation name. " + this.debugInfo(name));
            }
            if (!value.pubID && !value.sysID) {
                throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
            }
            this.name = this.stringify.eleName(name);
            if (value.pubID != null) {
                this.pubID = this.stringify.dtdPubID(value.pubID);
            }
            if (value.sysID != null) {
                this.sysID = this.stringify.dtdSysID(value.sysID);
            }
        }
        XMLDTDNotation.prototype.toString = function(options) {
            return this.options.writer.set(options).dtdNotation(this);
        };
        return XMLDTDNotation;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDeclaration.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDeclaration, XMLNode, isObject, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)").isObject;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLDeclaration = function(superClass) {
        extend(XMLDeclaration, superClass);
        function XMLDeclaration(parent, version, encoding, standalone) {
            var ref;
            XMLDeclaration.__super__.constructor.call(this, parent);
            if (isObject(version)) {
                ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
            }
            if (!version) {
                version = '1.0';
            }
            this.version = this.stringify.xmlVersion(version);
            if (encoding != null) {
                this.encoding = this.stringify.xmlEncoding(encoding);
            }
            if (standalone != null) {
                this.standalone = this.stringify.xmlStandalone(standalone);
            }
        }
        XMLDeclaration.prototype.toString = function(options) {
            return this.options.writer.set(options).declaration(this);
        };
        return XMLDeclaration;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDocType.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNode, isObject, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    isObject = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)").isObject;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    XMLDTDAttList = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDAttList.js [app-route] (ecmascript)");
    XMLDTDEntity = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDEntity.js [app-route] (ecmascript)");
    XMLDTDElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDElement.js [app-route] (ecmascript)");
    XMLDTDNotation = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDNotation.js [app-route] (ecmascript)");
    module.exports = XMLDocType = function(superClass) {
        extend(XMLDocType, superClass);
        function XMLDocType(parent, pubID, sysID) {
            var ref, ref1;
            XMLDocType.__super__.constructor.call(this, parent);
            this.name = "!DOCTYPE";
            this.documentObject = parent;
            if (isObject(pubID)) {
                ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
            }
            if (sysID == null) {
                ref1 = [
                    pubID,
                    sysID
                ], sysID = ref1[0], pubID = ref1[1];
            }
            if (pubID != null) {
                this.pubID = this.stringify.dtdPubID(pubID);
            }
            if (sysID != null) {
                this.sysID = this.stringify.dtdSysID(sysID);
            }
        }
        XMLDocType.prototype.element = function(name, value) {
            var child;
            child = new XMLDTDElement(this, name, value);
            this.children.push(child);
            return this;
        };
        XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
            var child;
            child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
            this.children.push(child);
            return this;
        };
        XMLDocType.prototype.entity = function(name, value) {
            var child;
            child = new XMLDTDEntity(this, false, name, value);
            this.children.push(child);
            return this;
        };
        XMLDocType.prototype.pEntity = function(name, value) {
            var child;
            child = new XMLDTDEntity(this, true, name, value);
            this.children.push(child);
            return this;
        };
        XMLDocType.prototype.notation = function(name, value) {
            var child;
            child = new XMLDTDNotation(this, name, value);
            this.children.push(child);
            return this;
        };
        XMLDocType.prototype.toString = function(options) {
            return this.options.writer.set(options).docType(this);
        };
        XMLDocType.prototype.ele = function(name, value) {
            return this.element(name, value);
        };
        XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
            return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
        };
        XMLDocType.prototype.ent = function(name, value) {
            return this.entity(name, value);
        };
        XMLDocType.prototype.pent = function(name, value) {
            return this.pEntity(name, value);
        };
        XMLDocType.prototype.not = function(name, value) {
            return this.notation(name, value);
        };
        XMLDocType.prototype.up = function() {
            return this.root() || this.documentObject;
        };
        return XMLDocType;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDocument.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    isPlainObject = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)").isPlainObject;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    XMLStringifier = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLStringifier.js [app-route] (ecmascript)");
    XMLStringWriter = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLStringWriter.js [app-route] (ecmascript)");
    module.exports = XMLDocument = function(superClass) {
        extend(XMLDocument, superClass);
        function XMLDocument(options) {
            XMLDocument.__super__.constructor.call(this, null);
            this.name = "?xml";
            options || (options = {});
            if (!options.writer) {
                options.writer = new XMLStringWriter();
            }
            this.options = options;
            this.stringify = new XMLStringifier(options);
            this.isDocument = true;
        }
        XMLDocument.prototype.end = function(writer) {
            var writerOptions;
            if (!writer) {
                writer = this.options.writer;
            } else if (isPlainObject(writer)) {
                writerOptions = writer;
                writer = this.options.writer.set(writerOptions);
            }
            return writer.document(this);
        };
        XMLDocument.prototype.toString = function(options) {
            return this.options.writer.set(options).document(this);
        };
        return XMLDocument;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDocumentCB.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref, hasProp = {}.hasOwnProperty;
    ref = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)"), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
    XMLElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLElement.js [app-route] (ecmascript)");
    XMLCData = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLCData.js [app-route] (ecmascript)");
    XMLComment = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLComment.js [app-route] (ecmascript)");
    XMLRaw = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLRaw.js [app-route] (ecmascript)");
    XMLText = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLText.js [app-route] (ecmascript)");
    XMLProcessingInstruction = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js [app-route] (ecmascript)");
    XMLDeclaration = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDeclaration.js [app-route] (ecmascript)");
    XMLDocType = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDocType.js [app-route] (ecmascript)");
    XMLDTDAttList = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDAttList.js [app-route] (ecmascript)");
    XMLDTDEntity = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDEntity.js [app-route] (ecmascript)");
    XMLDTDElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDElement.js [app-route] (ecmascript)");
    XMLDTDNotation = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDNotation.js [app-route] (ecmascript)");
    XMLAttribute = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLAttribute.js [app-route] (ecmascript)");
    XMLStringifier = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLStringifier.js [app-route] (ecmascript)");
    XMLStringWriter = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLStringWriter.js [app-route] (ecmascript)");
    module.exports = XMLDocumentCB = function() {
        function XMLDocumentCB(options, onData, onEnd) {
            var writerOptions;
            this.name = "?xml";
            options || (options = {});
            if (!options.writer) {
                options.writer = new XMLStringWriter(options);
            } else if (isPlainObject(options.writer)) {
                writerOptions = options.writer;
                options.writer = new XMLStringWriter(writerOptions);
            }
            this.options = options;
            this.writer = options.writer;
            this.stringify = new XMLStringifier(options);
            this.onDataCallback = onData || function() {};
            this.onEndCallback = onEnd || function() {};
            this.currentNode = null;
            this.currentLevel = -1;
            this.openTags = {};
            this.documentStarted = false;
            this.documentCompleted = false;
            this.root = null;
        }
        XMLDocumentCB.prototype.node = function(name, attributes, text) {
            var ref1, ref2;
            if (name == null) {
                throw new Error("Missing node name.");
            }
            if (this.root && this.currentLevel === -1) {
                throw new Error("Document can only have one root node. " + this.debugInfo(name));
            }
            this.openCurrent();
            name = getValue(name);
            if (attributes === null && text == null) {
                ref1 = [
                    {},
                    null
                ], attributes = ref1[0], text = ref1[1];
            }
            if (attributes == null) {
                attributes = {};
            }
            attributes = getValue(attributes);
            if (!isObject(attributes)) {
                ref2 = [
                    attributes,
                    text
                ], text = ref2[0], attributes = ref2[1];
            }
            this.currentNode = new XMLElement(this, name, attributes);
            this.currentNode.children = false;
            this.currentLevel++;
            this.openTags[this.currentLevel] = this.currentNode;
            if (text != null) {
                this.text(text);
            }
            return this;
        };
        XMLDocumentCB.prototype.element = function(name, attributes, text) {
            if (this.currentNode && this.currentNode instanceof XMLDocType) {
                return this.dtdElement.apply(this, arguments);
            } else {
                return this.node(name, attributes, text);
            }
        };
        XMLDocumentCB.prototype.attribute = function(name, value) {
            var attName, attValue;
            if (!this.currentNode || this.currentNode.children) {
                throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
            }
            if (name != null) {
                name = getValue(name);
            }
            if (isObject(name)) {
                for(attName in name){
                    if (!hasProp.call(name, attName)) continue;
                    attValue = name[attName];
                    this.attribute(attName, attValue);
                }
            } else {
                if (isFunction(value)) {
                    value = value.apply();
                }
                if (!this.options.skipNullAttributes || value != null) {
                    this.currentNode.attributes[name] = new XMLAttribute(this, name, value);
                }
            }
            return this;
        };
        XMLDocumentCB.prototype.text = function(value) {
            var node;
            this.openCurrent();
            node = new XMLText(this, value);
            this.onData(this.writer.text(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.cdata = function(value) {
            var node;
            this.openCurrent();
            node = new XMLCData(this, value);
            this.onData(this.writer.cdata(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.comment = function(value) {
            var node;
            this.openCurrent();
            node = new XMLComment(this, value);
            this.onData(this.writer.comment(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.raw = function(value) {
            var node;
            this.openCurrent();
            node = new XMLRaw(this, value);
            this.onData(this.writer.raw(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.instruction = function(target, value) {
            var i, insTarget, insValue, len, node;
            this.openCurrent();
            if (target != null) {
                target = getValue(target);
            }
            if (value != null) {
                value = getValue(value);
            }
            if (Array.isArray(target)) {
                for(i = 0, len = target.length; i < len; i++){
                    insTarget = target[i];
                    this.instruction(insTarget);
                }
            } else if (isObject(target)) {
                for(insTarget in target){
                    if (!hasProp.call(target, insTarget)) continue;
                    insValue = target[insTarget];
                    this.instruction(insTarget, insValue);
                }
            } else {
                if (isFunction(value)) {
                    value = value.apply();
                }
                node = new XMLProcessingInstruction(this, target, value);
                this.onData(this.writer.processingInstruction(node, this.currentLevel + 1), this.currentLevel + 1);
            }
            return this;
        };
        XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
            var node;
            this.openCurrent();
            if (this.documentStarted) {
                throw new Error("declaration() must be the first node.");
            }
            node = new XMLDeclaration(this, version, encoding, standalone);
            this.onData(this.writer.declaration(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
            this.openCurrent();
            if (root == null) {
                throw new Error("Missing root node name.");
            }
            if (this.root) {
                throw new Error("dtd() must come before the root node.");
            }
            this.currentNode = new XMLDocType(this, pubID, sysID);
            this.currentNode.rootNodeName = root;
            this.currentNode.children = false;
            this.currentLevel++;
            this.openTags[this.currentLevel] = this.currentNode;
            return this;
        };
        XMLDocumentCB.prototype.dtdElement = function(name, value) {
            var node;
            this.openCurrent();
            node = new XMLDTDElement(this, name, value);
            this.onData(this.writer.dtdElement(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
            var node;
            this.openCurrent();
            node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
            this.onData(this.writer.dtdAttList(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.entity = function(name, value) {
            var node;
            this.openCurrent();
            node = new XMLDTDEntity(this, false, name, value);
            this.onData(this.writer.dtdEntity(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.pEntity = function(name, value) {
            var node;
            this.openCurrent();
            node = new XMLDTDEntity(this, true, name, value);
            this.onData(this.writer.dtdEntity(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.notation = function(name, value) {
            var node;
            this.openCurrent();
            node = new XMLDTDNotation(this, name, value);
            this.onData(this.writer.dtdNotation(node, this.currentLevel + 1), this.currentLevel + 1);
            return this;
        };
        XMLDocumentCB.prototype.up = function() {
            if (this.currentLevel < 0) {
                throw new Error("The document node has no parent.");
            }
            if (this.currentNode) {
                if (this.currentNode.children) {
                    this.closeNode(this.currentNode);
                } else {
                    this.openNode(this.currentNode);
                }
                this.currentNode = null;
            } else {
                this.closeNode(this.openTags[this.currentLevel]);
            }
            delete this.openTags[this.currentLevel];
            this.currentLevel--;
            return this;
        };
        XMLDocumentCB.prototype.end = function() {
            while(this.currentLevel >= 0){
                this.up();
            }
            return this.onEnd();
        };
        XMLDocumentCB.prototype.openCurrent = function() {
            if (this.currentNode) {
                this.currentNode.children = true;
                return this.openNode(this.currentNode);
            }
        };
        XMLDocumentCB.prototype.openNode = function(node) {
            if (!node.isOpen) {
                if (!this.root && this.currentLevel === 0 && node instanceof XMLElement) {
                    this.root = node;
                }
                this.onData(this.writer.openNode(node, this.currentLevel), this.currentLevel);
                return node.isOpen = true;
            }
        };
        XMLDocumentCB.prototype.closeNode = function(node) {
            if (!node.isClosed) {
                this.onData(this.writer.closeNode(node, this.currentLevel), this.currentLevel);
                return node.isClosed = true;
            }
        };
        XMLDocumentCB.prototype.onData = function(chunk, level) {
            this.documentStarted = true;
            return this.onDataCallback(chunk, level + 1);
        };
        XMLDocumentCB.prototype.onEnd = function() {
            this.documentCompleted = true;
            return this.onEndCallback();
        };
        XMLDocumentCB.prototype.debugInfo = function(name) {
            if (name == null) {
                return "";
            } else {
                return "node: <" + name + ">";
            }
        };
        XMLDocumentCB.prototype.ele = function() {
            return this.element.apply(this, arguments);
        };
        XMLDocumentCB.prototype.nod = function(name, attributes, text) {
            return this.node(name, attributes, text);
        };
        XMLDocumentCB.prototype.txt = function(value) {
            return this.text(value);
        };
        XMLDocumentCB.prototype.dat = function(value) {
            return this.cdata(value);
        };
        XMLDocumentCB.prototype.com = function(value) {
            return this.comment(value);
        };
        XMLDocumentCB.prototype.ins = function(target, value) {
            return this.instruction(target, value);
        };
        XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
            return this.declaration(version, encoding, standalone);
        };
        XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
            return this.doctype(root, pubID, sysID);
        };
        XMLDocumentCB.prototype.e = function(name, attributes, text) {
            return this.element(name, attributes, text);
        };
        XMLDocumentCB.prototype.n = function(name, attributes, text) {
            return this.node(name, attributes, text);
        };
        XMLDocumentCB.prototype.t = function(value) {
            return this.text(value);
        };
        XMLDocumentCB.prototype.d = function(value) {
            return this.cdata(value);
        };
        XMLDocumentCB.prototype.c = function(value) {
            return this.comment(value);
        };
        XMLDocumentCB.prototype.r = function(value) {
            return this.raw(value);
        };
        XMLDocumentCB.prototype.i = function(target, value) {
            return this.instruction(target, value);
        };
        XMLDocumentCB.prototype.att = function() {
            if (this.currentNode && this.currentNode instanceof XMLDocType) {
                return this.attList.apply(this, arguments);
            } else {
                return this.attribute.apply(this, arguments);
            }
        };
        XMLDocumentCB.prototype.a = function() {
            if (this.currentNode && this.currentNode instanceof XMLDocType) {
                return this.attList.apply(this, arguments);
            } else {
                return this.attribute.apply(this, arguments);
            }
        };
        XMLDocumentCB.prototype.ent = function(name, value) {
            return this.entity(name, value);
        };
        XMLDocumentCB.prototype.pent = function(name, value) {
            return this.pEntity(name, value);
        };
        XMLDocumentCB.prototype.not = function(name, value) {
            return this.notation(name, value);
        };
        return XMLDocumentCB;
    }();
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLDummy.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDummy, XMLNode, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLDummy = function(superClass) {
        extend(XMLDummy, superClass);
        function XMLDummy(parent) {
            XMLDummy.__super__.constructor.call(this, parent);
            this.isDummy = true;
        }
        XMLDummy.prototype.clone = function() {
            return Object.create(this);
        };
        XMLDummy.prototype.toString = function(options) {
            return '';
        };
        return XMLDummy;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLElement.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLAttribute, XMLElement, XMLNode, getValue, isFunction, isObject, ref, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    ref = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)"), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    XMLAttribute = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLAttribute.js [app-route] (ecmascript)");
    module.exports = XMLElement = function(superClass) {
        extend(XMLElement, superClass);
        function XMLElement(parent, name, attributes) {
            XMLElement.__super__.constructor.call(this, parent);
            if (name == null) {
                throw new Error("Missing element name. " + this.debugInfo());
            }
            this.name = this.stringify.eleName(name);
            this.attributes = {};
            if (attributes != null) {
                this.attribute(attributes);
            }
            if (parent.isDocument) {
                this.isRoot = true;
                this.documentObject = parent;
                parent.rootObject = this;
            }
        }
        XMLElement.prototype.clone = function() {
            var att, attName, clonedSelf, ref1;
            clonedSelf = Object.create(this);
            if (clonedSelf.isRoot) {
                clonedSelf.documentObject = null;
            }
            clonedSelf.attributes = {};
            ref1 = this.attributes;
            for(attName in ref1){
                if (!hasProp.call(ref1, attName)) continue;
                att = ref1[attName];
                clonedSelf.attributes[attName] = att.clone();
            }
            clonedSelf.children = [];
            this.children.forEach(function(child) {
                var clonedChild;
                clonedChild = child.clone();
                clonedChild.parent = clonedSelf;
                return clonedSelf.children.push(clonedChild);
            });
            return clonedSelf;
        };
        XMLElement.prototype.attribute = function(name, value) {
            var attName, attValue;
            if (name != null) {
                name = getValue(name);
            }
            if (isObject(name)) {
                for(attName in name){
                    if (!hasProp.call(name, attName)) continue;
                    attValue = name[attName];
                    this.attribute(attName, attValue);
                }
            } else {
                if (isFunction(value)) {
                    value = value.apply();
                }
                if (!this.options.skipNullAttributes || value != null) {
                    this.attributes[name] = new XMLAttribute(this, name, value);
                }
            }
            return this;
        };
        XMLElement.prototype.removeAttribute = function(name) {
            var attName, i, len;
            if (name == null) {
                throw new Error("Missing attribute name. " + this.debugInfo());
            }
            name = getValue(name);
            if (Array.isArray(name)) {
                for(i = 0, len = name.length; i < len; i++){
                    attName = name[i];
                    delete this.attributes[attName];
                }
            } else {
                delete this.attributes[name];
            }
            return this;
        };
        XMLElement.prototype.toString = function(options) {
            return this.options.writer.set(options).element(this);
        };
        XMLElement.prototype.att = function(name, value) {
            return this.attribute(name, value);
        };
        XMLElement.prototype.a = function(name, value) {
            return this.attribute(name, value);
        };
        return XMLElement;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNode, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref, hasProp = {}.hasOwnProperty;
    ref = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)"), isObject = ref.isObject, isFunction = ref.isFunction, isEmpty = ref.isEmpty, getValue = ref.getValue;
    XMLElement = null;
    XMLCData = null;
    XMLComment = null;
    XMLDeclaration = null;
    XMLDocType = null;
    XMLRaw = null;
    XMLText = null;
    XMLProcessingInstruction = null;
    XMLDummy = null;
    module.exports = XMLNode = function() {
        function XMLNode(parent) {
            this.parent = parent;
            if (this.parent) {
                this.options = this.parent.options;
                this.stringify = this.parent.stringify;
            }
            this.children = [];
            if (!XMLElement) {
                XMLElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLElement.js [app-route] (ecmascript)");
                XMLCData = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLCData.js [app-route] (ecmascript)");
                XMLComment = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLComment.js [app-route] (ecmascript)");
                XMLDeclaration = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDeclaration.js [app-route] (ecmascript)");
                XMLDocType = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDocType.js [app-route] (ecmascript)");
                XMLRaw = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLRaw.js [app-route] (ecmascript)");
                XMLText = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLText.js [app-route] (ecmascript)");
                XMLProcessingInstruction = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js [app-route] (ecmascript)");
                XMLDummy = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDummy.js [app-route] (ecmascript)");
            }
        }
        XMLNode.prototype.element = function(name, attributes, text) {
            var childNode, item, j, k, key, lastChild, len, len1, ref1, ref2, val;
            lastChild = null;
            if (attributes === null && text == null) {
                ref1 = [
                    {},
                    null
                ], attributes = ref1[0], text = ref1[1];
            }
            if (attributes == null) {
                attributes = {};
            }
            attributes = getValue(attributes);
            if (!isObject(attributes)) {
                ref2 = [
                    attributes,
                    text
                ], text = ref2[0], attributes = ref2[1];
            }
            if (name != null) {
                name = getValue(name);
            }
            if (Array.isArray(name)) {
                for(j = 0, len = name.length; j < len; j++){
                    item = name[j];
                    lastChild = this.element(item);
                }
            } else if (isFunction(name)) {
                lastChild = this.element(name.apply());
            } else if (isObject(name)) {
                for(key in name){
                    if (!hasProp.call(name, key)) continue;
                    val = name[key];
                    if (isFunction(val)) {
                        val = val.apply();
                    }
                    if (isObject(val) && isEmpty(val)) {
                        val = null;
                    }
                    if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
                        lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
                    } else if (!this.options.separateArrayItems && Array.isArray(val)) {
                        for(k = 0, len1 = val.length; k < len1; k++){
                            item = val[k];
                            childNode = {};
                            childNode[key] = item;
                            lastChild = this.element(childNode);
                        }
                    } else if (isObject(val)) {
                        lastChild = this.element(key);
                        lastChild.element(val);
                    } else {
                        lastChild = this.element(key, val);
                    }
                }
            } else if (this.options.skipNullNodes && text === null) {
                lastChild = this.dummy();
            } else {
                if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
                    lastChild = this.text(text);
                } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
                    lastChild = this.cdata(text);
                } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
                    lastChild = this.comment(text);
                } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
                    lastChild = this.raw(text);
                } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
                    lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
                } else {
                    lastChild = this.node(name, attributes, text);
                }
            }
            if (lastChild == null) {
                throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
            }
            return lastChild;
        };
        XMLNode.prototype.insertBefore = function(name, attributes, text) {
            var child, i, removed;
            if (this.isRoot) {
                throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
            }
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i);
            child = this.parent.element(name, attributes, text);
            Array.prototype.push.apply(this.parent.children, removed);
            return child;
        };
        XMLNode.prototype.insertAfter = function(name, attributes, text) {
            var child, i, removed;
            if (this.isRoot) {
                throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
            }
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i + 1);
            child = this.parent.element(name, attributes, text);
            Array.prototype.push.apply(this.parent.children, removed);
            return child;
        };
        XMLNode.prototype.remove = function() {
            var i, ref1;
            if (this.isRoot) {
                throw new Error("Cannot remove the root element. " + this.debugInfo());
            }
            i = this.parent.children.indexOf(this);
            [].splice.apply(this.parent.children, [
                i,
                i - i + 1
            ].concat(ref1 = [])), ref1;
            return this.parent;
        };
        XMLNode.prototype.node = function(name, attributes, text) {
            var child, ref1;
            if (name != null) {
                name = getValue(name);
            }
            attributes || (attributes = {});
            attributes = getValue(attributes);
            if (!isObject(attributes)) {
                ref1 = [
                    attributes,
                    text
                ], text = ref1[0], attributes = ref1[1];
            }
            child = new XMLElement(this, name, attributes);
            if (text != null) {
                child.text(text);
            }
            this.children.push(child);
            return child;
        };
        XMLNode.prototype.text = function(value) {
            var child;
            child = new XMLText(this, value);
            this.children.push(child);
            return this;
        };
        XMLNode.prototype.cdata = function(value) {
            var child;
            child = new XMLCData(this, value);
            this.children.push(child);
            return this;
        };
        XMLNode.prototype.comment = function(value) {
            var child;
            child = new XMLComment(this, value);
            this.children.push(child);
            return this;
        };
        XMLNode.prototype.commentBefore = function(value) {
            var child, i, removed;
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i);
            child = this.parent.comment(value);
            Array.prototype.push.apply(this.parent.children, removed);
            return this;
        };
        XMLNode.prototype.commentAfter = function(value) {
            var child, i, removed;
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i + 1);
            child = this.parent.comment(value);
            Array.prototype.push.apply(this.parent.children, removed);
            return this;
        };
        XMLNode.prototype.raw = function(value) {
            var child;
            child = new XMLRaw(this, value);
            this.children.push(child);
            return this;
        };
        XMLNode.prototype.dummy = function() {
            var child;
            child = new XMLDummy(this);
            this.children.push(child);
            return child;
        };
        XMLNode.prototype.instruction = function(target, value) {
            var insTarget, insValue, instruction, j, len;
            if (target != null) {
                target = getValue(target);
            }
            if (value != null) {
                value = getValue(value);
            }
            if (Array.isArray(target)) {
                for(j = 0, len = target.length; j < len; j++){
                    insTarget = target[j];
                    this.instruction(insTarget);
                }
            } else if (isObject(target)) {
                for(insTarget in target){
                    if (!hasProp.call(target, insTarget)) continue;
                    insValue = target[insTarget];
                    this.instruction(insTarget, insValue);
                }
            } else {
                if (isFunction(value)) {
                    value = value.apply();
                }
                instruction = new XMLProcessingInstruction(this, target, value);
                this.children.push(instruction);
            }
            return this;
        };
        XMLNode.prototype.instructionBefore = function(target, value) {
            var child, i, removed;
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i);
            child = this.parent.instruction(target, value);
            Array.prototype.push.apply(this.parent.children, removed);
            return this;
        };
        XMLNode.prototype.instructionAfter = function(target, value) {
            var child, i, removed;
            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i + 1);
            child = this.parent.instruction(target, value);
            Array.prototype.push.apply(this.parent.children, removed);
            return this;
        };
        XMLNode.prototype.declaration = function(version, encoding, standalone) {
            var doc, xmldec;
            doc = this.document();
            xmldec = new XMLDeclaration(doc, version, encoding, standalone);
            if (doc.children[0] instanceof XMLDeclaration) {
                doc.children[0] = xmldec;
            } else {
                doc.children.unshift(xmldec);
            }
            return doc.root() || doc;
        };
        XMLNode.prototype.doctype = function(pubID, sysID) {
            var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
            doc = this.document();
            doctype = new XMLDocType(doc, pubID, sysID);
            ref1 = doc.children;
            for(i = j = 0, len = ref1.length; j < len; i = ++j){
                child = ref1[i];
                if (child instanceof XMLDocType) {
                    doc.children[i] = doctype;
                    return doctype;
                }
            }
            ref2 = doc.children;
            for(i = k = 0, len1 = ref2.length; k < len1; i = ++k){
                child = ref2[i];
                if (child.isRoot) {
                    doc.children.splice(i, 0, doctype);
                    return doctype;
                }
            }
            doc.children.push(doctype);
            return doctype;
        };
        XMLNode.prototype.up = function() {
            if (this.isRoot) {
                throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
            }
            return this.parent;
        };
        XMLNode.prototype.root = function() {
            var node;
            node = this;
            while(node){
                if (node.isDocument) {
                    return node.rootObject;
                } else if (node.isRoot) {
                    return node;
                } else {
                    node = node.parent;
                }
            }
        };
        XMLNode.prototype.document = function() {
            var node;
            node = this;
            while(node){
                if (node.isDocument) {
                    return node;
                } else {
                    node = node.parent;
                }
            }
        };
        XMLNode.prototype.end = function(options) {
            return this.document().end(options);
        };
        XMLNode.prototype.prev = function() {
            var i;
            i = this.parent.children.indexOf(this);
            while(i > 0 && this.parent.children[i - 1].isDummy){
                i = i - 1;
            }
            if (i < 1) {
                throw new Error("Already at the first node. " + this.debugInfo());
            }
            return this.parent.children[i - 1];
        };
        XMLNode.prototype.next = function() {
            var i;
            i = this.parent.children.indexOf(this);
            while(i < this.parent.children.length - 1 && this.parent.children[i + 1].isDummy){
                i = i + 1;
            }
            if (i === -1 || i === this.parent.children.length - 1) {
                throw new Error("Already at the last node. " + this.debugInfo());
            }
            return this.parent.children[i + 1];
        };
        XMLNode.prototype.importDocument = function(doc) {
            var clonedRoot;
            clonedRoot = doc.root().clone();
            clonedRoot.parent = this;
            clonedRoot.isRoot = false;
            this.children.push(clonedRoot);
            return this;
        };
        XMLNode.prototype.debugInfo = function(name) {
            var ref1, ref2;
            name = name || this.name;
            if (name == null && !((ref1 = this.parent) != null ? ref1.name : void 0)) {
                return "";
            } else if (name == null) {
                return "parent: <" + this.parent.name + ">";
            } else if (!((ref2 = this.parent) != null ? ref2.name : void 0)) {
                return "node: <" + name + ">";
            } else {
                return "node: <" + name + ">, parent: <" + this.parent.name + ">";
            }
        };
        XMLNode.prototype.ele = function(name, attributes, text) {
            return this.element(name, attributes, text);
        };
        XMLNode.prototype.nod = function(name, attributes, text) {
            return this.node(name, attributes, text);
        };
        XMLNode.prototype.txt = function(value) {
            return this.text(value);
        };
        XMLNode.prototype.dat = function(value) {
            return this.cdata(value);
        };
        XMLNode.prototype.com = function(value) {
            return this.comment(value);
        };
        XMLNode.prototype.ins = function(target, value) {
            return this.instruction(target, value);
        };
        XMLNode.prototype.doc = function() {
            return this.document();
        };
        XMLNode.prototype.dec = function(version, encoding, standalone) {
            return this.declaration(version, encoding, standalone);
        };
        XMLNode.prototype.dtd = function(pubID, sysID) {
            return this.doctype(pubID, sysID);
        };
        XMLNode.prototype.e = function(name, attributes, text) {
            return this.element(name, attributes, text);
        };
        XMLNode.prototype.n = function(name, attributes, text) {
            return this.node(name, attributes, text);
        };
        XMLNode.prototype.t = function(value) {
            return this.text(value);
        };
        XMLNode.prototype.d = function(value) {
            return this.cdata(value);
        };
        XMLNode.prototype.c = function(value) {
            return this.comment(value);
        };
        XMLNode.prototype.r = function(value) {
            return this.raw(value);
        };
        XMLNode.prototype.i = function(target, value) {
            return this.instruction(target, value);
        };
        XMLNode.prototype.u = function() {
            return this.up();
        };
        XMLNode.prototype.importXMLBuilder = function(doc) {
            return this.importDocument(doc);
        };
        return XMLNode;
    }();
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLNode, XMLProcessingInstruction, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLProcessingInstruction = function(superClass) {
        extend(XMLProcessingInstruction, superClass);
        function XMLProcessingInstruction(parent, target, value) {
            XMLProcessingInstruction.__super__.constructor.call(this, parent);
            if (target == null) {
                throw new Error("Missing instruction target. " + this.debugInfo());
            }
            this.target = this.stringify.insTarget(target);
            if (value) {
                this.value = this.stringify.insValue(value);
            }
        }
        XMLProcessingInstruction.prototype.clone = function() {
            return Object.create(this);
        };
        XMLProcessingInstruction.prototype.toString = function(options) {
            return this.options.writer.set(options).processingInstruction(this);
        };
        return XMLProcessingInstruction;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLRaw.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLNode, XMLRaw, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLRaw = function(superClass) {
        extend(XMLRaw, superClass);
        function XMLRaw(parent, text) {
            XMLRaw.__super__.constructor.call(this, parent);
            if (text == null) {
                throw new Error("Missing raw text. " + this.debugInfo());
            }
            this.value = this.stringify.raw(text);
        }
        XMLRaw.prototype.clone = function() {
            return Object.create(this);
        };
        XMLRaw.prototype.toString = function(options) {
            return this.options.writer.set(options).raw(this);
        };
        return XMLRaw;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLStreamWriter.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStreamWriter, XMLText, XMLWriterBase, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLDeclaration = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDeclaration.js [app-route] (ecmascript)");
    XMLDocType = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDocType.js [app-route] (ecmascript)");
    XMLCData = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLCData.js [app-route] (ecmascript)");
    XMLComment = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLComment.js [app-route] (ecmascript)");
    XMLElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLElement.js [app-route] (ecmascript)");
    XMLRaw = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLRaw.js [app-route] (ecmascript)");
    XMLText = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLText.js [app-route] (ecmascript)");
    XMLProcessingInstruction = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js [app-route] (ecmascript)");
    XMLDummy = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDummy.js [app-route] (ecmascript)");
    XMLDTDAttList = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDAttList.js [app-route] (ecmascript)");
    XMLDTDElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDElement.js [app-route] (ecmascript)");
    XMLDTDEntity = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDEntity.js [app-route] (ecmascript)");
    XMLDTDNotation = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDNotation.js [app-route] (ecmascript)");
    XMLWriterBase = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLWriterBase.js [app-route] (ecmascript)");
    module.exports = XMLStreamWriter = function(superClass) {
        extend(XMLStreamWriter, superClass);
        function XMLStreamWriter(stream, options) {
            XMLStreamWriter.__super__.constructor.call(this, options);
            this.stream = stream;
        }
        XMLStreamWriter.prototype.document = function(doc) {
            var child, i, j, len, len1, ref, ref1, results;
            ref = doc.children;
            for(i = 0, len = ref.length; i < len; i++){
                child = ref[i];
                child.isLastRootNode = false;
            }
            doc.children[doc.children.length - 1].isLastRootNode = true;
            ref1 = doc.children;
            results = [];
            for(j = 0, len1 = ref1.length; j < len1; j++){
                child = ref1[j];
                if (child instanceof XMLDummy) {
                    continue;
                }
                switch(false){
                    case !(child instanceof XMLDeclaration):
                        results.push(this.declaration(child));
                        break;
                    case !(child instanceof XMLDocType):
                        results.push(this.docType(child));
                        break;
                    case !(child instanceof XMLComment):
                        results.push(this.comment(child));
                        break;
                    case !(child instanceof XMLProcessingInstruction):
                        results.push(this.processingInstruction(child));
                        break;
                    default:
                        results.push(this.element(child));
                }
            }
            return results;
        };
        XMLStreamWriter.prototype.attribute = function(att) {
            return this.stream.write(' ' + att.name + '="' + att.value + '"');
        };
        XMLStreamWriter.prototype.cdata = function(node, level) {
            return this.stream.write(this.space(level) + '<![CDATA[' + node.text + ']]>' + this.endline(node));
        };
        XMLStreamWriter.prototype.comment = function(node, level) {
            return this.stream.write(this.space(level) + '<!-- ' + node.text + ' -->' + this.endline(node));
        };
        XMLStreamWriter.prototype.declaration = function(node, level) {
            this.stream.write(this.space(level));
            this.stream.write('<?xml version="' + node.version + '"');
            if (node.encoding != null) {
                this.stream.write(' encoding="' + node.encoding + '"');
            }
            if (node.standalone != null) {
                this.stream.write(' standalone="' + node.standalone + '"');
            }
            this.stream.write(this.spacebeforeslash + '?>');
            return this.stream.write(this.endline(node));
        };
        XMLStreamWriter.prototype.docType = function(node, level) {
            var child, i, len, ref;
            level || (level = 0);
            this.stream.write(this.space(level));
            this.stream.write('<!DOCTYPE ' + node.root().name);
            if (node.pubID && node.sysID) {
                this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
            } else if (node.sysID) {
                this.stream.write(' SYSTEM "' + node.sysID + '"');
            }
            if (node.children.length > 0) {
                this.stream.write(' [');
                this.stream.write(this.endline(node));
                ref = node.children;
                for(i = 0, len = ref.length; i < len; i++){
                    child = ref[i];
                    switch(false){
                        case !(child instanceof XMLDTDAttList):
                            this.dtdAttList(child, level + 1);
                            break;
                        case !(child instanceof XMLDTDElement):
                            this.dtdElement(child, level + 1);
                            break;
                        case !(child instanceof XMLDTDEntity):
                            this.dtdEntity(child, level + 1);
                            break;
                        case !(child instanceof XMLDTDNotation):
                            this.dtdNotation(child, level + 1);
                            break;
                        case !(child instanceof XMLCData):
                            this.cdata(child, level + 1);
                            break;
                        case !(child instanceof XMLComment):
                            this.comment(child, level + 1);
                            break;
                        case !(child instanceof XMLProcessingInstruction):
                            this.processingInstruction(child, level + 1);
                            break;
                        default:
                            throw new Error("Unknown DTD node type: " + child.constructor.name);
                    }
                }
                this.stream.write(']');
            }
            this.stream.write(this.spacebeforeslash + '>');
            return this.stream.write(this.endline(node));
        };
        XMLStreamWriter.prototype.element = function(node, level) {
            var att, child, i, len, name, ref, ref1, space;
            level || (level = 0);
            space = this.space(level);
            this.stream.write(space + '<' + node.name);
            ref = node.attributes;
            for(name in ref){
                if (!hasProp.call(ref, name)) continue;
                att = ref[name];
                this.attribute(att);
            }
            if (node.children.length === 0 || node.children.every(function(e) {
                return e.value === '';
            })) {
                if (this.allowEmpty) {
                    this.stream.write('></' + node.name + '>');
                } else {
                    this.stream.write(this.spacebeforeslash + '/>');
                }
            } else if (this.pretty && node.children.length === 1 && node.children[0].value != null) {
                this.stream.write('>');
                this.stream.write(node.children[0].value);
                this.stream.write('</' + node.name + '>');
            } else {
                this.stream.write('>' + this.newline);
                ref1 = node.children;
                for(i = 0, len = ref1.length; i < len; i++){
                    child = ref1[i];
                    switch(false){
                        case !(child instanceof XMLCData):
                            this.cdata(child, level + 1);
                            break;
                        case !(child instanceof XMLComment):
                            this.comment(child, level + 1);
                            break;
                        case !(child instanceof XMLElement):
                            this.element(child, level + 1);
                            break;
                        case !(child instanceof XMLRaw):
                            this.raw(child, level + 1);
                            break;
                        case !(child instanceof XMLText):
                            this.text(child, level + 1);
                            break;
                        case !(child instanceof XMLProcessingInstruction):
                            this.processingInstruction(child, level + 1);
                            break;
                        case !(child instanceof XMLDummy):
                            '';
                            break;
                        default:
                            throw new Error("Unknown XML node type: " + child.constructor.name);
                    }
                }
                this.stream.write(space + '</' + node.name + '>');
            }
            return this.stream.write(this.endline(node));
        };
        XMLStreamWriter.prototype.processingInstruction = function(node, level) {
            this.stream.write(this.space(level) + '<?' + node.target);
            if (node.value) {
                this.stream.write(' ' + node.value);
            }
            return this.stream.write(this.spacebeforeslash + '?>' + this.endline(node));
        };
        XMLStreamWriter.prototype.raw = function(node, level) {
            return this.stream.write(this.space(level) + node.value + this.endline(node));
        };
        XMLStreamWriter.prototype.text = function(node, level) {
            return this.stream.write(this.space(level) + node.value + this.endline(node));
        };
        XMLStreamWriter.prototype.dtdAttList = function(node, level) {
            this.stream.write(this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType);
            if (node.defaultValueType !== '#DEFAULT') {
                this.stream.write(' ' + node.defaultValueType);
            }
            if (node.defaultValue) {
                this.stream.write(' "' + node.defaultValue + '"');
            }
            return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
        };
        XMLStreamWriter.prototype.dtdElement = function(node, level) {
            this.stream.write(this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value);
            return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
        };
        XMLStreamWriter.prototype.dtdEntity = function(node, level) {
            this.stream.write(this.space(level) + '<!ENTITY');
            if (node.pe) {
                this.stream.write(' %');
            }
            this.stream.write(' ' + node.name);
            if (node.value) {
                this.stream.write(' "' + node.value + '"');
            } else {
                if (node.pubID && node.sysID) {
                    this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
                } else if (node.sysID) {
                    this.stream.write(' SYSTEM "' + node.sysID + '"');
                }
                if (node.nData) {
                    this.stream.write(' NDATA ' + node.nData);
                }
            }
            return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
        };
        XMLStreamWriter.prototype.dtdNotation = function(node, level) {
            this.stream.write(this.space(level) + '<!NOTATION ' + node.name);
            if (node.pubID && node.sysID) {
                this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
            } else if (node.pubID) {
                this.stream.write(' PUBLIC "' + node.pubID + '"');
            } else if (node.sysID) {
                this.stream.write(' SYSTEM "' + node.sysID + '"');
            }
            return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
        };
        XMLStreamWriter.prototype.endline = function(node) {
            if (!node.isLastRootNode) {
                return this.newline;
            } else {
                return '';
            }
        };
        return XMLStreamWriter;
    }(XMLWriterBase);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLStringWriter.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLText, XMLWriterBase, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLDeclaration = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDeclaration.js [app-route] (ecmascript)");
    XMLDocType = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDocType.js [app-route] (ecmascript)");
    XMLCData = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLCData.js [app-route] (ecmascript)");
    XMLComment = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLComment.js [app-route] (ecmascript)");
    XMLElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLElement.js [app-route] (ecmascript)");
    XMLRaw = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLRaw.js [app-route] (ecmascript)");
    XMLText = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLText.js [app-route] (ecmascript)");
    XMLProcessingInstruction = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js [app-route] (ecmascript)");
    XMLDummy = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDummy.js [app-route] (ecmascript)");
    XMLDTDAttList = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDAttList.js [app-route] (ecmascript)");
    XMLDTDElement = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDElement.js [app-route] (ecmascript)");
    XMLDTDEntity = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDEntity.js [app-route] (ecmascript)");
    XMLDTDNotation = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDTDNotation.js [app-route] (ecmascript)");
    XMLWriterBase = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLWriterBase.js [app-route] (ecmascript)");
    module.exports = XMLStringWriter = function(superClass) {
        extend(XMLStringWriter, superClass);
        function XMLStringWriter(options) {
            XMLStringWriter.__super__.constructor.call(this, options);
        }
        XMLStringWriter.prototype.document = function(doc) {
            var child, i, len, r, ref;
            this.textispresent = false;
            r = '';
            ref = doc.children;
            for(i = 0, len = ref.length; i < len; i++){
                child = ref[i];
                if (child instanceof XMLDummy) {
                    continue;
                }
                r += (function() {
                    switch(false){
                        case !(child instanceof XMLDeclaration):
                            return this.declaration(child);
                        case !(child instanceof XMLDocType):
                            return this.docType(child);
                        case !(child instanceof XMLComment):
                            return this.comment(child);
                        case !(child instanceof XMLProcessingInstruction):
                            return this.processingInstruction(child);
                        default:
                            return this.element(child, 0);
                    }
                }).call(this);
            }
            if (this.pretty && r.slice(-this.newline.length) === this.newline) {
                r = r.slice(0, -this.newline.length);
            }
            return r;
        };
        XMLStringWriter.prototype.attribute = function(att) {
            return ' ' + att.name + '="' + att.value + '"';
        };
        XMLStringWriter.prototype.cdata = function(node, level) {
            return this.space(level) + '<![CDATA[' + node.text + ']]>' + this.newline;
        };
        XMLStringWriter.prototype.comment = function(node, level) {
            return this.space(level) + '<!-- ' + node.text + ' -->' + this.newline;
        };
        XMLStringWriter.prototype.declaration = function(node, level) {
            var r;
            r = this.space(level);
            r += '<?xml version="' + node.version + '"';
            if (node.encoding != null) {
                r += ' encoding="' + node.encoding + '"';
            }
            if (node.standalone != null) {
                r += ' standalone="' + node.standalone + '"';
            }
            r += this.spacebeforeslash + '?>';
            r += this.newline;
            return r;
        };
        XMLStringWriter.prototype.docType = function(node, level) {
            var child, i, len, r, ref;
            level || (level = 0);
            r = this.space(level);
            r += '<!DOCTYPE ' + node.root().name;
            if (node.pubID && node.sysID) {
                r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
                r += ' SYSTEM "' + node.sysID + '"';
            }
            if (node.children.length > 0) {
                r += ' [';
                r += this.newline;
                ref = node.children;
                for(i = 0, len = ref.length; i < len; i++){
                    child = ref[i];
                    r += (function() {
                        switch(false){
                            case !(child instanceof XMLDTDAttList):
                                return this.dtdAttList(child, level + 1);
                            case !(child instanceof XMLDTDElement):
                                return this.dtdElement(child, level + 1);
                            case !(child instanceof XMLDTDEntity):
                                return this.dtdEntity(child, level + 1);
                            case !(child instanceof XMLDTDNotation):
                                return this.dtdNotation(child, level + 1);
                            case !(child instanceof XMLCData):
                                return this.cdata(child, level + 1);
                            case !(child instanceof XMLComment):
                                return this.comment(child, level + 1);
                            case !(child instanceof XMLProcessingInstruction):
                                return this.processingInstruction(child, level + 1);
                            default:
                                throw new Error("Unknown DTD node type: " + child.constructor.name);
                        }
                    }).call(this);
                }
                r += ']';
            }
            r += this.spacebeforeslash + '>';
            r += this.newline;
            return r;
        };
        XMLStringWriter.prototype.element = function(node, level) {
            var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
            level || (level = 0);
            textispresentwasset = false;
            if (this.textispresent) {
                this.newline = '';
                this.pretty = false;
            } else {
                this.newline = this.newlinedefault;
                this.pretty = this.prettydefault;
            }
            space = this.space(level);
            r = '';
            r += space + '<' + node.name;
            ref = node.attributes;
            for(name in ref){
                if (!hasProp.call(ref, name)) continue;
                att = ref[name];
                r += this.attribute(att);
            }
            if (node.children.length === 0 || node.children.every(function(e) {
                return e.value === '';
            })) {
                if (this.allowEmpty) {
                    r += '></' + node.name + '>' + this.newline;
                } else {
                    r += this.spacebeforeslash + '/>' + this.newline;
                }
            } else if (this.pretty && node.children.length === 1 && node.children[0].value != null) {
                r += '>';
                r += node.children[0].value;
                r += '</' + node.name + '>' + this.newline;
            } else {
                if (this.dontprettytextnodes) {
                    ref1 = node.children;
                    for(i = 0, len = ref1.length; i < len; i++){
                        child = ref1[i];
                        if (child.value != null) {
                            this.textispresent++;
                            textispresentwasset = true;
                            break;
                        }
                    }
                }
                if (this.textispresent) {
                    this.newline = '';
                    this.pretty = false;
                    space = this.space(level);
                }
                r += '>' + this.newline;
                ref2 = node.children;
                for(j = 0, len1 = ref2.length; j < len1; j++){
                    child = ref2[j];
                    r += (function() {
                        switch(false){
                            case !(child instanceof XMLCData):
                                return this.cdata(child, level + 1);
                            case !(child instanceof XMLComment):
                                return this.comment(child, level + 1);
                            case !(child instanceof XMLElement):
                                return this.element(child, level + 1);
                            case !(child instanceof XMLRaw):
                                return this.raw(child, level + 1);
                            case !(child instanceof XMLText):
                                return this.text(child, level + 1);
                            case !(child instanceof XMLProcessingInstruction):
                                return this.processingInstruction(child, level + 1);
                            case !(child instanceof XMLDummy):
                                return '';
                            default:
                                throw new Error("Unknown XML node type: " + child.constructor.name);
                        }
                    }).call(this);
                }
                if (textispresentwasset) {
                    this.textispresent--;
                }
                if (!this.textispresent) {
                    this.newline = this.newlinedefault;
                    this.pretty = this.prettydefault;
                }
                r += space + '</' + node.name + '>' + this.newline;
            }
            return r;
        };
        XMLStringWriter.prototype.processingInstruction = function(node, level) {
            var r;
            r = this.space(level) + '<?' + node.target;
            if (node.value) {
                r += ' ' + node.value;
            }
            r += this.spacebeforeslash + '?>' + this.newline;
            return r;
        };
        XMLStringWriter.prototype.raw = function(node, level) {
            return this.space(level) + node.value + this.newline;
        };
        XMLStringWriter.prototype.text = function(node, level) {
            return this.space(level) + node.value + this.newline;
        };
        XMLStringWriter.prototype.dtdAttList = function(node, level) {
            var r;
            r = this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
            if (node.defaultValueType !== '#DEFAULT') {
                r += ' ' + node.defaultValueType;
            }
            if (node.defaultValue) {
                r += ' "' + node.defaultValue + '"';
            }
            r += this.spacebeforeslash + '>' + this.newline;
            return r;
        };
        XMLStringWriter.prototype.dtdElement = function(node, level) {
            return this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value + this.spacebeforeslash + '>' + this.newline;
        };
        XMLStringWriter.prototype.dtdEntity = function(node, level) {
            var r;
            r = this.space(level) + '<!ENTITY';
            if (node.pe) {
                r += ' %';
            }
            r += ' ' + node.name;
            if (node.value) {
                r += ' "' + node.value + '"';
            } else {
                if (node.pubID && node.sysID) {
                    r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
                } else if (node.sysID) {
                    r += ' SYSTEM "' + node.sysID + '"';
                }
                if (node.nData) {
                    r += ' NDATA ' + node.nData;
                }
            }
            r += this.spacebeforeslash + '>' + this.newline;
            return r;
        };
        XMLStringWriter.prototype.dtdNotation = function(node, level) {
            var r;
            r = this.space(level) + '<!NOTATION ' + node.name;
            if (node.pubID && node.sysID) {
                r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.pubID) {
                r += ' PUBLIC "' + node.pubID + '"';
            } else if (node.sysID) {
                r += ' SYSTEM "' + node.sysID + '"';
            }
            r += this.spacebeforeslash + '>' + this.newline;
            return r;
        };
        XMLStringWriter.prototype.openNode = function(node, level) {
            var att, name, r, ref;
            level || (level = 0);
            if (node instanceof XMLElement) {
                r = this.space(level) + '<' + node.name;
                ref = node.attributes;
                for(name in ref){
                    if (!hasProp.call(ref, name)) continue;
                    att = ref[name];
                    r += this.attribute(att);
                }
                r += (node.children ? '>' : '/>') + this.newline;
                return r;
            } else {
                r = this.space(level) + '<!DOCTYPE ' + node.rootNodeName;
                if (node.pubID && node.sysID) {
                    r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
                } else if (node.sysID) {
                    r += ' SYSTEM "' + node.sysID + '"';
                }
                r += (node.children ? ' [' : '>') + this.newline;
                return r;
            }
        };
        XMLStringWriter.prototype.closeNode = function(node, level) {
            level || (level = 0);
            switch(false){
                case !(node instanceof XMLElement):
                    return this.space(level) + '</' + node.name + '>' + this.newline;
                case !(node instanceof XMLDocType):
                    return this.space(level) + ']>' + this.newline;
            }
        };
        return XMLStringWriter;
    }(XMLWriterBase);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLStringifier.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLStringifier, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    }, hasProp = {}.hasOwnProperty;
    module.exports = XMLStringifier = function() {
        function XMLStringifier(options) {
            this.assertLegalChar = bind(this.assertLegalChar, this);
            var key, ref, value;
            options || (options = {});
            this.noDoubleEncoding = options.noDoubleEncoding;
            ref = options.stringify || {};
            for(key in ref){
                if (!hasProp.call(ref, key)) continue;
                value = ref[key];
                this[key] = value;
            }
        }
        XMLStringifier.prototype.eleName = function(val) {
            val = '' + val || '';
            return this.assertLegalChar(val);
        };
        XMLStringifier.prototype.eleText = function(val) {
            val = '' + val || '';
            return this.assertLegalChar(this.elEscape(val));
        };
        XMLStringifier.prototype.cdata = function(val) {
            val = '' + val || '';
            val = val.replace(']]>', ']]]]><![CDATA[>');
            return this.assertLegalChar(val);
        };
        XMLStringifier.prototype.comment = function(val) {
            val = '' + val || '';
            if (val.match(/--/)) {
                throw new Error("Comment text cannot contain double-hypen: " + val);
            }
            return this.assertLegalChar(val);
        };
        XMLStringifier.prototype.raw = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.attName = function(val) {
            return val = '' + val || '';
        };
        XMLStringifier.prototype.attValue = function(val) {
            val = '' + val || '';
            return this.attEscape(val);
        };
        XMLStringifier.prototype.insTarget = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.insValue = function(val) {
            val = '' + val || '';
            if (val.match(/\?>/)) {
                throw new Error("Invalid processing instruction value: " + val);
            }
            return val;
        };
        XMLStringifier.prototype.xmlVersion = function(val) {
            val = '' + val || '';
            if (!val.match(/1\.[0-9]+/)) {
                throw new Error("Invalid version number: " + val);
            }
            return val;
        };
        XMLStringifier.prototype.xmlEncoding = function(val) {
            val = '' + val || '';
            if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
                throw new Error("Invalid encoding: " + val);
            }
            return val;
        };
        XMLStringifier.prototype.xmlStandalone = function(val) {
            if (val) {
                return "yes";
            } else {
                return "no";
            }
        };
        XMLStringifier.prototype.dtdPubID = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.dtdSysID = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.dtdElementValue = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.dtdAttType = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.dtdAttDefault = function(val) {
            if (val != null) {
                return '' + val || '';
            } else {
                return val;
            }
        };
        XMLStringifier.prototype.dtdEntityValue = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.dtdNData = function(val) {
            return '' + val || '';
        };
        XMLStringifier.prototype.convertAttKey = '@';
        XMLStringifier.prototype.convertPIKey = '?';
        XMLStringifier.prototype.convertTextKey = '#text';
        XMLStringifier.prototype.convertCDataKey = '#cdata';
        XMLStringifier.prototype.convertCommentKey = '#comment';
        XMLStringifier.prototype.convertRawKey = '#raw';
        XMLStringifier.prototype.assertLegalChar = function(str) {
            var res;
            res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
            if (res) {
                throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
            return str;
        };
        XMLStringifier.prototype.elEscape = function(str) {
            var ampregex;
            ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
            return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
        };
        XMLStringifier.prototype.attEscape = function(str) {
            var ampregex;
            ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
            return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
        };
        return XMLStringifier;
    }();
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLText.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLNode, XMLText, extend = function(child, parent) {
        for(var key in parent){
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    XMLNode = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLNode.js [app-route] (ecmascript)");
    module.exports = XMLText = function(superClass) {
        extend(XMLText, superClass);
        function XMLText(parent, text) {
            XMLText.__super__.constructor.call(this, parent);
            if (text == null) {
                throw new Error("Missing element text. " + this.debugInfo());
            }
            this.value = this.stringify.eleText(text);
        }
        XMLText.prototype.clone = function() {
            return Object.create(this);
        };
        XMLText.prototype.toString = function(options) {
            return this.options.writer.set(options).text(this);
        };
        return XMLText;
    }(XMLNode);
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/XMLWriterBase.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLWriterBase, hasProp = {}.hasOwnProperty;
    module.exports = XMLWriterBase = function() {
        function XMLWriterBase(options) {
            var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
            options || (options = {});
            this.pretty = options.pretty || false;
            this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
            if (this.pretty) {
                this.indent = (ref1 = options.indent) != null ? ref1 : '  ';
                this.newline = (ref2 = options.newline) != null ? ref2 : '\n';
                this.offset = (ref3 = options.offset) != null ? ref3 : 0;
                this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
            } else {
                this.indent = '';
                this.newline = '';
                this.offset = 0;
                this.dontprettytextnodes = 0;
            }
            this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : '';
            if (this.spacebeforeslash === true) {
                this.spacebeforeslash = ' ';
            }
            this.newlinedefault = this.newline;
            this.prettydefault = this.pretty;
            ref6 = options.writer || {};
            for(key in ref6){
                if (!hasProp.call(ref6, key)) continue;
                value = ref6[key];
                this[key] = value;
            }
        }
        XMLWriterBase.prototype.set = function(options) {
            var key, ref, value;
            options || (options = {});
            if ("pretty" in options) {
                this.pretty = options.pretty;
            }
            if ("allowEmpty" in options) {
                this.allowEmpty = options.allowEmpty;
            }
            if (this.pretty) {
                this.indent = "indent" in options ? options.indent : '  ';
                this.newline = "newline" in options ? options.newline : '\n';
                this.offset = "offset" in options ? options.offset : 0;
                this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
            } else {
                this.indent = '';
                this.newline = '';
                this.offset = 0;
                this.dontprettytextnodes = 0;
            }
            this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : '';
            if (this.spacebeforeslash === true) {
                this.spacebeforeslash = ' ';
            }
            this.newlinedefault = this.newline;
            this.prettydefault = this.pretty;
            ref = options.writer || {};
            for(key in ref){
                if (!hasProp.call(ref, key)) continue;
                value = ref[key];
                this[key] = value;
            }
            return this;
        };
        XMLWriterBase.prototype.space = function(level) {
            var indent;
            if (this.pretty) {
                indent = (level || 0) + this.offset + 1;
                if (indent > 0) {
                    return new Array(indent).join(this.indent);
                } else {
                    return '';
                }
            } else {
                return '';
            }
        };
        return XMLWriterBase;
    }();
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/node_modules/xmlbuilder/lib/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated by CoffeeScript 1.12.7
(function() {
    var XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;
    ref = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/Utility.js [app-route] (ecmascript)"), assign = ref.assign, isFunction = ref.isFunction;
    XMLDocument = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDocument.js [app-route] (ecmascript)");
    XMLDocumentCB = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLDocumentCB.js [app-route] (ecmascript)");
    XMLStringWriter = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLStringWriter.js [app-route] (ecmascript)");
    XMLStreamWriter = __turbopack_context__.r("[project]/node_modules/xmlbuilder/lib/XMLStreamWriter.js [app-route] (ecmascript)");
    module.exports.create = function(name, xmldec, doctype, options) {
        var doc, root;
        if (name == null) {
            throw new Error("Root element needs a name.");
        }
        options = assign({}, xmldec, doctype, options);
        doc = new XMLDocument(options);
        root = doc.element(name);
        if (!options.headless) {
            doc.declaration(options);
            if (options.pubID != null || options.sysID != null) {
                doc.doctype(options);
            }
        }
        return root;
    };
    module.exports.begin = function(options, onData, onEnd) {
        var ref1;
        if (isFunction(options)) {
            ref1 = [
                options,
                onData
            ], onData = ref1[0], onEnd = ref1[1];
            options = {};
        }
        if (onData) {
            return new XMLDocumentCB(options, onData, onEnd);
        } else {
            return new XMLDocument(options);
        }
    };
    module.exports.stringWriter = function(options) {
        return new XMLStringWriter(options);
    };
    module.exports.streamWriter = function(stream, options) {
        return new XMLStreamWriter(stream, options);
    };
}).call(/*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0pdwc7zkb15hm._.js.map