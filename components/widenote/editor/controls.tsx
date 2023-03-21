import { IconButton, Box } from "@chakra-ui/react";
import { FaPen, FaEraser, FaArrowsAlt } from "react-icons/fa";

export default function EditorControls({
  tool,
  setTool,
}: {
  tool: string;
  setTool: any;
}) {
  return (
    <>
      <Box bg="gray.100" w="400px" p={4} color="gray.600" borderRadius="xl">
        This is the Box
      </Box>
      <IconButton
        variant="ghost"
        isActive={tool === "pen"}
        aria-label="Pen"
        icon={<FaPen />}
      />
      <IconButton
        variant="ghost"
        isActive={tool === "eraser"}
        aria-label="Eraser"
        icon={<FaEraser />}
      />
      <IconButton
        variant="ghost"
        isActive={tool === "cursor"}
        aria-label="Cursor"
        icon={<FaArrowsAlt />}
      />
    </>
  );
}
