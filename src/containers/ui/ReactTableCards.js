/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React, {useState} from 'react';
import { Card, CardBody, CardTitle,Row,Button, Modal,ModalHeader,ModalBody,ModalFooter,Input,Label, FormGroup,
FormText, Form,CustomInput, } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import DatatablePagination from '../../components/DatatablePagination';
import {
  Colxx,
  Separator,
} from '../../components/common/CustomBootstrap';

import products from '../../data/products';
import  user from '../../dataTables/user';

function Table({match, columns, data, divided = false, defaultPageSize = 6, responsive = false, tableDark = false, tableGreen = false, tableBlue = false, isCenter = false }) {

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table 
        {...getTableProps()}
        className={` table table-bordered table-striped ${classnames({ 'table-divided': divided, 'table-responsive' : responsive })}`}
      >
        <thead className={`${classnames({ 'thead-dark text-center' : tableDark, 'bg-success text-center text-white' : tableGreen, 'bg-info text-white text-center' : tableBlue})}`}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={`${classnames({'text-center': isCenter})}`}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
               
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

// data top table Karyawan
export const ReactTableWithPaginationCard = ({match}) => {
    const [modalEditTop, setModalEditTop] = useState(false);
    const [modalAddTop, setModalAddTop] = useState(false);
    const [modalDeleteTop, setModalDeleteTop] = useState(false);
  const cols = React.useMemo(
    () => [
      {
        Header: 'Nik',
        accessor: 'nik',
        cellClass: 'list-item-heading w-10 text-center',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Nama',
        accessor: 'name',
        cellClass: ' w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Lokasi',
        accessor: 'location',
        cellClass: ' w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Area',
        accessor: 'area',
        cellClass: ' w-15',
        Cell: (props) => <>{props.value}</>,
      },
       {
        Header: 'Job Title',
        accessor: 'job',
        cellClass: ' w-15',
        Cell: (props) => <>{props.value}</>,
      },
        {
        Header: 'Action',
        cellClass: 'w-15 text-right',
        Cell: (props) => <><button className="btn btn-secondary"  onClick={() => setModalEditTop(true)} >
          <li className="glyph-icon simple-icon-note" style={{listStyleType:"none"}}></li>
        </button>{"  "}
        <button className="btn btn-danger" onClick={() => setModalDeleteTop(true)}>
          <li className="glyph-icon simple-icon-trash" style={{listStyleType:"none"}}></li>
        </button>
        </>
      },
    ],
    []
  );

  return (
    <>
    <Card className="mb-5">
      <CardBody>
        <CardTitle>
          <h5>Karyawan</h5>
         <button className="btn btn-secondary" onClick={() => setModalAddTop(true)}>
          <li className="glyph-icon simple-icon-plus" style={{listStyleType:"none"}}></li>
        </button>
        </CardTitle>
        <Table columns={cols} data={user} tableDark   />
      </CardBody>
    </Card>

// modal Add data top table Karyawan
 <div>
                <Modal
                  isOpen={modalAddTop}
                  toggle={() => setModalAddTop(!modalAddTop)}
                >
                  <ModalHeader>
                    <h5>Add Data</h5>
                  </ModalHeader>
                  <Form>
                  <ModalBody>
                     <FormGroup row>
                  <Label for="emailHorizontal" sm={2}  className="font-weight-bold">
                    Nik
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="number"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nik Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Nama
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nama Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Lokasi
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Lokasi Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Area
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Area Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Job Title
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Job Title Anda"
                    />
                  </Colxx>
                </FormGroup>
  
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => setModalAddTop(false)}
                    >
                     Save
                    </Button>{' '}
                    <Button
                      color="light"
                      onClick={() => setModalAddTop(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                  </Form>
                </Modal>
              </div>

 // end of modal Add data top table Karyawan
// modal update data top table Karyawan
              <div>
                <Modal
                  isOpen={modalEditTop}
                  toggle={() => setModalEditTop(!modalEditTop)}
                >
                  <ModalHeader>
                    <h5>Update Data</h5>
                  </ModalHeader>
                  <Form>
                  <ModalBody>
                     <FormGroup row>
                  <Label for="emailHorizontal" sm={2}  className="font-weight-bold">
                    Nik
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="number"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nik Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Nama
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nama Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Lokasi
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Lokasi Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Area
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Area Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Job Title
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Job Title Anda"
                    />
                  </Colxx>
                </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => setModalEditTop(false)}
                    >
                     Save
                    </Button>{' '}
                    <Button
                      color="light"
                      onClick={() => setModalEditTop(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                  </Form>
                </Modal>
              </div>
// end of modal upadate data top table karyawan

// modal delete of top table karyawan
            <div>            
                <Modal
                  isOpen={modalDeleteTop}
                  toggle={() => setModalDeleteTop(!modalDeleteTop)}
                >
                  <ModalHeader>
                   <h5>Delete data</h5>
                  </ModalHeader>
                  <ModalBody>
                   Apakah anda yakin menghapus data ini?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      onClick={() => setModalDeleteTop(false)}
                    >
                      Delete
                    </Button>{' '}
                    <Button
                      color="light"
                      onClick={() => setModalDeleteTop(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
// end modal delete of top table karyawan
               </>


  );
};



// end of data top table Karyawan

// data center table absen
export const ReactTableAbsen = ({ match }) => {
  const [modalAddCenter, setModalAddCenter] = useState(false);
  const [modalUpdateCenter, setModalUpdateCenter] = useState(false);
  const [modalDeleteCenter, setModalDeleteCenter] = useState(false);
  const cols = React.useMemo(
    () => [
      {
        Header: 'Nik',
        accessor: 'nik',
        cellClass: 'list-item-heading w-10 text-center',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Nama',
        accessor: 'name',
        cellClass: '  w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'lokasi',
        accessor: 'location',
        cellClass: '  w-15',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Area',
        accessor: 'area',
        cellClass: '  w-15',
        Cell: (props) => <>{props.value}</>,
      },
       {
        Header: 'Job Title',
        accessor: 'job',
        cellClass: ' w-15',
        Cell: (props) => <>{props.value}</>,
      },
       {
        Header: 'Masuk',
        accessor: 'enter',
        cellClass: '  w-5',
        Cell: (props) => <>{props.value}</>,
      },
       {
        Header: 'Pulang',
        accessor: 'home',
        cellClass: '  w-5',
        Cell: (props) => <>{props.value}</>,
      },
       {
        Header: 'Interval',
        accessor: 'interval',
        cellClass: '  w-5',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Action',
        cellClass: 'w-15 text-right',
        Cell: (props) => <><button className="btn btn-secondary" onClick={() => setModalUpdateCenter(true)} >
          <li className="glyph-icon simple-icon-note" style={{listStyleType:"none"}}></li>
        </button>{"  "}
        <button className="btn btn-danger" onClick={() => setModalDeleteCenter(true)}>
          <li className="glyph-icon simple-icon-trash" style={{listStyleType:"none"}}></li>
        </button>
        </>
      },
    ],
    []
  );
  return (
  <>
  <Card className="mb-5">
      <CardBody>
        <CardTitle>
          <h5>Data Absensi</h5>
          <button className="btn btn-secondary" onClick={() => setModalAddCenter(true)}>
          <li className="glyph-icon simple-icon-plus" style={{listStyleType:"none"}}></li>
        </button>
        </CardTitle>
        <Table columns={cols} data={user}  responsive tableGreen />
      </CardBody>
    </Card>
    // modal delete center table absen
      <div>            
                <Modal
                  isOpen={modalDeleteCenter}
                  toggle={() => setModalDeleteCenter(!modalDeleteCenter)}
                >
                  <ModalHeader>
                   <h5>Delete data</h5>
                  </ModalHeader>
                  <ModalBody>
                   Apakah anda yakin menghapus data ini?
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      onClick={() => setModalDeleteCenter(false)}
                    >
                      Delete
                    </Button>{' '}
                    <Button
                      color="light"
                      onClick={() => setModalDeleteCenter(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
    // end of delete center table absen
// modal update center table absen
<div>
                <Modal
                  isOpen={modalUpdateCenter}
                  toggle={() => setModalUpdateCenter(!modalUpdateCenter)}
                >
                  <ModalHeader>
                    <h5>Update Data</h5>
                  </ModalHeader>
                  <Form>
                  <ModalBody>
                     <FormGroup row>
                  <Label for="emailHorizontal" sm={2}  className="font-weight-bold">
                    Nik
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="number"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nik Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Nama
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nama Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Lokasi
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Lokasi Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Area
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Area Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Job Title
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Job Title Anda"
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Masuk
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan jam masuk Anda"
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Pulang
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan jam pulang Anda"
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Interval
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan jam interval Anda"
                    />
                  </Colxx>
                </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => setModalUpdateCenter(false)}
                    >
                     Save
                    </Button>{' '}
                    <Button
                      color="light"
                      onClick={() => setModalUpdateCenter(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                  </Form>
                </Modal>
              </div>
// end of modal update center table absen

    // modal add center table absen
<div>
                <Modal
                  isOpen={modalAddCenter}
                  toggle={() => setModalAddCenter(!modalAddCenter)}
                >
                  <ModalHeader>
                    <h5>Add Data</h5>
                  </ModalHeader>
                  <Form>
                  <ModalBody>
                     <FormGroup row>
                  <Label for="emailHorizontal" sm={2}  className="font-weight-bold">
                    Nik
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="number"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nik Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Nama
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Nama Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Lokasi
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Lokasi Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Area
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Area Anda"
                    />
                  </Colxx>
                </FormGroup>
                 <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Job Title
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan Job Title Anda"
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Masuk
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan jam masuk Anda"
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Pulang
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan jam pulang Anda"
                    />
                  </Colxx>
                </FormGroup>
                <FormGroup row>
                  <Label for="emailHorizontal" sm={2}   className="font-weight-bold">
                    Interval
                  </Label>
                  <Colxx sm={10}>
                    <Input
                      type="text"
                      // name="email"
                      // id="emailHorizontal"
                      placeholder="Masukan jam interval Anda"
                    />
                  </Colxx>
                </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => setModalAddCenter(false)}
                    >
                     Save
                    </Button>{' '}
                    <Button
                      color="light"
                      onClick={() => setModalAddCenter(false)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                  </Form>
                </Modal>
              </div>
    // end of modal add center table absen
    </>
  );
};
// end of data center table absen

export const ReactTableWithMasterDataLokasi = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Kode Lokasi',
        accessor: 'cdLocation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Nama Lokasi',
        accessor: 'location',
        cellClass: ' w-10',
        Cell: (props) => <>{props.value}</>,
      },
     
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <h5>Lokasi</h5>
        </CardTitle>
        <Table columns={cols} data={user}  tableBlue isCenter />
      </CardBody>
    </Card>
  );
};

 export const ReactTableWithMasterDataArea = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Kode Lokasi',
        accessor: 'cdArea',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Lokasi',
        accessor: 'location',
        cellClass: ' w-10',
        Cell: (props) => <>{props.value}</>,
      },
       {
        Header: 'Area',
        accessor: 'area',
        cellClass: ' w-10',
        Cell: (props) => <>{props.value}</>,
      },
     
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <h5>Area</h5>
        </CardTitle>
        <Table columns={cols} data={user} tableBlue isCenter />
      </CardBody>
    </Card>
  );
};



export const ReactTableDivided = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>
        <IntlMessages id="table.divided" />
      </CardTitle>
      <Table columns={cols} data={products} divided />
    </div>
  );
};
