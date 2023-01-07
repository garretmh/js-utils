/** Whether value is an enum of EnumType. */
export function isEnum<T extends string | number>(
  EnumType: Record<string, T>,
  value: string | number,
): value is T {
  return (
    Object.values<string | number>(EnumType).includes(value) &&
    // Guard against numeric enum revrse-lookups
    typeof EnumType[value] !== "number"
  );
}
