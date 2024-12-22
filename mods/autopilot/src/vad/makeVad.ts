/* eslint-disable no-loops/no-loops */
/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
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
import * as ort from "onnxruntime-node";
import { chunkToFloat32Array } from "./chunkToFloat32Array";
import { SileroVadModel } from "./SileroVadModel";

const BUFFER_SIZE = 512;

async function makeVad(params: {
  pathToModel: string;
  activationThreshold: number;
  deactivationThreshold: number;
  debounceFrames: number;
}) {
  const {
    pathToModel,
    activationThreshold,
    deactivationThreshold,
    debounceFrames
  } = params;

  const silero = await SileroVadModel.new(ort, pathToModel);

  let audioBuffer: number[] = [];
  let isSpeechActive = false;
  let consecutiveSpeechFrames = 0;
  let consecutiveNonSpeechFrames = 0;

  return async function process(
    chunk: Uint8Array,
    callback: (event: "SPEECH_START" | "SPEECH_END") => void
  ) {
    const float32Array = chunkToFloat32Array(chunk);
    audioBuffer.push(...float32Array);

    const processBuffer = async (buffer: number[]) => {
      if (buffer.length < BUFFER_SIZE) return buffer;

      const audioFrame = buffer.slice(0, BUFFER_SIZE);
      const remainingBuffer = buffer.slice(BUFFER_SIZE);

      const result = await silero.process(new Float32Array(audioFrame));

      if (result.isSpeech > activationThreshold) {
        consecutiveNonSpeechFrames = 0; // Reset non-speech counter
        consecutiveSpeechFrames++;

        if (consecutiveSpeechFrames >= debounceFrames && !isSpeechActive) {
          isSpeechActive = true;
          callback("SPEECH_START");
        }
      } else {
        consecutiveSpeechFrames = 0; // Reset speech counter
        consecutiveNonSpeechFrames++;

        if (
          consecutiveNonSpeechFrames >= debounceFrames &&
          isSpeechActive &&
          result.isSpeech < deactivationThreshold
        ) {
          isSpeechActive = false;
          callback("SPEECH_END");
          silero.resetState(); // Reset VAD state after speech ends
        }
      }

      return processBuffer(remainingBuffer);
    };

    audioBuffer = await processBuffer(audioBuffer);
  };
}

export { makeVad };
