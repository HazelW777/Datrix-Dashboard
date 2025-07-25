// A simple CSV parser utility
// This avoids installing new dependencies that might conflict with the existing project setup.

export function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) {
    return [];
  }

  const headers = lines[0].split(",").map((header) => header.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((value) => value.trim());
    if (values.length === headers.length) {
      const row: { [key: string]: any } = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j];
      }
      data.push(row);
    }
  }

  return data;
}
