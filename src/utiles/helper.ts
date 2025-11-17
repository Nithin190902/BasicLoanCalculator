export function formatIndianNumber(num: number | null | undefined): string {
  if (num == null || isNaN(num)) return "0";

  // fixed(0)
  let x = Number(num).toFixed(0);
  // first group (last 3 digits)
  let last3 = x.substring(x.length - 3);
  let other = x.substring(0, x.length - 3);

  // add commas after every 2 digits in the "other" part
  if (other !== "") {
    other = other.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return other + "," + last3;
  } else {
    return last3;
  }
}