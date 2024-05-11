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
import { JsonObject } from "@prisma/client/runtime/library";
import { ACL } from "../acl/client";
import { Credentials } from "../credentials/client";

enum Transport {
  UDP = "UDP",
  TCP = "TCP",
  TLS = "TLS",
  SCTP = "SCTP",
  WS = "WS",
  WSS = "WSS"
}

type TrunkURI = {
  host: string;
  port: number;
  transport: Transport;
  user: string;
  weight: number;
  priority: number;
  enabled: boolean;
};

type Trunk = {
  ref: string;
  name: string;
  sendRegister: boolean;
  inboundUri?: string;
  accessControlList?: ACL;
  inboundCredentials?: Credentials;
  outboundCredentials?: Credentials;
  uris?: TrunkURI[];
  extended?: JsonObject;
  // FIXME: Should be a Date
  createdAt?: number;
  updatedAt?: number;
};

type CreateTrunkRequest = {
  name: string;
  sendRegister: boolean;
  inboundUri: string;
  accessControlList?: ACL;
  inboundCredentials?: Credentials;
  outboundCredentials?: Credentials;
  uris?: TrunkURI[];
  extended?: {
    accessKeyId: string;
  };
};

type UpdateTrunkRequest = {
  ref: string;
} & Omit<Partial<CreateTrunkRequest>, "extended">;

type CreateTrunkResponse = {
  ref: string;
};

type UpdateTrunkResponse = {
  ref: string;
};

type GetTrunkRequest = {
  ref: string;
};

type DeleteTrunkRequest = {
  ref: string;
};

type ListTrunksRequest = {
  pageSize: number;
  pageToken: string;
};

type ListTrunksResponse = {
  items: Trunk[];
  nextPageToken: string;
};

type TrunkAPI = {
  createTrunk(request: CreateTrunkRequest): Promise<CreateTrunkResponse>;
  updateTrunk(request: UpdateTrunkRequest): Promise<UpdateTrunkResponse>;
  getTrunk(ref: string): Promise<Trunk>;
  deleteTrunk(ref: string): Promise<void>;
  listTrunks(request: ListTrunksRequest): Promise<ListTrunksResponse>;
};

export {
  Trunk,
  CreateTrunkRequest,
  UpdateTrunkRequest,
  CreateTrunkResponse,
  UpdateTrunkResponse,
  GetTrunkRequest,
  DeleteTrunkRequest,
  ListTrunksRequest,
  ListTrunksResponse,
  TrunkAPI
};