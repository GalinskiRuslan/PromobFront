export function formatPhoneNumber(value: string): string {
  if (!value) return value;
  const phoneNumber = value.replace(/\D/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength <= 1) {
    return `+7 7${phoneNumber}`;
  }
  if (phoneNumberLength <= 4) {
    return `+7 7${phoneNumber.slice(2, 4)}`;
  }
  if (phoneNumberLength <= 7) {
    return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(4, 7)}`;
  }
  if (phoneNumberLength <= 9) {
    return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(
      4,
      7
    )} ${phoneNumber.slice(7, 9)}`;
  }
  return `+7 ${phoneNumber.slice(1, 4)} ${phoneNumber.slice(
    4,
    7
  )} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9, 11)}`;
}
