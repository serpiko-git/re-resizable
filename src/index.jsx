import React, { useState } from "react";
import { render } from "react-dom";
import { Resizable } from "re-resizable";

const style = {
  display: "flex",
  // flexDirection: "column", // 내부 요소들을 세로로 배치하기 위해 추가
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  overflow: "hidden",
};

const tickSize = {
  height: "22px",
  //border: "solid 1px #FF0000",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
};

const orderStateStyle = {
  fontSize: "22px",
  width: "100%",
  height: "70px",
  marginTop: "10px",
  backgroundColor: "skyblue",
};
const resizeHandleStyle = {
  position: "absolute",
  bottom: -2,
  right: -5,
  width: "20px",
  height: "20px",
  background:
    "url('https://upload.wikimedia.org/wikipedia/commons/1/16/MRO_LETTER_NGI.svg')", // 아이콘 이미지 경로로 대체
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
};

const App = () => {
  const [size, setSize] = useState({ width: 300, height: 682 });
  const handleSize = (w, h) => {
    setSize({ width: w, height: h });
  };
  let buyOrders = Array.from({ length: 20 }, (_, i) => ({
    price: i + 1,
  })).reverse();
  let sellOrders = Array.from({ length: 20 }, (_, i) => ({
    price: i + 11,
  })).reverse();

  const incrementSequence = (start, end, increment) => {
    return Array.from(
      { length: Math.floor((end - start) / increment) + 1 },
      (_, index) => start + index * increment
    );
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Resizable
          as="div"
          style={style}
          defaultSize={size}
          enable={{
            right: true,
            bottom: true,
            bottomRight: true,
          }}
          minWidth={100}
          maxWidth={300}
          minHeight={462}
          maxHeight={902}
          grid={[1, 1]}
          snap={{
            x: incrementSequence(100, 300, 20),
            y: incrementSequence(462, 902, 44),
          }}
          snapGap={0}
          size={size}
          onResizeStop={(e, direction, ref, d) => {
            setSize({
              width: size.width + d.width,
              height: size.height + d.height,
            });
          }}
        >
          <div
            style={{ overflow: "hidden", width: "100%", textAlign: "center" }}
          >
            {sellOrders.map((order, i) => (
              <div style={{ ...tickSize }}>매도 {order.price}</div>
            ))}
            <div style={{ ...tickSize, border: "1px solid red" }}>
              현재값 표시
            </div>
            {buyOrders.map((order) => (
              <div style={{ ...tickSize }}>매수 {order.price}</div>
            ))}
          </div>
          <div className="resize-handle" style={resizeHandleStyle}></div>
        </Resizable>
        <div style={{ width: "100%", paddingLeft: "20px" }}>
          <button style={buttonStyle} onClick={() => handleSize(300, 462)}>
            최소 (10개씩 x 2)
          </button>
          <button style={buttonStyle} onClick={() => handleSize(300, 682)}>
            기본값 (15개씩 x 2)
          </button>
          <button style={buttonStyle} onClick={() => handleSize(300, 902)}>
            최대 (20개씩 x 2)
          </button>
        </div>
      </div>
      <div style={orderStateStyle}>주문현황...</div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
