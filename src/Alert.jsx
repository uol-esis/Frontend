import { InformationCircleIcon, XCircleIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import React from 'react';

const typeMap = {
  info: { component: InformationCircleIcon, className: "text-blue-400", color: "bg-blue-100" },
  error: { component: XCircleIcon, className: "text-red-400", color: "bg-red-100" },
  check: { component: CheckCircleIcon, className: "text-green-400", color: "bg-green-100" },
  warning: { component: ExclamationCircleIcon, className: "text-yellow-400", color: "bg-yellow-100" },
};

export default function Alert(props) {
  const [typeComponent, setTypeComponent] = useState(null);
  const [typeClass, setTypeClass] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (props.type && typeMap[props.type]) {
      setTypeComponent(typeMap[props.type].component);
      setTypeClass(typeMap[props.type].className);
      setColor(typeMap[props.type].color);
    }
  }, [props.type]);

  return (
    <div className={`rounded-md ${color} p-4 mt-[2vh] rounded-[10px] pl-[2vh] mx-[5vw]`}>
      <div className="flex">
        <div className="flex-shrink-0 items-center">
          {typeComponent && React.createElement(typeComponent, { "aria-hidden": "true", className: "h-6 w-6 " + typeClass })}
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between items-left text-left">
          <p className="text-sm">{props.text}</p>
          <p className="mt-3 text-sm md:ml-6 md:mt-0"></p>
        </div>
      </div>
    </div>
  );
}