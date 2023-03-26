import React, { useState } from 'react';
import "../css/tab.css"

function TabContainer() {
    const [activeTab, setActiveTab] = useState(0);

    const handleWheel = (event) => {
        if (event.deltaY < 0) {
            setActiveTab((prevTab) => (prevTab === 0 ? prevTab : prevTab - 1));
        } else {
            setActiveTab((prevTab) => (prevTab === tabData.length - 1 ? prevTab : prevTab + 1));
        }
    };

    return (
        <div className="tab-container" onWheel={handleWheel}>
            <div className="tabs">
                {tabData.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`tab ${index === activeTab ? 'active' : ''}`}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {tabData[activeTab].content}
            </div>
        </div>
    );
}