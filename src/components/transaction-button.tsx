import React from 'react';
import { BeatLoader } from 'react-spinners';
import { getHighLevelTransactionState } from '../utils/misc';

const override = {
    display: "flex",
    justifyContent: "center",
    padding: "2px 0",
};

interface TransactionButtonProps {
    status: string;
    buttonText: string;
    onClick?: () => void;
}

const TransactionButton = ({ status, buttonText, onClick }: TransactionButtonProps) => {
    const { isLoading, isError, isSuccess } = getHighLevelTransactionState(status);


    if (isSuccess) {
        return (
            <p className="text-teal-400 text-xl">
                Transaction Successfully Completed!
            </p>
        );
    }

    return (
        <>
            <button
                type="submit"
                disabled={isLoading}
                onClick={onClick}
                className="inline-block w-full px-4 py-2 mt-8 text-center text-white font-bold bg-gradient-to-r from-blue-500 to-teal-400 rounded-md shadow hover:from-teal-400 hover:to-teal-400"
            >
                {isLoading ? (
                    <BeatLoader
                        color="#ffffff"
                        loading={isLoading}
                        cssOverride={override}
                    />
                ) : buttonText}
            </button>
            {isLoading ? (
                <p className="mt-2">
                    Transaction status:{" "}
                    <span
                        className={
                            status === "Mining" ? "text-teal-400" : "text-blue-500"
                        }
                    >
                        {status.replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </span>
                </p>
            ) : null}
            {isError ? (
                <p className="text-red-500 mt-2">
                    There was an error when attempting to create your vault
                </p>
            ) : null}
        </>
    );
};

export default TransactionButton;