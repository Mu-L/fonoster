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
import { AssistantConfig } from "../../assistants/types";
import { Voice } from "../../voice";
import { createLanguageModel } from "../createLanguageModel";
import { TelephonyContext } from "../types";
import { createTestTextSimilarity } from "./createTestTextSimilarity";
import { evaluateSession } from "./evaluateSession";
import { SessionEvaluationReport } from "./types";

export async function evalTestCases(
  assistantConfig: AssistantConfig
): Promise<SessionEvaluationReport[]> {
  const { testCases } = assistantConfig;
  const voice = {
    say: async (_: string) => {}
  } as Voice;

  const evaluationReports: SessionEvaluationReport[] = [];

  for (const session of testCases?.scenarios!) {
    const languageModel = createLanguageModel({
      voice,
      assistantConfig,
      knowledgeBase: {
        load: async () => {},
        queryKnowledgeBase: async (query: string, k?: number) => query
      },
      telephonyContext: session.telephonyContext as TelephonyContext
    });

    const testTextSimilarity = createTestTextSimilarity(
      {
        provider: assistantConfig.testCases?.evalsLanguageModel?.provider,
        model: assistantConfig.testCases?.evalsLanguageModel?.model!,
        apiKey: assistantConfig.testCases?.evalsLanguageModel?.apiKey
      },
      assistantConfig.testCases?.evalsSystemPrompt ||
        "Are Text1 and Text2 similar? Please respond with 'true' or 'false'."
    );

    const evaluationReport = await evaluateSession(
      session,
      languageModel,
      testTextSimilarity
    );
    evaluationReports.push(evaluationReport);
  }

  return evaluationReports;
}
