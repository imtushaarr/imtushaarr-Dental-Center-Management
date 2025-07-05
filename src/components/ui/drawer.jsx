import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"

function SettingsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="btn">Open Settings</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Update your preferences below.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">/* form or content */</div>
        <DrawerFooter>
          <DrawerClose className="btn btn-secondary">Cancel</DrawerClose>
          <button className="btn btn-primary">Save</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
