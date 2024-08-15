"use client";

import React, { useState } from "react";
import { askQuestion } from "../utils/api";

const Question = () => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{ output_text: string } | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const answer = await askQuestion(value);
            setResponse(answer);
        } catch (error) {
            console.error("Error asking question:", error);
            setResponse({ output_text: "An error occurred. Please try again." });
        } finally {
            setLoading(false);
            setValue("");
        }
    };

    return (
        <div className="">
            <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
                <input
                    disabled={loading}
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="Ask a question..."
                    className="border border-gray-300 px-4 py-2 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                >
                    {loading ? "Asking..." : "Ask"}
                </button>
            </form>
            {response && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                    <p className="text-gray-800">{response.output_text}</p>
                </div>
            )}
            {loading && !response && <p className="mt-4 text-blue-600">Loading...</p>}
        </div>
    );
};

export default Question;
