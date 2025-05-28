import { useState } from "react";

export const useModal = () => {
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };


  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };

  const handleSymptomChange  = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectedSymptom(event.target.value);
};

  return {
    searchTerm,
    sortOrder,
    stockFilter,
    itemsPerPage,
    selectedItemId,
    modal,
    secondModal,
    selectedSymptom,
    handleSymptomChange ,
    setSelectedItemId,
    setItemsPerPage,
    handleSearch,
    handleSort,
    handleStockFilter,
  };
};
