const getHighLevelTransactionState = (status: string) => {
    const isLoading = status === "Mining" || status === "PendingSignature";
    const isError = status === "Fail" || status === "Exception";
    const isSuccess = status === "Success";

    return { isLoading, isError, isSuccess };
};

export { getHighLevelTransactionState };