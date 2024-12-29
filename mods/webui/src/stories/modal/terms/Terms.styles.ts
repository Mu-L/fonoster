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
import { styled } from "@mui/material/styles";

export const StyledTerms = styled("div")(() => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 4px 32px 0px rgba(0, 0, 0, 0.15)",
  padding: "24px"
}));

export const StyledTitleContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}));

export const StyledTitle = styled("div")(() => ({
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: 400,
  textAlign: "left",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none",
  letterSpacing: "0.01em",
  lineHeight: "21px",
  color: "#333333"
}));

export const StyledMessage = styled("div")(() => ({
  marginTop: "24px",
  fontFamily: "Poppins",
  fontSize: "14px",
  fontWeight: 500,
  textAlign: "left",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none",
  letterSpacing: "0.01em",
  lineHeight: "22px",
  color: "#333333"
}));

export const StyledCloseButtonContainer = styled("div")(() => ({
  width: "auto",
  height: "auto",
  cursor: "pointer"
}));
