export function parseQueryParamAsNumber(
  param: string | string[] | undefined,
): number | undefined {
  if (!param) {
    return undefined;
  }

  const normalizedParam = Array.isArray(param) ? param[0] : param;
  const num = parseInt(normalizedParam, 10);

  return Number.isNaN(num) ? undefined : num;
}
