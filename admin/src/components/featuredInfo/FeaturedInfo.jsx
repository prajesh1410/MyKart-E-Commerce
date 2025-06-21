import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
  const getIncome = async () => {
    try {
      const res = await userRequest.get("/orders/income");
      const sorted = res.data.sort((a, b) => a._id - b._id);
      const prev = sorted[0]?.total || 1;
      const curr = sorted[1]?.total || 0;
      setPerc(((curr - prev) / prev) * 100);
      setIncome(sorted);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };
  getIncome();
}, []);


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ${income[1]?.total?.toLocaleString() ?? "0"}
          </span>
          <span className="featuredMoneyRate">
            {Math.abs(Math.floor(perc))}%
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
            <span className="featuredSub" style={{ marginLeft: "10px", fontSize: "14px", color: "gray" }}>
              (Compared to last month)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
