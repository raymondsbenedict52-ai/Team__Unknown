import { createContext, useContext, useState } from "react";

const ScanContext = createContext();

export function ScanProvider({ children }) {
    const [scanResult, setScanResult] = useState(null);

    return (
        <ScanContext.Provider value={{ scanResult, setScanResult }}>
            {children}
        </ScanContext.Provider>
    );
}

export function useScan() {
    return useContext(ScanContext);
}
