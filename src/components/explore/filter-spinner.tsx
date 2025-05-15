import React, { Dispatch, SetStateAction, useState } from "react";
import { MdRefresh } from "react-icons/md";

interface FilterSpinnerPrps {
  clearFilters: () => void;
  isSpinning: boolean;
  setIsSpinning: Dispatch<SetStateAction<boolean>>;
}

export default function FilterSpinner({
  clearFilters,
  isSpinning,
  setIsSpinning,
}: FilterSpinnerPrps) {
  return (
    <MdRefresh
      onClick={clearFilters}
      className={`${isSpinning ? "animate-spin" : null}`}
    />
  );
}
