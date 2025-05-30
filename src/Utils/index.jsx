import moment from "moment";
import { Pagination } from "react-bootstrap";

export const formatDate = (date, format) => {
    return date ? moment(`${date}`).format(format || 'MM/DD/YYYY') : moment().format(format || 'MM/DD/YYYY');
};

export const sortData = (data, key, direc = 'asc') => {
    return data.sort((a, b) => {
        const valueA = getNestedValue(a, key);
        const valueB = getNestedValue(b.key);
        if (direc === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
    });
};

export const getNestedValue = (obj, key) => {
    const keys = key.split('.');
    let value = obj;
    for (let k of keys) {
        value = value ? value[k] : undefined;
    }
    return value;
};

export const renderPagination = (totalItems, limit, currentPage, setCurrentPage) => {
    const totalPages = limit <= 0 ? new Error("Limit must be greater than zero") : Math.ceil(totalItems / limit);

    if (totalPages <= 1) return null;

    const maxVisiblePages = 2; // Number of pages to display on either side of the current page
    let pages = [];

    // Always show the first page
    pages.push(1);

    // Show ellipsis if the current page is far from the beginning
    if (currentPage > maxVisiblePages + 1) {
        pages.push("...");
    }

    // Add pages around the current page
    for (let i = Math.max(2, currentPage - maxVisiblePages); i <= Math.min(totalPages - 1, currentPage + maxVisiblePages); i++) {
        pages.push(i);
    }

    // Show ellipsis if the current page is far from the end
    if (currentPage < totalPages - maxVisiblePages) {
        pages.push("...");
    }

    // Always show the last page if it's not already included
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {pages.map((page, index) => {
                if (page === "...") {
                    return <Pagination.Ellipsis key={index} />;
                }
                return (
                    <Pagination.Item
                        key={index}
                        active={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                );
            })}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export const UsCities = [
    "Aberdeen",
    "Abilene",
    "Akron",
    "Albany",
    "Albuquerque",
    "Alexandria",
    "Allentown",
    "Amarillo",
    "Anaheim",
    "Anchorage",
    "Ann Arbor",
    "Antioch",
    "Apple Valley",
    "Appleton",
    "Arlington",
    "Arvada",
    "Asheville",
    "Athens",
    "Atlanta",
    "Atlantic City",
    "Augusta",
    "Aurora",
    "Austin",
    "Bakersfield",
    "Baltimore",
    "Barnstable",
    "Baton Rouge",
    "Beaumont",
    "Bel Air",
    "Bellevue",
    "Berkeley",
    "Bethlehem",
    "Billings",
    "Birmingham",
    "Bloomington",
    "Boise",
    "Boise City",
    "Bonita Springs",
    "Boston",
    "Boulder",
    "Bradenton",
    "Bremerton",
    "Bridgeport",
    "Brighton",
    "Brownsville",
    "Bryan",
    "Buffalo",
    "Burbank",
    "Burlington",
    "Cambridge",
    "Canton",
    "Cape Coral",
    "Carrollton",
    "Cary",
    "Cathedral City",
    "Cedar Rapids",
    "Champaign",
    "Chandler",
    "Charleston",
    "Charlotte",
    "Chattanooga",
    "Chesapeake",
    "Chicago",
    "Chula Vista",
    "Cincinnati",
    "Clarksville",
    "Clearwater",
    "Cleveland",
    "College Station",
    "Colorado Springs",
    "Columbia",
    "Columbus",
    "Concord",
    "Coral Springs",
    "Corona",
    "Corpus Christi",
    "Costa Mesa",
    "Dallas",
    "Daly City",
    "Danbury",
    "Davenport",
    "Dayton",
    "Daytona Beach",
    "Deltona",
    "Denton",
    "Denver",
    "Des Moines",
    "Detroit",
    "Downey",
    "Duluth",
    "Durham",
    "El Monte",
    "El Paso",
    "Elizabeth",
    "Elk Grove",
    "Elkhart",
    "Erie",
    "Escondido",
    "Eugene",
    "Evansville",
    "Fairfield",
    "Fargo",
    "Fayetteville",
    "Fitchburg",
    "Flint",
    "Fontana",
    "Fort Collins",
    "Fort Lauderdale",
    "Fort Smith",
    "Fort Walton Beach",
    "Fort Wayne",
    "Fort Worth",
    "Frederick",
    "Fremont",
    "Fresno",
    "Fullerton",
    "Gainesville",
    "Garden Grove",
    "Garland",
    "Gastonia",
    "Gilbert",
    "Glendale",
    "Grand Prairie",
    "Grand Rapids",
    "Grayslake",
    "Green Bay",
    "Greensboro",
    "Greenville",
    "Gulfport",
    "Hagerstown",
    "Hampton",
    "Harlingen",
    "Harrisburg",
    "Hartford",
    "Hatillo",
    "Havre de Grace",
    "Hayward",
    "Hemet",
    "Henderson",
    "Hesperia",
    "Hialeah",
    "Hickory",
    "High Point",
    "Hollywood",
    "Honolulu",
    "Houma",
    "Houston",
    "Howell",
    "Huntington",
    "Huntington Beach",
    "Huntsville",
    "Independence",
    "Indianapolis",
    "Inglewood",
    "Irvine",
    "Irving",
    "Jackson",
    "Jacksonville",
    "Jersey City",
    "Johnson City",
    "Joliet",
    "Kailua",
    "Kalamazoo",
    "Kaneohe",
    "Kansas City",
    "Kennewick",
    "Kenosha",
    "Killeen",
    "Kissimmee",
    "Knoxville",
    "Lacey",
    "Lafayette",
    "Lake Charles",
    "Lakeland",
    "Lakewood",
    "Lancaster",
    "Lansing",
    "Laredo",
    "Las Cruces",
    "Las Vegas",
    "Layton",
    "Leominster",
    "Lewisville",
    "Lexington",
    "Lincoln",
    "Little Rock",
    "Long Beach",
    "Lorain",
    "Los Angeles",
    "Louisville",
    "Lowell",
    "Lubbock",
    "Macon",
    "Madison",
    "Manchester",
    "Marysville",
    "McAllen",
    "McHenry",
    "Medford",
    "Melbourne",
    "Memphis",
    "Merced",
    "Mesa",
    "Mesquite",
    "Miami",
    "Milwaukee",
    "Minneapolis",
    "Miramar",
    "Mission Viejo",
    "Mobile",
    "Modesto",
    "Monroe",
    "Monterey",
    "Montgomery",
    "Moreno Valley",
    "Murfreesboro",
    "Murrieta",
    "Muskegon",
    "Myrtle Beach",
    "Naperville",
    "Naples",
    "Nashua",
    "Nashville",
    "New Bedford",
    "New Haven",
    "New London",
    "New Orleans",
    "New York",
    "Newark",
    "Newport News",
    "Norfolk",
    "Normal",
    "Norman",
    "North Charleston",
    "North Las Vegas",
    "North Port",
    "Norwalk",
    "Norwich",
    "Oakland",
    "Ocala",
    "Oceanside",
    "Odessa",
    "Ogden",
    "Oklahoma City",
    "Olathe",
    "Olympia",
    "Omaha",
    "Ontario",
    "Orange",
    "Orem",
    "Orlando",
    "Overland Park",
    "Oxnard",
    "Palm Bay",
    "Palm Springs",
    "Palmdale",
    "Panama City",
    "Pasadena",
    "Paterson",
    "Pembroke Pines",
    "Pensacola",
    "Peoria",
    "Philadelphia",
    "Phoenix",
    "Pittsburgh",
    "Plano",
    "Pomona",
    "Pompano Beach",
    "Port Arthur",
    "Port Orange",
    "Portland",
    "Portsmouth",
    "Poughkeepsie",
    "Providence",
    "Provo",
    "Pueblo",
    "Punta Gorda",
    "Racine",
    "Raleigh",
    "Rancho Cucamonga",
    "Reading",
    "Redding",
    "Reno",
    "Richland",
    "Richmond",
    "Rio Rancho",
    "Riverside",
    "Roanoke",
    "Rochester",
    "Rockford",
    "Roseville",
    "Round Lake Beach",
    "Sacramento",
    "Saginaw",
    "Saint Louis",
    "Saint Paul",
    "Saint Petersburg",
    "Salem",
    "Salinas",
    "Salt Lake City",
    "San Antonio",
    "San Bernardino",
    "San Diego",
    "San Francisco",
    "San Jose",
    "Santa Ana",
    "Santa Barbara",
    "Santa Clara",
    "Santa Clarita",
    "Santa Cruz",
    "Santa Maria",
    "Santa Rosa",
    "Sarasota",
    "Savannah",
    "Scottsdale",
    "Scranton",
    "Seaside",
    "Seattle",
    "Sebastian",
    "Shreveport",
    "Simi Valley",
    "Sioux City",
    "Sioux Falls",
    "South Bend",
    "South Lyon",
    "Spartanburg",
    "Spokane",
    "Springdale",
    "Springfield",
    "Stamford",
    "Sterling Heights",
    "Stockton",
    "Sunnyvale",
    "Syracuse",
    "Tacoma",
    "Tallahassee",
    "Tampa",
    "Temecula",
    "Tempe",
    "Thornton",
    "Thousand Oaks",
    "Toledo",
    "Topeka",
    "Torrance",
    "Trenton",
    "Tucson",
    "Tulsa",
    "Tuscaloosa",
    "Tyler",
    "Utica",
    "Vallejo",
    "Vancouver",
    "Vero Beach",
    "Victorville",
    "Virginia Beach",
    "Visalia",
    "Waco",
    "Warren",
    "Washington",
    "Waterbury",
    "Waterloo",
    "West Covina",
    "West Valley City",
    "Westminster",
    "Wichita",
    "Wilmington",
    "Winston",
    "Winter Haven",
    "Worcester",
    "Yakima",
    "Yonkers",
    "York",
    "Youngstown"
];

