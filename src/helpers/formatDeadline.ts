export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// utils/relativeTime.ts

const getTimeDifference = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30); // Approximate
  const diffYear = Math.floor(diffDay / 365); // Approximate

  if (diffYear > 0) {
    return `${diffYear}Y ago`;
  } else if (diffMonth > 0) {
    return `${diffMonth}M ago`;
  } else if (diffDay > 0) {
    if (diffDay === 1) return "Yesterday";
    if (diffDay <= 7) return `${diffDay}d ago`;
    return "This week";
  } else if (diffHour > 0) {
    if (diffHour === 1) return "1hr ago";
    return `${diffHour}hr ago`;
  } else if (diffMin > 0) {
    if (diffMin === 1) return "1min ago";
    return `${diffMin}min ago`;
  } else {
    return "Just now";
  }
};

export const formatRelativeTime = (isoDate: string) => {
  const date = new Date(isoDate);
  return getTimeDifference(date);
};
