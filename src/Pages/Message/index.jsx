import "./style.css";
import { Container } from 'react-bootstrap';
import { Footer, Navbar, Table } from '../../Components';
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import authService from "../../Services/auth";
import { useDispatch, useSelector } from "react-redux";
import { show, hide } from "../../Store/spinnerSlice";
import Swal from "sweetalert2";


const Message = () => {
    const dispatch = useDispatch();

    const [totalMessages, setTotalMessages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const { user, isChecking, status } = useSelector(state => state.auth);

    const [rows, setRows] = useState([])

    const columns = [
        {
            name: "User Name",
            style: { width: "15%", cursor: 'pointer' },
            key: 'name',
        },
        {
            name: "Message",
            style: { width: "50%", cursor: 'pointer' },
            key: 'message',
            limit: 30
        },
        {
            name: "Delieverd",
            style: { width: "25%", cursor: 'pointer', color: '#454444' },
            key: 'createdAt',
        },
    ];
    const actions = [
        {
            name: "Delete",
            handler: (row) => handleDelete(user?._id, row._id),
            className: "bill-buttons",
            variant: 'outline-danger',
            style: { width: '10%' }
        },
    ];

    const [open, setOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState({});

    const handleClose = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleRowClick = (row) => {
        if (!row.read) markAsread(user?._id, row._id)
        setSelectedMessage(row);
        setOpen(true)
    };

    const getMessages = async (pageNo, limit, id) => {
        dispatch(show());
        try {
            const response = await authService.getAllMessages(pageNo, limit, id);

            setTotalMessages(response.totalMessages)

            setRows(response.messages);

        } catch (error) {
            console.log('Error fetching properties:', error.message);
            Swal.fire({
                icon: "error",
                title: "Error fetching properties!",
                text: error.message,
            });
        } finally {
            dispatch(hide());
        }
    };

    const handleDelete = async (userId, messageId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success ms-1",
                cancelButton: "btn btn-danger me-1"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(show());
                try {
                    await authService.deleteMessage(userId, messageId);

                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Message has been deleted.",
                        icon: "success"
                    });

                } catch (error) {
                    console.log('Error fetching properties:', error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Error fetching properties!",
                        text: error.message,
                    });
                } finally {
                    getMessages(currentPage, limit, userId)
                    dispatch(hide());
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Message is safe :)",
                    icon: "error"
                });
            }
        });
    }

    const markAsread = async (userId, messageId) => {
        try {
            await authService.markAsRead(userId, messageId);
        } catch (error) {
            console.log('Error fetching properties:', error.message);
        } finally {
            getMessages(currentPage, limit, userId);
        }
    }

    useEffect(() => {
        if (!isChecking && status) getMessages(undefined, undefined, user?._id);
    }, [user, isChecking, status]);

    return (
        <>
            <Navbar withoutHero={true} />
            <div className="new-properties-main-div">
                <Container>
                    <div className="properties-div">
                        <h2>All Messages</h2>
                        <div className="properties-table-main-div">
                            <Table
                                columns={columns}
                                data={rows}
                                actions={actions}
                                pagination={true}
                                totalQuantity={totalMessages}
                                limit={limit}
                                setLimit={setLimit}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                handleRowClick={handleRowClick}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
            <Modal
                title={''}
                open={open}
                onCancel={handleClose}
                width={'900px'}
                footer={false}
            >
                <div className="modal-main-div">
                    <h4>User's Message</h4>
                    <div className="d-flex">
                        <div className="d-flex me-5">
                            <p className="fw-bold mb-0">Name:</p>
                            <p className="ms-1 mb-0">
                                {selectedMessage?.name}
                            </p>
                        </div>
                        <div className="d-flex me-5">
                            <p className="fw-bold mb-0">Email:</p>
                            <p className="ms-1 mb-0">
                                <Link className="user-email" to={`mailto:${selectedMessage?.email}`}>
                                    {selectedMessage?.email}
                                </Link>
                            </p>
                        </div>
                        <div className="d-flex me-5">
                            <p className="fw-bold mb-0">Phone:</p>
                            <p className="ms-1 mb-0">
                                <Link className="user-email" to={`tel:${selectedMessage?.phone}`}>
                                    {selectedMessage?.phone}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex mb-1">
                        <div className="d-flex me-5">
                            <p className="fw-bold mb-0">Property Title:</p>
                            <p className="ms-1 mb-0">
                                {selectedMessage?.property?.title}
                            </p>
                        </div>
                        <div className="d-flex me-5">
                            <p className="fw-bold mb-0">Property Id:</p>
                            <p className="ms-1 mb-0">
                                {selectedMessage?.property?._id}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <p className="fw-bold mb-0">Property Address:</p>
                        <p className="ms-1 mb-0">
                            {selectedMessage?.property?.address}
                        </p>
                    </div>
                    <hr />
                    <h6>Message:</h6>
                    <div className="d-flex">
                        <p className="ms-1 mb-0">
                            {selectedMessage?.message}
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Message;