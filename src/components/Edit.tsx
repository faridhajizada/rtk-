import { useEffect, useState } from "react";
import { Category, changeCategory } from "../features/Categories";
import { useDispatch, useSelector } from "react-redux";

export function Edit({id, setEdit} : {id: number, setEdit: any}) {
    const dispatch = useDispatch();

    const {status} = useSelector((state: any) => state.categories);

    const [formState, setFormState] = useState<any>({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formState.name) {
            errors.name = "Name is required";
        }
        if (!formState.description) {
            errors.description = "Description is required";
        }
        return errors;
    };

    const handleSubmit = async (e: any, category: Category) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            dispatch(changeCategory({...category, id: id}));
            setTimeout(() => setEdit(false), 1000)
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className="m-auto flex items-center justify-center w-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Edit Information</h2>
                <form onSubmit={(e: any) => handleSubmit(e, formState)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formState.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={formState.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {status.edit == "pending" ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
