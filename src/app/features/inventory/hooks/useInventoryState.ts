import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return {
    isOpen,
    onOpen,
    onClose,
  };
};


export const useInventoryState = () => {
  const modal = useModal();
  const secondModal = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };



  return {
    searchTerm,
    sortOrder,
    stockFilter,
    itemsPerPage,
    setItemsPerPage,
    handleSearch,
    handleSort,
    handleStockFilter,
    modal,
    secondModal,
  };
};
