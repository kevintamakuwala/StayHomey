import React from "react";
import { ShimmerFeaturedGallery, ShimmerText } from "react-shimmer-effects-18";
const ShimmerSingle = () => {
  return (
    <div>
      <ShimmerFeaturedGallery
        row={2}
        col={2}
        card
        color="red"
        frameHeight={600}
      />
      ;
      <ShimmerText line={5} gap={10} />;
    </div>
  );
};

export default ShimmerSingle;
