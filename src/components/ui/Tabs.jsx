// src/components/ui/tabs.jsx
import { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const tabList = [];
  const tabContent = [];

  children.forEach(child => {
    if (child.type === TabsList) {
      tabList.push(
        <div key="tabs-list" className="flex border-b border-gray-200">
          {child.props.children.map(tabTrigger => (
            <button
              key={tabTrigger.props.value}
              onClick={() => setActiveTab(tabTrigger.props.value)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tabTrigger.props.value
                  ? "text-red-900 border-b-2 border-red-900"
                  : "text-gray-500 hover:text-red-700"
              }`}
            >
              {tabTrigger.props.children}
            </button>
          ))}
        </div>
      );
    } else if (child.type === TabsContent && child.props.value === activeTab) {
      tabContent.push(
        <div key={child.props.value} className="p-4 animate-fade-in">
          {child.props.children}
        </div>
      );
    }
  });

  return (
    <div className="w-full">
      {tabList}
      {tabContent}
    </div>
  );
}

export function TabsList({ children }) {
  return children;
}

export function TabsTrigger({ value, children }) {
  return children;
}

export function TabsContent({ value, children }) {
  return children;
}
