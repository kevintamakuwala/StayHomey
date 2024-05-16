import React from "react";
import "./Shimmer.css";
import { ShimmerContentBlock } from "react-shimmer-effects-18";

const ShimmerBookings = () => {
  return (
    <div className="shimmer-booking">
      <ShimmerContentBlock title text thumbnailWidth={100} />
    </div>
  );
};

export default ShimmerBookings;
