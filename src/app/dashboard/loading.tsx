"use client";

import { Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="m-10">
      <Stack>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    </div>
  );
}
