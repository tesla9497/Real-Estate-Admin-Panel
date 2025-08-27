export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Added ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

export const formatCurrency = (amount: number) => `$${amount.toLocaleString("en-US")}`;