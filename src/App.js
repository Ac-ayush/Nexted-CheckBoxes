import { useState } from "react";
import "./styles.css";
import { mockData } from "./data/data";

const isSubtreeChecked = (node, checkMap) => {
  if (!node.children?.length) {
    return !!checkMap[node.id];
  }
  return node.children.every((child) => isSubtreeChecked(child, checkMap));
};

const CheckBox = ({ task, checkIdMap, setCheckIdMap }) => {
  const hasChildren = task.children?.length > 0;

  //Current node is checked if all nodes in subtree are checked
  const isChecked = isSubtreeChecked(task, checkIdMap);

  const handleChange = (checked) => {
    const newMap = { ...checkIdMap };

    const updateChildren = (node) => {
      if (!node.children?.length) {
        newMap[node.id] = checked;
        return;
      }

      node.children.forEach(updateChildren);
    };

    updateChildren(task);
    setCheckIdMap(newMap);
  };

  return (
    <div className="checkbox-container">
      <div className="checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          style={{ height: 16, width: 16 }}
        />
        <span>{task.text}</span>
      </div>

      {hasChildren && (
        <CheckList
          dataArray={task.children}
          checkIdMap={checkIdMap}
          setCheckIdMap={setCheckIdMap}
        />
      )}
    </div>
  );
};

const CheckList = ({ dataArray, checkIdMap, setCheckIdMap }) => {
  return (
    <div className="checklist">
      {dataArray.map((obj) => {
        return (
          <CheckBox
            key={obj.id}
            task={obj}
            checkIdMap={checkIdMap}
            setCheckIdMap={setCheckIdMap}
          />
        );
      })}
    </div>
  );
};

const CheckListContainer = () => {
  const [checkIdMap, setCheckIdMap] = useState({});
  return (
    <CheckList
      dataArray={mockData}
      checkIdMap={checkIdMap}
      setCheckIdMap={setCheckIdMap}
    />
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Task Checklist</h1>
      <CheckListContainer />
    </div>
  );
}
