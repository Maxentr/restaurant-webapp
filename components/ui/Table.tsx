"use client"

import React from "react"
import RCTable from "rc-table"
import { ColumnsType, DefaultRecordType } from "rc-table/lib/interface"
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid"

const CustomExpandIcon = (props: any) => {
  return (
    <div
      onClick={(e) => {
        props.onExpand(props.record, e)
      }}
      className="expand-row-icon w-full h-full cursor-pointer"
    >
      {props.expanded ? (
        <MinusIcon className="fill-gray-900 w-4" />
      ) : (
        <PlusIcon className="fill-gray-900 w-4" />
      )}
    </div>
  )
}

type Props = {
  columns: ColumnsType<DefaultRecordType>
  rowKey: string
  expandOptions?: ExpandTableProps
}

interface TableProps<T> extends Props {
  data: T[]
}

interface ExpandTableProps extends Props {
  accessors: string
}

function Table<T>({ data, rowKey, columns, expandOptions }: TableProps<T>) {
  return data.length > 0 ? (
    <RCTable
      rowKey={(row) => row[rowKey]}
      columns={columns}
      expandable={{
        showExpandColumn: true,
        indentSize: 0,
        expandRowByClick: false,
        expandedRowClassName: () => "border border-gray-200",
        expandedRowRender: expandOptions
          ? (row) => (
              <Table
                rowKey={(row) => row[rowKey]}
                data={row?.[expandOptions.accessor] as any[]}
                columns={expandOptions.columns}
                expandOptions={expandOptions.expandOptions}
              />
            )
          : undefined,
        expandIcon: CustomExpandIcon,
      }}
      data={data as any[]}
      className=""
      rowClassName="border border-gray-200"
    />
  ) : (
    <p>La table n&apos;a pas de données</p>
  )
}

export default Table
