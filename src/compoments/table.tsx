import './table.css'
import { Table } from 'antd';
import { useState } from 'react';

interface DataType {
    key: React.Key;
    name: string;
    desc: string;
    price: number;
    address: string;
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
        sorter: (record1: any, record2: any) => {
            return record1.age > record2.age
        }
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Retirement',
        dataIndex: 'retirement',
        render: (value: any, record: any) => {
            return <p>{record.age >= 50 ? 'Yes, he retiremented' : `No, he just ${record.age}`}</p>
        },
        filters: [
            { text: 'Retiremented', value: true },
            { text: 'Not Retiremented', value: false },
        ],
        onFilter: (value: any, record: any) => {
            return (record.age >= 50) === value
        }
    }
];

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const data: any = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 10 + i,
        address: `London, Park Lane no. ${i}`,
    });
}

const AppTable = () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    return (
        <Table columns={columns} dataSource={data}
            pagination={{
                pageSize: pageSize,
                current: page,
                onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                }
            }}
            style={{ height: "100%" }}
            scroll={{ y: 700 }}
        />
    )
}

export default AppTable