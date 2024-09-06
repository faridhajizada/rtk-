import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { liked, basket } = useSelector((state: any) => state.categories);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">YourLogo</Link>
                </div>
                <div className="flex space-x-4">
                    <Link
                        to="/categories"
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Categories
                    </Link>
                    <Link
                        to="/favorites"
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Favorites ({liked.length})
                    </Link>
                    <Link
                        to="/basket"
                        className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Basket ({basket.length})
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
