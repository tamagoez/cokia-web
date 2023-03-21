import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  IconButton,
  Box,
  Center,
} from "@chakra-ui/react";
import { FaPen, FaEraser, FaArrowsAlt } from "react-icons/fa";

export default function EditorControls({
  tool,
  setTool,
  strokeWidth,
  setStrokeWidth,
  penColor,
  setPenColor,
}: {
  tool: string;
  setTool: any;
  strokeWidth: number;
  setStrokeWidth: any;
  penColor: string;
  setPenColor: any;
}) {
  return (
    <>
      <style jsx global>{`#cursor-mode-control {
            display: fixed;
            bottom: 10px;
            left: 10px;
            }     
          #pen-option-control {
            display: fixed;
            bottom: 10px;
            right: 10px;
          }`}</style>
      <CursorModeControl tool={tool} setTool={setTool} />
      <PenOptionControl
        strokeWidth={strokeWidth}
        setStrokeWidth={(newstate) => setStrokeWidth(newstate)}
        penColor={penColor}
        setPenColor={(newstate) => setPenColor(newstate)}
      />
    </>
  );
}

function CursorModeControl({ tool, setTool }: { tool: string; setTool: any }) {
  return (
    <div id="cursor-mode-control">
      <Box bg="gray.100" w="200px" p={4} color="gray.600" borderRadius="xl">
        <Center>
          <IconButton
            variant="ghost"
            isActive={tool === "pen"}
            onClick={() => setTool("pen")}
            aria-label="Pen"
            icon={<FaPen />}
          />
          <IconButton
            variant="ghost"
            isActive={tool === "eraser"}
            onClick={() => setTool("eraser")}
            aria-label="Eraser"
            icon={<FaEraser />}
          />
          <IconButton
            variant="ghost"
            isActive={tool === "cursor"}
            onClick={() => setTool("cursor")}
            aria-label="Cursor"
            icon={<FaArrowsAlt />}
          />
        </Center>
      </Box>
    </div>
  );
}

function PenOptionControl({
  strokeWidth,
  setStrokeWidth,
  penColor,
  setPenColor,
}: {
  strokeWidth: number;
  setStrokeWidth: any;
  penColor: string;
  setPenColor: any;
}) {
  return (
    <div id="pen-option-control">
      <Box bg="gray.100" w="400px" p={4} color="gray.600" borderRadius="xl">
        <Center>
          <Flex>
            <Box>
              <input
                type="color"
                id="head"
                name="head"
                value={penColor}
                onChange={(e) => {
                  setPenColor(e.target.value);
                }}
              />
            </Box>
            <Box flex="1">
              <Slider
                aria-label="slider-ex-1"
                value={strokeWidth}
                onChange={(val) => setStrokeWidth(val)}
                min={0}
                max={50}
                step={0.1}
                width="100%"
              >
                <SliderMark
                  value={strokeWidth}
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mb="-10"
                  ml="-6"
                  w="14"
                >
                  {strokeWidth} pt
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Flex>
        </Center>
      </Box>
    </div>
  );
}
