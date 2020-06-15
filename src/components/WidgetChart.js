import React, {useState, useEffect} from "react";
import styles from "./WidgetChart.module.scss";
import {
  PieChart, Pie, ResponsiveContainer, Cell,
} from 'recharts';


const COLORS = ['#1890ff', '#ddd'];

const RADIAN = Math.PI / 180;
let renderLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text font-size="11" x={x} y={y} fill="#444" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name}`}
    </text>
  );
}

function WidgetChart(props) {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    let complete = 0;
    let incomplete = 0;
    props.tasks.forEach((task) => {
      if (task.completed) {
        complete += 1;
      } else {
        incomplete += 1;
      }
    });
    setData([
      { name: "Completed", value: complete },
      { name: "Not done", value: incomplete },
    ]);
  }, [props.tasks]);

  return (
    <div className={styles.widgetWrapper}>
      <ResponsiveContainer width="99%" height="80%" minHeight={100}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            fill="#8884d8"
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                dataKey="name"
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WidgetChart;
