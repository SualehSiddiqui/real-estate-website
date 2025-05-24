import "./style.css";
import { Navbar, Footer, Table } from "../../Components";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import { Space } from "antd";
import { chunkArray } from "../../Utils";

const AddNewProperties = () => {
    const [propertyDiv, setPropertyDiv] = useState(false)
    const [totalAreas, setTotalAreas] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(25);

    const [property, setProperty] = useState({
        name: '',
        price: '',
        address: '',
        bed: '',
        bath: '',
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

    const [propertFeatures, setPropertyFeatures] = useState({
        bedrooms: [],
        bathrooms: [],
        appliances: [],
        interiorFeatures: [],
        heatingCooling: [],
        exterior: [],
        garage: [],
        landInfo: [],
        homeownersAssociation: [],
        schoolInfo: [],
        rentalInfo: [],
        amenities: [],
        otherInfo: [],
        buildingAndConstruction: [],
        utilities: [],
        homeFeatures: [],
    });

    const reset = () => {
        setProperty({
            name: '',
            price: '',
            address: '',
            bed: '',
            bath: '',
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
        setPropertyFeatures({
            bedrooms: [],
            bathrooms: [],
            appliances: [],
            interiorFeatures: [],
            heatingCooling: [],
            exterior: [],
            garage: [],
            landInfo: [],
            homeownersAssociation: [],
            schoolInfo: [],
            rentalInfo: [],
            amenities: [],
            otherInfo: [],
            buildingAndConstruction: [],
            utilities: [],
            homeFeatures: [],
        });
    };

    const columns = [
        {
            name: "Property Name",
            style: { width: "30%" },
            key: 'name',
        },
        {
            name: "Property Address",
            style: { width: "40%" },
            key: 'name',
        },
    ];
    const actions = [
        {
            name: "View Add",
            handler: (row) => editArea(row),
            className: "bill-buttons",
            variant: 'outline-secondary',
            style: { width: '10%' }
        },
        {
            name: "Edit",
            handler: (row) => editArea(row),
            className: "bill-buttons",
            variant: 'outline-success',
            style: { width: '10%' }
        },
        {
            name: "Delete",
            handler: (row) => deleteArea(row._id),
            className: "bill-buttons",
            variant: 'outline-danger',
            style: { width: '10%' }
        },
    ];

    const handleDeleteFeature = (featureCategory, indexToDelete) => {
        setPropertyFeatures(prevFeatures => {
            // Create a copy of the array for the category
            const updatedArray = prevFeatures[featureCategory].filter((_, i) => i !== indexToDelete);

            // Return updated state with that category replaced
            return {
                ...prevFeatures,
                [featureCategory]: updatedArray,
            };
        });
    };

    return (
        <>
            <Navbar withoutHero={true} />
            <div className="new-properties-main-div">
                <Container>
                    <div className="properties-div">
                        {
                            propertyDiv ?
                                <>
                                    <h3>Add New Property</h3>
                                    <form className="new-property-form row">
                                        <div className="sm-col-12 col-6 mt-1">
                                            <label htmlFor="name">
                                                Title:
                                            </label>
                                            <input
                                                type="text"
                                                autoFocus
                                                id="name"
                                                placeholder="Enter Title"
                                                value={property.name}
                                                onChange={e => setProperty({ ...property, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-12 col-6 mt-1">
                                            <label htmlFor="price">
                                                Price:
                                            </label>
                                            <input
                                                type="number"
                                                id="price"
                                                placeholder="Enter Price"
                                                value={property.price}
                                                onChange={e => setProperty({ ...property, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 mt-1">
                                            <label htmlFor="address">
                                                Address:
                                            </label>
                                            <textarea
                                                id="address"
                                                placeholder="Enter Address"
                                                value={property.address}
                                                onChange={e => setProperty({ ...property, address: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-6 col-3 mt-1">
                                            <label htmlFor="bed">
                                                Bed:
                                            </label>
                                            <input
                                                type="number"
                                                id="bed"
                                                placeholder="Enter Bed"
                                                value={property.bed}
                                                onChange={e => setProperty({ ...property, bed: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-6 col-3 mt-1">
                                            <label htmlFor="bath">
                                                Bath:
                                            </label>
                                            <input
                                                type="number"
                                                id="bath"
                                                placeholder="Enter Bath"
                                                value={property.bath}
                                                onChange={e => setProperty({ ...property, bath: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-6 col-3 mt-1">
                                            <label htmlFor="houseSqft">
                                                House sqft:
                                            </label>
                                            <input
                                                type="number"
                                                id="houseSqft"
                                                placeholder="Enter House sqft"
                                                value={property.houseSqft}
                                                onChange={e => setProperty({ ...property, houseSqft: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-6 col-3 mt-1">
                                            <label htmlFor="lotSqft">
                                                Lot sqft:
                                            </label>
                                            <input
                                                type="number"
                                                id="lotSqft"
                                                placeholder="Enter Lot sqft"
                                                value={property.lotSqft}
                                                onChange={e => setProperty({ ...property, lotSqft: e.target.value })}
                                            />
                                        </div>
                                        <hr className="mt-4 mb-4" />
                                        <h5>Property Details</h5>
                                        <div className="sm-col-6 col-4 mt-1">
                                            <label htmlFor="propertyType">
                                                Property Type:
                                            </label>
                                            <input
                                                type="text"
                                                id="propertyType"
                                                placeholder="Enter Property Type"
                                                value={propertyDetails.type}
                                                onChange={e => setPropertyDetails({ ...property, type: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-6 col-4 mt-1">
                                            <label htmlFor="yearBuilt">
                                                Year Built:
                                            </label>
                                            <input
                                                type="number"
                                                id="yearBuilt"
                                                placeholder="Enter Year Built"
                                                value={propertyDetails.yearBuilt}
                                                onChange={e => setPropertyDetails({ ...property, yearBuilt: e.target.value })}
                                            />
                                        </div>
                                        <div className="sm-col-6 col-4 mt-1">
                                            <label htmlFor="availablity">
                                                Availablity:
                                            </label>
                                            <input
                                                type="date"
                                                id="availablity"
                                                placeholder="Enter Availablity"
                                                value={propertyDetails.availablity}
                                                onChange={e => setPropertyDetails({ ...property, availablity: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 mt-1">
                                            <label htmlFor="description">
                                                Description:
                                            </label>
                                            <textarea
                                                id="description"
                                                placeholder="Enter Description"
                                                value={propertyDetails.description}
                                                onChange={e => setPropertyDetails({ ...property, description: e.target.value })}
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
                                                    setPropertyFeatures({ ...propertFeatures, bedrooms: [...propertFeatures.bedrooms, features.bedrooms] })
                                                    setFeatures({ ...features, bedrooms: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.bedrooms, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li key={i} className="mt-1 d-flex list-style-bullet justify-content-between">
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('interiorFeatures', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, bathrooms: [...propertFeatures.bathrooms, features.bathrooms] })
                                                    setFeatures({ ...features, bedrooms: e.target.value })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.bathrooms, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li key={i} className="mt-1 d-flex list-style-bullet justify-content-between">
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('interiorFeatures', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, appliances: [...propertFeatures.appliances, features.appliances] })
                                                    setFeatures({ ...features, appliances: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.appliances, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('appliances', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, interiorFeatures: [...propertFeatures.interiorFeatures, features.interiorFeatures] })
                                                    setFeatures({ ...features, interiorFeatures: e.target.value })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.interiorFeatures, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('interiorFeatures', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, heatingCooling: [...propertFeatures.heatingCooling, features.heatingCooling] })
                                                    setFeatures({ ...features, heatingCooling: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.heatingCooling, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('heatingCooling', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, exterior: [...propertFeatures.exterior, features.exterior] })
                                                    setFeatures({ ...features, exterior: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.exterior, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('exterior', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, garage: [...propertFeatures.garage, features.garage] })
                                                    setFeatures({ ...features, garage: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.garage, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('garage', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, landInfo: [...propertFeatures.landInfo, features.landInfo] })
                                                    setFeatures({ ...features, landInfo: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.landInfo, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('landInfo', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, homeownersAssociation: [...propertFeatures.homeownersAssociation, features.homeownersAssociation] })
                                                    setFeatures({ ...features, homeownersAssociation: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.homeownersAssociation, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('homeownersAssociation', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, schoolInfo: [...propertFeatures.schoolInfo, features.schoolInfo] })
                                                    setFeatures({ ...features, schoolInfo: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.schoolInfo, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('schoolInfo', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, rentalInfo: [...propertFeatures.rentalInfo, features.rentalInfo] })
                                                    setFeatures({ ...features, rentalInfo: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.rentalInfo, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('rentalInfo', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, amenities: [...propertFeatures.amenities, features.amenities] })
                                                    setFeatures({ ...features, amenities: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.amenities, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
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
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, otherInfo: [...propertFeatures.otherInfo, features.otherInfo] })
                                                    setFeatures({ ...features, otherInfo: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.otherInfo, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('otherInfo', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, buildingAndConstruction: [...propertFeatures.buildingAndConstruction, features.buildingAndConstruction] })
                                                    setFeatures({ ...features, buildingAndConstruction: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.buildingAndConstruction, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('buildingAndConstruction', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, utilities: [...propertFeatures.utilities, features.utilities] })
                                                    setFeatures({ ...features, utilities: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.utilities, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('utilities', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
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
                                                    setPropertyFeatures({ ...propertFeatures, homeFeatures: [...propertFeatures.homeFeatures, features.homeFeatures] })
                                                    setFeatures({ ...features, homeFeatures: '' })
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <div className="d-flex">
                                                {
                                                    chunkArray(propertFeatures.homeFeatures, 5).map((chunk, idx) => (
                                                        <ul key={idx}>
                                                            {chunk.map((listItem, i) => (
                                                                <li className="mt-1 d-flex list-style-bullet justify-content-between" key={i}>
                                                                    {listItem}
                                                                    <Button
                                                                        variant="outline-danger"
                                                                        className="py-0 ms-5"
                                                                        onClick={() => handleDeleteFeature('homeFeatures', i)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around">
                                            <Button
                                                variant="outline-danger"
                                                style={{ width: '200px' }}
                                                className="my-2"
                                                onClick={e => {
                                                    setPropertyDiv(!propertyDiv)
                                                    reset()
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="outline-success" style={{ width: '200px' }} className="my-2">
                                                Add Property
                                            </Button>
                                        </div>
                                    </form>
                                </>
                                :
                                <>
                                    <div className="button-search-div">
                                        <Space>
                                            <Button variant="outline-dark" className="all-button">All Bills</Button>
                                        </Space>
                                        <Space>
                                            <input
                                                type='text'
                                                placeholder={"Search with address"}
                                                className="search-input"
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                className="search-button"
                                            >
                                                Search
                                            </Button>
                                            <Button
                                                variant="outline-success"
                                                className="add-button"
                                                onClick={e => setPropertyDiv(true)}
                                            >
                                                Add New Bill
                                            </Button>
                                        </Space>
                                    </div>
                                    <div className="properties-table-main-div">
                                        <Table
                                            columns={columns}
                                            // data={rows}
                                            actions={actions}
                                            pagination={true}
                                            totalQuantity={totalAreas}
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