import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers} from '../services/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm'
import _, { debounce } from 'lodash'
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse"
import { toast } from 'react-toastify';


const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [isShowModelAddUser,setIsShowModelAddUser] = useState(false)

    const [isShowModelEditUser,setIsShowModelEditUser] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [sortBy, setSortBy] = useState("asc")
    const [sortField, setSortField] = useState("id")

    const [keyword, setKeyword] = useState("")

    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setIsShowModelAddUser(false)
        setIsShowModelEditUser(false)
        setIsShowModalDelete(false)
    }


    useEffect(() => {
        getUsers(1)
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUsers(page);
        if(res && res.data) {
            setTotalUsers(res.total)
            setTotalPage(res.total_pages)
            setListUsers(res.data)
        }
    }

    const handlePageClick = (event) =>{
        getUsers(+event.selected + 1)
    }

    const handleUpdate = (user) => {
        setListUsers([user,...listUsers])
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModelEditUser(true)
    }

    const handleEditUserFromModal = (user) =>{
        let cloneListUser = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item=>item.id === user.id)
        cloneListUser[index].first_name = user.first_name
        setListUsers(cloneListUser)
    }

    const handleConfirmDelete = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }
    
    const handleDeleteUser =(user) => {
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = cloneListUser.filter(item=> item.id !== user.id)
        setListUsers(cloneListUser)
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)

        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy])
        setListUsers(cloneListUser)
    }

    const handleSearch = (e) => {
        let term = e.target.value
        setKeyword(term)
        if(term) {
            let cloneListUser = _.cloneDeep(listUsers)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
            
            setListUsers(cloneListUser)
        } else {
            getUsers(1)
        }
    }

    const getUserExport = (event, done) => {
        let result = [];
        if(listUsers && listUsers.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"])
            listUsers.map((item, index) => {
                let arr = []
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(result)
            })

            setDataExport(result)
            done()
        }
    }

    const handleImportData = (e) => {
        if(e.target && e.target.files && e.target.files[0]){
            let file = e.target.files[0]
            if(file.type !== "text/csv") {
                toast.error("Only accept csv file.")
                return;
            }

            Papa.parse(file, {
                // header: true,
                complete: function(results) {
                    let rawCSV = results.data
                    if(rawCSV.length > 0) {
                        if(rawCSV[0] && rawCSV[0].length === 3){
                            if(rawCSV[0][0] !== "email" ||
                                rawCSV[0][1] !== "first_name" ||
                                rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format header CSV files")
                            } else {
                                let result = []
                                rawCSV.map((item, index) => {
                                    if(index > 0 && item.length === 3) {
                                        let obj = {}
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj)
                                    }
                                })
                                setListUsers(result)
                            }
                        } else {
                            toast.error("Wrong format CSV files")
                        }
                    } else {
                        toast.error("Not found data")
                    }
                }
            })
        }
    }
    


    return (
        <>
        <div className='row my-3 d-flex justify-content-between'>
          <h3 className='col-sm-2 col 12'>List user</h3>
          <div className='col-sm-4 col-12 search-input'>
            <input value={keyword} onChange={(e) => handleSearch(e)} className='form-control' placeholder='Search'/>
          </div >
          <div className='col-sm-6 col-12'>
            <label htmlFor="test" className="btn btn-warning">
            <i class="fa-solid fa-file-import mx-2"></i>
                import
            </label>
            <input onChange={(e) => handleImportData(e)} type='file' id="test" hidden/>
           
            <CSVLink
            asyncOnClick={true}
            onClick={getUserExport}
            filename={"users.csv"}
            className="btn btn-primary mx-3"
            data={dataExport}
            >
                <i class="fa-solid fa-file-arrow-down mx-2"></i>
                Export
            </CSVLink>
            <button className='btn btn-success' onClick={() => {setIsShowModelAddUser(true)}}>
            <i className="fa-solid fa-circle-plus mx-2"></i>
            Add User</button>
          </div>
        </div>
        <div className='customize-table'>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th className='d-flex'>
                    <span>ID</span>
                    <span className='mx-2'>
                    <i
                    className="fa-solid fa-arrow-down-wide-short"
                    onClick={() => handleSort("desc", "id")}
                    >
                    </i>
                    </span>
                    <span className='mx-2'>
                    <i
                    className="fa-solid fa-arrow-up-wide-short"
                    onClick={() => handleSort("asc", "id")}
                    >
                    </i>
                    </span>
                </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>EMAIL</th>
                <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    listUsers && listUsers.length > 0 &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`user-${index}`}>
                                <td>{item.id}</td> 
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td className='d-flex justify-content-around'>
                                    <button className='btn btn-warning'
                                    onClick={() => handleEditUser(item)}
                                    >
                                        exit
                                    </button>
                                    <button
                                    className='btn btn-danger'
                                    onClick={() => handleConfirmDelete(item)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </Table>
        </div>
        
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel="< previous"

            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
        />
        <ModalAddUser 
        show = {isShowModelAddUser}
        handleClose = {handleClose}
        handleUpdate = {handleUpdate}
        />
        <ModalEditUser
        show={isShowModelEditUser}
        handleClose = {handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
        />

        <ModalConfirm
        show = {isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUser = {handleDeleteUser}
        />
        </>
    )
}

export default TableUsers