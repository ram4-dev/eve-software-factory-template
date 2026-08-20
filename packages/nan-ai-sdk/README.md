# @nan-builders/ai-sdk

AI SDK provider for [NaN Builders](https://nan.builders): flat-rate, OpenAI-compatible inference at `https://api.nan.builders/v1`.

Works with [Vercel AI SDK](https://ai-sdk.dev/) and any framework that accepts a `LanguageModel`, including [eve](https://eve.dev) agents.

## Install

```bash
npm install @nan-builders/ai-sdk
# or
pnpm add @nan-builders/ai-sdk
```

Set your API key (generate one from NaN platform settings):

```bash
export NAN_API_KEY=sk-your-key-here
```

## Usage

```ts
import { generateText } from "ai";
import { nan } from "@nan-builders/ai-sdk";

const { text } = await generateText({
  model: nan("qwen3.6"),
  prompt: "Hello",
});
```

### Custom instance (Helmcode enterprise, tests, proxy)

```ts
import { createNan, createHelmcodeNan } from "@nan-builders/ai-sdk";

const local = createNan({
  apiKey: process.env.NAN_API_KEY,
  baseURL: "https://api.nan.builders/v1",
});

const helmcode = createHelmcodeNan({ apiKey: process.env.NAN_API_KEY });
```

### Model catalog

Typed chat model ids: `qwen3.6`, `deepseek-v4-flash`, `mimo-v2.5`, `gemma4`, `glm5.2` (plus any string for new models).

```ts
import { nanContextWindow, nanModelMetadata } from "@nan-builders/ai-sdk";

nanContextWindow("qwen3.6"); // 262144
nanModelMetadata("deepseek-v4-flash");
```

| Model | Best for |
| --- | --- |
| `qwen3.6` | General chat, tools, vision (default) |
| `deepseek-v4-flash` | Long context, coding, configurable reasoning |
| `mimo-v2.5` | Text + image + audio input |
| `gemma4` | Multimodal chat with opt-in reasoning |
| `glm5.2` | Premium tier coding and agentic tasks |

See [NaN model docs](https://nan.builders/docs/models) for quotas, reasoning controls, and modalities.

## eve Software Factory

In the eve Software Factory template, set:

```env
MODEL_PROVIDER=nan
NAN_API_KEY=sk-your-key-here
```

Model assignments live in `agent/lib/models.ts`. The default gateway path (`MODEL_PROVIDER=gateway` or unset) is unchanged.

Note: the dev TUI `/model` command targets AI Gateway string ids. With NaN, change models in `models.ts` or via env-driven presets.

## Publish

If the `@nan-builders` scope is unavailable on npm, publish as `nan-ai-sdk` and update the package name.

```bash
pnpm build
npm publish --access public
```

## Links

- [NaN Getting Started](https://nan.builders/docs/getting-started)
- [NaN API Reference](https://nan.builders/docs/api)
- [Community config gist](https://gist.github.com/686f6c61/8c05e9e6a1fa6062f5a23f56edac46af)

## License

MIT
