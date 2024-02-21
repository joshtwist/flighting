import {ContextData, ZuploContext, ZuploRequest} from "@zuplo/runtime";

type MyPolicyOptionsType = {
  splitPercent: number;
};

function getIsSplit(percentage: number, context: ZuploContext) {
  // Ensure the input is a number and within the expected range.
  if (percentage < 0 || percentage > 100) {
    context.log.error('Percentage must be a number between 0 and 100');
    // default to not split to be safe
    return false;
  }

  // Generate a random number between 0 and 100
  const randomNumber = Math.random() * 100;

  // If randomNumber is less than the percentage, return 'b', otherwise 'a'
  return randomNumber < percentage ? true : false;
}

export default async function policy(
  request: ZuploRequest,
  context: ZuploContext,
  options: MyPolicyOptionsType,
  policyName: string
) {
  let splitPercent = options.splitPercent;

  if (typeof(splitPercent) === "string") {
    splitPercent = parseInt(splitPercent);
  }

  const isSplit = getIsSplit(splitPercent, context);

  ContextData.set(context, "isSplit", isSplit);

  return request;
}
