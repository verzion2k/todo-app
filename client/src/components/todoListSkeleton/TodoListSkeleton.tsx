import { Box, Skeleton } from "@mui/material";

export const TodoListSkeleton: React.FC = () => {
  return (
    <Box sx={{ m: 1 }}>
      <Skeleton
        variant="rectangular"
        width={236}
        height={50}
        style={{ margin: "4px 0" }}
      />
      <Skeleton
        variant="rectangular"
        width={236}
        height={50}
        style={{ margin: "4px 0" }}
      />
      <Skeleton
        variant="rectangular"
        width={236}
        height={50}
        style={{ margin: "4px 0" }}
      />
    </Box>
  );
};
