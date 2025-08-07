import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckBox({setAllCheck}) {
  const navigate = useNavigate();
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);
  const [checkedFour, setCheckedFour] = useState(false);
  const [checkedFive, setCheckedFive] = useState(false);

  useEffect(() => {
    if (checkedOne && checkedTwo && checkedThree && checkedFour && checkedFive) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [checkedOne, checkedTwo, checkedThree, checkedFour, checkedFive]);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
  };

  const handleChangeFour = () => {
    setCheckedFour(!checkedFour);
  };

  const handleChangeFive = () => {
    setCheckedFive(!checkedFive);
  };

  return (
    <fieldset>
      <legend className="sr-only">Notifications</legend>
      <div className="flex flex-col p-5 space-y-5 text-left">
        <p className="text-base text-gray-700 w-120">
          Überprüfe vor dem Hochladen, ob die folgenden Eigenschaften <br /> auf die Tabelle zutreffen:
        </p>

       {/*CheckBox 1*/}
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <input
                type="checkbox"
                defaultChecked={false}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={handleChangeOne}
              />
            </div>
            <div className="text-sm">
              <label className="block font-medium text-gray-900">
                Klare Überschriften
              </label>
              <p className="text-gray-500">
              Jede Spalte hat eine eindeutige Überschrift.
              </p>
            </div>
          </div>

          {/*CheckBox 2*/}
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <input
                type="checkbox"
                defaultChecked={false}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={handleChangeTwo}
              />
            </div>
            <div className="text-sm">
              <label className="block font-medium text-gray-900">
              Einheitliche Datenformate 
              </label>
              <p className="text-gray-500">
              Alle Werte in einer Spalte sind gleich formatiert.
              </p>
            </div>
          </div>

          {/*CheckBox 3*/}
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <input
                type="checkbox"
                defaultChecked={false}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={handleChangeThree}
              />
            </div>
            <div className="text-sm">
              <label className="block font-medium text-gray-900">
              Keine zusammengeführten Zellen 
              </label>
              <p className="text-gray-500">
              Jede Zelle steht für sich.
              </p>
            </div>
          </div>

          {/*CheckBox 4*/}
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <input
                type="checkbox"
                defaultChecked={false}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={handleChangeFour}
              />
            </div>
            <div className="text-sm">
              <label className="block font-medium text-gray-900">
              Flache Struktur 
              </label>
              <p className="text-gray-500">
              Eine Überschriftenzeile, gefolgt von den Daten.
              </p>
            </div>
          </div>

          {/*CheckBox 5*/}
          <div className="flex items-start gap-3">
            <div className="pt-1">
              <input
                type="checkbox"
                defaultChecked={false}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={handleChangeFive}
              />
            </div>
            <div className="text-sm">
              <label className="block font-medium text-gray-900">
              Vollständige Daten
              </label>
              <p className="text-gray-500">
              Keine komplett leeren Zeilen.
              </p>
            </div>
          </div>
      </div>
    </fieldset>
  );
}
