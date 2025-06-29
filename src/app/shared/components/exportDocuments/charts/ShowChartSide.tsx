import { Header } from "../../layout/Header";
import { motion } from "framer-motion";
import type { HeaderItem } from "../exports/Option";
import { PieAnimation } from "../../charts/piChart";
import { useState } from "react";

interface ShowChartSideProps {
  showChartMenu?: boolean;
  setShowChartMenu?: (value: boolean) => void;
  headers: HeaderItem[];
  data: Record<string, unknown>[];
}
export const ShowChartSide: React.FC<ShowChartSideProps> = ({
  showChartMenu,
  setShowChartMenu,
  headers,
  data,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(headers[0]?.key || "");

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: showChartMenu ? 0 : 300 }}
      transition={{ type: "tween", duration: 0.3 }}
      style={{
        width: 300,
        height: "100vh",
        backgroundColor: "#fff",
        padding: "16px",
        position: "fixed",
        right: 0,
        top: 0,
        borderLeft: "1px solid #e0e0e0",
        zIndex: 1000,
        boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header title="Gráficos" />
        <button onClick={() => setShowChartMenu && setShowChartMenu(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "#6e8192" }}
          >
            <path d="M10 17l5-5-5-5v10z" />
          </svg>
        </button>
      </div>

      <div>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          style={{ width: "100%", padding: 4, marginBottom: 12 }}
        >
          {headers.map((header) => (
            <option key={header.key} value={header.key}>
              {header.header}
            </option>
          ))}
        </select>

        <PieAnimation headers={
            headers.map((header) => ({
                id: header.key,
                label: header.header,
            }))

        } data={data} selectedKey={selectedKey} />
      </div>
    </motion.div>
  );
};