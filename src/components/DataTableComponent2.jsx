import React, { useState, useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "./CustomImage"
import { Badge } from "@/components/ui/badge"
import { useCombinedSourcesInfo } from '@/hooks/useCombinedSourcesInfo'
import { useStopTracking } from '@/hooks/useTrackedSources'
import ConfirmationToaster from './ConfirmationToasterComponent'
import { toast } from 'sonner'

// const columns = [
//   {
//     accessorKey: "thumbnail_url",
//     header: "",
//     cell: ({ row }) => (
//       <a href={row.original.url} target='parent_'>
//       <Image
//         alt="Thumbnail url"
//         className="aspect-square rounded-md object-cover"
//         height="60px"
//         src={row.getValue("thumbnail_url")}
//         width="100px"
//       />
//       </a>
//     ),
//     enableSorting: false,
//     enableHiding: true,
//   },
//   {
//     accessorKey: "author_name",
//     header: "Author Name",
//     cell: ({ row }) => (
//       <a href={row.original.author_url} target='parent_'>
//       <Badge variant="outline">{row.getValue("author_name")}</Badge>
//       </a>
//     ),
//     enableSorting: true,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "title",
//     header: "Title",
//     cell: ({ row }) => (
//       <a href={row.original.url} target='parent_'>
//       <div className="font-medium">{row.getValue("title")}</div>
//       </a>
//     ),
//     enableSorting: true,
//     enableHiding: false,
//   },
//   // {
//   //   accessorKey: "totalSales",
//   //   header: "Total Sales",
//   //   cell: ({ row }) => (
//   //     <div className="text-right">{row.getValue("totalSales")}</div>
//   //   ),
//   //   enableSorting: true,
//   //   enableHiding: false,
//   // },
//   {
//     accessorKey: "userSource_updated_at",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Date added
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div className="lowercase">{row.getValue("userSource_updated_at")}</div>,
//     enableSorting: true,
//     enableHiding: false,
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const stopTracking = useStopTracking();

//       const handleStopTracking = async () => {
//         const result = await stopTracking(row.original.url, row.original.userSource_id);
//         if (result.success) {
//           toast.success('Successfully stopped tracking source.');
//         } else {
//           toast.error('Error stopping tracking source.');
//         }
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//              // onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               {/* Stop Tracking */}
//               <ConfirmationToaster onConfirm={handleStopTracking} />
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <a href={row.original.author_url} target='parent_'>
//             <DropdownMenuItem>View Channel</DropdownMenuItem>
//             </a>
//             <a href={row.original.url} target='parent_'>
//             <DropdownMenuItem>Watch Video</DropdownMenuItem>
//             </a>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

export function DataTableDemo2( { sources, userSources, setSourcesUpdateNeeded, setUserSourcesUpdateNeeded, children } ) {

  const stopTracking = useStopTracking(setSourcesUpdateNeeded, setUserSourcesUpdateNeeded);

  const columns = useMemo(() => [
    {
      accessorKey: "thumbnail_url",
      header: "",
      cell: ({ row }) => (
        <a href={row.original.url} target='parent_'>
        <Image
          alt="Thumbnail url"
          className="aspect-square rounded-md object-cover"
          height="60px"
          src={row.getValue("thumbnail_url")}
          width="100px"
        />
        </a>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "author_name",
      header: "Author Name",
      cell: ({ row }) => (
        <a href={row.original.author_url} target='parent_'>
        <Badge variant="outline">{row.getValue("author_name")}</Badge>
        </a>
      ),
      // enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <a href={row.original.url} target='parent_'>
        <div className="font-medium">{row.getValue("title")}</div>
        </a>
      ),
      // enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "userSource_updated_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="lowercase">{row.getValue("userSource_updated_at")}</div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleStopTracking = async () => {
          toast.promise(
            stopTracking(row.original.url, row.original.userSource_id),
            {
              loading: 'Stopping tracking...',
              success: 'Successfully stopped tracking video.',
              error: 'Error stopping tracking video.',
            }
          );
        };

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <ConfirmationToaster onConfirm={handleStopTracking} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <a href={row.original.author_url} target='parent_'>
              <DropdownMenuItem>View Channel</DropdownMenuItem>
              </a>
              <a href={row.original.url} target='parent_'>
              <DropdownMenuItem>Watch Video</DropdownMenuItem>
              </a>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [stopTracking]);


  // console.log('Sources in DataTable:', sources);

  const [CombinedSourcesInfo] = useCombinedSourcesInfo(sources, userSources);
  const data = CombinedSourcesInfo

  // const [rowSelection, setRowSelection] = React.useState({})

  // Pagination state
  const defaultPageSize = 6;
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: paginationState
    },
    onPaginationChange: setPaginationState,
    // onRowSelectionChange: setRowSelection,
    // state: {
    //   rowSelection,
    //   // pagination: { pageSize }
    // },
  })

  const getColumnDisplayName = (id) => {
    switch (id) {
      case 'thumbnail_url':
        return 'Thumbnail';
      case 'author_name':
        return 'Author';
      case 'title':
        return 'Title';
      case 'userSource_updated_at':
        return 'Date Added';
      case 'actions':
        return 'Actions';
      default:
        return id;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">

        <Input
          type='search'
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mr-2">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {/* {column.id} */}
                    {getColumnDisplayName(column.id)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {children}

      </div>

      <div className="rounded-md border-b pt-4">

        <Table >

          <TableHeader className="" >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b" >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4 ">
        <div className="flex-1 text-xs text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Showing <strong>{table.getPaginationRowModel().rows.length}</strong> of{" "}
          <strong>{table.getFilteredRowModel().rows.length}</strong> rows
        </div>

        <div className="text-xs text-muted-foreground">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
