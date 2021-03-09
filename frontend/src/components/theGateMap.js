import React, { useState } from "react";
import ImageMapper from "react-image-mapper";
import useCoffee from "./hooks/coffee_hooks/useCoffee";
import { useHistory } from "react-router-dom";

const Coffe11 = () => {
  let Coffee = useCoffee("604117f206be3e18ad24f3c8");
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
        coords: [619, 432, 724, 494, 793, 456, 688, 393],
        //preFillColor: "pink",
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
        coords: [539, 694, 646, 755, 717, 716, 611, 652],
        //preFillColor: "pink",
        //link: Coffee?.data?.tables[1]?.name,
      },

      {
        name:
          Coffee?.data?.tables[2]?.name +
          " | " +
          Coffee?.data?.tables[2]?.users.length +
          "/" +
          Coffee?.data?.tables[2]?.limitNumber +
          " persons",
        shape: "poly",
        coords: [356, 588, 464, 647, 532, 609, 425, 546],
        //preFillColor: "pink",
        //link: Coffee?.data?.tables[2]?.name,
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
        coords: [166, 493, 329, 398, 286, 373, 126, 466],
        //preFillColor: "pink",
        //link: Coffee?.data?.tables[3]?.name,
        //   fillColor: "yellow",
      },
      // { name: "5", shape: "circle", coords: [170, 100, 25] },
    ],
  };
  const URL = "/ccc2.jpg";
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
    history.push("602b34903ea4745e500e498e/" + res);
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
            <ImageMapper
              src={URL}
              map={MAP}
              width={1250}
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
