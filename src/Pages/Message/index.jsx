import "./style.css";
import { Container } from 'react-bootstrap';
import { Footer, Navbar, Table } from '../../Components';
import { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";

const Message = () => {
    const [totalMessages, setTotalMessages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(25);

    const columns = [
        {
            name: "User Name",
            style: { width: "15%", cursor: 'pointer' },
            key: 'name',
        },
        {
            name: "Property Name",
            style: { width: "25%", cursor: 'pointer' },
            key: 'property.title',
        },
        {
            name: "Message",
            style: { width: "50%", cursor: 'pointer' },
            key: 'message',
            limit: 30
        },
    ];
    const actions = [
        {
            name: "Delete",
            handler: (row) => console.log(row._id),
            className: "bill-buttons",
            variant: 'outline-danger',
            style: { width: '10%' }
        },
    ];
    const rows = [
        {
            _id: 'abcd1234',
            name: 'Sualeh Siddiqui',
            email: 'sualehsiddiqui@gmail.com',
            phone: '03104568912',
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur expedita blanditiis ad at numquam, pariatur voluptatibus vitae ipsa ea, deleniti aliquam cumque facilis voluptates quam quo aperiam incidunt unde quis.',
            property: {
                title: 'Abcd',
                address: '9104 Janabyrd Cv, Austin, TX 78749',
                _id: 'abdfhstcmskjhn8923890',
            }
        }
    ];

    const [open, setOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState({});

    const handleClose = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleRowClick = (row) => {
        setSelectedMessage(row);
        setOpen(true)
    };

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