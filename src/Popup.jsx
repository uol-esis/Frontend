import { useState } from "react";

export default function Popup(){

    const [enlargedImage, setEnlargedImage] = useState(null);

    //klickbar bild
  const renderImage = (src, alt) => (
    <img
      src={src}
      alt={alt}
      className="my-4 mx-auto cursor-pointer"
      onClick={() => setEnlargedImage(src)}
    />
  );

    return(
        <>
      
       
          <div className="  max-w-lg w-full flex flex-col">
            
            <div
              className="px-6 py-4 overflow-y-auto max-w-prose"
              style={{ maxHeight: "60vh" }}
            >
              <h1 className="text-2xl font-bold mb-4">
                Why and How You Need to Optimize Excel Tables
              </h1>
              <p className="mb-4 text-left pl-5">
                This application processes your Excel tables to import data into a database. However, these tables are often highly nested or unstructured. 
                To allow our software to correctly read and process the data, tables must be converted into a “machine-readable” and “database-compliant” format.
              </p>

              <h2 className="text-xl font-semibold mb-2">
                1. What does “machine-readable” and “database-compliant” mean?
              </h2>
              <p className="mb-4 text-left pl-5">
                <strong>Machine-readable:</strong> Data is formatted so that computers can easily understand and process it — in clear, separate columns and rows.
              </p>
              <div className="mb-4 text-left pl-5">
                <strong>Database-compliant:</strong> The structure meets the requirements of a database:
                <ul className="list-disc ml-6">
                  <li>
                    Each column contains only one type of information (e.g., only names, only numbers).
                  </li>
                  <li>Headers are clearly in the first row.</li>
                  <li>No nested or merged cells.</li>
                </ul>
              </div>
              {renderImage("/Verschachtelung1.png", "Comparison: unstructured vs. optimized table")}
              <p className="text-center text-sm mb-6">
                Image: Top – Nested table; Bottom – Optimized, clear structure.
              </p>

              <h2 className="text-xl font-semibold mb-2">
                2. How should an optimized table look?
              </h2>
              <ul className="list-disc ml-6 mb-4 text-left pl-5">
                <li>
                  <strong>Clear headers:</strong> Each column has a unique header.
                </li>
                <li>
                  <strong>Uniform data formats:</strong> All values in a column are consistently formatted.
                </li>
                <li>
                  <strong>No merged cells:</strong> Each cell stands alone.
                </li>
                <li>
                  <strong>Flat structure:</strong> One header row followed by the data.
                </li>
              </ul>
              {renderImage("/Verschachtelung3.png", "Optimized table")}
              <p className="text-center text-sm mb-6">
                Image: Optimized table with clear headers, uniform data, and no nested cells.
              </p>

              <h2 className="text-xl font-semibold mb-2 text-left pl-5">
                Summary
              </h2>
              <ul className="list-disc ml-6 mb-4 text-left pl-5">
                <li>
                  <strong>Why:</strong> So that our app can process Excel data without errors.
                </li>
                <li>
                  <strong>What:</strong> The table must contain clearly structured, uniform data.
                </li>
                <li>
                  <strong>How:</strong> By unmerging cells, using clear headers, and applying consistent formatting.
                </li>
              </ul>

              <p className="mb-4 text-left pl-5">
                These steps will prepare your tables optimally for import. If you have questions or need assistance, please contact our support team!
              </p>

            </div>
          </div>
        
      

      {/* Vergrößerungs-Overlay für Bilder */}
      {enlargedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-transparent"
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className="w-2/3 relative shadow-lg"
            onClick={(e) => e.stopPropagation()} // Verhindert, dass Klicks im Container das Schließen auslösen
          >
            
            <img
              src={enlargedImage}
              alt="Vergrößert"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
    );
}
