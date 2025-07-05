import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

export function FileContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="p-4 bg-gray-100 rounded-md">Right click me</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Open
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>View Options</ContextMenuLabel>
        <ContextMenuCheckboxItem checked={true}>
          Show Hidden Files
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show File Extensions</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
