import React, { useState } from "react";
import ImageMapper from "react-image-mapper";
import useCoffee from "./hooks/coffee_hooks/useCoffee";
import { useHistory } from "react-router-dom";

const Coffe11 = () => {
  let Coffee = useCoffee("604118b906be3e18ad24f3cd");
  const MAP = {
    name: "my-map",
    areas: [
      {
        name:
          Coffee?.data?.tables[0]?.name +
          " | " +
          Coffee?.data?.tables[0]?.users.length +
          "/" +
          Coffee?.data?.tables[0]?.limitNumber +
          " persons",
        shape: "poly",
        coords: [
          748,
          456,
          806,
          456,
          843,
          427,
          842,
          384,
          805,
          353,
          755,
          352,
          716,
          379,
          715,
          426,
        ],
        preFillColor: "pink",
        //link: Coffee?.data?.tables[0]?.name,
        //   fillColor: "blue",
      },
      {
        name:
          Coffee?.data?.tables[1]?.name +
          " | " +
          Coffee?.data?.tables[1]?.users.length +
          "/" +
          Coffee?.data?.tables[1]?.limitNumber +
          " persons",
        shape: "poly",
        coords: [962, 189, 919, 211, 944, 237, 985, 218],
        preFillColor: "pink",
        //link: Coffee?.data?.tables[1]?.name,
      },

      {
        name:
          Coffee?.data?.tables[3]?.name +
          " | " +
          Coffee?.data?.tables[3]?.users.length +
          "/" +
          Coffee?.data?.tables[3]?.limitNumber +
          " persons",
        shape: "poly",
        coords: [1011, 230, 968, 252, 994, 280, 1037, 260],
        preFillColor: "pink",
        //link: Coffee?.data?.tables[2]?.name,
      },
      {
        name:
          Coffee?.data?.tables[4]?.name +
          " | " +
          Coffee?.data?.tables[4]?.users.length +
          "/" +
          Coffee?.data?.tables[4]?.limitNumber +
          " persons",
        shape: "poly",
        coords: [
          1012,
          464,
          1000,
          452,
          996,
          419,
          1010,
          404,
          1054,
          405,
          1067,
          419,
          1071,
          451,
          1058,
          464,
        ],
        preFillColor: "pink",
        //link: Coffee?.data?.tables[3]?.name,
        //   fillColor: "yellow",
      },
      {
        name:
          Coffee?.data?.tables[2]?.name +
          " | " +
          Coffee?.data?.tables[2]?.users.length +
          "/" +
          Coffee?.data?.tables[2]?.limitNumber +
          " persons",
        shape: "circle",
        coords: [602, 573, 30],
        preFillColor: "pink",
        //link: Coffee?.data?.tables[3]?.name,
        //   fillColor: "yellow",
      },
      // { name: "5", shape: "circle", coords: [170, 100, 25] },
    ],
  };
  const URL = "/Bar.png";
  const [msg, setMsg] = useState();
  const [hoveredArea, setHoveredArea] = useState();
  const [moveMsg, setMoveMsg] = useState();
  let history = useHistory();

  const load = () => {
    setMsg("Interact with image !");
  };
  const clicked = (area) => {
    setMsg(
      `You clicked on ${area.name} at coords ${JSON.stringify(area.coords)} !`
    );
    let res = area.name.substring(0, area.name.indexOf("|"));
    history.push("602b353c3ea4745e500e4998/" + res);
  };
  const clickedOutside = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
  };

  const moveOnImage = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  };

  const enterArea = (area) => {
    setHoveredArea(area);
    setMsg(
      `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`
    );
  };

  const leaveArea = (area) => {
    setHoveredArea(null);
    setMsg(
      `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`
    );
  };

  const moveOnArea = (area, evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMsg(
      `You moved on ${area.shape} ${area.name} at coords ${JSON.stringify(
        coords
      )} !`
    );
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

  return (
    <div className="grid">
      <div className="presenter">
        {" "}
        <div className="justify-content-md-center">
          <div
            className="justify-content-md-center"
            style={{ position: "relative", marginLeft: "250px" }}
          >
            <br />

            <ImageMapper
              src={URL}
              map={MAP}
              width={1500}
              onLoad={() => load()}
              onClick={(area) => clicked(area)}
              onMouseEnter={(area) => enterArea(area)}
              onMouseLeave={(area) => leaveArea(area)}
              onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
              onImageClick={(evt) => clickedOutside(evt)}
              onImageMouseMove={(evt) => moveOnImage(evt)}
            />

            {hoveredArea && (
              <span
                className="tooltip"
                style={{ ...getTipPosition(hoveredArea) }}
              >
                {hoveredArea && hoveredArea.name}
              </span>
            )}
          </div>
        </div>
        {/* <pre className="message">{msg ? msg : null}</pre>
        <pre>{moveMsg ? moveMsg : null}</pre> */}
      </div>
    </div>
  );
};

export default Coffe11;
