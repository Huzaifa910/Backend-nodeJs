export const formatAIResponse = (data, indent = 0) => {
  const space = " ".repeat(indent);

  if (data === null || data === undefined) return "";

  // String
  if (typeof data === "string") {
    return space + data;
  }

  // Number / Boolean
  if (typeof data !== "object") {
    return space + String(data);
  }

  // Array
  if (Array.isArray(data)) {
    return data
      .map((item) => {
        if (typeof item === "object") {
          return formatAIResponse(item, indent + 2);
        }
        return `${space}• ${item}`;
      })
      .join("\n");
  }

  // Object
  let output = "";
  Object.entries(data).forEach(([key, value]) => {
    const title = key.replaceAll("_", " ").toUpperCase();
    output += `\n${space}${title}:\n`;
    output += formatAIResponse(value, indent + 2) + "\n";
  });

  return output.trim();
};
