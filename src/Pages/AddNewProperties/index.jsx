import "./style.css";
import { Navbar, Footer, Table, CustomAutoComplete } from "../../Components";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Image, Space } from "antd";
import { chunkArray, UsCities } from "../../Utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UsStates from 'states-us';
import propertyService from "../../Services/property";
import { show, hide } from "../../Store/spinnerSlice";
import Swal from "sweetalert2";
import { ImCross } from "react-icons/im";

const AddNewProperties = () => {
    const dispatch = useDispatch();
    const { status, isChecking, user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isChecking) {
            if (status === false) {
                navigate("/");
            }
        }
    }, [isChecking, status, navigate]);


    const [searchValue, setSearchValue] = useState("");
    const [propertyDiv, setPropertyDiv] = useState("")
    const [totalProperties, setTotalProperties] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [files, setFiles] = useState([]);
    const [filesEdit, setFilesEdit] = useState([]);
    const [states, setStates] = useState([]);
    const [currentEditProperty, setCurrentEditProperty] = useState('');
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setStates(UsStates.map(x => x.name.toLowerCase()))
    }, [])

    const [property, setProperty] = useState({
        name: '',
        price: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        location: '',
        bed: '',
        bath: '',
        availableFor: '',
        houseSqft: '',
        lotSqft: '',
    });
    const [propertyDetails, setPropertyDetails] = useState({
        type: '',
        yearBuilt: '',
        availablity: '',
        description: '',
    });
    const [features, setFeatures] = useState({
        bathrooms: '',
        bedrooms: '',
        appliances: '',
        interiorFeatures: '',
        heatingCooling: '',
        exterior: '',
        garage: '',
        landInfo: '',
        homeownersAssociation: '',
        schoolInfo: '',
        rentalInfo: '',
        amenities: '',
        otherInfo: '',
        buildingAndConstruction: '',
        utilities: '',
        homeFeatures: '',
    });

    const [propertFeatures, setPropertyFeatures] = useState([
        {
            title: 'Bedrooms',
            list: [],
        },
        {
            title: 'Bathrooms',
            list: [],
        },
        {
            title: 'Appliances',
            list: [],
        },
        {
            title: 'Interior Features',
            list: [],
        },
        {
            title: 'Heating and Cooling',
            list: [],
        },
        {
            title: 'Exterior and Lot Features',
            list: [],
        },
        {
            title: 'Garage and Parking',
            list: [],
        },
        {
            title: 'Land Info',
            list: [],
        },
        {
            title: 'Homeowners Association',
            list: [],
        },
        {
            title: 'School Information',
            list: [],
        },
        {
            title: 'Rental Info',
            list: [],
        },
        {
            title: 'Amenities and Community Features',
            list: [],
        },
        {
            title: 'Other Property Info',
            list: [],
        },
        {
            title: 'Building and Construction',
            list: [],
        },
        {
            title: 'Utilities',
            list: [],
        },
        {
            title: 'Home Features',
            list: [],
        },
    ]);

    const reset = () => {
        setProperty({
            name: '',
            price: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            location: '',
            bed: '',
            bath: '',
            availableFor: '',
            houseSqft: '',
            lotSqft: '',
        });
        setPropertyDetails({
            type: '',
            yearBuilt: '',
            availablity: '',
            description: '',
        });
        setFeatures({
            bathrooms: '',
            bedrooms: '',
            appliances: '',
            interiorFeatures: '',
            heatingCooling: '',
            exterior: '',
            garage: '',
            landInfo: '',
            homeownersAssociation: '',
            schoolInfo: '',
            rentalInfo: '',
            amenities: '',
            otherInfo: '',
            buildingAndConstruction: '',
            utilities: '',
            homeFeatures: '',
        });
        setPropertyFeatures([
            {
                title: 'Bedrooms',
                list: [],
            },
            {
                title: 'Bathrooms',
                list: [],
            },
            {
                title: 'Appliances',
                list: [],
            },
            {
                title: 'Interior Features',
                list: [],
            },
            {
                title: 'Heating and Cooling',
                list: [],
            },
            {
                title: 'Exterior and Lot Features',
                list: [],
            },
            {
                title: 'Garage and Parking',
                list: [],
            },
            {
                title: 'Land Info',
                list: [],
            },
            {
                title: 'Homeowners Association',
                list: [],
            },
            {
                title: 'School Information',
                list: [],
            },
            {
                title: 'Rental Info',
                list: [],
            },
            {
                title: 'Amenities and Community Features',
                list: [],
            },
            {
                title: 'Other Property Info',
                list: [],
            },
            {
                title: 'Building and Construction',
                list: [],
            },
            {
                title: 'Utilities',
                list: [],
            },
            {
                title: 'Home Features',
                list: [],
            },
        ]);
        setPropertyDiv('');
        setFiles([]);
        setFilesEdit([]);

    };

    const columns = [
        {
            name: "Property Name",
            style: { width: "30%" },
            key: 'title',
        },
        {
            name: "Property Address",
            style: { width: "40%" },
            key: 'address',
        },
    ];
    const actions = [
        {
            name: "View Add",
            handler: (row) => window.open(`http://localhost:5173/property/${row._id}`, '_blank'),
            className: "bill-buttons",
            variant: 'outline-secondary',
            style: { width: '10%' }
        },
        {
            name: "Edit",
            handler: (row) => editProperty(row),
            className: "bill-buttons",
            variant: 'outline-success',
            style: { width: '10%' }
        },
        {
            name: "Delete",
            handler: (row) => handleDelete(row._id),
            className: "bill-buttons",
            variant: 'outline-danger',
            style: { width: '10%' }
        },
    ];

    const getProperty = async (pageNo, limit, userId, searchValue) => {
        dispatch(show());
        try {
            // Build the filter parameters for the unified API
            const filters = {
                page: pageNo,
                size: limit,
                userId: userId,
            };

            if (searchValue && searchValue.trim() !== '') {
                filters.title = searchValue.trim();
            }

            if (!isChecking) {
                const response = await propertyService.getProperties(filters);
                setTotalProperties(response.totalProperties);
                setRows(response.properties);
            }

        } catch (error) {
            console.log('Error fetching properties:', error.message);
            Swal.fire({
                icon: "error",
                title: "Error fetching properties!",
                text: error.message,
            });
        } finally {
            dispatch(hide());
            setSearchValue('');  // clear search input if you want; optional
        }
    };

    useEffect(() => {
        getProperty(currentPage, limit, user?._id);
    }, [currentPage, limit, user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(show())

        const propertyObj = {
            title: property.name,
            price: property.price,
            address: property.address,
            bed: property.bed,
            bath: property.bath,
            houseSqft: property.houseSqft,
            lotSqft: property.lotSqft,
            state: property.state,
            city: property.city,
            zipCode: property.zipCode,
            location: property.location,
            availableFor: property.availableFor,
            addedBy: user._id,
            details: {
                ...propertyDetails
            },
            features: [
                ...propertFeatures
            ],
            imgUrl: [],
        };

        try {
            const data = await propertyService.createProperty(propertyObj);
            await propertyService.uploadFiles(data.property._id, files);

            reset();
            setPropertyDiv("");
            getProperty(currentPage, limit, user?._id);

            Swal.fire({
                icon: "success",
                title: "Added..",
                text: "Property Has Been Added",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        } finally {
            dispatch(hide())
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        dispatch(show())

        for (let i = 0; i < filesEdit.length; i++) {
            delete filesEdit[i]._id;
        }

        const propertyObj = {
            title: property.name,
            price: property.price,
            address: property.address,
            bed: property.bed,
            bath: property.bath,
            houseSqft: property.houseSqft,
            lotSqft: property.lotSqft,
            state: property.state,
            city: property.city,
            zipCode: property.zipCode,
            location: property.location,
            availableFor: property.availableFor,
            addedBy: user._id,
            details: {
                ...propertyDetails
            },
            features: [
                ...propertFeatures
            ],
            imgUrl: filesEdit,
        };

        try {
            const data = await propertyService.updateProperty(currentEditProperty, propertyObj);
            await propertyService.uploadFiles(data.property._id, files);

            reset();
            setPropertyDiv("");
            getProperty(currentPage, limit, user?._id);

            Swal.fire({
                icon: "success",
                title: "Updated..",
                text: "Property Has Been Updated",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        } finally {
            dispatch(hide())
        }
    };

    const handleFileChange = (e) => {
        const fileList = e.target.files;
        const validTypes = ['jpeg', 'jpg', 'png'];
        const validFiles = [];

        for (const file of fileList) {
            const fileType = file.type.split('/')[1];
            if (validTypes.includes(fileType)) {
                validFiles.push(file);
            } else {
                alert('Image type should be png, jpeg, or jpg');
                return; // Exit early if an invalid file is found
            }
        }

        setFiles(validFiles);
    };

    const editProperty = (data) => {
        setPropertyDiv('edit');
        setProperty({
            name: data.title,
            price: data.price,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            location: data.location,
            bed: data.bed,
            bath: data.bath,
            houseSqft: data.houseSqft,
            lotSqft: data.lotSqft,
            availableFor: data.availableFor,
        });
        setPropertyDetails({
            type: data.details.type,
            yearBuilt: data.details.yearBuilt,
            availablity: data.details.availablity,
            description: data.details.description,
        });
        setPropertyFeatures([...data.features]);
        setFilesEdit(data.imgUrl);
        setCurrentEditProperty(data._id);
    };

    const fileDelete = async (obj, id) => {
        dispatch(show());

        const { public_id } = obj;
        const encodedPublicId = encodeURIComponent(public_id);
        try {
            await propertyService.deleteFiles(id, encodedPublicId);

            const updatedFiles = filesEdit.filter(file => file.public_id !== public_id);
            setFilesEdit(updatedFiles);
            getProperty(currentPage, limit, user?._id);

            Swal.fire({
                icon: 'success',
                title: 'Deleted..',
                text: 'Image Has Been Deleted'
            })

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        } finally {
            dispatch(hide())
        }
    };

    const handleDelete = (id) => {
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
                dispatch(show())
                try {
                    const response = await propertyService.deleteProperty(id);
                    getProperty(currentPage, limit, user?._id);

                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Property has been deleted.",
                        icon: "success"
                    });

                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message,
                    });
                } finally {
                    dispatch(hide())
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Property is safe :)",
                    icon: "error"
                });
            }
        });
    };

    const onChange = (name, city) => {
        if (city) {
            setProperty({
                ...property,
                city: name,
            })
        } else {
            setProperty({
                ...property,
                state: name,
            })
        }
    };


    const FeatureList = ({ categoryTitle }) => {
        const category = propertFeatures.find(cat => cat.title.toLowerCase() === categoryTitle.toLowerCase());
        if (!category || category.list.length === 0) return null;

        return (
            <div className="d-flex flex-wrap">
                {chunkArray(category.list, 3).map((chunk, idx) => (
                    <ul key={idx} className="mt-0 mb-0 col-12 col-md-6">
                        {chunk.map((item, i) => (
                            <li key={i} className="mt-1 d-flex list-style-bullet justify-content-between">
                                {item}
                                <Button
                                    variant="outline-danger"
                                    className="py-0 ms-5"
                                    style={{ height: '25px' }}
                                    onClick={() => handleDeleteFeature(categoryTitle, i + idx * 10)} // Adjust index to global index in full list
                                >
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        );
    };
    const handleDeleteFeature = (featureCategoryTitle, indexToDelete) => {
        setPropertyFeatures(prevFeatures => {
            // Map over prevFeatures array and update the matching category
            return prevFeatures.map(category => {
                if (category.title.toLowerCase() === featureCategoryTitle.toLowerCase()) {
                    // Create new list array with item removed at indexToDelete
                    const updatedList = category.list.filter((_, i) => i !== indexToDelete);
                    // Return updated category object
                    return {
                        ...category,
                        list: updatedList,
                    };
                }
                // Return category unchanged if title does not match
                return category;
            });
        });
    };
    const handleAddFeature = (featureCategoryTitle, newFeature) => {
        setPropertyFeatures(prevFeatures =>
            prevFeatures.map(category => {
                if (category.title.toLowerCase() === featureCategoryTitle.toLowerCase()) {
                    return {
                        ...category,
                        list: [...category.list, newFeature],
                    };
                }
                return category;
            })
        );
    };

    return (
        <>
            <Navbar withoutHero={true} />
            <div className="new-properties-main-div">
                <Container>
                    <div className="properties-div">
                        {
                            propertyDiv === 'add' || propertyDiv === 'edit' ?
                                <>
                                    <h3 className="d-flex justify-content-between">
                                        Add New Property
                                        <span
                                            className="cross-icon"
                                            onClick={e => {
                                                setPropertyDiv("")
                                                reset()
                                            }} >
                                            <ImCross />
                                        </span>
                                    </h3>
                                    <form className="new-property-form row" onSubmit={propertyDiv === 'edit' ? handleEditSubmit : handleSubmit}>
                                        <div className="col-12 col-md-6 mt-1">
                                            <label htmlFor="name">
                                                Title<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="text"
                                                autoFocus
                                                id="name"
                                                placeholder="Enter Title"
                                                value={property.name}
                                                onChange={e => setProperty({ ...property, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-1">
                                            <label htmlFor="price">
                                                Price / Rent Per MO<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="text"
                                                id="price"
                                                placeholder="Enter Price"
                                                value={property.price}
                                                onChange={e => setProperty({ ...property, price: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mt-1">
                                            <label htmlFor="address">
                                                Address<span className="text-danger">*</span>:
                                            </label>
                                            <textarea
                                                id="address"
                                                placeholder="Enter Address"
                                                value={property.address}
                                                onChange={e => setProperty({ ...property, address: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-6 col-md-3 mt-1">
                                            <label htmlFor="bed">
                                                Bed<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="text"
                                                id="bed"
                                                placeholder="Enter Bed"
                                                value={property.bed}
                                                onChange={e => setProperty({ ...property, bed: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-6 col-md-3 mt-1">
                                            <label htmlFor="bath">
                                                Bath<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="text"
                                                id="bath"
                                                placeholder="Enter Bath"
                                                value={property.bath}
                                                onChange={e => setProperty({ ...property, bath: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-6 col-md-3 mt-1">
                                            <label htmlFor="houseSqft">
                                                House sqft<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="text"
                                                id="houseSqft"
                                                placeholder="Enter House sqft"
                                                value={property.houseSqft}
                                                onChange={e => setProperty({ ...property, houseSqft: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-6 col-md-3 mt-1">
                                            <label htmlFor="lotSqft">
                                                Lot sqft<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="text"
                                                id="lotSqft"
                                                placeholder="Enter Lot sqft"
                                                value={property.lotSqft}
                                                onChange={e => setProperty({ ...property, lotSqft: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-1">
                                            <label htmlFor="lotSqft">
                                                State:
                                            </label>
                                            <CustomAutoComplete
                                                options={states}
                                                value={property.state}
                                                onChange={onChange}
                                                city={false}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-1">
                                            <label htmlFor="lotSqft">
                                                City:
                                            </label>
                                            <CustomAutoComplete
                                                options={UsCities}
                                                value={property.city}
                                                onChange={onChange}
                                                city={true}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-1">
                                            <label htmlFor="zipCode">
                                                Zip Code:
                                            </label>
                                            <input
                                                type="text"
                                                id="zipCode"
                                                placeholder="Enter Zip Code"
                                                value={property.zipCode}
                                                onChange={e => setProperty({ ...property, zipCode: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-1">
                                            <label htmlFor="location">
                                                Location<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                id="location"
                                                placeholder="Paste Location Link"
                                                value={property.location}
                                                onChange={e => setProperty({ ...property, location: e.target.value })}
                                            />
                                        </div>
                                        <hr className="mt-4 mb-4" />
                                        <h5>Property Details</h5>
                                        <div className="col-12 col-md-6 col-lg-4 mt-1">
                                            <label htmlFor="propertyType">
                                                Property Type<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                id="propertyType"
                                                placeholder="Enter Property Type"
                                                value={propertyDetails.type}
                                                onChange={e => setPropertyDetails({ ...propertyDetails, type: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 mt-1">
                                            <label htmlFor="yearBuilt">
                                                Year Built<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                id="yearBuilt"
                                                placeholder="Enter Year Built"
                                                value={propertyDetails.yearBuilt}
                                                onChange={e => setPropertyDetails({ ...propertyDetails, yearBuilt: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-4 mt-1">
                                            <label htmlFor="availablity">
                                                Availablity<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                required
                                                type="date"
                                                id="availablity"
                                                placeholder="Enter Availablity"
                                                value={propertyDetails.availablity}
                                                onChange={e => setPropertyDetails({ ...propertyDetails, availablity: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 mt-1">
                                            <label htmlFor="description">
                                                Description<span className="text-danger">*</span>:
                                            </label>
                                            <textarea
                                                required
                                                id="description"
                                                placeholder="Enter Description"
                                                value={propertyDetails.description}
                                                onChange={e => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
                                            />
                                        </div>
                                        <hr className="mt-4 mb-4" />
                                        <h5>Property Features</h5>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="bedroom">
                                                Bedrooms:
                                            </label>
                                            <input
                                                type="text"
                                                id="bedroom"
                                                placeholder="Enter Bedrooms"
                                                value={features.bedrooms}
                                                onChange={e => setFeatures({ ...features, bedrooms: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.bedrooms !== '') {
                                                        handleAddFeature('Bedrooms', features.bedrooms);
                                                        setFeatures(prev => ({ ...prev, bedrooms: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>

                                            <FeatureList categoryTitle="Bedrooms" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="bathroom">
                                                Bathrooms:
                                            </label>
                                            <input
                                                type="text"
                                                id="bathroom"
                                                placeholder="Enter Bathrooms"
                                                value={features.bathrooms}
                                                onChange={e => setFeatures({ ...features, bathrooms: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.bathrooms !== '') {
                                                        handleAddFeature('Bathrooms', features.bathrooms);
                                                        setFeatures(prev => ({ ...prev, bathrooms: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Bathrooms" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="appliances">
                                                Appliances:
                                            </label>
                                            <input
                                                type="text"
                                                id="appliances"
                                                placeholder="Enter Appliances"
                                                value={features.appliances}
                                                onChange={e => setFeatures({ ...features, appliances: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.appliances !== '') {
                                                        handleAddFeature('Appliances', features.appliances);
                                                        setFeatures(prev => ({ ...prev, appliances: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Appliances" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="interiorFeatures">
                                                Interior Features:
                                            </label>
                                            <input
                                                type="text"
                                                id="interiorFeatures"
                                                placeholder="Enter Interior Features"
                                                value={features.interiorFeatures}
                                                onChange={e => setFeatures({ ...features, interiorFeatures: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.interiorFeatures !== '') {
                                                        handleAddFeature('Interior Features', features.interiorFeatures);
                                                        setFeatures(prev => ({ ...prev, interiorFeatures: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Interior Features" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="heatingCooling">
                                                Heating and Cooling:
                                            </label>
                                            <input
                                                type="text"
                                                id="heatingCooling"
                                                placeholder="Enter Heating and Cooling"
                                                value={features.heatingCooling}
                                                onChange={e => setFeatures({ ...features, heatingCooling: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.heatingCooling !== '') {
                                                        handleAddFeature('Heating and Cooling', features.heatingCooling);
                                                        setFeatures(prev => ({ ...prev, heatingCooling: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Heating and Cooling" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="exterior">
                                                Exterior and Lot Features:
                                            </label>
                                            <input
                                                type="text"
                                                id="exterior"
                                                placeholder="Enter Exterior and Lot Features"
                                                value={features.exterior}
                                                onChange={e => setFeatures({ ...features, exterior: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.exterior !== '') {
                                                        handleAddFeature('Exterior and Lot Features', features.exterior);
                                                        setFeatures(prev => ({ ...prev, exterior: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Exterior and Lot Features" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="garage">
                                                Garage and Parking:
                                            </label>
                                            <input
                                                type="text"
                                                id="garage"
                                                placeholder="Enter Garage and Parking"
                                                value={features.garage}
                                                onChange={e => setFeatures({ ...features, garage: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.garage !== '') {
                                                        handleAddFeature('Garage and Parking', features.garage);
                                                        setFeatures(prev => ({ ...prev, garage: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Garage and Parking" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="landInfo">
                                                Land Info:
                                            </label>
                                            <input
                                                type="text"
                                                id="landInfo"
                                                placeholder="Enter Land Info"
                                                value={features.landInfo}
                                                onChange={e => setFeatures({ ...features, landInfo: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.landInfo !== '') {
                                                        handleAddFeature('Land Info', features.landInfo);
                                                        setFeatures(prev => ({ ...prev, landInfo: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Land Info" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="homeownersAssociation">
                                                Homeowners Association:
                                            </label>
                                            <input
                                                type="text"
                                                id="homeownersAssociation"
                                                placeholder="Enter Homeowners Association"
                                                value={features.homeownersAssociation}
                                                onChange={e => setFeatures({ ...features, homeownersAssociation: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.homeownersAssociation !== '') {
                                                        handleAddFeature('Homeowner Association', features.homeownersAssociation);
                                                        setFeatures(prev => ({ ...prev, homeownersAssociation: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Homeowner Association" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="schoolInfo">
                                                School Information:
                                            </label>
                                            <input
                                                type="text"
                                                id="schoolInfo"
                                                placeholder="Enter School Information"
                                                value={features.schoolInfo}
                                                onChange={e => setFeatures({ ...features, schoolInfo: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.schoolInfo !== '') {
                                                        handleAddFeature('School Information', features.schoolInfo);
                                                        setFeatures(prev => ({ ...prev, schoolInfo: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="School Information" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="rentalInfo">
                                                Rental Info:
                                            </label>
                                            <input
                                                type="text"
                                                id="rentalInfo"
                                                placeholder="Enter Rental Info"
                                                value={features.rentalInfo}
                                                onChange={e => setFeatures({ ...features, rentalInfo: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.rentalInfo !== '') {
                                                        handleAddFeature('Rental Info', features.rentalInfo);
                                                        setFeatures(prev => ({ ...prev, rentalInfo: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Rental Info" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="amenities">
                                                Amenities and Community Features:
                                            </label>
                                            <input
                                                type="text"
                                                id="amenities"
                                                placeholder="Enter Amenities and Community Features"
                                                value={features.amenities}
                                                onChange={e => setFeatures({ ...features, amenities: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.amenities !== '') {
                                                        handleAddFeature('Amenities and Community Features', features.amenities);
                                                        setFeatures(prev => ({ ...prev, amenities: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Amenities and Community Features" />
                                            {/* <div className="d-flex flex-wrap">
                                                {
                                                    chunkArray(propertFeatures.amenities, 10).map((chunk, idx) => (
                                                        <ul key={idx} className="mt-0 mb-0 col-12 col-md-6">
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('amenities', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div> */}
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="otherInfo">
                                                Other Property Info:
                                            </label>
                                            <input
                                                type="text"
                                                id="otherInfo"
                                                placeholder="Enter Other Property Info"
                                                value={features.otherInfo}
                                                onChange={e => setFeatures({ ...features, otherInfo: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.otherInfo !== '') {
                                                        handleAddFeature('Other Property Info', features.otherInfo);
                                                        setFeatures(prev => ({ ...prev, otherInfo: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Other Property Info" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="buildingAndConstruction">
                                                Building and Construction:
                                            </label>
                                            <input
                                                type="text"
                                                id="buildingAndConstruction"
                                                placeholder="Enter Building and Construction"
                                                value={features.buildingAndConstruction}
                                                onChange={e => setFeatures({ ...features, buildingAndConstruction: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.buildingAndConstruction !== '') {
                                                        handleAddFeature('Building and Construction', features.buildingAndConstruction);
                                                        setFeatures(prev => ({ ...prev, buildingAndConstruction: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Building and Construction" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="utilities">
                                                Utilities:
                                            </label>
                                            <input
                                                type="text"
                                                id="utilities"
                                                placeholder="Enter Utilities"
                                                value={features.utilities}
                                                onChange={e => setFeatures({ ...features, utilities: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.utilities !== '') {
                                                        handleAddFeature('Utilities', features.utilities);
                                                        setFeatures(prev => ({ ...prev, utilities: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Utilities" />
                                        </div>
                                        <div className="col-12 mt-1 property-feature">
                                            <label htmlFor="homeFeatures">
                                                Home Features:
                                            </label>
                                            <input
                                                type="text"
                                                id="homeFeatures"
                                                placeholder="Enter Home Features"
                                                value={features.homeFeatures}
                                                onChange={e => setFeatures({ ...features, homeFeatures: e.target.value })}
                                            />
                                            <Button
                                                variant="outline-success"
                                                onClick={e => {
                                                    if (features.homeFeatures !== '') {
                                                        handleAddFeature('Home Features', features.homeFeatures);
                                                        setFeatures(prev => ({ ...prev, homeFeatures: '' }));
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <FeatureList categoryTitle="Home Features" />
                                        </div>
                                        <div className="col-12 mt-1">
                                            <label htmlFor="propertyType">
                                                Images<span className="text-danger">*</span>:
                                            </label>
                                            <input
                                                type="file"
                                                name="file"
                                                onChange={handleFileChange}
                                                style={{ display: 'hide' }}
                                                multiple
                                            />
                                        </div>
                                        <div className="upload-img-div">
                                            {files && propertyDiv === 'edit' ?
                                                filesEdit.map((v, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <Image
                                                                src={v.url}
                                                                alt={v.public_id}
                                                                width={'150px'}
                                                                height={'100px'}
                                                            />
                                                            <br />
                                                            <Button variant="outline-danger" onClick={e => fileDelete(v, currentEditProperty)}>Remove</Button>
                                                        </div>
                                                    )
                                                }) :
                                                <></>}
                                            {files && files.map((v, i) => (
                                                <div key={i}>
                                                    <Image
                                                        src={URL.createObjectURL(v)}
                                                        alt={'img'}
                                                        width={'150px'}
                                                        height={'100px'}
                                                    />
                                                </div>
                                            ))}

                                        </div>
                                        <div className="col-12 mt-1">
                                            <label htmlFor="availableFor">
                                                Available For<span className="text-danger">*</span>:
                                            </label>
                                            <select
                                                required
                                                type="text"
                                                id="availableFor"
                                                value={property.availableFor}
                                                onChange={e => setProperty({ ...property, availableFor: e.target.value })}
                                            >
                                                <option value={''} disabled>Available For</option>
                                                <option value="rent">Rent</option>
                                                <option value="sell">Sell</option>
                                            </select>
                                        </div>
                                        <div className="d-flex justify-content-around">
                                            <Button
                                                variant="outline-danger"
                                                style={{ width: '200px' }}
                                                className="my-2"
                                                onClick={e => {
                                                    setPropertyDiv("")
                                                    reset()
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="outline-success" type="submit" style={{ width: '200px' }} className="my-2">
                                                {
                                                    propertyDiv === 'edit' ?
                                                        'Update Property' :
                                                        'Add Property'
                                                }
                                            </Button>
                                        </div>
                                    </form>
                                </>
                                :
                                <>
                                    <div className="button-search-div">
                                        <Space>
                                            <Button variant="outline-dark" className="all-button" onClick={e => getProperty(currentPage, limit, user?._id)}>All Properties</Button>
                                            <div className="search-div-property-res">
                                                <input
                                                    required
                                                    type='text'
                                                    placeholder={"Search with address"}
                                                    className="search-input me-1"
                                                    value={searchValue}
                                                    onChange={e => setSearchValue(e.target.value)}
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    className="search-button"
                                                    onClick={e => getProperty(currentPage, limit, user?._id, searchValue)}
                                                >
                                                    Search
                                                </Button>
                                            </div>
                                        </Space>
                                        <Space>
                                            <div className="search-div-property">
                                                <input
                                                    required
                                                    type='text'
                                                    placeholder={"Search with address"}
                                                    className="search-input me-1"
                                                    value={searchValue}
                                                    onChange={e => setSearchValue(e.target.value)}
                                                />
                                                <Button
                                                    variant="outline-secondary"
                                                    className="search-button"
                                                    onClick={e => getProperty(currentPage, limit, user?._id, searchValue)}
                                                >
                                                    Search
                                                </Button>
                                            </div>
                                            <Button
                                                variant="outline-success"
                                                className="add-button"
                                                onClick={e => setPropertyDiv('add')}
                                            >
                                                Add New Property
                                            </Button>
                                        </Space>
                                    </div>
                                    <div className="properties-table-main-div">
                                        <Table
                                            columns={columns}
                                            data={rows}
                                            actions={actions}
                                            pagination={true}
                                            totalQuantity={totalProperties}
                                            limit={limit}
                                            setLimit={setLimit}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                    </div>
                                </>
                        }
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default AddNewProperties;