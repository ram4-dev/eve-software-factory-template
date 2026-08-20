import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModelV4 } from "@ai-sdk/provider";
import {
  HELMCODE_BASE_URL,
  NAN_API_KEY_ENV,
  NAN_BASE_URL,
} from "./constants.js";
import type { NanChatModelId } from "./nan-models.js";

export interface NanProviderSettings {
  apiKey?: string;
  baseURL?: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
  name?: string;
}

export interface NanProvider {
  chat: (modelId: NanChatModelId) => LanguageModelV4;
  languageModel: (modelId: NanChatModelId) => LanguageModelV4;
  (modelId: NanChatModelId): LanguageModelV4;
}

export const createNan = (options: NanProviderSettings = {}): NanProvider => {
  const provider = createOpenAICompatible({
    apiKey: options.apiKey ?? process.env[NAN_API_KEY_ENV],
    baseURL: options.baseURL ?? NAN_BASE_URL,
    fetch: options.fetch,
    headers: options.headers,
    name: options.name ?? "nan",
  });

  const languageModel = (modelId: NanChatModelId): LanguageModelV4 =>
    provider(modelId);

  const nanProvider = ((modelId: NanChatModelId) =>
    languageModel(modelId)) as NanProvider;

  nanProvider.chat = languageModel;
  nanProvider.languageModel = languageModel;

  return nanProvider;
};

export const nan = createNan();

export const createHelmcodeNan = (
  options: Omit<NanProviderSettings, "baseURL"> = {}
): NanProvider => createNan({ ...options, baseURL: HELMCODE_BASE_URL });
