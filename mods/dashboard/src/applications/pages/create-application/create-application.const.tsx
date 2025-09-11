/**
 * Copyright (C) 2025 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonoster
 *
 * This file is part of Fonoster
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ApplicationType } from "@fonoster/types";
import type { Schema } from "./schemas/application-schema";
import { LanguageModelProvider } from "./schemas/language-model-provider";

/**
 * List of available application types.
 * Used to populate select inputs or configuration options for different application categories.
 */
export const APPLICATION_TYPES = [
  { value: ApplicationType.EXTERNAL, label: "External" },
  { value: ApplicationType.AUTOPILOT, label: "Autopilot" }
];

/**
 * List of supported Text-to-Speech (TTS) vendors.
 * Useful for building dropdowns or vendor selectors.
 */
export const TTS_VENDORS = [
  { value: "tts.deepgram", label: "Deepgram" },
  { value: "tts.elevenlabs", label: "ElevenLabs" }
];

/**
 * List of available TTS voices.
 * Each voice is identified by a vendor-specific ID and a human-friendly label.
 */
export const TTS_ELEVENLABS_VOICES = [
  { value: "Sarah", label: "Sarah (en-us)" },
  { value: "Laura", label: "Laura (en-us)" },
  { value: "Charlie", label: "Charlie (en-au)" },
  { value: "George", label: "George (en-gb)" },
  { value: "Callum", label: "Callum (en-gb)" },
  { value: "Liam", label: "Liam (en-us)" },
  { value: "Charlotte", label: "Charlotte (sv-se)" },
  { value: "Alice", label: "Alice (en-gb)" },
  { value: "Matilda", label: "Matilda (en-us)" },
  { value: "Will", label: "Will (en-us)" },
  { value: "Jessica", label: "Jessica (en-us)" },
  { value: "Eric", label: "Eric (en-us)" },
  { value: "Chris", label: "Chris (en-us)" },
  { value: "Brian", label: "Brian (en-us)" },
  { value: "Daniel", label: "Daniel (en-gb)" },
  { value: "Lily", label: "Lily (en-gb)" },
  { value: "Bill", label: "Bill (en-us)" }
];

/**
 * List of available TTS voices for Deepgram.
 * Each voice is identified by a vendor-specific ID and a human-friendly label.
 */
