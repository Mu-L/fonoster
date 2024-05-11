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
import { ApplicationType } from "@prisma/client";

type BaseRequest = {
  ref: string;
};

type BaseResponse = {
  ref: string;
};

type Application = {
  ref: string;
  name: string;
  type: ApplicationType;
  appUrl: string;
  textToSpeech: {
    productRef: string;
    // secretRef: string;
    config: Record<string, unknown>;
  };
  speechToText: {
    productRef: string;
    // secretRef: string;
    config: Record<string, unknown>;
  };
  conversation: {
    productRef: string;
    // secretRef: string;
    config: Record<string, unknown>;
  };
  createdAt: Date;
  updatedAt: Date;
};

type CreateApplicationRequest = {
  name: string;
  type: ApplicationType;
  appUrl: string;
  textToSpeech: {
    productRef: string;
    secretRef: string;
    config: Record<string, unknown>;
  };
  speechToText: {
    productRef: string;
    secretRef: string;
    config: Record<string, unknown>;
  };
  conversation: {
    productRef: string;
    secretRef: string;
    config: Record<string, unknown>;
  };
};

type CreateApplicationResponse = BaseResponse;

type UpdateApplicationRequest = BaseRequest & Partial<CreateApplicationRequest>;

type GetApplicationRequest = BaseRequest;

type GetApplicationResponse = BaseResponse;

type UpdateApplicationResponse = BaseResponse;

type DeleteApplicationRequest = BaseRequest;

type DeleteApplicationResponse = BaseResponse;

type ListApplicationsRequest = {
  pageSize: number;
  pageToken: string;
};

type ListApplicationsResponse = {
  nextPageToken?: string;
  items: Application[];
};

export {
  Application,
  CreateApplicationRequest,
  CreateApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  ListApplicationsRequest,
  ListApplicationsResponse,
  GetApplicationRequest,
  GetApplicationResponse
};