/*
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
import { join } from "path";
import { assertEnvsAreSet, assertFileExists } from "@fonoster/common";
import dotenv from "dotenv";
import { ConversationProvider } from "./types";

if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: join(__dirname, "..", "..", "..", ".env") });
}

const e = process.env;

export const SKIP_IDENTITY = e.SKIP_IDENTITY === "true";
export const AWS_S3_ACCESS_KEY_ID = e.AWS_S3_ACCESS_KEY_ID;
export const AWS_S3_ENDPOINT = e.AWS_S3_ENDPOINT;
export const AWS_S3_REGION = e.AWS_S3_REGION ?? "us-east-1";
export const AWS_S3_SECRET_ACCESS_KEY = e.AWS_S3_SECRET_ACCESS_KEY;
export const KNOWLEDGE_BASE_ENABLED = e.KNOWLEDGE_BASE_ENABLED === "true";
export const NODE_ENV = e.NODE_ENV || "production";
export const UNSTRUCTURED_API_KEY = e.UNSTRUCTURED_API_KEY;
export const UNSTRUCTURED_API_URL =
  e.UNSTRUCTURED_API_URL ?? "https://api.unstructuredapp.io/general/v0/general";
export const SILERO_VAD_MODEL_PATH =
  e.SILERO_VAD_MODEL_PATH ?? join(__dirname, "..", "silero_vad.onnx");
export const CONVERSATION_PROVIDER = e.CONVERSATION_PROVIDER
  ? e.CONVERSATION_PROVIDER
  : ConversationProvider.FILE;
export const CONVERSATION_PROVIDER_FILE = e.CONVERSATION_PROVIDER_FILE
  ? e.CONVERSATION_PROVIDER_FILE
  : `${process.cwd()}/config/assistant.json`;
export const APISERVER_ENDPOINT = e.APISERVER_ENDPOINT
  ? e.APISERVER_ENDPOINT
  : "apiserver:50051";
export const INTEGRATIONS_FILE = e.INTEGRATIONS_FILE
  ? e.INTEGRATIONS_FILE
  : `${process.cwd()}/config/integrations.json`;

if (
  CONVERSATION_PROVIDER!.toLocaleLowerCase() !== ConversationProvider.API &&
  CONVERSATION_PROVIDER!.toLocaleLowerCase() !== ConversationProvider.FILE
) {
  console.error("CONVERSATION_PROVIDER must be set to 'api' or 'file'");
  process.exit(1);
}

if (CONVERSATION_PROVIDER!.toLocaleLowerCase() === ConversationProvider.API) {
  assertFileExists(INTEGRATIONS_FILE);
}

if (KNOWLEDGE_BASE_ENABLED) {
  assertEnvsAreSet([
    "AWS_S3_ACCESS_KEY_ID",
    "AWS_S3_SECRET_ACCESS_KEY",
    "UNSTRUCTURED_API_KEY"
  ]);
}
