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
import { badRequestError } from "../core/badRequestError";
import { Prisma } from "../core/db";
import { notFoundError } from "../core/notFoundError";

function createGetFnUtil(prisma: Prisma) {
  return async (ref: string) => {
    if (!ref) {
      throw badRequestError("The reference to the resource is required");
    }

    const response = await prisma.application.findUnique({
      where: { ref },
      include: {
        textToSpeech: true,
        speechToText: true,
        intelligence: true
      }
    });

    if (!response) {
      throw notFoundError("Application not found");
    }

    return {
      // NOTE: Adding extended to match the signature of withAccess
      ...response,
      extended: {
        accessKeyId: response.accessKeyId
      }
    };
  };
}

export { createGetFnUtil };
