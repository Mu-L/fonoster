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
import { DialRequest, DialStatus, STASIS_APP_NAME } from "@fonoster/common";
import { Client } from "ari-client";
import { handleChannelLeftBridge } from "./handleChannelLeftBridge";
import { handleDialEvents } from "./handleDialEvents";
import { handleStasisEnd } from "./handleStasisEnd";
import { handleStasisStart } from "./handleStasisStart";
import { ASTERISK_TRUNK } from "../../../envs";
import { AriEvent as AE, VoiceClient } from "../../types";

function dialHandler(ari: Client, voiceClient: VoiceClient) {
  return async (request: DialRequest) => {
    const { sessionRef, destination, timeout } = request;

    const bridge = await ari.bridges.create({
      type: "mixing"
    });

    // eslint-disable-next-line new-cap
    const dialed = ari.Channel();

    await bridge.addChannel({ channel: sessionRef });

    // FIXME: Hardcoded value
    const domain = "sip.local";

    await dialed.originate({
      app: STASIS_APP_NAME,
      endpoint: `PJSIP/${ASTERISK_TRUNK}/sip:${destination}@${domain}`,
      timeout
    });

    dialed.on(
      AE.STASIS_START,
      handleStasisStart({ ari, request, bridge, dialed })
    );

    dialed.on(
      AE.CHANNEL_LEFT_BRIDGE,
      handleChannelLeftBridge({ bridge, dialed })
    );

    dialed.on(AE.STASIS_END, handleStasisEnd(request));

    dialed.on(AE.DIAL, handleDialEvents(voiceClient));

    voiceClient.sendResponse({
      dialResponse: {
        status: DialStatus.TRYING
      }
    });
  };
}

export { dialHandler };