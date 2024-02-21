import {ContextData, ZuploContext, ZuploRequest} from "@zuplo/runtime";

export default async function policy(
  request: ZuploRequest,
  context: ZuploContext,
  options: never,
  policyName: string
) {
  // your policy code goes here, and can use the options to perform any
  // configuration
  // See the docs: https://www.zuplo.com/docs/policies/custom-code-inbound

  const isSplit: boolean = ContextData.get(context, "isSplit");

  if (isSplit) {
    return context.invokeInboundPolicy("set-is-split-header", request);
  }

  return request;
}
