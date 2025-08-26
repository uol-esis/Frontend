import { div } from "framer-motion/client";
import {useEffect, useRef, useState} from "react";
import Sidebar from "./Sidebar";
import InfoCard from "./components/InfoCard";
import {useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Wiki() {

    const [searchParams] = useSearchParams();
    const targetId = searchParams.get("targetId");

    const introductionRef = useRef();
    const databaseRef = useRef();
    const addColNameRef = useRef();
    const fillEmptyRowRef = useRef();
    const fillEmptyColref = useRef();
    const removeColRef = useRef();
    const removeRowRef = useRef();
    const removeFooterRef = useRef();
    const removeHeaderRef = useRef();
    const replaceEntriesRef = useRef();
    const splitRowRef = useRef();
    const removeInvalidRowsRef = useRef();
    const removeTrailingColRef = useRef();
    const removeGroupedHeaderRef = useRef();
    const metabaseRef = useRef();
    const metabaseEinstiegRef = useRef();
    const metabaseFilterRef = useRef();
    const metabaseSummaryRef = useRef();
    const metabaseVisualisierungRef = useRef();
    const metabaseJoinRef = useRef();

    const [enlargedImage, setEnlargedImage] = useState(null);

    const refsMap = {
    "database": databaseRef,
  };

    useEffect(() => {
        if (targetId && refsMap[targetId]) {
            scrollToWithOffset(refsMap[targetId]);
        }
    }, [targetId]);

    //clickable picture
    const renderImage = (src, alt) => (
        <img
        src={src}
        alt={alt}
        className="my-4 mx-auto cursor-pointer"
        onClick={() => setEnlargedImage(src)}
        />
    );

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });


            const navigation = [
            { name: 'Introduction', href: introductionRef },
            { name: 'Database-compliant Data', href: databaseRef },
            {
                name: 'Converters', href: '#', children: [
                    { name: 'Remove grouped headers', href: removeGroupedHeaderRef },
                    { name: 'Fill empty rows', href: fillEmptyRowRef },
                    { name: 'Fill empty columns', href: fillEmptyColref },
                    { name: 'Remove column (by index)', href: removeColRef },
                    { name: 'Remove row (by index)', href: removeRowRef },
                    { name: 'Add column headers', href: addColNameRef },
                    { name: 'Remove footer', href: removeFooterRef },
                    { name: 'Remove header', href: removeHeaderRef },
                    { name: 'Replace entries', href: replaceEntriesRef },
                    { name: 'Split row', href: splitRowRef },
                    { name: 'Remove invalid rows', href: removeInvalidRowsRef },
                    { name: 'Remove trailing columns', href: removeTrailingColRef },
                ]
            },
        ]

    const scrollToWithOffset = (ref, offset = window.innerHeight * 0.15) => {
        const element = ref.current;
        if (!element) return;

        const topPos = element.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        });
    };

    return(
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="h-screen w-[15vw] fixed">
                <Sidebar onClick={scrollToWithOffset} navigation={navigation}/>
            </div>

            {/* Wiki */}
            <section className="flex flex-col ml-[15vw] mb-[5vh] p-5">

                {/* Introduction */}
                

                <section className="mt-10">
                <h2 className="text font-semibold text-lg">Functions / Converters</h2>
                <p>
                    Functions are used in the "Edit Table Transformation" view.  
                    A function corresponds to a processing step that is applied to the table.  
                    For this processing step to be executed correctly, each function requires various information, for example, start and end row.  
                    Below, all functions are listed and their operation is explained in more detail.
                </p>
                </section>


                <div className="mt-6 border-1 border-gray-200"></div>

                {/* database info */}
                <section ref={databaseRef}>
                    <h2 className="text font-semibold text-lg mt-5"> Database-compliant Data </h2>
                    <h1 className="text-lg font-semibold mb-4">
                        Why and how you need to optimize Excel tables
                    </h1>
                    <p className="mb-4 text-left pl-5">
                        This application processes your Excel files to import data into a database. Often these tables are nested or unstructured. For our software to correctly read and process the data, the tables must be converted into a "machine-readable" and "database-compliant" format.
                    </p>

                    <h2 className="text-xl font-semibold mb-2">
                        1. What does "machine-readable" and "database-compliant" mean?
                    </h2>
                    <p className="mb-4 text-left pl-5">
                        <strong>Machine-readable:</strong> Data is formatted so that computers can easily understand and process it — in clear, separate columns and rows.
                    </p>
                    <div className="mb-4 text-left pl-5">
                        <strong>Database-compliant:</strong> The structure matches the requirements of a database:
                        <ul className="list-disc ml-6">
                            <li>
                                Each column contains only one type of information (e.g. only names, only numbers).
                            </li>
                            <li>Headings are clearly in the first row.</li>
                            <li>No nested or merged cells.</li>
                        </ul>
                    </div>
                    {renderImage("/Verschachtelung1.png", "Comparison: unstructured vs optimized table")}
                    <p className="text-center text-sm mb-6">
                        Image: Top – Nested table; Bottom – Optimized, clear structure.
                    </p>

                    
                    <h2 className="text-xl font-semibold mb-2">
                        2. How should an optimized table look?
                    </h2>
                    <ul className="list-disc ml-6 mb-4 text-left pl-5">
                        <li>
                        <strong>Clear headings:</strong> Each column has an unambiguous header.
                        </li>
                        <li>
                        <strong>Consistent data formats:</strong> All values in a column use the same format.
                        </li>
                        <li>
                        <strong>No merged cells:</strong> Each cell stands on its own.
                        </li>
                        <li>
                        <strong>Flat structure:</strong> One header row followed by the data rows.
                        </li>
                    </ul>
                    {renderImage("/Verschachtelung3.png", "Optimized table")}
                    <p className="text-center text-sm mb-6">
                        Image: Optimized table with clear headers, consistent data and no nested cells.
                    </p>

                    

                    <h2 className="text-xl font-semibold mb-2 text-left pl-5">
                        Summary
                    </h2>
                    <ul className="list-disc ml-6 mb-4 text-left pl-5">
                        <li>
                        <strong>Why:</strong> So our app can process Excel data without errors.
                        </li>
                        <li>
                        <strong>What:</strong> The table must contain clearly structured, consistent data.
                        </li>
                        <li>
                        <strong>How:</strong> By unmerging cells, using clear headers and consistent formatting.
                        </li>
                    </ul>

                    <p className="mb-4 text-left pl-5">
                        With these steps your tables will be prepared optimally for import. If you have questions or need support, please contact our support team.
                    </p>
                    
                    {/* make pictures bigger */}
                    {enlargedImage && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-transparent"
                        onClick={() => setEnlargedImage(null)}
                        >
                        <div
                            className="w-2/3 relative shadow-lg"
                            onClick={(e) => e.stopPropagation()} // prevent clicks inside the container from closing
                        >
                            <img
                            src={enlargedImage}
                            alt="Enlarged"
                            className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                    )}
    
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove grouped header */}
                <section ref={removeGroupedHeaderRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" > Remove grouped header</h2>
                    <p>
                        This converter can unfold nested headers in the header row and within columns. You must specify the rows and columns where the nesting occurs. This is necessary because the database cannot contain nested structures and requires a flat layout.
                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "- Before using this, apply the 'Fill empty rows' converter so there are no empty entries within the nested headers\n" +
                                "- If there are no nested headers within columns, you can enter column index 0\n" +
                                "- Finally, adjust the column names using the 'Add column headers' converter"
                            } />
                    </div>

                    {/* example 1 */}
                    <p className="text-left font-semibold mt-4">Example 1: Unfold nested header</p>
                    <p className="text-left">
                        Beforehand, apply the "Fill empty rows" converter so there are no empty entries within nested headers. First specify the two rows where the nesting occurs (rows 1 and 2). Enter these in the row numbers field. Since there are no nested headers within the columns, you can enter column number 0. The next two values refer to the data: you must indicate where the actual data starts. In this case, "Stadtviertel" is actually its own column, so the data starts at row 1 column 3 (at the value 35). As shown at the end, the column names are now undefined and must be added with the "Add column headers" converter.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameters </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeGroupedHeaderParameter1.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Before </figcaption>
                            <img className=" object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderStandard1.png" alt="" />

                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> After</figcaption>
                            <img className="object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderNew1.png" alt="" />

                        </figure>

                    </div>

                    {/* example 2 */}
                    <p className="text-left font-semibold mt-4">Example 2: Unfold nested header and columns</p>
                    <p className="text-left">
                        First apply the "Fill empty rows" converter with value 0 and the "Fill empty columns" converter with values 0,1. In this example there are also nested headers within columns. You can see this when different headers appear inside a single column, for example in column 0 the headers are: gender, 13 age groups and social areas. Ideally there should be only one header per column. Therefore enter column numbers 0, 1 and 2. The nested rows are 0 and 1; enter these in the row numbers field and the actual data begins at row 3 column 3 (start row and start column fields). Finally add the column names using the "Add column headers" converter.

                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameters </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeGroupedHeaderParameter2.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Before </figcaption>
                            <img className=" object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderStandard2.png" alt="" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> After</figcaption>
                            <img className="object-contain w-[35vw]" src="wikiAssets/removeGroupedHeaderNew2.png" alt="" />

                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* fill empty row */}
                <section ref={fillEmptyRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Fill empty rows</h2>
                    <p>
                        Use the "Fill empty rows" function when you want to replace empty cells in a specified row with values that are to the left of the empty cells.
                    </p>
                    <p className="text-left font-semibold mt-4">Example:</p>
                    <p className="text-left">
                        The following table contains an empty cell to the right of "Leistungen". To continue processing the table, for example to change the header, all cells in the row must be filled. <br /> <br />
                        We enter row number 1 because the empty cell to the right of "Leistungen" is located there.
                    </p>
                    <div className="flex justify-center">
                        <figure>
                            <figcaption></figcaption>
                            <img className="mt-5 object-contain w-[50vw] " src="wikiAssets/FillEmptyRow_Input.png" alt="fill empty row" />
                        </figure>
                    </div>
                    <div className="flex justify-around p-4">
                        <figure>
                            <figcaption className="font-semibold p-4"> Before </figcaption>
                            <img className="object-contain" src="wikiAssets/FillEmptyRow.png" alt="fill empty row" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> After </figcaption>
                            <img className=" object-contain" src="wikiAssets/FillEmptyRow_Result.png" alt="fill empty row" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* fill empty column */}
                <section ref={fillEmptyColref} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Fill empty columns</h2>
                    <p>
                        The "Fill empty columns" function operates similarly to "Fill empty rows" but applies to columns. It fills empty cells in the specified column with values that are above the empty cells.
                    </p>
                    <p className="text-left font-semibold mt-4">Example: </p>
                    <p className="text-left"> In the following table we have a fictional list of families and the number of school-age children living in a specific district. We want to fill the district names in the "Stadtteil" column. <br /> <br />
                        We enter column 0 because "Stadtteil" is the first column from the left.
                    </p>
                    <div className="mt-5 flex justify-center">
                        <figure>
                            <figcaption></figcaption>
                            <img className="w-[50vw] object-contain" src="wikiAssets/FillEmptyColumn_Input.png" alt="fill empty column" />
                        </figure>
                    </div>
                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold">Before </figcaption>
                            <img className="h-[40vh] object-contain" src="wikiAssets/FillEmptyColumn.png" alt="fill empty column" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold"> After</figcaption>
                            <img className="h-[40vh] object-contain" src="wikiAssets/FillEmptyColumn_Result.png" alt="fill empty column" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove column */}
                <section ref={removeColRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Remove column (by index)</h2>
                    <p>
                        This function can remove one or more columns by specifying their indices. Note that the "Index" column itself is not counted and the numbering starts at 0 afterwards. If you want to delete multiple columns, separate the numbers with commas and no spaces.
                    </p>
                    <p className="text-left font-semibold mt-4">Example: </p>
                    <p className="text-left">
                        In the following example we want to delete the "Stadtviertel" column at the beginning of the table.

                    </p>
                    <div className="flex justify-center">
                        <figure>
                            <img className="w-[50vw] object-contain" src="wikiAssets/RemoveColumn_Input.png" alt="remove Column" />
                        </figure>
                    </div>
                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold"> Before </figcaption>
                            <img className=" object-contain" src="/wikiAssets/standardTable.png" alt="remove Column" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold"> After</figcaption>
                            <img className=" object-contain" src="/wikiAssets/RemoveColumn_Result.png" alt="remove Column" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove row */}
                <section ref={removeRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Remove row (by index)</h2>
                    <p>
                        Use "Remove row (by index)" when you want to delete one or more rows at once. You can use the values in the "Index" column to determine row numbers. Note that the header row is row 0.
                        
                    </p>
                    <p className="text-left font-semibold mt-4">Example: </p>
                    <p className="text-left">
                        Here we want to delete rows 1 and 2.
                    </p>
                    <div className="mt-5 flex justify-center">
                        <figure>
                            <img className="w-[50vw] object-contain" src="wikiAssets/RemoveRow_Input.png" alt="remove row" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold"> Before </figcaption>
                            <img className="object-contain" src="wikiAssets/standardTable.png" alt="remove row" />
                        </figure>
                        <figure>
                            <figcaption className="font-semibold"> After</figcaption>
                            <img className="object-contain" src="wikiAssets/RemoveRow_Result.png" alt="remove row" />
                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* add column name */}
                <section ref={addColNameRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" > Add column headers</h2>
                    <p>
                        This converter allows you to change the column names. The names are separated by commas: the first name applies to the first column, the second name to the second column, and so on.

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "- Write the list of column names without spaces, as spaces are shown as underscores\n- 'undefined' means no name was assigned for that column"
                            } />
                    </div>

                    <p className="text-left font-semibold mt-4">Example: change "Undefined" to "Anzahl" (Count)</p>
                    <p className="text-left">
                        Since the last column is undefined (no name assigned), it does not appear in the listing. You can therefore add the new column name "Anzahl" at the end of the list.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameters </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/addHeaderNameParameter.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Before </figcaption>
                            <img className=" object-contain w-[35vw]" src="wikiAssets/addHeaderNameStandard.png" alt="" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> After</figcaption>
                            <img className="object-contain w-[35vw]" src="wikiAssets/addHeaderNameNew.png" alt="" />

                        </figure>

                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove footer */}
                <section ref={removeFooterRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Remove footer</h2>
                    <p>
                        This converter removes the section below the actual data. This separates the table from any metadata text and ensures correct display. Only the table is required for correct data processing; otherwise text lines below the table would be interpreted as data.

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "This converter works automatically and requires no further input"
                            } />
                    </div>

                    <p className="text-left font-semibold mt-4">Example:</p>
                    <p className="text-left">In this table, the text below the table (rows 80 and 81) is removed.</p>
                    <img className="mt-5 object-contain" src="wikiAssets/removeFooter.png" alt="Remove footer example" />

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove header */}
                <section ref={removeHeaderRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Remove header</h2>
                    <p>
                        This converter removes the section above the actual data. This separates the table from any metadata text and ensures correct display. Only the table is required for correct data processing; otherwise text lines above the table would be interpreted as data.

                    </p>
                    <div className="p-4">
                        <InfoCard
                            text={
                                "This converter works automatically and requires no further input"
                            } />
                    </div>

                    <p className="text-left font-semibold mt-4">Example:</p>
                    <p className="text-left">In this table the text above the table (rows 3 to 7) is removed.</p>
                    <img className="mt-5 object-contain" src="wikiAssets/removeHeader.png" alt="Remove header example" />

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* replace entries */}
                <section ref={replaceEntriesRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Replace entries </h2>
                    <p>
                        This converter can replace individual entries in the table to correct, for example, incorrect values. The entire table is searched for the search term and every occurrence is replaced with the "Replace with" value.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"If the search term occurs multiple times, all occurrences will be replaced with the new value"}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Example: Replace "Stadtviertel" with "Stadtteil"</p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameters </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/replaceEntriesParameter.png" alt="" />
                        </figure>
                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Before </figcaption>
                            <img className=" object-contain" src="wikiAssets/standardTable.png" alt="before replace" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> After</figcaption>
                            <img className="object-contain" src="wikiAssets/replaceEntriesTable.png" alt="after replace" />

                        </figure>

                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* split row */}
                <section ref={splitRowRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Split row </h2>
                    <p>
                        When this converter is applied, the entries in the specified column are split into multiple rows. This is necessary when multiple values are contained in a single cell. In the database each cell may only contain one value, so such values must be split across multiple rows.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"By default entries are split at line breaks"}
                        />
                    </div>

                    <p className="text-left font-semibold mt-4">Example:</p>
                    <p className="text-left">
                        The column "Fallantragsbezeichnung" contains several entries in one cell; these should be listed in separate rows. You must specify the index of the corresponding column.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameters </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/splitRowParameter.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Before </figcaption>
                            <img className=" object-contain" src="wikiAssets/splitRowStandard.png" alt="before split" />

                        </figure>

                        <figure>
                            <figcaption className="font-semibold p-4"> After</figcaption>
                            <img className="object-contain" src="wikiAssets/splitRowNew.png" alt="after split" />

                        </figure>
                    </div>

                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove invalid rows */}
                <section ref={removeInvalidRowsRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Remove invalid rows </h2>
                    <p>
                        This converter removes invalid rows. By default a row is considered invalid if it contains at least one empty cell. This can be used to keep only complete rows for visualization.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"- The threshold specifies how many entries in a row must be filled correctly so that it is not deleted.\n - Completely empty rows are always deleted"}
                        />
                    </div>



                    <p className="text-left font-semibold mt-4">Example:</p>
                    <p className="text-left">
                        If the threshold is set to 1, all rows with more than one correctly filled cell are kept. Row 2 is therefore deleted because the number of correct entries is less than or equal to the threshold. Completely empty rows are always deleted.
                    </p>

                    <div className="flex justify-center">
                        <figure>
                            <figcaption className="font-semibold p-4"> Parameters </figcaption>
                            <img className="mt-5 object-contain" src="wikiAssets/removeInvalidRowParameter.png" alt="" />
                        </figure>

                    </div>

                    <div className="flex justify-around p-4 ">
                        <figure>
                            <figcaption className="font-semibold p-4">Before </figcaption>
                            <img className=" object-contain" src="wikiAssets/removeInvalidRowStandard.png" alt="before remove invalid rows" />

                        </figure>
                        <figure>
                            <figcaption className="font-semibold p-4"> After</figcaption>
                            <img className="object-contain" src="wikiAssets/removeInvalidRowNew.png" alt="after remove invalid rows" />

                        </figure>
                    </div>
                </section>

                <div className="mt-6 border-1 border-gray-200"></div>

                {/* remove invalid columns at the end */}
                <section ref={removeTrailingColRef} className="mt-10">
                    <h2 className="text font-semibold text-lg" >Remove trailing columns </h2>
                    <p>
                        This converter removes columns at the end of the table. For example, if the last two columns are empty, they will be removed.
                    </p>

                    <div className="p-4">
                        <InfoCard
                            text={"No further input is required"}
                        />
                    </div>

                </section>

                <div className="mt-6
                 border-1 border-gray-200"></div>

                <section className="mt-10">
                    <h1 className="text font-bold text-lg" ref={metabaseRef}>Metabase</h1>
                    <h2 className="text font-semibold text-lg" ref={metabaseEinstiegRef} >Getting started</h2>
                    <p className="text-left font-semibold mt-4">What areas does Metabase have?</p>
                    After redirecting to Metabase you start on the overview page of models. Create a new model at the top right with the "New" button and then "Model" using the data you want to edit or analyze.<br />
                        <br /> A model is a view of specific data, essentially a copy. This has the advantage that you do not work directly with the original database data and they remain in their original form.
                        <br /> You also have the areas "Databases" and "Metrics" on the left. In "Databases" you can view all tables in the database. In "Metrics" you can create and view indices or Key Performance Indicators (KPIs). These can be included in dashboards, among other things.

                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-1.png" alt="Areas" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4">What can I do?</p>
                    Once you have created a new model and selected a file, the data appears. There are two important functional areas: the data editing options at the top right such as filtering, summarizing and more, and the visualization options via the button at the bottom left.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-2.png" alt="Function areas" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseFilterRef}>How do I filter a table?</p>
                    If you want to filter the table by specific properties, choose the filter button and select columns from the table.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-3.png" alt="Filter" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseSummaryRef}>How do I summarize values in the table?</p>
                    If you want to aggregate values, choose the summarize button and select a function and a grouping. A function specifies what should be done with the values, for example sum for the sum of relevant cells or count for the frequency of cells with the same content. The grouping specifies which column is used for grouping.

                    <div className="p-5">
                        Step 1:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-4.png" alt="Summarize" />
                        </figure>
                    </div>
                        <div className="p-4">
                            <InfoCard
                                text={"Please note: If you have selected a summary and want to remove it, you must first remove the grouping and then remove the function."}
                            />
                        </div>
                    <div className="p-5">
                        Step 2:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-4a.png" alt="Summarize" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseVisualisierungRef}>How do I visualize a table?</p>

                    <div className="p-5">
                        If you want to display data graphically, click the "Visualization" button and choose a display type. Use the round "Table" icon to return to the original table. You can always filter, summarize or change the display type. When hovering over a visualization icon a small gear appears for additional settings.
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-5.png" alt="Visualization" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4">How do I place data on a map?</p>
                    <div className="p-5">
                        If you want to display your data on a city map of Ulm, choose the "Map" visualization and select your map in the settings.
                    </div>

                    <div className="p-5">
                        Step 1:
                    </div>
                        <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-6.png" alt="Map" />
                        </figure>
                    </div>

                    <div className="p-5">
                        Step 2:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-6a.png" alt="Map" />
                        </figure>
                    </div>

                    <div className="p-5">
                        Result:
                    </div>
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-6b.png" alt="Map result" />
                        </figure>
                    </div>

                    <div className="mt-6 border-1 border-gray-200"></div>

                    <p className="text-left font-semibold mt-4" ref={metabaseJoinRef}>How can I join different tables?</p>

                    <div className="p-5">
                    You have different tables you want to join. In technical terms this is called "joining" tables. This usually serves to enrich a table. The prerequisite is a common column. Both tables must contain a column where the values match in meaning and spelling.
                    </div>

                    <p className="text-left font-semibold mt-4">Example:</p>
                    We want to find out the age distribution of citizens across social areas. We have the following tables.
                        <div className="flex justify-around p-4 ">
                            <figure>
                                <figcaption className="font-semibold p-4">Table 1: Number of citizens by age and gender per district</figcaption>
                                <img className=" object-contain" src="wikiAssets/metabase/Einstieg-7a.png" alt="Table1" />
                            </figure>
                            <figure>
                                <figcaption className="font-semibold p-4">Table 2: Assignment of streets to districts, parts and social areas</figcaption>
                                <img className="object-contain" src="wikiAssets/metabase/Einstieg-7aa.png" alt="Table2" />
                            </figure>
                        </div>
                    <div className="p-4">
                        <InfoCard
                            text={"When you click on one of the rectangular elements, a small x appears at the top right to delete the element. The triangle next to an element shows the table. If a function has been applied, the triangle shows the table after execution of the function. In our example this is the joined table."}
                        />
                    </div>

                    <div className="p-5">
                    Step 1:
                    </div>
                    We start editing by using the "Join data" function to intersect the two tables via the "Stadtviertel" column. This assigns values from table 2 to rows in table 1 that have the same district.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-7b.png" alt="Join" />
                        </figure>
                    </div>
                        <div className="p-4">
                            <InfoCard
                                text={"Please note: The values in both columns must be spelled exactly the same. Abbreviations like 'Str.' and 'Straße' are not treated as equal."}/>
                        </div>
                    To obtain the desired information, aggregate the joined table by the sum of the number of citizens grouped by age and social areas and visualize it.
                        <div className="flex justify-center">
                            <figure>
                                <img className="h-[45vh] object-contain" src="wikiAssets/metabase/Einstieg-7c.png" alt="Join" />
                            </figure>
                        </div>

                    <div className="p-5">
                        Step 2:
                    </div>
                    After saving the model, you can visualize the data. For this information an area chart is suitable because it shows age distribution well as lines and allows stacking different social areas for comparison.
                    <div className="flex justify-center">
                        <figure>
                            <img className="h-[70vh] object-contain" src="wikiAssets/metabase/Einstieg-7d.png" alt="Join visualization" />
                        </figure>
                    </div>
                </section>
            </section>
        </div>
    );
};