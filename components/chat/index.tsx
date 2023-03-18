import { Button, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";

export function ModalAddRoom() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>+ Create Room</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>新規トークルーム作成</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>個人</Tab>
    <Tab>グループ</Tab>
    <Tab>公開</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>ハンドルID</p>
      <InputGroup>
    <InputLeftAddon children='@' />
    <Input type='text' placeholder='handleID' />
  </InputGroup>
    </TabPanel>
    <TabPanel>
      <p>グループ</p>
    </TabPanel>
    <TabPanel>
      <p>公開</p>
    </TabPanel>
  </TabPanels>
</Tabs>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                + 作成
              </Button>
              <Button variant='ghost' onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }