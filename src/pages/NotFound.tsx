// src/components/NotFoundPage.tsx

import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-bounce">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
            <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="180" fill="#ccc" />
                    {/* Server */}
                    <rect x="100" y="100" width="200" height="200" fill="#333" />
                    <circle cx="200" cy="250" r="10" fill="#777" />
                    <circle cx="200" cy="300" r="10" fill="#777" />
                    <circle cx="200" cy="350" r="10" fill="#777" />
                    {/* Man */}
                    <circle cx="200" cy="100" r="20" fill="#ff6600" />
                    <line x1="200" y1="120" x2="200" y2="200" stroke="#ff6600" stroke-width="4" />
                    <line x1="200" y1="140" x2="180" y2="160" stroke="#ff6600" stroke-width="4" />
                    <line x1="200" y1="140" x2="220" y2="160" stroke="#ff6600" stroke-width="4" />
                </svg>
            </div>
        </div>
    );
};

export default NotFoundPage;
