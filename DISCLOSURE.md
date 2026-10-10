# AI and Tools Disclosure

This file lists the AI models, tools and libraries AIROOM uses, as required by the hackathon rules.

## AI models (run locally through Ollama)

| Model | Role in AIROOM | Publisher | License |
| --- | --- | --- | --- |
| `gemma3:4b` | Main chat model and image understanding | Google | Gemma Terms of Use |
| `gemma3:1b` | Low-power mode for slower or battery-limited laptops | Google | Gemma Terms of Use |
| `nomic-embed-text` | Text embeddings for searching uploaded documents | Nomic AI | Apache 2.0 |

All inference runs on the host laptop. No prompts, files or chat data are sent to any online AI service.

## Runtime and frameworks

| Tool | Use |
| --- | --- |
| Ollama | Local model server at `localhost:11434` |
| Node.js | Server runtime |
| Next.js (App Router), React, TypeScript | Web app and API routes |
| Tailwind CSS | Styling, compiled at build time |
| Zustand | Client-side shared state |

## Libraries

| Package | Use |
| --- | --- |
| `ollama` | JavaScript client for the Ollama API |
| `unpdf` | Extracting text from PDF uploads |
| `mammoth` | Extracting text from Word (.docx) uploads |
| `qrcode` | QR code so phones can open the app quickly |
| `adm-zip` | Reading and writing zip archives |
| `systeminformation` | Reading laptop battery, CPU and memory to choose a model |
| `p-queue` | Queueing model requests so the laptop isn't overloaded |

## AI assistance during development

Parts of this project's code and documentation were written with help from Claude (Anthropic) through Claude Code. The team reviewed and is responsible for all code that ships.
