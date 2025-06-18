import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, X, AlertCircle } from "lucide-react";

export default function PreviewModal({ file, onClose }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        if (!jsonData.length) {
          setError("Empty or invalid Excel file.");
          setLoading(false);
          return;
        }

        const parsedHeaders = jsonData[0];
        const parsedRows = jsonData.slice(1).map((row) => {
          const rowObj = {};
          parsedHeaders.forEach((key, i) => {
            rowObj[key] = row[i] ?? "";
          });
          return rowObj;
        });

        setHeaders(parsedHeaders);
        setData(parsedRows);
      } catch (err) {
        console.error("Parse error:", err);
        setError("Failed to parse Excel file.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(file);
  }, [file]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800/90 border border-gray-700 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{file?.name}</h2>
              <p className="text-sm text-gray-400">
                Previewing Excel file contents
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto flex-1 p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400">Processing Excel file...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3 max-w-md">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700/50">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800/50">
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={
                        rowIndex % 2 === 0 ? "bg-gray-800/30" : "bg-gray-800/10"
                      }
                    >
                      {headers.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"
                        >
                          <div className="max-w-xs truncate">
                            {typeof row[header] === "object"
                              ? JSON.stringify(row[header])
                              : String(row[header] ?? "")}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800/50 flex justify-between items-center">
          <div className="text-sm text-gray-400 flex items-center space-x-4">
            <span>
              <span className="font-medium text-gray-300">{data.length}</span>{" "}
              rows
            </span>
            <span>
              <span className="font-medium text-gray-300">
                {headers.length}
              </span>{" "}
              columns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
