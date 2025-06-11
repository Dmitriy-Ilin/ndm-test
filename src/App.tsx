import { useState } from "react";
import "./App.css";
import { Route } from "./interface";
import { routes } from "./constants";
import { compareIps } from "./util";

function App() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Route | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const sortedRoutes = () => {
    const sortableRoutes = [...routes];

    if (sortConfig.key) {
      sortableRoutes.sort((a, b) => {
        if (sortConfig.key === "address" || sortConfig.key === "gateway") {
          const compareResult = compareIps(
            a[sortConfig.key],
            b[sortConfig.key]
          );
          return sortConfig.direction === "asc"
            ? compareResult
            : -compareResult;
        }

        if (sortConfig.key === "interface") {
          return sortConfig.direction === "asc"
            ? a.interface.localeCompare(b.interface)
            : b.interface.localeCompare(a.interface);
        }

        return 0;
      });
    }
    return sortableRoutes;
  };

  const handleSort = (key: keyof Route) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Route) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="container">
      <div className="route-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("address")}>
                Адрес назначения {getSortIcon("address")}
              </th>
              <th onClick={() => handleSort("gateway")}>
                Шлюз {getSortIcon("gateway")}
              </th>
              <th onClick={() => handleSort("interface")}>
                Интерфейс {getSortIcon("interface")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRoutes().map((route) => (
              <tr key={route.uuid}>
                <td>
                  {route.address}/{route.mask}
                </td>
                <td>{route.gateway}</td>
                <td>{route.interface}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
