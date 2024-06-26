import moment from "moment";

export const dateFormat = (date: string) => {
    const createdAt = moment(date);
    const startOfDay = moment().startOf("day");

    const diffInDays = moment.duration(startOfDay.diff(createdAt)).asDays();

    let formattedTime;

    if (diffInDays >= 1) {
        formattedTime = createdAt.format("DD/MM/YYYY");
    } else {
        formattedTime = createdAt.startOf("day").fromNow();
    }

    return formattedTime;
};