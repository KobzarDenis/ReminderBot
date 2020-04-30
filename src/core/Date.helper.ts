import * as moment from "moment";

export class DateHelper {

  public static getTimeNHourAgo(n: number): string {
      return moment().subtract(n,"hours").format("YYYY-MM-DD HH:mm:ss");
  }

  public static formatToDateAndTime(date: Date): string {
    return moment(date).format("YYYY-MM-DD HH-MM");
  }

  public static formatToDateOnly(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
  }

}
