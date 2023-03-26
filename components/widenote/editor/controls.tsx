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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaPen, FaEraser, FaArrowsAlt } from "react-icons/fa";
import { MdIosShare, MdSettings } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function EditorControls({
  stageRef,
  notename,
  setNotename,
  tool,
  setTool,
  strokeWidth,
  setStrokeWidth,
  penColor,
  setPenColor,
  tension,
  setTension,
  opacity,
  setOpacity,
  stageColor,
  setStageColor,
  stageWidth,
  setStageWidth,
  stageHeight,
  setStageHeight,
  layers,
  setLayers,
  activeLayer,
  setActiveLayer,
  stageX,
  stageY,
  setStageX,
  setStageY,
}: {
  stageRef: any;
  notename: string;
  setNotename: any;
  tool: string;
  setTool: any;
  strokeWidth: number;
  setStrokeWidth: any;
  penColor: string;
  setPenColor: any;
  tension: number;
  setTension: any;
  opacity: number;
  setOpacity: any;
  stageColor: string;
  setStageColor: any;
  stageWidth: number;
  setStageWidth: any;
  stageHeight: number;
  setStageHeight: any;
  layers: any;
  setLayers: any;
  activeLayer: number;
  setActiveLayer: any;
  stageX: number;
  stageY: number;
  setStageX: any;
  setStageY: any;
}) {
  return (
    <>
      <style jsx global>{`
        #cursor-mode-control {
          position: fixed;
          bottom: 10px;
          left: 15px;
          z-index: 1000;
        }
        #pen-option-control {
          position: fixed;
          bottom: 10px;
          right: 15px;
          z-index: 1000;
        }
        #note-option-control {
          position: fixed;
          top: 10px;
          right: 15px;
          z-index: 1000;
        }
        #note-setting-control {
          position: fixed;
          top: 10px;
          left: 15px;
          z-index: 1000;
        }
        #layer-call-control {
          position: fixed;
          bottom: 100px;
          right: 0;
          z-index: 1000;
        }
      `}</style>
      <CursorModeControl tool={tool} setTool={setTool} />
      <PenOptionControl
        strokeWidth={strokeWidth}
        setStrokeWidth={(newstate) => setStrokeWidth(newstate)}
        penColor={penColor}
        setPenColor={(newstate) => setPenColor(newstate)}
        opacity={opacity}
        setOpacity={(newState) => setOpacity(newState)}
      />
      <NoteOptionControl
        stageRef={stageRef}
        notename={notename}
        stageWidth={stageWidth}
        stageHeight={stageHeight}
        stageX={stageX}
        stageY={stageY}
        setStageX={(newState) => setStageX(newState)}
        setStageY={(newState) => setStageY(newState)}
      />
      <NoteSettingControl
        notename={notename}
        setNotename={(newstate) => setNotename(newstate)}
        stageColor={stageColor}
        setStageColor={(newState) => setStageColor(newState)}
        stageWidth={stageWidth}
        setStageWidth={(newState) => setStageWidth(newState)}
        stageHeight={stageHeight}
        setStageHeight={(newState) => setStageHeight(newState)}
      />
      <LayerDrawer
        layers={layers}
        setLayers={(newState) => setLayers(newState)}
        activeLayer={activeLayer}
        setActiveLayer={(newState) => setActiveLayer(newState)}
      />
    </>
  );
}