export const TTS_DEEPGRAM_VOICES = [
  // Aura 2 English Voices - Featured
  { value: "aura-2-thalia-en", label: "Aura 2 Thalia (en-us)" },
  { value: "aura-2-andromeda-en", label: "Aura 2 Andromeda (en-us)" },
  { value: "aura-2-helena-en", label: "Aura 2 Helena (en-us)" },
  { value: "aura-2-apollo-en", label: "Aura 2 Apollo (en-us)" },
  { value: "aura-2-arcas-en", label: "Aura 2 Arcas (en-us)" },
  { value: "aura-2-aries-en", label: "Aura 2 Aries (en-us)" },
  
  // Aura 2 English Voices - All Available
  { value: "aura-2-amalthea-en", label: "Aura 2 Amalthea (en-ph)" },
  { value: "aura-2-asteria-en", label: "Aura 2 Asteria (en-us)" },
  { value: "aura-2-athena-en", label: "Aura 2 Athena (en-us)" },
  { value: "aura-2-atlas-en", label: "Aura 2 Atlas (en-us)" },
  { value: "aura-2-aurora-en", label: "Aura 2 Aurora (en-us)" },
  { value: "aura-2-callista-en", label: "Aura 2 Callista (en-us)" },
  { value: "aura-2-cora-en", label: "Aura 2 Cora (en-us)" },
  { value: "aura-2-cordelia-en", label: "Aura 2 Cordelia (en-us)" },
  { value: "aura-2-delia-en", label: "Aura 2 Delia (en-us)" },
  { value: "aura-2-draco-en", label: "Aura 2 Draco (en-gb)" },
  { value: "aura-2-electra-en", label: "Aura 2 Electra (en-us)" },
  { value: "aura-2-harmonia-en", label: "Aura 2 Harmonia (en-us)" },
  { value: "aura-2-hera-en", label: "Aura 2 Hera (en-us)" },
  { value: "aura-2-iris-en", label: "Aura 2 Iris (en-us)" },
  { value: "aura-2-juno-en", label: "Aura 2 Juno (en-us)" },
  { value: "aura-2-luna-en", label: "Aura 2 Luna (en-us)" },
  { value: "aura-2-maia-en", label: "Aura 2 Maia (en-us)" },
  { value: "aura-2-nova-en", label: "Aura 2 Nova (en-us)" },
  { value: "aura-2-orion-en", label: "Aura 2 Orion (en-us)" },
  { value: "aura-2-pandora-en", label: "Aura 2 Pandora (en-gb)" },
  { value: "aura-2-phoebe-en", label: "Aura 2 Phoebe (en-us)" },
  { value: "aura-2-pluto-en", label: "Aura 2 Pluto (en-us)" },
  { value: "aura-2-saturn-en", label: "Aura 2 Saturn (en-us)" },
  { value: "aura-2-selene-en", label: "Aura 2 Selene (en-us)" },
  { value: "aura-2-theia-en", label: "Aura 2 Theia (en-au)" },
  { value: "aura-2-vesta-en", label: "Aura 2 Vesta (en-us)" },
  { value: "aura-2-zeus-en", label: "Aura 2 Zeus (en-us)" },
  
  // Aura 2 Spanish Voices - Featured
  { value: "aura-2-celeste-es", label: "Aura 2 Celeste (es-co)" },
  { value: "aura-2-estrella-es", label: "Aura 2 Estrella (es-mx)" },
  { value: "aura-2-nestor-es", label: "Aura 2 Nestor (es-es)" },
  
  // Aura 2 Spanish Voices - All Available
  { value: "aura-2-sirio-es", label: "Aura 2 Sirio (es-mx)" },
  { value: "aura-2-carina-es", label: "Aura 2 Carina (es-es)" },
  { value: "aura-2-alvaro-es", label: "Aura 2 Alvaro (es-es)" },
  { value: "aura-2-diana-es", label: "Aura 2 Diana (es-es)" },
  { value: "aura-2-aquila-es", label: "Aura 2 Aquila (es-419)" },
  { value: "aura-2-selena-es", label: "Aura 2 Selena (es-419)" },
  { value: "aura-2-javier-es", label: "Aura 2 Javier (es-mx)" },
  
  // Aura 1 English Voices
  { value: "aura-asteria-en", label: "Aura Asteria (en-us)" },
  { value: "aura-luna-en", label: "Aura Luna (en-us)" },
  { value: "aura-stella-en", label: "Aura Stella (en-us)" },
  { value: "aura-athena-en", label: "Aura Athena (en-gb)" },
  { value: "aura-hera-en", label: "Aura Hera (en-us)" },
  { value: "aura-orion-en", label: "Aura Orion (en-us)" },
  { value: "aura-arcas-en", label: "Aura Arcas (en-us)" },
  { value: "aura-perseus-en", label: "Aura Perseus (en-us)" },
  { value: "aura-angus-en", label: "Aura Angus (en-ie)" },
  { value: "aura-orpheus-en", label: "Aura Orpheus (en-us)" },
  { value: "aura-helios-en", label: "Aura Helios (en-gb)" },
  { value: "aura-zeus-en", label: "Aura Zeus (en-us)" }
];

/**
 * List of supported Speech-to-Text (STT) vendors.
 * Allows for selecting the desired vendor integration.
 */
export const STT_VENDORS = [{ value: "stt.deepgram", label: "Deepgram" }];

/**
 * List of available STT models for the selected vendor.
 * Each model might have specific configurations or trade-offs in accuracy or speed.
 */
