import { FunctionComponent } from 'react';

interface HeaderProps {
    isDashboard?: boolean;
    onSignOut: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({ onSignOut, isDashboard }) => {
    return (
        <header className="bg-yellow-900 p-4 flex justify-between items-center">
            {isDashboard ? (
                <h1 className="text-white text-2xl">Welcome to Mintable Lite</h1>
            ) : (
                <button
                    onClick={() => history.back()}
                    className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
            )}
            <button
                onClick={onSignOut}
                className="text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 font-bold py-2 px-4 rounded"
            >
                Sign Out
            </button>
        </header>
    );
};

export default Header;