function CursorModeControl({ tool, setTool }: { tool: string; setTool: any }) {
  return (
    <div id="cursor-mode-control">
      <Box bg="gray.100" w="140px" p={2} color="gray.600" borderRadius="xl">
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
  opacity,
  setOpacity,
}: {
  strokeWidth: number;
  setStrokeWidth: any;
  penColor: string;
  setPenColor: any;
  opacity: number;
  setOpacity: any;
}) {
  return (
    <div id="pen-option-control">
      <Box
        bg="gray.100"
        w="50vw"
        maxW="1200px"
        p={4}
        color="gray.600"
        borderRadius="xl"
      >
        <Flex>
          <Center w="40px">
            <input
              type="color"
              id="head"
              name="head"
              value={penColor}
              onChange={(e) => {
                setPenColor(e.target.value);
              }}
            />
          </Center>
          <Box flex="1">
            <Slider
              aria-label="slider-ex-1"
              value={strokeWidth}
              onChange={(val) => setStrokeWidth(val)}
              min={0}
              max={50}
              step={0.1}
              w="100%"
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
            <Slider
              aria-label="slider-ex-1"
              value={opacity * 100}
              onChange={(val) => setOpacity(val / 100)}
              min={0}
              max={100}
              step={1}
              w="100%"
            >
              <SliderMark
                value={opacity * 100}
                textAlign="center"
                bg="blue.500"
                color="white"
                mb="-10"
                ml="-6"
                w="14"
              >
                {opacity * 100} %
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

function NoteOptionControl({
  stageRef,
  notename,
  stageWidth,
  stageHeight,
  stageX,
  stageY,
  setStageX,
  setStageY,
}: {
  stageRef: any;
  notename: string;
  stageWidth: number;
  stageHeight: number;
  stageX: number;
  stageY: number;
  setStageX: any;
  setStageY: any;
}) {
  function downloadImg() {
    const name = notename;
    stageRef.current.width(stageWidth);
    stageRef.current.height(stageHeight);
    const nowposX = stageRef.current.x();
    const nowposY = stageRef.current.y();
    stageRef.current.x(0);
    stageRef.current.y(0);
    const uri = stageRef.current.toDataURL({
      pixelRatio: window.devicePixelRatio,
    });
    downloadUri(name, uri);
    stageRef.current.width(window.innerWidth);
    stageRef.current.height(window.innerHeight);
    setStageX(nowposX);
    setStageY(nowposY);
  }
  function downloadJSON() {
    const json = JSON.stringify(stageRef.current.toJSON());
    const blob = new Blob([json], { type: "application/json" });
    const uri = window.URL.createObjectURL(blob);
    downloadUri(notename, uri);
  }
  function downloadUri(name, uri) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }
  return (
    <div id="note-option-control">
      <Box bg="gray.100" w="100px" p={2} color="gray.600" borderRadius="xl">
        <Center>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Share"
              icon={<MdIosShare />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem onClick={() => downloadImg()}>Download PNG</MenuItem>
              <MenuItem onClick={() => downloadJSON()}>Download JSON</MenuItem>
            </MenuList>
          </Menu>
        </Center>
      </Box>
    </div>
  );
}

function NoteSettingControl({
  notename,
  setNotename,
  stageColor,
  setStageColor,
  stageWidth,
  setStageWidth,
  stageHeight,
  setStageHeight,
}: {
  notename: string;
  setNotename: any;
  stageColor: string;
  setStageColor: any;
  stageWidth: number;
  setStageWidth: any;
  stageHeight: number;
  setStageHeight: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div id="note-setting-control">
        <Box bg="gray.100" w="200px" p={2} color="gray.600" borderRadius="xl">
          <Flex>
            <Center>
              <Input
                placeholder="Note Name"
                value={notename}
                onChange={(e) => setNotename(e)}
              />
              <IconButton
                aria-label="Canvas Setting"
                onClick={onOpen}
                icon={<MdSettings />}
              />
            </Center>
          </Flex>
        </Box>
      </div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Canvas Setting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <NumberInput
                w={28}
                step={100}
                value={stageWidth}
                onChange={(e) => setStageWidth(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              x
              <NumberInput
                w={32}
                step={100}
                value={stageHeight}
                onChange={(e) => setStageHeight(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <input
              type="color"
              id="stageColor"
              name="stageColor"
              value={stageColor}
              onChange={(e) => {
                setStageColor(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function LayerDrawer({
  layers,
  setLayers,
  activeLayer,
  setActiveLayer,
}: {
  layers: any;
  setLayers: any;
  activeLayer: number;
  setActiveLayer: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <div id="layer-call-control">
        <Button ref={btnRef} colorScheme="blackAlpha" onClick={onOpen}>
          {layers[activeLayer - 1].name}
        </Button>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Layer</DrawerHeader>

          <DrawerBody>
            {layers.map((x) => (
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                onClick={() => setActiveLayer(x.id)}
                backgroundColor={activeLayer == x.id ? "gray.100" : undefined}
              >
                <Stack>
                  <CardBody>
                    <Heading size="md">{x.name}</Heading>
                    <IconButton
                      variant="solid"
                      aria-label="visible"
                      icon={x.visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                      colorScheme="gray"
                    />
                  </CardBody>
                </Stack>
              </Card>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
