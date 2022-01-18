import './table.css';
import React from 'react';
import { Table } from 'antd';
import { useState } from 'react';
import { Input, Modal, Button } from 'antd';
import { AudioOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
interface DataType {
  key: React.Key;
  name: string;
  desc: string;
  price: number;
  address: string;
}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const AppTable = () => {
  const [newEditUser, setNewEditUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const data: any = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 10 + i,
      address: `London, Park Lane no. ${i}`,
    });
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
        return record1.age > record2.age;
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Retirement',
      dataIndex: 'retirement',
      render: (value: any, record: any) => {
        return (
          <p>
            {record.age >= 50
              ? 'Yes, he retiremented'
              : `No, he just ${record.age}`}
          </p>
        );
      },
      filters: [
        { text: 'Retiremented', value: true },
        { text: 'Not Retiremented', value: false },
      ],
      onFilter: (value: any, record: any) => {
        return record.age >= 50 === value;
      },
    },
    {
      title: 'Action',
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsEditing(true);
                editUser(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                deteleStudent(record);
              }}
              style={{ color: 'red', marginLeft: '15px', cursor: 'pointer' }}
            />
          </>
        );
      },
    },
  ];
  const editUser = (record: any) => {
    setNewEditUser({ ...record });
  };

  const deteleStudent = (record: any) => {
    Modal.confirm({
      title: 'Are you sure ?',
      onOk: () => {
        setDataTable((pre) => pre.filter((user) => user.key !== record.key));
      },
      okText: 'Delete',
    });
  };
  const [newUser, setNewUser] = useState({
    key: Math.random() * 100,
    name: '',
    age: 0,
    address: '',
  });

  const [value, setValue] = React.useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setDataTable((pre) => {
      return [...pre, newUser];
    });
    console.log(newUser);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleSearch = (type: any, value: any) => {
    const newData = data.filter((x: any) => {
      return String(x[type]).includes(value);
    });
    setDataTable(newData);
  };

  const [dataTable, setDataTable] = useState(data);

  return (
    <>
      <div className="fitler">
        <Button
          type="primary"
          onClick={showModal}
          size="large"
          style={{ marginRight: '15px' }}
        >
          Add User
        </Button>
        <Modal
          title="Edit user"
          visible={isEditing}
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => {
            setIsEditing(false);
            console.log(newEditUser);
            setDataTable((pre) => {
              return pre.map((user) => {
                if (user.key == newEditUser.key) {
                  return newEditUser;
                } else return user;
              });
            });
          }}
          okText="Edit"
        >
          <Input
            addonBefore="Name"
            style={{ marginBottom: '10px' }}
            value={newEditUser.name}
            onChange={(x) => {
              setNewEditUser((pre) => {
                return { ...{ ...pre, name: x.target.value } };
              });
            }}
          />
          <Input
            addonBefore="Age"
            style={{ marginBottom: '10px' }}
            value={String(newEditUser.age)}
            onChange={(x) => {
              setNewEditUser((pre) => {
                return { ...{ ...pre, age: Number(x.target.value) } };
              });
            }}
          />
          <Input
            addonBefore="Address"
            style={{ marginBottom: '10px' }}
            value={newEditUser.address}
            onChange={(x) => {
              setNewEditUser((pre) => {
                return { ...{ ...pre, address: x.target.value } };
              });
            }}
          />
        </Modal>

        <Modal
          title="New user"
          visible={isModalVisible}
          okText="Add"
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            addonBefore="Name"
            style={{ marginBottom: '10px' }}
            onChange={(x) => {
              setNewUser((pre) => {
                return { ...{ ...pre, name: x.target.value } };
              });
            }}
          />
          <Input
            addonBefore="Age"
            style={{ marginBottom: '10px' }}
            onChange={(x) => {
              setNewUser((pre) => {
                return { ...{ ...pre, age: Number(x.target.value) } };
              });
            }}
          />
          <Input
            addonBefore="Address"
            style={{ marginBottom: '10px' }}
            onChange={(x) => {
              setNewUser((pre) => {
                return { ...{ ...pre, address: x.target.value } };
              });
            }}
          />
        </Modal>
        <Search
          addonBefore="Name"
          className="input-search"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            handleSearch('name', value);
          }}
          onBlur={() => {
            setDataTable(data);
          }}
        />
        <Search
          addonBefore="Age"
          className="input-search"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            handleSearch('age', value);
          }}
          onBlur={() => {
            setDataTable(data);
          }}
        />
        <Search
          addonBefore="Address"
          className="input-search"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            handleSearch('address', value);
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataTable}
        pagination={{
          pageSize: pageSize,
          current: page,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        style={{ height: '100%' }}
        scroll={{ y: 700 }}
      />
    </>
  );
};

export default AppTable;
