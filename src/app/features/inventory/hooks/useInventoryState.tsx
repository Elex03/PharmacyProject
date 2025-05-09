import { useState } from "react";

export const useInventoryState = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    searchTerm,
    sortOrder,
    stockFilter,
    itemsPerPage,
    isModalOpen,
    setItemsPerPage,
    handleSearch,
    handleSort,
    handleStockFilter,
    onOpenModal,
    closeModal,
  };
};
