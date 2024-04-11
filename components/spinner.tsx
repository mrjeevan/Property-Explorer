"use client";
import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner({ loading = true }: { loading: boolean }) {
  const cssOverride: CSSProperties = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={cssOverride}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      loading={loading}
    />
  );
}

export default Spinner;
