import React, { useState } from 'react';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from './Table';
import {Link} from 'react-router-dom'

const getData = () => {
  const data = [
    {
      id: 1,
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      status: 'Active',
      role: 'Admin',
      age: 27,
      imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      id: 2,
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com',
      title: 'Product Directives Officer',
      department: 'Intranet',
      status: 'Inactive',
      role: 'Owner',
      age: 43,
      imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ];
  return [...data, ...data, ...data].map((item, index) => ({ ...item, id: index + 1 }));
};

const ActionButtons = ({ row, onEdit, onDelete, onView }) => {
  return (
    <div className="flex space-x-1">
      <Link to = '/dashboard/create-game'>
         <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        View
      </button>
      </Link>
      <button
        className="bg-red hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => onDelete(row.original)}
      >
        Delete
      </button>
   
    </div>
  );
};

function Home() {


  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: 'imgUrl',
        emailAccessor: 'email',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusPill,
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Role',
        accessor: 'role',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <ActionButtons row={row}  />
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div>
          <h1 className="text-xl font-semibold">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Add a New Game
            </button>
          </h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

export default Home;
