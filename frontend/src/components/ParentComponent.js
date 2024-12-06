import React, { useState, useCallback } from "react";
import AccountWindow from "./AccountWindow";
import CustomerList from "./CustomerList";

const ParentComponent = () => {
  const [trigger, setTrigger] = useState(false);

  // Memoize the function to prevent re-creation on every render
  const handleTriggerUpdate = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  return (
    <div>
      <AccountWindow onAccountAdded={handleTriggerUpdate} />
      <CustomerList trigger={trigger} />
    </div>
  );
};

export default ParentComponent;