export const STT_MODELS = [
  { value: "nova-3", label: "Nova 3" },
  { value: "nova-2", label: "Nova 2" },
  { value: "nova-2-phonecall", label: "Nova 2 Phone Call" },
  { value: "nova-2-conversationalai", label: "Nova 2 Conversational AI" }
];

/**
 * List of supported languages.
 * Defines which language is used for voice applications or STT/TTS services.
 */
export const LANGUAGES = [
  { value: "en-US", label: "English" },
  { value: "es-ES", label: "Spanish" }
];

export const LANGUAGE_MODEL_PROVIDERS = [
  { value: LanguageModelProvider.OPENAI, label: "OpenAI" },
  { value: LanguageModelProvider.GROQ, label: "Groq" },
  { value: LanguageModelProvider.GOOGLE, label: "Google" },
  { value: LanguageModelProvider.ANTHROPIC, label: "Anthropic" }
];

export const LANGUAGE_MODEL_OPENAI_MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" }
];

export const LANGUAGE_MODEL_GROQ_MODELS = [
  { value: "llama-3.3-70b-specdec", label: "Llama 3.3 70B SpecDec" },
  { value: "llama-3.3-70b-versatile", label: "Llama 3.3 70B Versatile" }
];

export const LANGUAGE_MODEL_GOOGLE_MODELS = [
  { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
  { value: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite" },
  { value: "gemini-2.0-pro-exp-02-05", label: "Gemini 2.0 Pro Exp 02-05" }
];

export const LANGUAGE_MODEL_ANTHROPIC_MODELS = [
  { value: "claude-3-5-sonnet-latest", label: "Claude 3.5 Sonnet Latest" },
  { value: "claude-3-5-haiku-latest", label: "Claude 3.5 Haiku Latest" }
];

export const getLanguageModelModels = (provider: LanguageModelProvider) => {
  const modelsMap = {
    [LanguageModelProvider.OPENAI]: LANGUAGE_MODEL_OPENAI_MODELS,
    [LanguageModelProvider.GROQ]: LANGUAGE_MODEL_GROQ_MODELS,
    [LanguageModelProvider.GOOGLE]: LANGUAGE_MODEL_GOOGLE_MODELS,
    [LanguageModelProvider.ANTHROPIC]: LANGUAGE_MODEL_ANTHROPIC_MODELS
  };

  return modelsMap[provider] || [];
};

/**
 * Default initial values for the application creation form.
 * This object provides a starting point for the form fields,
 * ensuring all necessary fields are initialized.
 */
export const APPLICATIONS_DEFAULT_INITIAL_VALUES: Schema = {
  ref: null,
  name: "",
  type: ApplicationType.AUTOPILOT,
  endpoint: "",
  textToSpeech: {
    productRef: "tts.elevenlabs",
    config: {
      voice: "Sarah"
    }
  },
  speechToText: {
    productRef: "stt.deepgram",
    config: {
      model: "nova-3",
      languageCode: "en-US"
    }
  },
  intelligence: {
    productRef: "llm.google",
    config: {
      conversationSettings: {
        firstMessage: "Hello, how can I help you?",
        systemPrompt: "",
        goodbyeMessage: "Goodbye! Have a great day!",
        systemErrorMessage: "An error occurred. Please try again later.",
        transferOptions: {
          phoneNumber: "",
          message: "Please call this number for further assistance.",
          timeout: 30000
        },
        idleOptions: {
          message: "I haven't heard from you in a while. Are you still there?",
          timeout: 30000,
          maxTimeoutCount: 2
        }
      },
      languageModel: {
        provider: LanguageModelProvider.GOOGLE,
        model: "gemini-2.0-flash",
        temperature: 0.2,
        maxTokens: 240,
        tools: []
      },
      eventsHook: {
        url: "",
        headers: {
          "Content-Type": "application/json"
        },
        events: []
      }
    }
  }
};
