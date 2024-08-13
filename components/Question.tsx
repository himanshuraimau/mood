"use client";

import React, { useState } from "react";
import { askQuestion } from "../utils/api";

const Question = () => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{ output_text: string } | null>(null);

    const onChange = (e:any) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (e:any) => {
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
        <div>
            <form className="flex" onSubmit={handleSubmit}>
                <input
                    disabled={loading}
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="Ask a Question!"
                    className="border border-black/20 px-4 py-3 text-lg rounded-lg"
                />
                <div className="pt-1 pl-3">
                    <button
                        disabled={loading}
                        type="submit"
                        className="bg-blue-400 px-4 py-2 rounded-lg text-lg hover:bg-blue-300"
                    >
                        Ask
                    </button>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {response && <p>{response.output_text}</p>} {/* Render the output_text */}
        </div>
    );
};

export default Question;
