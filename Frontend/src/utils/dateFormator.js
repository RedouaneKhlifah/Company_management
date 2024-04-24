export const formatDate = (date) => {
  // Ensure 'date' is a valid Date object
  if (!(date instanceof Date)) {
    return "";
  }

  // Get the year, month, and day components from the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Construct the formatted date string in "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const addDay = (dateString) => {
  // Parse the dateString to create a Date object
  const date = new Date(dateString);
  
  // Add one day to the date
  date.setDate(date.getDate() + 1);
  
  // Return the updated date
  return date;
}




