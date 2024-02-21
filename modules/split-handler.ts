import { ZuploContext, ZuploRequest, ContextData } from "@zuplo/runtime";
import fnh from "./fake-nodes-handler";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const isSplit: boolean = ContextData.get(context, "isSplit");

  if (isSplit) {
    return fnh(request, context);
  }

  const url = `https://5372ece088944e53976d2b2fdd6735a4.api.mockbin.io/`
  return fetch(url, request);
}