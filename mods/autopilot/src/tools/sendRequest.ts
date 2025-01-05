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
import { getLogger } from "@fonoster/logger";
import { z } from "zod";
import { AllowedOperations } from "./ToolSchema";

const responseSchema = z.object({
  result: z.string()
});

const logger = getLogger({ service: "autopilot", filePath: __filename });

async function sendRequest(input: {
  method: AllowedOperations;
  url: string;
  waitForResponse: boolean;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}): Promise<{ result: string }> {
  const { url, method, body, headers, waitForResponse } = input;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: method === AllowedOperations.POST ? JSON.stringify(body) : undefined
  };

  logger.verbose(`sending request to ${url}`, { body, method });

  if (waitForResponse && method === AllowedOperations.POST) {
    setTimeout(() => fetch(url, options), 0);
    return { result: "request sent" };
  } else {
    const response = await fetch(url, options);
    const data = await response.json();

    try {
      return responseSchema.parse(data);
    } catch (error) {
      throw new Error(
        `Invalid response: expected ${JSON.stringify(responseSchema, null, 2)}, got ${JSON.stringify(data, null, 2)}`
      );
    }
  }
}

export { sendRequest };
