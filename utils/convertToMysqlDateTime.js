const convertToMySQLDateTime = (dateString) => {
  const date = new Date(dateString);

  return (mysqlDatetime = date.toISOString().slice(0, 19).replace("T", " "));
};

module.exports = convertToMySQLDateTime;
