export function formatDateQuery(date) {
  let { year, month, day } = date;
  let dateParams = {};

  if (year && month && day) {
    const paddedMonth = String(month).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    console.log(year + "-" + paddedMonth + "-" + paddedDay);
    return (dateParams = {
      exactDate: year + "-" + paddedMonth + "-" + paddedDay,
    });
  } else if (year && month && !day) {
    let nextMonth;
    let nextYear;
    if (month === 12) {
      nextMonth = 1;
      nextYear = year + 1;
    } else {
      nextMonth = month + 1;
      nextYear = year;
    }

    const paddedMonth = String(month).padStart(2, "0");
    const paddedNextMonth = String(nextMonth).padStart(2, "0");

    const startRange = year + "-" + paddedMonth + "-01";
    const endRange = nextYear + "-" + paddedNextMonth + "-01";

    return (dateParams = { startRange: startRange, endRange: endRange });
  } else if (!year && !month && !day) {
    return "Invalid Date.";
  } else {
    return "Invalid Date.";
  }
}
